import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/MetricStyle';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Progress() {
    
    const [data, setData] = useState([])
    const userID = auth().currentUser.phoneNumber;

    const getUser = async () => {
        try {
            const documentSnapshot = await firestore()
                .collection('knee health')
                .doc(userID)
                .get()

            const user_data = documentSnapshot.data();
            setData(user_data)
        }
        catch {
            console.log("Error")
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    console.log(data)

    const name = auth().currentUser.displayName;
    var first_name = ''
    var last_name = ''

    var n = name.indexOf(' ')
        
    first_name = name.substring(0, n)
    last_name = name.substring((n - 1) + 2)

    return (
        <View>
            <Text style={styles.title}>Hello {first_name} {last_name}</Text>
            <Text style={styles.info_text}>Here is your overall progress:</Text>
            <Text>Data: </Text>
        </View>
    )
}