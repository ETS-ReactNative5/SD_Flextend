import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('+1 ');

  const GetOTP = () => {
    const regEx = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    if (regEx.test(phoneNumber) === true)
    {
      navigation.navigate("Home Screen", {phoneNumber});
    }
    else 
      alert("Please enter a 10 digit phone number");
  }
    
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to Flextend</Text>
      <Text style={styles.text}>Enter Phone Number</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button 
        title="Phone Number Sign In" 
        onPress={() => GetOTP()}
      />
    </View>
  );
}
  
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 25,
  },
  title: {
    fontSize: 36,
    marginBottom: 30
  },
});

export default LoginScreen;