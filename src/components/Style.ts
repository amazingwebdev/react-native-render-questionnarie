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
const imagePreview: ViewStyle = {
    width: null,
    height: WIDTH,
    flex: 1,
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

const iconSize: TextStyle = {
    fontSize: 50,
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
    cameraButton,
    doneButton,
    iconSize,
}
