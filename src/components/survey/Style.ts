import { Platform, TextStyle, TextStyleIOS, TextStyleAndroid, ViewStyle, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const content: ViewStyle = {
	top: 1,
	flex: 1,

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
			color: 'white',
		},
	}),
}

const headerLeft: TextStyle = {
	flex: 1,
	flexDirection: 'row',
}

const indicator: ViewStyle = {
	height: HEIGHT - (HEIGHT * 12 / 100),

}
export default {
	content,
	button,
	header,
	indicator,
	container,
	headerLeft,
}
