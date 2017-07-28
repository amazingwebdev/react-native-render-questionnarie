import React from 'react'
import { Header, Text, View, Button, Icon, Left, Right, Body } from 'native-base'

import { Question } from '../survey/Form'
import FCamera from './camera/Camera'
import Gallery from './gallery/Gallery'
import Style from './Style'

interface PhotoState {
	isCapturing: boolean
	capturedPhotos: string[]
	isGalleryOpen: boolean
}

export interface BaseState extends PhotoState {
	display?: boolean
}

export interface DisplayInput<P> extends React.Component<P> {
	show: () => void
	hide: () => void
	isAvailable: () => void
	getWrappedComponent: () => React.Component<P>
}

export interface BaseInput<P> extends React.Component<P> {
	getTitle: () => string
	getValue: () => string | string[] | number
	setValue: (value: string | string[] | number) => void
	isValid: () => boolean
}

export default abstract class Wrapper<P extends Question, S extends BaseState> extends React.Component<P, S> implements DisplayInput<P> {

	constructor(props: P) {
		super(props)
		this.openCamera = this.openCamera.bind(this)
		this.openGallery = this.openGallery.bind(this)
		this.onCameraClose = this.onCameraClose.bind(this)
		this.onPhotoDelete = this.onPhotoDelete.bind(this)
		this.onGalleryClose = this.onGalleryClose.bind(this)

	}
	protected getInitialState(): BaseState {
		return {
			display: true,
			isCapturing: false,
			isGalleryOpen: false,
			capturedPhotos: [],
		}
	}

	abstract getWrappedComponent(): React.Component<P>

	protected renderTitle() {
		if (this.state.display) {
			return (
				<View>
					<Header style={Style.header}>
						<Body>
							<Text style={Style.title}>{this.props.title}</Text>
						</Body>
						{
							this.props.photoRequired &&
							<Button transparent style={Style.button} onPress={this.openCamera}>
								<Icon name="camera" />
							</Button>
						}
						{
							this.state.capturedPhotos.length === 1 &&
							<Button transparent style={Style.button} onPress={this.openGallery}>
								<Icon name="image" />
							</Button>
						}
						{
							this.state.capturedPhotos.length > 1 &&
							<Button transparent style={Style.button} onPress={this.openGallery}>
								<Icon name="images" />
							</Button>
						}
					</Header>
					<FCamera
						visible={this.state.isCapturing}
						onClose={this.onCameraClose} />
					<Gallery
						visible={this.state.isGalleryOpen}
						photos={this.state.capturedPhotos}
						onPhotoDelete={this.onPhotoDelete}
						onGalleryClose={this.onGalleryClose}
					/>
				</View>
			)
		}
		return <View />
	}

	public show(): void {
		this.setState({ display: true })
	}

	public hide(): void {
		this.setState({ display: false })
	}

	public isAvailable(): boolean {
		return this.state.display
	}

	private openCamera() {
		this.setState({ isCapturing: true })
	}

	private openGallery() {
		this.setState({ isGalleryOpen: true })
	}

	private onCameraClose(capturedPhotos: string[]) {
		this.setState({ capturedPhotos, isCapturing: false })
	}

	private onPhotoDelete(deletedPhoto: string) {
		const { capturedPhotos } = this.state
		capturedPhotos.splice(this.state.capturedPhotos.indexOf(deletedPhoto, 1))
		if (capturedPhotos.length === 0) {
			this.setState({ isGalleryOpen: false })
		} else {
			this.setState({ capturedPhotos })
		}
	}

	private onGalleryClose() {
		this.setState({ isGalleryOpen: false })
	}
}
