import React, {useState, useEffect} from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import styles from '../styles/MetricStyle'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export default function MetricScreen() {
    
    const [flexion, setFlexion] = useState(0);
    const [extension, setExtension] = useState(0);
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

    var noData = false;

    if (flexion == 0 && extension == 0)
    {
        noData = true;
    }
    
    var flexion_data = {
        labels: ["Flexion"],
        data: [flexion / 135]
    }

    var extension_data = {
        labels: ["Extension"],
        data: [(135 - extension) / 135]
    }

    if (noData == true) {
        flexion_data = {
            labels: ["Flexion"],
            data: [0]
        }

        extension_data = {
            labels: ["Extension"],
            data: [0]
        }
    }
    
    const screenWidth = Dimensions.get("window").width;

    return (
        <View>
            <Text style={styles.title}>Hello {userID}</Text>
            <Text style={styles.info_text}>Here are your most recent results:</Text>
            <Text style={styles.result_text}>Flexion: {flexion} degrees</Text>
            <Text style={styles.chart_title}>Progress toward perfect knee flexion...</Text>
            <ProgressChart
                data={flexion_data}
                width={screenWidth}
                height={120}
                strokeWidth={16}
                chartConfig={{
                    backgroundColor: 'white',
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: 'white',
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 24,
                    borderRadius: 20,
                    borderColor: 'black'
                }}
            />
            <Text style={styles.result_text}>Extension: {extension} degrees</Text>
            <Text style={styles.chart_title}>Progress toward perfect knee extension...</Text>
            <ProgressChart
                data={extension_data}
                width={screenWidth}
                height={120}
                strokeWidth={16}
                chartConfig={{
                    backgroundGradientFrom: "white",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "white",
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 24,
                    borderRadius: 20,
                    borderColor: 'black'
                }}
            />
        </View>
    );  
}