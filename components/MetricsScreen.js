import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/MetricStyle';
import auth from '@react-native-firebase/auth'
import data from '../components/GetData'

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'HomeScreen',
    };

    render() {
        const navigate = this.props.navigation.navigate;
        const userID = auth().currentUser.phoneNumber;

        const kneeData = data["_W"];
        const flexion = kneeData["flexion"];
        const extension = kneeData["extension"];

        return (
            <View>
                <Text style={styles.title}>Hello {userID}</Text>
                <Text style={styles.text}>Your Flexion: {flexion} degrees</Text>
                <Text style={styles.text}>Your Extension: {extension} degrees</Text>
            </View>
        );
    }
}