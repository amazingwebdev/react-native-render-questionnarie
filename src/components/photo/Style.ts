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
        capture: {
            flex: 0,
            flexDirection: 'column',
            backgroundColor: '#fff',
            borderRadius: 5,
            color: '#000',
            padding: 10,
            margin: 100,
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
