import { Platform } from 'react-native'

export default {
	header: {
		...Platform.select({
			android: {
				height: 'auto',
				backgroundColor: '#3498db',
			},
		}),
	},
	title: {
		...Platform.select({
			android: {
				color: 'white',
				padding: 5,
			},
		}),
	},
}
