import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, Button, Image} from 'react-native';
import styles from '../styles/HomeStyle';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'HomeScreen',
    };

    render() {
        const navigate = this.props.navigation.navigate;

        return (
            <View>
                <Text style={styles.title}> Hello User! </Text>
            {/* <Image
                style={styles.logo}
                source={require("../images/Logo.png")}
            /> */}
            <TouchableOpacity onPress={() => navigate( 'Live Measure' )} style={styles.button1}><Text style={styles.buttonTitle}>Start Tracking</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigate( 'Metrics' )} style={styles.button2}><Text style={styles.buttonTitle}>Go to Metrics</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigate( 'Progress' )} style={styles.button3}><Text style={styles.buttonTitle}>Show Progress</Text></TouchableOpacity>

            <Image
                style={styles.home_image}
                source={require("../images/home_image.jpeg")}
            />
            </View>

        );
    }
}
