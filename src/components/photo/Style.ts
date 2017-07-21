import { Platform, Dimensions, StyleSheet, ViewStyle, TextStyle, TextStyleIOS, TextStyleAndroid } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const container: ViewStyle = {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
}

const preview: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
}

const centerButton: ViewStyle = {
    justifyContent: 'center',
}

const header: ViewStyle = {
    ...Platform.select({
        android: {
            backgroundColor: '#3498db',
        },
    }),
}

const title: TextStyle | TextStyleIOS | TextStyleAndroid = {
    ...Platform.select({
        android: {
            color: 'white',
            padding: 5,
            textAlignVertical: 'center',
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
const imagePreview: ViewStyle = {
    width: null,
    height: WIDTH,
    flex: 1,
}

const badgeStyle: ViewStyle = {
    position: 'absolute',
    right: 12,
    top: 3,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 100,
    height: 18,
    backgroundColor: 'green',
}

export default {
    container,
    preview,
    header,
    title,
    button,
    centerButton,
    imagePreview,
    badgeStyle,
}
