import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //borderWidth: 5,
        //borderColor: '#FF1744',
    },
    device_content: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        alignSelf: "center",
        color: 'black',
        //flex: 1
    },
    home_image: {
        // // height: '100%',
        // // width: '100%',
        // // marginBottom: 0, 
        // // marginLeft: 0,
        flex: 1,
        width: null, 
        height: null, 
        resizeMode: 'contain',
        flexDirection: 'column-reverse'
    },
    // input: {
    //     height: 48,
    //     borderRadius: 5,
    //     overflow: 'hidden',
    //     backgroundColor: 'white',
    //     marginTop: 10,
    //     marginBottom: 10,
    //     marginLeft: 30,
    //     marginRight: 30,
    //     paddingLeft: 16
    // },
    button1: {
        backgroundColor: '#ffb6c1',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button2: {
        backgroundColor: '#ffa500',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button3: {
        backgroundColor: '#dda0dd',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'black',
        fontSize: 24,
        fontFamily: 'times new roman'
    },
    
})