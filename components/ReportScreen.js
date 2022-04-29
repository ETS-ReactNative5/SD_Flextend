import React, {useEffect, useState} from 'react';
import { Text, View, ImageBackground } from 'react-native';
import styles from '../styles/ProfileStyle';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function ReportScreen() {

    //Variables data, metrics, and userID
    const [data, setData] = useState({})
    const [metrics, setMetrics] = useState({})
    const userID = auth().currentUser.phoneNumber;

    //Get the user knee health data from Firestore
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

    //Get the user information from Firestore
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

    //Store the knee health data in user_data
    const user_data = data;
    const user_keys = Object.keys(user_data).sort()

    //Get the age from the user information 
    const age = metrics["age"]
    
    //Initialize array for x-axis labels, flexion, and extension
    var labels = []
    var flexion_array = []
    var extension_array = []

    //Add timestamps to the labels array
    var i = 0
    for (i; i < user_keys.length; i++) {
        var date = user_keys[i]
        labels.push(date.substring(4, 10))
    }

    //Add flexion data to the flexion array
    var j = 0;
    for (j; j < user_keys.length; j++) {
        flexion_array.push(user_data[user_keys[j]]["flexion"]) 
    }

    //Add extension data to the extension array
    var k = 0;
    for (k; k < user_keys.length; k++) {
        extension_array.push(user_data[user_keys[k]]["extension"])
    }

    //Find the best flexion value
    var l = 0;
    var smallest = 180;
    for (l; l < flexion_array.length; l++)
    {
        if (flexion_array[l] < smallest)
        {
            smallest = flexion_array[l]
        }
    }

    //Find the best extension value
    var m = 0;
    var largest = 0;
    for (m; m < extension_array.length; m++)
    {
        if (extension_array[m] > largest)
        {
            largest = extension_array[m]
        }
    }

    //Display messages based on the flexion/extension value
    var flexion_age_message = ""
    var extension_age_message = ""
    if (age <= 8)
    {
        if (largest >= 125)
        {
            flexion_age_message = "Great job! Your knee flexion is within the national average for other users your age!"
        }
        else 
        {
            flexion_age_message = "Your knee flexion is below the national average for other users your age. Keep trying! You got it!"
        }

        if (smallest <= 2)
        {
            extension_age_message = "Great job! Your knee extension is within the national average for other users your age!"
        }
        else 
        {
            extension_age_message = "Your knee extension is below the national average for other users your age. Keep trying! You got it!"
        }
    }
    else if (age >= 9 && age <= 19)
    {
        if (largest >= 120)
        {
            flexion_age_message = "Great job! Your knee flexion is within the national average for other users your age!"
        }
        else 
        {
            flexion_age_message = "Your knee flexion is below the national average for other users your age. Keep trying! You got it!"
        }

        if (smallest <= 7)
        {
            extension_age_message = "Great job! Your knee extension is within the national average for other users your age!"
        }
        else 
        {
            extension_age_message = "Your knee extension is below the national average for other users your age. Keep trying! You got it!"
        }
    }
    else if (age >= 20 && age <= 44)
    {
        if (largest >= 114)
        {
            flexion_age_message = "Great job! Your knee flexion is within the national average for other users your age!"
        }
        else 
        {
            flexion_age_message = "Your knee flexion is below the national average for other users your age. Keep trying! You got it!"
        }

        if (smallest <= 15)
        {
            extension_age_message = "Great job! Your knee extension is within the national average for other users your age!"
        }
        else 
        {
            extension_age_message = "Your knee extension is below the national average for other users your age. Keep trying! You got it!"
        }
    }
    else if (age >= 45)
    {
       console.log(largest)
       if (largest >= 105)
       {
            flexion_age_message = "Great job! Your knee flexion is within the national average for other users your age!"
       }
       else 
       {
            flexion_age_message = "Your knee flexion is below the national average for other users your age. Keep trying! You got it!"
       }

       console.log(smallest)
       if (smallest <= 24)
       {
            extension_age_message = "Great job! Your knee extension is within the national average for other users your age!"
       }
       else
       {
            extension_age_message = "Your knee extension is below the national average for other users your age. Keep trying! You got it!"
       }
    }

    //Return function displays the screen
    return (
        <View>
        <ImageBackground  style={{width: '100%', height: '100%', resizeMode:'contain'}} source={require("../images/report-background.png")} >  
            <Text style={styles.Title}>Here is Your Generated Report</Text>
            <View style={styles.container2}>
                <Text style={styles.text}>Best Flexion Value Overall: {smallest}</Text>
                <Text style={styles.text}>Best Extension Value Overall: {largest}</Text>
                <Text style={styles.section_text}>Flexion</Text>
                <Text style={styles.info_text}>{flexion_age_message}</Text>
                <Text style={styles.section_text}>Extension</Text>
                <Text style={styles.info_text}>{extension_age_message}</Text>
            </View>
        </ImageBackground>
        </View>
    )
}