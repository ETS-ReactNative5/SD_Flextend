
import React, {useState, useEffect, useReducer} from 'react';
import { TouchableOpacity, Text, View, Button, Image, FlatList, ActivityIndicator, Alert} from 'react-native';
import styles from '../styles/HomeStyle';
// import { DeviceCard } from '../BLE_components/DeviceCard';

// Imports for BLE management 
import { BleManager, Device } from 'react-native-ble-plx';

//create new BLE manager
const manager = new BleManager();
let services;
let characteristic;

export default function ble_set_up() {

    // const reducer = (
    //     state: Device[],
    //     action: { type: 'ADD_DEVICE'; payload: Device } | { type: 'CLEAR' },
    //     ): Device[] => {
    //     switch (action.type) {
    //         case 'ADD_DEVICE':
    //         const { payload: device } = action;

    //         // check if the detected device is not already added to the list
    //         if (device && !state.find((dev) => dev.id === device.id)) {
    //             return [...state, device];
    //         }
    //         return state;
    //         case 'CLEAR':
    //         return [];
    //         default:
    //         return state;
    //     }
    // };
    // state to give the user a feedback about the manager scanning devices
    // const [isLoading, setIsLoading] = useState(false);

    const [isConnected, setIsConnected] = useState(false);

    async function disconnectFromFlextend() {
        if (isConnected)
        {
            await device.cancelConnection();
            setIsConnected(false);
        }
    }

    connectToFlextend = async () => {

        // display the Activityindicator
        // setIsLoading(true);

        // scan devices
        manager.startDeviceScan(null, null, async (error, device) => {
            if (error) {
                console.warn(error);
                return;
            }

            // if a device is detected add the device to the list by dispatching the action into the reducer
            if (device) {
                if (device.name == "Flextend"){
                    manager.stopDeviceScan();
                    await device.connect();
                    setIsConnected(true);
                    const allServicesAndCharacteristics = await device.discoverAllServicesAndCharacteristics();
                    // get the services only
                    const discoveredServices = await allServicesAndCharacteristics.services();
                    const myService = discoveredServices[0]; //isolating this service just for testing
                    const myCharacteristics = await myService.characteristics();
                    // const readData = myCharacteristics.read();
                    const characteristicUUID = myCharacteristics[0].uuid;
                    const readData =  await myService.readCharacteristic(characteristicUUID);
                    console.log(readData);
                }
            }
        });

        // stop scanning devices after 5000 miliseconds
        setTimeout(() => {
            manager.stopDeviceScan();
        }, 1000);
    };
                
    return (
        <View>
            <Text style={styles.title}> Set Up BLE  </Text>
            <Button title="Connect to Flextend" onPress={connectToFlextend} />
            <Button title="Disconnect from Flextend" onPress={disconnectFromFlextend}/>
        </View>
    );
}  

