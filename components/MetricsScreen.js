import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/MetricStyle';

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'HomeScreen',
    };

    render() {

        firestore().collection('knee health').get().then((querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.id == auth().currentUser.phoneNumber) {
                    console.log(documentSnapshot.data())
                }
            })
        }))

        return (
            <View>
                <Text style={styles.title}>Hello ?</Text>
                <Text style={styles.text}>Your Flexion: ? degrees</Text>
                <Text style={styles.text}>Your Extension: ? degrees</Text>
            </View>
        );
    }
}