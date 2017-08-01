import { Platform, Dimensions, StyleSheet, ViewStyle, TextStyle, TextStyleIOS, TextStyleAndroid } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const container: ViewStyle = {
	flex: 1,
}

const preview: ViewStyle = {
	flex: 1,
	justifyContent: 'flex-end',
	alignItems: 'center',
}

const cameraButton: TextStyle = {
	alignSelf: 'center',
	position: 'absolute',
	bottom: 20,
}

const doneButton: TextStyle = {
	alignSelf: 'flex-end',
	position: 'absolute',
	bottom: 20,
	zIndex: 1,
}

const badgeStyle: ViewStyle = {
	position: 'absolute',
	right: 20,
	top: 3,
	paddingTop: 0,
	paddingBottom: 0,
	borderRadius: 100,
	height: 18,
	backgroundColor: 'green',
	zIndex: 2,
}

const icon: TextStyle = {
	color: 'white',
	fontSize: Platform.select({
		ios: 100,
		android: 50,
	}),
}

export default {
	container,
	preview,
	badgeStyle,
	cameraButton,
	doneButton,
	icon,
}
