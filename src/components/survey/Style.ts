import { Platform } from 'react-native'

export default {
    content: {
        top: 1,
    },
	header: {
		...Platform.select({
			android: {
				height: 'auto',
				backgroundColor: '#3498db',
			},
		}),
	},
}
