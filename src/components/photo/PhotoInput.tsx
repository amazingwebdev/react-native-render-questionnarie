import React, { Component } from 'react'
import { AppRegistry, Platform, Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import { Button, Header, Icon, Card, CardItem,Left, Right, Body } from 'native-base'

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
    isTakenPhoto: boolean
    url: string
    isTakePicture: boolean

}

export class PhotoInput extends BaseInput<PhotoInputQuestion, State> {

    camera: Camera

    constructor(props: PhotoInputQuestion) {
        super(props)

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.disk,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                playSoundOnCapture: true,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isTakenPhoto: false,
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
                <Text style={styles.title}>{this.props.title}</Text>
                <Button style={styles.button} onPress={this.getCamera}>
                    <Icon name="camera" />
                </Button>
            </Header>
        )
    }

    private screen() {
        if (this.state.isTakenPhoto === false) {
            return this.getTitle()
        }
        return this.onCameraPress()
    }

    private getCamera() {
        this.onCameraPress()
        this.setState({ isTakenPhoto: true })
    }

    private onCameraPress() {
        if (!this.state.isTakePicture) {
            return (
                <View style={styles.container}>
                    <Camera ref={(cam) => { this.camera = cam }} aspect={Camera.constants.Aspect.fill} style={styles.preview}>
                        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>{'Çek'} </Text>
                    </Camera>
                </View>
            )
        } else {
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
                        <Image source={{ uri: this.state.url }} style={{ width: null, height: 300, flex: 1 }}></Image>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button style={{ justifyContent:'center' }} transparent onPress={this.setValue}><Text>TEKRAR ÇEK</Text></Button>
                        </Body>
                    </CardItem>
                </Card>)
            }
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
        this.setState({ isTakenPhoto: false })
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - (Dimensions.get('window').height / 100) * 10,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 15,
    },
    header: {
        ...Platform.select({
            android: {
                backgroundColor: '#3498db',
            },
        }),
    },
    title: {
        ...Platform.select({
            android: {
                color: 'white',
                padding: 5,
                textAlign: 'left',
                textAlignVertical: 'center',

            },
        }),
    },
    button: {
        ...Platform.select({
            android: {
                flex: 0,
                color: 'white',
                textAlignVertical: 'auto',
                textAlign: 'right',
            },
        }),
    },
})
