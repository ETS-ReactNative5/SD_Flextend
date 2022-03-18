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

    useEffect(() => {
        getUser();
    }, [])

    const user_data = data;
    const user_keys = Object.keys(user_data).sort()
    
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
                    labels: labels,
                    datasets: [
                        {
                            data: flexion_array
                        }
                    ]
                }}
                width={screenWidth}
                height={200}
                withInnerLines={false}
                yAxisSuffix='&ordm;'
                showValuesOnTopOfBars={true}
                fromZero={true}
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
                    labels: labels,
                    datasets: [
                        {
                            data: extension_array
                        }
                    ]
                }}
                width={screenWidth}
                height={200}
                withInnerLines={false}
                yAxisSuffix='&ordm;'
                showValuesOnTopOfBars={true}
                fromZero={true}
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
        marginTop: 190, 
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