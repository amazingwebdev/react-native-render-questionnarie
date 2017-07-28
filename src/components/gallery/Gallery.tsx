import React from 'react'
import { AppRegistry, Platform, Dimensions, StyleSheet, Text, View, Image, Modal } from 'react-native'

import { Button, Header, Icon, Card, CardItem, Left, Right, Body, DeckSwiper, Badge } from 'native-base'

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
		const images = []
		for (const imagePath of this.props.photos) {
			images.push(<View key={imagePath} >
				<Image
					style={Style.imagePreview}
					source={{ uri: imagePath }}
					resizeMode="stretch">
				</Image>
			</View>)
		}
		return (
			<Modal
				animationType={'slide'}
				transparent={false}
				onRequestClose={this.props.onGalleryClose}
				visible={this.props.visible} >
				<View style={Style.galleryContainer}>
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
					<IndicatorViewPager
						style={Style.imagePreview}
						indicator={this.renderDotIndicator()}
						onPageSelected={(photo: CurrentPhoto) => this.onPhotoChanged(photo)} >
						{images}
					</IndicatorViewPager>
				</View>
			</Modal>
		)
	}

	public renderDotIndicator() {
		return <PagerDotIndicator pageCount={this.props.photos.length} />
	}

	private removeShownPhoto() {
		this.props.onPhotoDelete(this.state.shownPhoto)
	}

	private onPhotoChanged(currentPhoto: CurrentPhoto) {
		this.setState({ shownPhoto: this.props.photos[currentPhoto.index] })
	}

}
