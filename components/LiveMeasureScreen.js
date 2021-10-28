import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, Button, Image} from 'react-native';
import styles from '../styles/HomeStyle';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Measure Now',
    };

    render() {
        const navigate = this.props.navigation.navigate;

        return (
            <View>
                <Text style={styles.title}> Start Measuring</Text>
            {/* <Image
                style={styles.logo}
                source={require("../assets/food_logo.png")}
            /> */}
            {/* <TouchableOpacity onPress={() => navigate( 'Start Measuring' )} style={styles.button}><Text style={styles.buttonTitle}>Measure Now</Text></TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => navigate( 'Create user')} style={styles.button}><Text style={styles.buttonTitle}>Sign Up</Text></TouchableOpacity> */}
            </View>

        );
    }
}
