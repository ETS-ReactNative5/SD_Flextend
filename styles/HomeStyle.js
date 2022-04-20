import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundImage: '../images/home-background.png' 
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
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
        marginTop: 80,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-medium',
        alignSelf: "center",
        color: '#191970',
    },
    italic: {
        fontSize: 15,
        marginTop: 20,
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
        backgroundColor: '#87ceeb',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 350,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    button2: {
        backgroundColor: '#87ceeb',
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
        backgroundColor: '#87ceeb',
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
        marginTop: 0,
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
    goals: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(255, 155, 0, 0.6)',
        marginTop: 20,
        borderRadius: 30,
        marginRight: 40,
        marginLeft: 40,
        // shadowOffset: { width: 50, height: 0}
        // paddingRight: SIZES.padding,
        // paddingBottom: SIZES.radius,
    }
})