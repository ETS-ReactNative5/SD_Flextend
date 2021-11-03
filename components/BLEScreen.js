import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, Button, Image} from 'react-native';
import styles from '../styles/HomeStyle';

// Imports for BLE management 
import { BleManager, Device } from 'react-native-ble-plx';

//create new BLE manager
const manager = new BleManager();

//reducer for state 
const { useReducer } = React;

// Reducer to add only the devices which have not been added yet
// Indeed, when the bleManager searches for devices, each time it detects a ble device, it returns the ble device even if this one has already been returned
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

export default function ble_set_up() {
    
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
                dispatch({ type: 'ADD_DEVICE', payload: scannedDevice });
            }
        });

        // stop scanning devices after 5 seconds
        setTimeout(() => {
            manager.stopDeviceScan();
            setIsLoading(false);
        }, 5000);
    };

    //listing devices
    // type DeviceCardProps = {
    // device: Device;
    // };

    // const DeviceCard = ({ device }: DeviceCardProps) => {

    //     useEffect(() => {
    //             // is the device connected?
    //         device.isConnected().then(setIsConnected);
    // }, [device]);
                

  const [isConnected, setIsConnected] = useState(false);
    return (
        <View>
            <Text style={styles.title}> Set Up BLE  </Text>
            <Button title="Clear Devices" color="Blue" onPress={() => dispatch({ type: 'CLEAR' })}/>
            <Button title="Scan Devices" color="Blue" onPress={scanDevices}/>
            {/* <FlatList
                keyExtractor={(item) => item.id}
                data={scannedDevices}
                renderItem={({ item }) => <DeviceCard device={item} />}
                contentContainerStyle={styles.content}
            /> */}
            {/* <Text>{`Id : ${device.id}`}</Text>
            <Text>{`Name : ${device.name}`}</Text>
            <Text>{`Is connected : ${isConnected}`}</Text> */}
        </View>
    );
}  

