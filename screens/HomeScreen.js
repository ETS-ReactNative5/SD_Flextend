import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ route: {params: {phoneNumber}}, navigation }) => {
    const [confirm, setConfirm] = useState(null);

    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    if (!confirm) {
        signInWithPhoneNumber(phoneNumber);
    } 
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Home Screen</Text>
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

export default HomeScreen;