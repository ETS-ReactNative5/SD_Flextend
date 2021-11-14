
import React, {useState, useEffect, useReducer} from 'react';
import { TouchableOpacity, Text, View, Button, Image, FlatList, ActivityIndicator, Alert} from 'react-native';
import styles from '../styles/HomeStyle';
import { DeviceCard } from '../BLE_components/DeviceCard';

// Imports for BLE management 
import { BleManager, Device } from 'react-native-ble-plx';

//create new BLE manager
const manager = new BleManager();

export default function ble_set_up() {

    const reducer = (
        state: Device[],
        action: { type: 'ADD_DEVICE'; payload: Device } | { type: 'CLEAR' },
        ): Device[] => {
        switch (action.type) {
            case 'ADD_DEVICE':
            const { payload: device } = action;

            // check if the detected device is not already added to the list
            if (device && !state.find((dev) => dev.id === device.id)) {
                return [...state, device];
            }
            return state;
            case 'CLEAR':
            return [];
            default:
            return state;
        }
    };

    // reducer to store and display detected ble devices
    const [scannedDevices, dispatch] = useReducer(reducer, []);

    // state to give the user a feedback about the manager scanning devices
    const [isLoading, setIsLoading] = useState(false);

    const scanDevices = () => {

        // display the Activityindicator
        setIsLoading(true);

        // scan devices
        manager.startDeviceScan(null, null, (error, scannedDevice) => {
            if (error) {
                console.warn(error);
            }

            // if a device is detected add the device to the list by dispatching the action into the reducer
            if (scannedDevice) {
                if (scannedDevice.name != null){
                    dispatch({ type: 'ADD_DEVICE', payload: scannedDevice });
                }
                
            }
        });

        // stop scanning devices after 300 miliseconds
        setTimeout(() => {
            manager.stopDeviceScan();
        }, 300);
    };
                
    return (
        <View>
            <Text style={styles.title}> Set Up BLE  </Text>
            <Button title="Clear Devices" color="Blue" onPress={() => dispatch({ type: 'CLEAR' })}/>
            <Button title="Scan devices" onPress={scanDevices} />
            <Button title="Clear devices" onPress={() => dispatch({ type: 'CLEAR' })}/>
            <FlatList
                keyExtractor={(item) => item.id}
                data={scannedDevices}
                renderItem={({ item }) => <DeviceCard device={item} />}
                contentContainerStyle={styles.device_content}
            />
        </View>
    );
}  

