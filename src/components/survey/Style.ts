import { Platform, TextStyle, TextStyleIOS, TextStyleAndroid, ViewStyle, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const content: ViewStyle = {
	top: 1,
	flex: 1,

	height: 'auto',

}

const container: ViewStyle = {
	flex: 1,
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

const button: TextStyle | TextStyleIOS | TextStyleAndroid = {
	...Platform.select({
		android: {
			flex: 0,
			color: 'white',
			textAlignVertical: 'auto',
			textAlign: 'right',
		},
	}),
}

const indicator: ViewStyle = {
	height: HEIGHT - 70,

}
export default {
	content,
	button,
	header,
	indicator,
	container,
}
