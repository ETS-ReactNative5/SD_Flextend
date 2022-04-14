import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87cefa' 
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#87cefa',
        paddingTop: Platform.OS === 'ios' ? 30 : 40,
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
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        alignSelf: "center",
        color: '#1e90ff',
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
        backgroundColor: '#1e90ff',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button2: {
        backgroundColor: '#1e90ff',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 15,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button3: {
        backgroundColor: '#1e90ff',
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
        fontFamily: Platform.OS == 'ios' ? 'Arial' : 'sans-serif'
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
    },
    welcome_message2: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        alignSelf: "center",
        color: '#c71585',
        marginBottom: 40,
    },
    button2Reminder: {
        backgroundColor: '#ffa500',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 40,
        marginBottom: 5,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
})