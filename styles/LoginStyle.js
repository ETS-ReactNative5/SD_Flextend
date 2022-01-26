import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    page: {
      flex: 3,
      alignItems: 'center',
      marginTop: 2
    },
    textInput: {
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5,
      color: 'black',
      fontSize: 16,
      fontFamily: 'times new roman'
    },
    text: {
      marginTop: 20,
      fontSize: 24,
      textAlign: 'center',
      paddingLeft: 10,
      fontFamily: 'times new roman',
      fontWeight: 'bold',
      color: 'black'
    },
    format: {
      marginTop: 20,
      fontSize: 18,
      textAlign: 'center',
      paddingLeft: 10,
      fontFamily: 'times new roman',
      color: 'black'
    },
    themeButton: {
      backgroundColor: '#dda0dd',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center',
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5
    },
    themeButtonTitle: {
      fontSize: 24,
      fontFamily: 'times new roman',
      color: 'black'
    },
    verificationView: {
      width: '100%',
      alignItems: 'center',
      marginTop: 30
    },
    image: {
        width: null,
        height: 85,
        backgroundColor: 'white',
        resizeMode: 'contain',
    }
})