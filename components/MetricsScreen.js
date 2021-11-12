
import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, Button, Image} from 'react-native';
import styles from '../styles/HomeStyle';
import firestore from '@react-native-firebase/firestore';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'HomeScreen',
    };

    render() {
        const navigate = this.props.navigation.navigate;

        const kneeHealth = async () => {
            return (
                firestore()
                    .collection('knee health')
                    .add({
                        flexion: 42,
                        extension: 20,
                    })
            )
        }

        return (
            <View>
                <Text style={styles.title}> Metrics</Text>
                <Button
                    title = "Click to Send to Firebase"
                    onPress = {() => kneeHealth()}
                />
            </View>

        );
    }
}