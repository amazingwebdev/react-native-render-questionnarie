import React from 'react'
import { Header, Text, View, Button, Icon, Body } from 'native-base'

import { Question, Camera, Gallery } from '../'

import Style from './WrapperStyle'

interface PhotoState {
	capturing: boolean
	capturedPhotos: string[]
	showGallery: boolean
}

export interface BaseState extends PhotoState {
	display?: boolean
}

export interface DisplayInput<P> extends React.Component<P> {
	show: () => void
	hide: () => void
	isAvailable: () => void
	getWrappedComponent: () => React.Component<P>
	getPhotosURLs: () => string[]
	setPhotosURLs: (urls: string[]) => void
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

	abstract getWrappedComponent(): React.Component<P>

	protected getInitialState(): BaseState {
		return {
			display: true,
			capturing: false,
			showGallery: false,
			capturedPhotos: [],
		}
	}

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
					<Camera
						visible={this.state.capturing}
						onClose={this.onCameraClose}
					/>
					<Gallery
						visible={this.state.showGallery}
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

	public getPhotosURLs(): string[] {
		return this.state.capturedPhotos
	}

	public setPhotosURLs(urls: string[]): void {
		this.setState({ capturedPhotos: urls })
	}

	private openCamera() {
		this.setState({ capturing: true })
	}

	private openGallery() {
		this.setState({ showGallery: true })
	}

	private onCameraClose(capturedPhotos: string[]) {
		this.setState({ capturedPhotos, capturing: false })
	}

	private onGalleryClose() {
		this.setState({ showGallery: false })
	}

	private onPhotoDelete(deletedPhoto: string) {
		const { capturedPhotos } = this.state
		capturedPhotos.splice(this.state.capturedPhotos.indexOf(deletedPhoto, 1))
		if (capturedPhotos.length === 0) {
			this.setState({ showGallery: false })
		} else {
			this.setState({ capturedPhotos })
		}
	}

}
