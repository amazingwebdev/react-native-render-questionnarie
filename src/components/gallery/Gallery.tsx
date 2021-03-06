import React from 'react'
import { Image, Modal, View } from 'react-native'
import { Header, Left, Right, Icon, Button } from 'native-base'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'

import Style from './Style'

interface GalleryProps {
	visible: boolean
	photos: string[]
	onPhotoDelete: (photo: string) => void
	onGalleryClose: () => void
}

interface GalleryState {
	shownPhoto: string
}

interface CurrentPhoto {
	index: number
}

export default class Gallery extends React.Component<GalleryProps, GalleryState> {

	constructor(props: GalleryProps) {
		super(props)
		this.state = {
			shownPhoto: undefined,
		}
		this.removeShownPhoto = this.removeShownPhoto.bind(this)
	}

	render() {
		return (
			<Modal
				animationType={'slide'}
				transparent={false}
				onRequestClose={this.props.onGalleryClose}
				visible={this.props.visible} >
				<View style={Style.galleryContainer}>
					{this.renderTitle()}
					<IndicatorViewPager
						style={Style.imagePreview}
						indicator={this.renderDotIndicator()}
						onPageSelected={(photo: CurrentPhoto) => this.onPhotoChanged(photo)} >
						{this.props.photos.map(this.renderPhotos)}
					</IndicatorViewPager>
				</View>
			</Modal>
		)
	}

	private renderTitle(): JSX.Element {
		return (
			<Header style={Style.header}>
				<Left>
					<Button
						transparent
						onPress={this.props.onGalleryClose} >
						<Icon active style={Style.icon} name="arrow-back" />
					</Button>
				</Left>
				<Right>
					<Button
						transparent
						onPress={this.removeShownPhoto} >
						<Icon active style={Style.icon} name="trash" />
					</Button>
				</Right>
			</Header>
		)
	}

	private renderPhotos(photo: string): JSX.Element {
		return (
			<View key={photo} >
				<Image
					style={Style.imagePreview}
					source={{ uri: photo }}
					resizeMode="stretch">
				</Image>
			</View>
		)
	}

	private renderDotIndicator() {
		return <PagerDotIndicator pageCount={this.props.photos.length} />
	}

	private removeShownPhoto() {
		this.props.onPhotoDelete(this.state.shownPhoto)
	}

	private onPhotoChanged(currentPhoto: CurrentPhoto) {
		this.setState({ shownPhoto: this.props.photos[currentPhoto.index] })
	}

}
