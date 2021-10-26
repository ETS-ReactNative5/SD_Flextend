import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState(null);

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
        <Button title="Phone Number Sign In" />
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