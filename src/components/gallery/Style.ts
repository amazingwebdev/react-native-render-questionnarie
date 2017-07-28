import { Platform, Dimensions, StyleSheet, ViewStyle, TextStyle, TextStyleIOS, TextStyleAndroid } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const galleryContainer: ViewStyle = {
	flex: 1,
	width: WIDTH,
	height: HEIGHT,
}

const header: ViewStyle = {
	...Platform.select({
		android: {
			height: 'auto',
			backgroundColor: '#3498db',
		},
	}),
}

const imagePreview: ViewStyle = {
	flex: 1,
	width: WIDTH,
	height: HEIGHT,
}

const icon: TextStyle = {
	color: 'white',
	fontSize: 35,
}

export default {
	galleryContainer,
	header,
	imagePreview,
	icon,
}
