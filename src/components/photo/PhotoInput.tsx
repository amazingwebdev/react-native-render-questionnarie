
import React, { Component } from 'react'
import { AppRegistry, Platform, Dimensions, StyleSheet, Text, View, Image, Modal } from 'react-native'
import { Button, Header, Icon, Card, CardItem, Left, Right, Body, DeckSwiper, Badge } from 'native-base'
import Camera from 'react-native-camera'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'

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
    currentPage: number
}
interface pageNumber {
    position : number
}
export class PhotoInput extends React.Component<PhotoInputQuestion, PhotoInputState> {

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
            isGalleryOpen: false,
            isCapturing: false,
            capturedPhotos: [],
            display: true,
            currentPage: 0,
        }
        this.openCamera = this.openCamera.bind(this)
        this.takePhoto = this.takePhoto.bind(this)
        this.closeCamera = this.closeCamera.bind(this)
        this.removeShownPhoto = this.removeShownPhoto.bind(this)
        this.renderTitle = this.renderTitle.bind(this)
        this.renderDotIndicator = this.renderDotIndicator.bind(this)
    }

    public render(): JSX.Element {
        if (this.state.isCapturing) {
            return this.renderCamera()
        } else if (this.state.capturedPhotos.length > 0) {
            // return this.renderGallery()
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
                        <Button style={Style.cameraButton}
                            transparent
                            onPress={this.takePhoto} >
                            <Icon active name="camera" style={Style.iconSize} />
                        </Button>
                        <Button style={Style.doneButton}
                            transparent
                            onPress={this.closeCamera}>
                            <Badge style={Style.badgeStyle}>
                                <Text>{this.state.capturedPhotos.length}</Text>
                            </Badge>
                            <Icon active name="done-all" style={Style.iconSize} />
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

    public renderDotIndicator() {
        return <PagerDotIndicator pageCount={this.state.capturedPhotos.length} />
    }
  
    private currentPage(pageNumber : pageNumber) {
        const page = pageNumber.position
        this.setState({ currentPage:page })
    }

    private openCamera() {
        this.setState({ isCapturing: true })
    }

    private closeCamera() {
        this.setState({
            isCapturing: false,
        })
    }

    private takePhoto() {
        if    (this.camera) {
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
        const { capturedPhotos } = this.state
        capturedPhotos.splice(this.state.currentPage, 1)
        this.setState({ capturedPhotos })
    }

    public setValue() {
        throw new Error('not supported operation')
    }

    public getValue() {
        throw new Error('not supported operation')
    }

}
