import React, {Component} from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { firebase } from '@react-native-firebase/auth';

class LoginScreen extends Component {
  state = {
    phone: '',
    confirmResult: null,
    verificationCode: '',
    userID: ''
  }

  validPhoneNumber = () => {
    var regEx = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regEx.test(this.state.phone)
  }

  handleCode = () => {
    if (this.validPhoneNumber()) {
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => {
          this.setState( {confirmResult} )
        })
        .catch(error => {
          alert(error.message)

          console.log(error)
        })
    } else {
      alert("Invalid Phone Number\nPlease use format: +1 xxxxxxxxxx")
    }
  }

  changePhoneNumber = () => {
    this.setState( {confirmResult: null, verificationCode: ''} )
  }

  handleVerifyCode = () => {
    const {confirmResult, verificationCode} = this.state
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState( {userID: user.uid} )
          alert('Welcome to Flextend')
        })
        .catch(error => {
          alert(error.message)

          console.log(error)
        })
    } else {
      alert("Please enter a 6 digit OTP code\nCheck messages for OTP code")
    }
  }

  renderConfirmationView = () => {
    return (
      <View style = {styles.verificationView}>
        <TextInput
          style = {styles.textInput}
          placeholder = 'Verification Code'
          placeholderTextColor = '#000'
          value = {this.state.verificationCode}
          keyboardType = 'numeric'
          onChangeText = {verificationCode => {
            this.setState( {verificationCode} )
          }}
          maxLength = {6}
        />
        <TouchableOpacity
          style={[styles.themeButton, {marginTop: 20}]}
          onPress={this.handleVerifyCode}>
          <Text style = {styles.themeButtonTitle}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
        <Text style = {styles.title}>Welcome to Flextend</Text>
        <Text style = {styles.text}>Please Enter Your Phone Number to Login</Text>
        <Text style = {styles.format}>Format: +1 xxxxxxxxxx</Text>
        <View style={styles.page}>
          <TextInput 
            style = {styles.textInput}
            placeholder = 'Phone Number'
            placeholderTextColor = '#000'
            keyboardType = 'phone-pad'
            value = {this.state.phone}
            onChangeText = {phone => {
              this.setState( {phone} )
            }}
            maxLength = {15}
            editable = {this.state.confirmResult ? false : true}
          />
          <TouchableOpacity
            style = {[styles.themeButton, {marginTop: 20}]}
            onPress = {
              this.state.confirmResult
                ? this.changePhoneNumber
                : this.handleCode
            }>
              <Text style={styles.themeButtonTitle}>
                {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
              </Text>
          </TouchableOpacity>

          {this.state.confirmResult ? this.renderConfirmationView() : null}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
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
    color: '#000',
    fontSize: 16
  },
  title: {
    marginTop: 30,
    paddingLeft: 10,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center',
    paddingLeft: 10
  },
  format: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 10
  },
  themeButton: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888',
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5
  },
  themeButtonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  verificationView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30
  }
})
  
export default LoginScreen;