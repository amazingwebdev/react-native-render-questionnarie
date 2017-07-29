import React from 'react'
import { Image, Modal } from 'react-native'
import { Button, View, Text, Icon, Badge } from 'native-base'
import RNCamera from 'react-native-camera'

import Style from './Style'

interface CameraProps {
	visible: boolean
	captureQuality?: 'low' | 'medium' | 'high'
	onClose: (capturedPhotos: string[]) => void
}

interface CameraState {
	capturedPhotos: string[]
}

export default class Camera extends React.Component<CameraProps, CameraState> {

	public static defaultProps = {
		captureQuality: '720p',
	}

	private camera: RNCamera

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
					<RNCamera
						ref={(cam) => { this.camera = cam }}
						style={Style.preview}
						aspect={RNCamera.constants.Aspect.fill}
						captureQuality={this.props.captureQuality}
						captureTarget={RNCamera.constants.CaptureTarget.disk}>
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
					</RNCamera>
				</View>
			</Modal>
		)
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

	private closeCamera() {
		this.props.onClose(this.state.capturedPhotos)
	}

}
