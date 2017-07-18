import React, { Component } from 'react'
import { AppRegistry, Platform, Dimensions, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native'
import { Button, Header, Icon, Card, CardItem, Thumbnail, Left, Right, Body, Container, Content } from 'native-base'

import Camera from 'react-native-camera'

import { PhotoInputQuestion } from '../../survey'
import { BaseInput, BaseState } from '../'

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
    isRecording: boolean
    url: string
    isTakePicture: boolean

}

const { height, width } = Dimensions.get('window')

export class PhotoInput extends BaseInput<PhotoInputQuestion, State> {

    camera: Camera

    constructor(props: PhotoInputQuestion) {
        super(props)
        this.camera = null

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.disk,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                playSoundOnCapture: true,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isRecording: false,
            isTakePicture: false,
            url: '',
            display: true,
        }
        this.onCameraPress = this.onCameraPress.bind(this)
        this.screen = this.screen.bind(this)
        this.getCamera = this.getCamera.bind(this)
        this.onpressBack = this.onpressBack.bind(this)
    }

    public render(): JSX.Element {
        return (
            this.screen()
        )
    }

    protected getTitle(): JSX.Element | undefined {
        return (this.props.title === undefined ? undefined :
            <Header style={styles.header}>
                <Text style={styles.left}>{this.props.title}</Text>
                <Button onPress={this.getCamera}>
                    <Icon name="camera" />
                </Button>
            </Header>
        )
    }

    private screen() {
        if (this.state.isRecording === false) {
            return this.getTitle()
        } else {
            return this.onCameraPress()
        }
    }

    private getCamera() {
        this.onCameraPress()
        this.setState({ isRecording: true })
    }

    private onCameraPress() {
        if (!this.state.isTakePicture) {
            return (
                <View style={styles.container}>
                    <Camera ref={(cam) => { this.camera = cam }} aspect={Camera.constants.Aspect.fill} style={styles.preview}>
                        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>{this.props.title} </Text>
                    </Camera>
                    <Button onPress={this.onpressBack}><Text>Back</Text></Button></View>
            )
        }
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text>{this.props.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Image source={{ uri: this.state.url }} style={{ width: null, height: 300, flex: 1 }}></Image>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent><Text>OK</Text></Button>
                            </Left>
                            <Right>
                                <Button transparent><Text>CANCEL</Text></Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

    private takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => { this.setState({ url: data.path, isTakePicture: true }) })
                .catch((err: any) => console.error(err))
        }
    }

    public setValue() {
        this.setState({ isTakePicture: false })
    }

    public getValue() {
        return this.state.camera
    }
    public onpressBack() {
        this.setState({ isRecording: false })
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        height: this.height,
        width: this.width,
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture: {
        flexDirection: 'row',
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40,
    },
    left: {
        color: 'white',
        padding: 5,
        justifyContent: 'center',

    },
    header: {
        ...Platform.select({
            android: {
                height: 'auto',
                backgroundColor: '#3498db',
            },
        }),
    },
    title: {
        ...Platform.select({
            android: {
                color: 'white',
                padding: 5,
            },
        }),
    },
})
