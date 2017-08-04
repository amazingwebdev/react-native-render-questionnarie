import { Platform, TextStyle, TextStyleIOS, TextStyleAndroid, ViewStyle, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const content: ViewStyle = {
	top: 1,

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
	flex: 1,
	backgroundColor: 'white',
	width: WIDTH,
	height: HEIGHT,

}
export default {
	content,
	button,
	header,
	indicator,
}
