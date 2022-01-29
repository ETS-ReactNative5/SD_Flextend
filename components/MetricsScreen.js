import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/MetricStyle';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export default function MetricScreen() {
    
    const [flexion, setFlexion] = useState();
    const [extension, setExtension] = useState();
    const userID = auth().currentUser.phoneNumber;

    const getUser = async () => {
        try {
            const documentSnapshot = await firestore()
                .collection('knee health')
                .doc(userID)
                .get();
            
            const user_data = documentSnapshot.data();
            setFlexion(user_data["flexion"]);
            setExtension(user_data["extension"]);
        } catch {
            console.log("Error")
        }
    };

    useEffect(() => {
        getUser();
    }, [])


    return (
        <View>
            <Text style={styles.title}>Hello {userID}</Text>
            <Text style={styles.info_text}>Here are your most recent results:</Text>
            <Text style={styles.result_text}>Flexion: {flexion} degrees</Text>
            <Text style={styles.result_text}>Extension: {extension} degrees</Text>
        </View>
    )
}