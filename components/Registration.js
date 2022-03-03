import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from "../styles/LoginStyle"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export default class RegistrationScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Register New User',
    };

    state = {
        phone: '+1 ',
        firstName: '',
        lastName: '',
        verificationCode: '',
        confirmResult: null,
        userID: ''
    }

    validPhoneNumber = () => {
        var regEx = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regEx.test(this.state.phone)
    }

    registerUser = () => {
        if (this.validPhoneNumber() && this.state.firstName != '' && this.state.lastName != '')
        {
            auth()
              .signInWithPhoneNumber(this.state.phone)
              .then(confirmResult => {
                this.setState( {confirmResult} )
            })
        }
        else 
        {
          alert("Please enter all information to register.")
          this.setState( {confirmResult: null})
          this.setState( {phone: '+1 '})
          this.setState( {firstName: ''})
          this.setState( {lastName: ''})
          this.setState( {verificationCode: ''})
        }
    }

    handleVerifyCode = () => {
        const {confirmResult, verificationCode} = this.state
        if (verificationCode.length == 6) {
          confirmResult
            .confirm(verificationCode)
            .then(user => {
              if (auth().currentUser.displayName != null)
              {
                  alert('Your user account has already been registered!')
                  this.setState( {confirmResult: null})
                  this.setState( {phone: '+1 '})
                  this.setState( {firstName: ''})
                  this.setState( {lastName: ''})
                  this.setState( {verificationCode: ''})
              }
              else 
              {
                auth().currentUser.updateProfile({
                    displayName: this.state.firstName + ' ' + this.state.lastName
                })

                firestore().doc('users/' + this.state.phone).set({
                  phone: this.state.phone,
                  first_name: this.state.firstName,
                  last_name: this.state.lastName
                })

                this.props.navigation.navigate("Login")

                this.setState( {userID: user.uid} )
                this.setState( {confirmResult: null})
                this.setState( {phone: '+1 '})
                this.setState( {firstName: ''})
                this.setState( {lastName: ''})
                this.setState( {verificationCode: ''})
               }
            })
            .catch(error => {
              alert("Please enter a 6 digit OTP code\nCheck messages for OTP code")
              this.setState( {verificationCode: ''})
            })
        } else {
          alert("Please enter a 6 digit OTP code\nCheck messages for OTP code")
          this.setState( {verificationCode: ''})
        }
      }

    renderConfirmationView = () => {
        return (
          <View >
            <TextInput
              style = {styles.textInput}
              placeholder = 'Verification Code'
              placeholderTextColor = '#000'
              textAlign ='left'
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

    render () {
        return (
            <View style={styles.container}>
                <Text style = {styles.text}>Please Enter the Information Below to Register</Text>
                <TextInput 
                    style = {styles.textInput}
                    placeholder = 'Phone Number'
                    placeholderTextColor = '#000'
                    textAlign ='left'
                    keyboardType = 'phone-pad'
                    value = {this.state.phone}
                    onChangeText = {phone => {
                        this.setState( {phone} )
                    }}
                    maxLength = {13}
                />
                <TextInput
                    style = {styles.textInput}
                    placeholder = 'First Name'
                    placeholderTextColor = '#000'
                    textAlign ='left'
                    value = {this.state.firstName}
                    keyboardType = 'default'
                    onChangeText = {firstName => {
                        this.setState( {firstName} )
                    }}
                    maxLength = {20}
                />
                <TextInput
                    style = {styles.textInput}
                    placeholder = 'Last Name'
                    placeholderTextColor = '#000'
                    textAlign ='left'
                    keyboardType = 'default'
                    value = {this.state.lastName}
                    onChangeText = {lastName => {
                        this.setState( {lastName} )
                    }}
                    maxLength = {20}
                />
                <TouchableOpacity
                    style = {[styles.themeButton, {marginTop: 20}]}
                    onPress = {this.registerUser}>
                      <Text style={styles.themeButtonTitle}>
                        Complete Registration
                      </Text>
                </TouchableOpacity>

                {this.state.confirmResult ? this.renderConfirmationView() : null}
            </View>
        )
    }
}