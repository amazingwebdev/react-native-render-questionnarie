import React, { Component } from 'react'
import { AppRegistry, Platform, Dimensions, StyleSheet, Text, View, Image, Modal } from 'react-native'
import { Button, Header, Icon, Card, CardItem, Left, Right, Body, DeckSwiper } from 'native-base'

import Camera from 'react-native-camera'
import { PhotoInputQuestion } from '../../survey'
import { BaseInput, BaseState } from '../'
import Style, { buttonStyle } from './Style'

interface camera {
    aspect: any
    captureTarget: any
    type: any
    flashMode: any
    orientation: any
    playSoundOnCapture: boolean
}

interface State extends BaseState {
    camera: camera
    isCaptured: boolean
    url: string
    isCapturing: boolean
    modalVisible: boolean

}

export class PhotoInput extends BaseInput<PhotoInputQuestion, State> {

    private camera: Camera
    public images: string[]

    constructor(props: PhotoInputQuestion) {
        super(props)

        this.state = {
            modalVisible: false,
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.disk,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                playSoundOnCapture: true,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isCaptured: false,
            isCapturing: false,
            url: '',
            display: true,
        }
        this.images = []
        this.openCamera = this.openCamera.bind(this)
        this.takePicture = this.takePicture.bind(this)
        this.returnBack = this.returnBack.bind(this)
        this.getImages = this.getImages.bind(this)
        this.removePicture = this.removePicture.bind(this)
        this.retakePicture = this.retakePicture.bind(this)
    }

    public render(): JSX.Element {
        return (
            this.state.isCaptured ? this.renderCamera() : this.getTitle()
        )
    }

    private renderCamera() {
        if (!this.state.isCapturing) {
            return (
                <Modal
                    animationType={'slide'}
                    transparent={false}>
                    <View style={Style.container}>
                        {/* Ask Seray Uzgur */}
                        <Camera ref={(cam) => { this.camera = cam }} aspect={Camera.constants.Aspect.fill} style={Style.preview}>
                            <Button style={buttonStyle.leftButton} onPress={this.takePicture}><Text>ÇEK</Text></Button>
                            <Button style={buttonStyle.rightButton} onPress={this.returnBack}><Text>GERİ</Text></Button>
                        </Camera>
                    </View>
                </Modal>
            )
        }
        return (
            <Card >
                <CardItem>
                    <Body>
                        <Text>{this.props.title}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Image source={{ uri: this.state.url }} style={Style.imagePreview} resizeMode="stretch"></Image>
                </CardItem>
                <CardItem>
                    <Body style={{ flexDirection: 'row' }}>
                        <Button style={Style.centerButton} transparent onPress={this.removePicture}><Text>SİL</Text></Button>
                        <Button style={Style.centerButton} transparent onPress={this.retakePicture}><Text>YENİDEN ÇEK</Text></Button>
                        <Button style={Style.centerButton} transparent onPress={this.setValue}><Text>RESİM EKLE</Text></Button>
                    </Body>
                </CardItem>
            </Card>

        )

    }

    private returnBack() {
        if (this.images.length === 0) {
            this.setState({ isCaptured: false })
        } else {
            this.setState({ isCaptured: true, isCapturing: true })
        }
    }

    private takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => {
                    this.setState({ url: data.path, isCapturing: true })
                    this.getImages()
                })
                .catch((err: any) => console.error(err))
        }

    }

    private retakePicture() {
        for (const i of this.images) {
            if (this.state.url === i) {
                const index = this.images.indexOf(i)
                this.images.splice(index, 1)
                this.setValue()
            }
        }
        this.renderCamera()
    }
    private removePicture() {
        for (const i of this.images) {
            if (this.state.url === i) {
                const index = this.images.indexOf(i)
                this.images.splice(index, 1)
                this.setState({ url: this.images[index - 1] })
                if (this.images.length === 0) {
                    this.setValue()
                    this.returnBack()
                }
            }
        }
    }

    private getImages() {
        this.images.push(this.state.url)
        console.log(this.images)

    }

    protected getTitle(): JSX.Element | undefined {
        return (this.props.title === undefined ? undefined :
            <Header style={Style.header}>
                <Text style={Style.title}>{this.props.title}</Text>
                <Button style={Style.button} onPress={this.openCamera}>
                    <Icon name="camera" />
                </Button>
            </Header>
        )
    }

    private openCamera() {
        this.setState({ isCaptured: true })
    }

    public setValue() {
        this.setState({ isCapturing: false })
    }

    public getValue() {
        return this.state.camera
    }
}
