import { Platform, TextStyle, TextStyleIOS, TextStyleAndroid, ViewStyle } from 'react-native'

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

export default {
	content,
	button,
	header,
}
