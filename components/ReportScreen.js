import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/ProfileStyle';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function ReportScreen() {

    const [data, setData] = useState({})
    const [metrics, setMetrics] = useState({})
    const userID = auth().currentUser.phoneNumber;

    const getUser = async () => {
        try {
            const documentSnapshot = await firestore()
                .collection('knee health')
                .doc(userID)
                .get()

            if (documentSnapshot.data() == null)
            {
                const user_data = {"0":0}
                alert("Start Your First Measurment!\nNavigate to the Live Measurement Screen.")
            }
            else 
            {
                const user_data = documentSnapshot.data();
                setData(user_data)
            }
        }
        catch {
        }
    }

    const getUserMetrics = async () => {
        try {
            const documentSnapshot = await firestore()
                .collection('users')
                .doc(auth().currentUser.phoneNumber)
                .get()
            
            if (documentSnapshot.data() == null)
            {
                const user_metrics = {"0":0}
            }
            else 
            {
                const user_metrics = documentSnapshot.data();
                setMetrics(user_metrics)
            }
        }
        catch {

        }
    }

    useEffect(() => {
        getUser();
        getUserMetrics();
    }, [])

    const user_data = data;
    const user_keys = Object.keys(user_data).sort()

    const age = metrics["age"]
    const height = metrics["height"]
    const weight = metrics["weight"]
    
    var labels = []
    var flexion_array = []
    var extension_array = []

    var i = 0
    for (i; i < user_keys.length; i++) {
        var date = user_keys[i]
        labels.push(date.substring(0, 9))
    }

    var j = 0;
    for (j; j < user_keys.length; j++) {
        flexion_array.push(user_data[user_keys[j]][0]) 
    }

    var k = 0;
    for (k; k < user_keys.length; k++) {
        extension_array.push(user_data[user_keys[k]][1])
    }

    var l = 0;
    var largest = 0;
    for (l; l < flexion_array.length; l++)
    {
        if (flexion_array[l] > largest)
        {
            largest = flexion_array[l]
        }
    }

    var m = 0;
    var smallest = 135;
    for (m; m < extension_array.length; m++)
    {
        if (extension_array[m] < smallest)
        {
            smallest = extension_array[m]
        }
    }

    //var age_message = ""
    //if (0 < age <= 10)
    //{
    //    if (largest >= 145 && smallest <=)
    //    {
    //
    //    }
    //}

    return (
        <View>
            <Text style={styles.Title}>Here is Your Generated Report</Text>
            <Text style={styles.text}>Best Flexion Value Overall: {largest}</Text>
            <Text style={styles.text}>Best Extension Value Overall: {smallest}</Text>
            <Text style={styles.Title}>Age: {age} </Text>
            <Text style={styles.Title}>Weight: {weight}</Text>
            <Text style={styles.Title}>Height: {height}</Text>
        </View>
    )
}