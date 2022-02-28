import React, {useState, useEffect} from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import styles from '../styles/MetricStyle';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Progress() {
    
    const [data, setData] = useState({})
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

    const user_data = data;
    const user_keys = Object.keys(user_data).sort()
    
    var flexion_array = []
    var extension_array = []

    var i = 0;
    for (i; i < user_keys.length; i++) {
        flexion_array.push(user_data[user_keys[i]][0]) 
    }

    var j = 0;
    for (j; j < user_keys.length; j++) {
        extension_array.push(user_data[user_keys[j]][1])
    }

    console.log(flexion_array)
    console.log(extension_array)

    const name = auth().currentUser.displayName;
    var first_name = ''
    var last_name = ''

    var n = name.indexOf(' ')
        
    first_name = name.substring(0, n)
    last_name = name.substring((n - 1) + 2)

    const screenWidth = Dimensions.get("window").width;

    return (
        <View>
            <Text style={styles.title}>Hello {first_name} {last_name}</Text>
            <Text style={styles.info_text}>Flexion Progress Over Time</Text>
            <BarChart
                data={{
                    labels: user_keys,
                    datasets: [
                        {
                            data: flexion_array
                        }
                    ]
                }}
                width={screenWidth}
                height={200}
                verticalLabelRotation={10}
                withInnerLines={false}
                yAxisSuffix='&ordm;'
                withVerticalLabels={false}
                showValuesOnTopOfBars={true}
                chartConfig={{
                    height: 5000,
                    backgroundGradientFrom: "white",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "white",
                    backgroundGradientToOpacity: 0,
                    fillShadowGradientOpacity: 1,
                    decimalPlaces: 0,
                    color: (opacity = 0) => `rgba(190, 0, 255, ${opacity})`,
                }}
                style={bar_styles.graphStyle}
            />
            <Text style={bar_styles.xlabel1}>Time</Text>
            <Text style={bar_styles.extensionInfo}>Extension Progress Over Time</Text>
            <BarChart
                data={{
                    labels: user_keys,
                    datasets: [
                        {
                            data: extension_array
                        }
                    ]
                }}
                width={screenWidth}
                height={200}
                verticalLabelRotation={10}
                withInnerLines={false}
                yAxisSuffix='&ordm;'
                withVerticalLabels={false}
                showValuesOnTopOfBars={true}
                chartConfig={{
                    height: 5000,
                    backgroundGradientFrom: "white",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "white",
                    backgroundGradientToOpacity: 0,
                    fillShadowGradientOpacity: 1,
                    decimalPlaces: 0,
                    color: (opacity = 0) => `rgba(255, 0, 100, ${opacity})`,
                }}
                style={bar_styles.graphStyle}
            />
            <Text style={bar_styles.xlabel1}>Time</Text>
        </View>
    )
}

const bar_styles = StyleSheet.create({
    graphStyle: {
        flex: 1,
        paddingTop: 10,
    },
    xlabel1: {
        marginTop: 180, 
        marginBottom: 15,
        fontSize: 14,
        textAlign: 'center',
        paddingLeft: 10,
        fontFamily: 'arial',
        fontWeight: 'bold',
        color: 'black'
    },
    extensionInfo: {
        marginTop: -5, 
        marginBottom: 15,
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 10,
        fontFamily: 'arial',
        fontWeight: 'bold',
        color: 'black'
    },
})