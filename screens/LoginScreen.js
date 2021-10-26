import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>
                Keep your knee strong with Flextend!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 40,
        textAlign: 'center'
    },
})

export default LoginScreen;