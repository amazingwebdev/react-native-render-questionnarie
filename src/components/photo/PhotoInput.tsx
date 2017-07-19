import React, { Component } from 'react'
import { AppRegistry, Platform, Dimensions, StyleSheet, Text, View, Image, Modal } from 'react-native'
import { Button, Header, Icon, Card, CardItem, Left, Right, Body } from 'native-base'

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

interface State extends BaseState {
    camera: camera
    isCaptured: boolean
    url: string
    isCapturing: boolean
    modalVisible: boolean

}

export class PhotoInput extends BaseInput<PhotoInputQuestion, State> {

    private camera: Camera

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
        this.renderCamera = this.renderCamera.bind(this)
        this.openCamera = this.openCamera.bind(this)
        this.takePicture = this.takePicture.bind(this)
        this.goBack = this.goBack.bind(this)
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
                            <Button style={Style.leftButton} onPress={this.takePicture}><Text>ÇEK</Text></Button>
                            <Button style={Style.rightButton} onPress={this.goBack}><Text>GERİ</Text></Button>
                        </Camera>
                    </View>
                </Modal>
            )
        }
        return (
            <Card >
                <CardItem>
                    <Left>
                        <Body>
                            <Text>{this.props.title}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Image source={{ uri: this.state.url }} style={Style.imagePreview} resizeMode="stretch"></Image>
                </CardItem>
                <CardItem>
                    <Body>
                        <Button style={Style.centerButton} transparent onPress={this.setValue}><Text>TEKRAR ÇEK</Text></Button>
                    </Body>
                </CardItem>
            </Card>
        )

    }

    private goBack() {
        this.setState({ isCaptured: false })
    }

    private takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => { this.setState({ url: data.path, isCapturing: true, isCaptured: true }) })
                .catch((err: any) => console.error(err))
        }

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
