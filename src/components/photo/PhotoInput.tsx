import React, { Component } from 'react'
import { AppRegistry, Platform, Dimensions, StyleSheet, Text, View, Image, Modal } from 'react-native'
import { Button, Header, Icon, Card, CardItem, Left, Right, Body, DeckSwiper, Badge } from 'native-base'
import Camera from 'react-native-camera'

import { PhotoInputQuestion } from '../../survey'
import { BaseInput, BaseState } from '../'
import Style from './Style'

interface camera {
    aspect: any
    captureTarget: any
    type: any
    flashMode: any
    orientation: any
    playSoundOnCapture: boolean
}

interface PhotoInputState extends BaseState {
    camera: camera
    isCapturing: boolean
    capturedPhotos: string[]
    shownPhoto: string
}

export class PhotoInput extends BaseInput<PhotoInputQuestion, PhotoInputState> {

    private camera: Camera

    constructor(props: PhotoInputQuestion) {
        super(props)
        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.disk,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.portrait,
                playSoundOnCapture: true,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isCapturing: false,
            capturedPhotos: [],
            shownPhoto: '',
            display: true,

        }
        this.openCamera = this.openCamera.bind(this)
        this.takePhoto = this.takePhoto.bind(this)
        this.closeCamera = this.closeCamera.bind(this)
        this.removeShownPhoto = this.removeShownPhoto.bind(this)
        this.renderTitle = this.renderTitle.bind(this)
        this.onNavigatePreviousPhoto = this.onNavigatePreviousPhoto.bind(this)
        this.onNavigateNextPhoto = this.onNavigateNextPhoto.bind(this)
    }

    public render(): JSX.Element {
        if (this.state.isCapturing) {
            return this.renderCamera()
        } else if (this.state.capturedPhotos.length > 0) {
            return this.renderGallery()
        }
        return this.renderTitle()
    }

    private renderCamera() {
        return (
            <Modal
                animationType={'slide'}
                transparent={false}
                onRequestClose={this.closeCamera}>
                <View style={Style.container}>
                    <Camera
                        ref={(cam) => { this.camera = cam }}
                        style={Style.preview}
                        aspect={Camera.constants.Aspect.fill} >
                        <Button
                            transparent
                            onPress={this.takePhoto} >
                            <Icon active name="camera" />
                        </Button>
                        <Button
                            transparent
                            onPress={this.closeCamera}>
                            <Badge style={Style.badgeStyle}>
                                <Text>{this.state.capturedPhotos.length}</Text>
                            </Badge>
                            <Icon active name="done-all" />
                        </Button>
                    </Camera>
                </View>
            </Modal>
        )
    }

    protected renderTitle(): JSX.Element | undefined {
        return (this.props.title === undefined ? undefined :
            <Header style={Style.header}>
                <Text style={Style.title}>{this.props.title}</Text>
                <Button transparent style={Style.button} onPress={this.openCamera}>
                    <Icon name="camera" />
                </Button>
            </Header>
        )
    }

    private renderGallery(): JSX.Element {
        return (
            <Card >
                <CardItem header>
                    <Text>{this.props.title}</Text>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        style={Style.imagePreview}
                        source={{ uri: this.state.shownPhoto }}
                        resizeMode="stretch">
                    </Image>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button
                            transparent
                            onPress={this.onNavigatePreviousPhoto}>
                            <Icon name="arrow-dropleft-circle" />
                        </Button>
                    </Left>
                    <Right>
                        <Button
                            transparent
                            onPress={this.onNavigateNextPhoto}>
                            <Icon name="arrow-dropright-circle" />
                        </Button>
                    </Right>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button
                            transparent
                            onPress={this.removeShownPhoto}>
                            <Icon name="trash" />
                        </Button>
                    </Left>
                    <Right>
                        <Button
                            transparent
                            onPress={this.openCamera}>
                            <Icon name="camera" />
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        )
    }

    private openCamera() {
        this.setState({ isCapturing: true })
    }

    private closeCamera() {
        this.setState({
            isCapturing: false,
            shownPhoto: this.state.capturedPhotos[0],
        })
    }

    private takePhoto() {
        if (this.camera) {
            this.camera.capture().
                then((data) => {
                    const { capturedPhotos } = this.state
                    capturedPhotos.push(data.path)
                    this.setState({ capturedPhotos })
                }).
                catch(() => {
                    this.setState({ isCapturing: false })
                })
        }
    }

    private removeShownPhoto() {
        const indexOfRemovedPhoto = this.state.capturedPhotos.indexOf(this.state.shownPhoto)
        const { capturedPhotos } = this.state
        capturedPhotos.splice(indexOfRemovedPhoto, 1)

        let shownPhoto = this.state.capturedPhotos[indexOfRemovedPhoto]
        if (!shownPhoto) {
            shownPhoto = this.state.capturedPhotos[0]
        }
        this.setState({ capturedPhotos, shownPhoto })
    }

    private onNavigateNextPhoto() {
        const indexOfshownPhoto = this.state.capturedPhotos.indexOf(this.state.shownPhoto)
        const shownPhoto = this.state.capturedPhotos[indexOfshownPhoto + 1]
        if (shownPhoto) {
            this.setState({ shownPhoto })
        }
    }

    private onNavigatePreviousPhoto() {
        const indexOfshownPhoto = this.state.capturedPhotos.indexOf(this.state.shownPhoto)
        const shownPhoto = this.state.capturedPhotos[indexOfshownPhoto - 1]
        if (shownPhoto) {
            this.setState({ shownPhoto })
        }
    }

    public setValue() {
        throw new Error('not supported operation')
    }

    public getValue() {
        throw new Error('not supported operation')
    }

}
