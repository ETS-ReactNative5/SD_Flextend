import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/MetricStyle';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'HomeScreen',
    };

    render() {
        return (
            <View>
                <Text style={styles.title}>Hello ?</Text>
                <Text style={styles.text}>Your Flexion: ? degrees</Text>
                <Text style={styles.text}>Your Extension: ? degrees</Text>
            </View>
        );
    }
}