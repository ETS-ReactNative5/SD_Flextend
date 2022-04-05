import React from 'react';
import {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, Image, ScrollView, ActivityIndicator} from 'react-native';
import { Avatar } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';

import { firebase } from '@react-native-firebase/auth'
import styles from '../styles/HomeStyle';
import auth from '@react-native-firebase/auth'
import CheckboxList from 'rn-checkbox-list';

import firestore from '@react-native-firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';

export default function Home({navigation}) {

    const logout = () => {
        console.log(firebase.auth().currentUser);
        firebase.auth().signOut().then(() => {
            console.log(firebase.auth().currentUser);
        });
    }

    if(auth().currentUser != null){
        const name = firebase.auth().currentUser.displayName;
        var first_name = ''
        var last_name = ''

        if (name != null)
        {
            var n = name.indexOf(' ')
        
            first_name = name.substring(0, n)
            last_name = name.substring((n - 1) + 2)
        }
    }

    const [goalsData, setGoalsData] = useState();
    const userID = auth().currentUser.phoneNumber;

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const pull_data = async () => {
                try {
                    const documentSnapshot = await firestore()
                        .collection('users')
                        .doc(userID)
                        .get();

                    if (documentSnapshot.data() == null )
                    {
                        console.log("Data is null")
                    }
                    else{
                        console.log(documentSnapshot.data()["goals"])
                        data = []
                        for(let i = 0; i < documentSnapshot.data()["goals"].length; i++){
                            data.push({id: i+1, name: documentSnapshot.data()["goals"][i]})
                        }
                        setGoalsData(data)
                    }
                }
                catch {
                }
            }

            pull_data()

            return () => {
                isActive = false;
                };
        }, [])
    );

    return (
        <ScrollView style= {styles.container}>
            <Text style={styles.welcome_message}> Welcome to Flextend!</Text>
            <Text style={styles.italic}> Your at-home knee monitoring platform </Text>
            <Image
                style={styles.home_image}
                source={require("../images/home_image.jpg")}
            />
            {/* <TouchableOpacity onPress={() => navigate( 'BLE' )} style={styles.button3}><Text style={styles.buttonTitle}>Set Up BLE Communication</Text></TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate( 'Live Measure' )} style={styles.button1}><Text style={styles.buttonTitle}>Start Tracking</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate( 'Previous Results' )} style={styles.button3}><Text style={styles.buttonTitle}>Previous Results</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => logout()} style={styles.button2}><Text style={styles.buttonTitle}>Sign Out</Text></TouchableOpacity>

            {/* Avatar to access user profile */}
            <View style= {styles.container2}>
                <Avatar
                    size={120}
                    containerStyle={{backgroundColor: '#ffdab9'}}
                    rounded
                    title={first_name[0] + last_name[0]}
                    //on press navigate to profile screen 
                    onPress={() => navigation.navigate( 'Profile' )}
                />
            </View>
            
            <Text style={styles.welcome_message}>Goals</Text>
            {/* Goals Checklist */}
            <CheckboxList
                theme="green"
                listItems={goalsData}
                listItemStyle={{  
                    borderBottomWidth: 0, 
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 10
                    }}
                style={styles.dayCheckBox}
            />
        </ScrollView> 
     );
}
