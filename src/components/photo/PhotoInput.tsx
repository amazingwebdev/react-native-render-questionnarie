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
    isCaptured: boolean
    url: string
    isCapturing: boolean

}

export class PhotoInput extends BaseInput<PhotoInputQuestion, State> {

    private camera: Camera

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
            isCaptured: false,
            isCapturing: false,
            url: '',
            display: true,
        }
        this.renderCamera = this.renderCamera.bind(this)
        this.openCamera = this.openCamera.bind(this)
        this.onpressBack = this.onpressBack.bind(this)
        this.takePicture = this.takePicture.bind(this)
        }

    public render(): JSX.Element {
        return (
            this.state.isCaptured ? this.renderCamera() : this.getTitle() 
        )
    }

     private renderCamera() {
        if (!this.state.isCapturing) {
            return (
                <View style={styles.container}>
                    <Camera ref={(cam) => { this.camera = cam }} aspect={Camera.constants.Aspect.fill} style={styles.preview}>
                        <Text style={styles.capture} onPress={this.takePicture}>{'Çek'} </Text>
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
                        <Image source={{ uri: this.state.url }} style={{ width: null, height: 400, flex: 1 }} resizeMode="stretch"></Image>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button style={{ justifyContent:'center' }} transparent onPress={this.setValue}><Text>TEKRAR ÇEK</Text></Button>
                        </Body>
                    </CardItem>
                </Card>
                )
            }
            
    }

     private takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => { this.setState({ url: data.path, isCapturing: true, isCaptured:true }) })
                .catch((err: any) => console.error(err))
        }
        
    }

    protected getTitle(): JSX.Element | undefined {
        return (this.props.title === undefined ? undefined :
            <Header style={styles.header}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Button style={styles.button} onPress={this.openCamera}>
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
