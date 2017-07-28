import React, { Component } from 'react'
import { AppRegistry, Platform, Dimensions, StyleSheet, Text, View, Image, Modal } from 'react-native'
import { Button, Header, Icon, Card, CardItem, Left, Right, Body, DeckSwiper, Badge } from 'native-base'
import Camera from 'react-native-camera'

import Style from './Style'

interface CameraProps {
	visible: boolean
	onClose: (capturedPhotos: string[]) => void
	captureQuality?: 'low' | 'medium' | 'high'
}

interface CameraState {
	capturedPhotos: string[]
}

export default class FCamera extends React.Component<CameraProps, CameraState> {

	private camera: Camera

	constructor(props: CameraProps) {
		super(props)
		this.state = {
			capturedPhotos: [],
		}
		this.takePhoto = this.takePhoto.bind(this)
		this.closeCamera = this.closeCamera.bind(this)
	}

	render(): JSX.Element {
		return (
			<Modal
				animationType={'slide'}
				transparent={false}
				onRequestClose={this.closeCamera}
				visible={this.props.visible} >
				<View style={Style.container}>
					<Camera
						ref={(cam) => { this.camera = cam }}
						style={Style.preview}
						aspect={Camera.constants.Aspect.fill}
						captureQuality={this.props.captureQuality} >
						<Button
							transparent
							style={Style.cameraButton}
							onPress={this.takePhoto} >
							<Icon active style={Style.icon} name="camera" />
						</Button>
						<Button
							transparent
							style={Style.doneButton}
							onPress={this.closeCamera}>
							<Badge style={Style.badgeStyle}>
								<Text>{this.state.capturedPhotos.length}</Text>
							</Badge>
							<Icon active style={Style.icon} name="done-all" />
						</Button>
					</Camera>
				</View>
			</Modal>
		)
	}

	private closeCamera() {
		this.props.onClose(this.state.capturedPhotos)
	}

	private takePhoto() {
		if (this.camera) {
			this.camera.capture().
				then((data) => {
					const { capturedPhotos } = this.state
					capturedPhotos.push(data.path)
					this.setState({ capturedPhotos })
				})
		}
	}
}
