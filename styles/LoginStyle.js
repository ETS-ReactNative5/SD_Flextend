import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#bbb'
    },
    page: {
      flex: 1,
      alignItems: 'center',
      marginTop: 2
    },
    textInput: {
      marginTop: 20,
      width: '90%',
      height: 40,
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5,
      paddingLeft: 10,
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
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#dda0dd',
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
        // width: 40,
        // height: 80,
        // paddingLeft: 410,
        //marginTop: 10,
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    }
})