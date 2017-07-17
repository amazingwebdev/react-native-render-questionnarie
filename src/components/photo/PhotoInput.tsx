import React, { Component } from 'react'
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native'
import { Button } from 'native-base'

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
        }
        this.openCamera = this.openCamera.bind(this)
    }

    public render(): JSX.Element {
        return (
            this.openCamera()
        )
    }

    private takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => { this.setState({ url: data.path, isTakePicture: true }) })
                .catch((err: any) => console.error(err))
        }
    }

    private openCamera() {
        if (!this.state.isTakePicture) {
            return (
                <View style={styles.container}>
                    <Camera ref={(cam) => { this.camera = cam }} aspect={Camera.constants.Aspect.fill} style={styles.preview}>
                        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>{this.props.title} </Text>
                    </Camera>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 300, height: 300 }}
                    source={{ uri: this.state.url }}
                />
                <Button onPress={this.setValue}><Text>Geri</Text></Button>
            </View>)
    }

    public setValue() {
        this.setState({ isTakePicture: false })
    }

    public getValue() {
        return this.state.camera
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',

    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40,
    },
})
