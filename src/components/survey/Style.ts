import { Platform, TextStyle, TextStyleIOS, TextStyleAndroid, ViewStyle, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const HEADER = HEIGHT * 12 / 100

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

const headerPicker: ViewStyle | TextStyle = {
	...Platform.select({
		android: {
			width: 180,
			color: 'white',
		},
	}),
}

const button: ViewStyle | TextStyle = {
	...Platform.select({
		android: {
			color: 'white',
		},
	}),
}

const headerLeft: TextStyle = {
	flex: 0,
	flexDirection: 'row',
}
const headerRight: TextStyle = {
	flex: 0,
	flexDirection: 'row',
}

const indicator: ViewStyle = {
	height: HEIGHT - HEADER,

}
export default {
	content,
	button,
	header,
	indicator,
	container,
	headerLeft,
	headerPicker,
	headerRight,
}
