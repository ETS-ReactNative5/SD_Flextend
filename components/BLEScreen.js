import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, Button, Image, FlatList, ActivityIndicator, Alert} from 'react-native';
import styles from '../styles/HomeStyle';

// Imports for BLE management 
import { BleManager, Device } from 'react-native-ble-plx';

//create new BLE manager
const manager = new BleManager();

//variable to store all devices found 
var devices = [];

export default function ble_set_up() {

    const scanDevices = () => {
        // display the Activityindicator
        // setIsLoading(true);

        // scan devices
        manager.startDeviceScan(null, null, (error, scannedDevice) => {
            if (error) {
                console.warn(error);
            }

            // if a device is detected add the device to the list by dispatching the action into the reducer
            if (scannedDevice) {
                devices.push(scannedDevice.id)
                console.log(scannedDevice)
            }
        });

        // stop scanning devices after 5 seconds
        setTimeout(() => {
            manager.stopDeviceScan();
        }, 300);
    };
                
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    return (
        <View>
            <Text style={styles.title}> Set Up BLE  </Text>
            <Button title="Clear Devices" color="Blue" onPress={() => dispatch({ type: 'CLEAR' })}/>
            <Button title="Scan devices" onPress={scanDevices} />
            <FlatList
                data={devices}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            {/* <Text>{`Id : ${device.id}`}</Text>
            <Text>{`Name : ${device.name}`}</Text>
            <Text>{`Is connected : ${isConnected}`}</Text> */}
        </View>
    );
}  

