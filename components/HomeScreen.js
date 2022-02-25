import React from 'react';
import { TouchableOpacity, Text, View, Image, ScrollView} from 'react-native';
import { Avatar } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';

import { firebase } from '@react-native-firebase/auth'
import styles from '../styles/HomeStyle';


export default class HomeScreen extends React.Component {

    // static navigationOptions = {
    //     title: 'HomeScreen',
    // };

    render() {
        const navigate = this.props.navigation.navigate;

        const logout = () => {
            console.log(firebase.auth().currentUser);
            firebase.auth().signOut().then(() => {
                console.log(firebase.auth().currentUser);
           });
        }

        const name = firebase.auth().currentUser.displayName;
        var first_name = ''
        var last_name = ''

        var n = name.indexOf(' ')
        
        first_name = name.substring(0, n)
        last_name = name.substring((n - 1) + 2)

        return (
            <ScrollView style= {styles.container}>
                <Text style={styles.welcome_message}> Welcome to Flextend!</Text>
                <Text style={styles.italic}> Your at-home knee monitoring platform </Text>
                <Image
                    style={styles.home_image}
                    source={require("../images/home_image.jpg")}
                />
                <TouchableOpacity onPress={() => navigate( 'BLE' )} style={styles.button3}><Text style={styles.buttonTitle}>Set Up BLE Communication</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigate( 'Live Measure' )} style={styles.button1}><Text style={styles.buttonTitle}>Start Tracking</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigate( 'Previous Results' )} style={styles.button3}><Text style={styles.buttonTitle}>Previous Results</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => logout()} style={styles.button2}><Text style={styles.buttonTitle}>Sign Out</Text></TouchableOpacity>
                
                {/* Avatar to access user profile */}
                <View style= {styles.container2}>
                    <Avatar
                        size={120}
                        containerStyle={{backgroundColor: '#ffdab9'}}
                        rounded
                        title={first_name[0] + last_name[0]}
                        //on press navigate to profile screen 
                        onPress={() => navigate( 'Profile' )}
                    />
                </View>
            </ScrollView>
        );
    }
}
