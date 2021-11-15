import React, {Component} from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import styles from "../styles/LoginStyle"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
          // alert('Welcome to Flextend')
          this.props.navigation.navigate("Home")
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
      <View >
        <TextInput
          style = {styles.textInput}
          placeholder = 'Verification Code'
          placeholderTextColor = '#000'
          textAlign ='center'
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
      <View style={{flex: 1}}>
        {/* <View style={{flexGrow: 1}}>
            <Image style = {styles.image} source = {require("../images/Logo.png")}/>
        </View> */}
        <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'} style={{flex:1}} showsVerticalScrollIndicator={false}>
          <View  contentContainerStyle={styles.page}>
            <Text style = {styles.text}>Please Enter Your Phone Number to Login</Text>
            <Text style = {styles.format}>Example Format: +1 1111111111</Text>
            <TextInput 
              style = {styles.textInput}
              placeholder = 'Phone Number'
              placeholderTextColor = '#000'
              textAlign ='center'
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
        </KeyboardAwareScrollView>
        {/* <View style={{flexGrow: 1}}>
            <Image style = {styles.image} source = {require("../images/Logo.png")}/>
        </View> */}
      </View>
    )
  }
}

  
export default LoginScreen;