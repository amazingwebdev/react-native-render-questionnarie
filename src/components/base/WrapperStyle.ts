import { Platform, Dimensions, StyleSheet, ViewStyle, TextStyle, TextStyleIOS, TextStyleAndroid } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const container: ViewStyle = {
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

const title: TextStyle | TextStyleIOS | TextStyleAndroid = {
    ...Platform.select({
        android: {
            color: 'white',
            padding: 1,
            textAlignVertical: 'center',
            textAlign: 'justify',
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
    container,
    header,
    title,
    button,
}
