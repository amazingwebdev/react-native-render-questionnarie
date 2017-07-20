import { Platform, Dimensions, StyleSheet } from 'react-native'

const style = StyleSheet.create(
    {
        container: {
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
        preview: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        centerButton: {
            justifyContent: 'center',
        },
        header: {
            ...Platform.select({
                android: {
                    backgroundColor: '#3498db',
                },
            }),
        },
        title: {
            ...Platform.select({
                android: {
                    color: 'white',
                    padding: 5,
                    textAlignVertical: 'center',
                },
            }),
        },
        button: {
            ...Platform.select({
                android: {
                    flex: 0,
                    color: 'white',
                    textAlignVertical: 'auto',
                    textAlign: 'right',
                },
            }),
        },
        imagePreview: {
            width: null,
            height: Dimensions.get('window').width,
            flex: 1,
        },
    },
)
export default style

export const buttonStyle = {
    rightButton: {
        alignSelf: '"flex-end"',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    leftButton: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
}
