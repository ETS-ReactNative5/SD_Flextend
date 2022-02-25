import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // backgroundColor: '#fff0f5'
        backgroundColor: '#fffafa'
        
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffafa',
        paddingTop: 30,
        paddingBottom: 20
    },
    device_content: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    welcome_message: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
        alignSelf: "center",
        color: '#c71585',
    },
    italic: {
        fontSize: 15,
        marginTop: 10,
        fontStyle: 'italic',
        alignSelf: "center",
        color: 'black',
    },
    home_image: {
        height: 180,
        width: 350,
        alignSelf: "center",
        margin: 30,
    },
    button1: {
        backgroundColor: '#fa8072',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button2: {
        backgroundColor: '#ffa500',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button3: {
        backgroundColor: '#ff0f90',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'black',
        fontSize: 24,
        fontFamily: 'arial'
    },
    textContent: {
        color: 'black',
        fontSize: 24,
        fontFamily: 'arial',
        marginTop: 20,
        alignSelf: "center",
    },
    dayCheckBox: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderColor: 'transparent',
        justifyContent: 'flex-start'
    }
})