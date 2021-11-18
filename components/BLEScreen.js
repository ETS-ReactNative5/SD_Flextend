
import React, {useState, useEffect, useReducer} from 'react';
import { TouchableOpacity, Text, View, Button, Image, FlatList, ActivityIndicator, Alert} from 'react-native';
import styles from '../styles/HomeStyle';
import { DeviceCard } from '../BLE_components/DeviceCard';

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

    const [isConnected, setIsConnected] = useState(false);

    // state to give the user a feedback about the manager scanning devices
    const [isLoading, setIsLoading] = useState(false);

    const getServicesAndCharacteristics = (device) => {
    return new Promise((resolve, reject) => {
        device.services().then(services => {
            const characteristics = []
            //console.log("ashu_1",services)
            services.forEach((service, i) => {
                service.characteristics().then(c => {
                //   console.log("service.characteristics")
                  
                    characteristics.push(c)
                    // console.log(characteristics)
                    resolve(characteristics)
                    // if (i === services.length - 1) {
                    //     const temp = characteristics.reduce(
                    //         (acc, current) => {
                    //             return [...acc, ...current]
                    //         },
                    //         []
                    //     )
                    //     const dialog = temp.find(
                    //         characteristic =>
                    //             characteristic.isWritableWithResponse
                    //     )
                    //     if (!dialog) {
                    //         reject('No writable characteristic')
                    //     }
                    //     resolve(dialog)
                    // }
                  
                })
            })
        })
    })
}

    const scanForFlextend = async() => {

        // display the Activityindicator
        setIsLoading(true);

        // scan devices
        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.warn(error);
                return;
            }

            // if a device is detected add the device to the list by dispatching the action into the reducer
            if (device) {
                if (device.name == 'Flextend'){
                    manager.stopDeviceScan(); // stop scanning for other devices
                    setIsLoading(false);

                    //begin device connection and data reading
                    manager.connectToDevice(device.id, {autoConnect:true}).then((device) => {
                        (async() => {
                            services = await device.discoverAllServicesAndCharacteristics();
                            characteristic = await getServicesAndCharacteristics(services).then(
                                characteristic => console.log(characteristic.value)
                            )
                            let val = device.isConnected().then(console.log(val));
                            // value = services.readCharacteristicForService(services.serviceUUIDs, characteristic.uuid).value;
                            // console.log("characteristic value:", value);
                            // console.log(characteristic.read())
                            //temp = characteristic.read()
                            //console.log(temp)
                            // console.log("Discovering all services and characteristics", characteristic.uuid);
                        })();
                        setIsConnected(true);
                        return device.discoverAllServicesAndCharacteristics();
                    }).then((device) => {
                        
                    }).then(() => {
                        console.log("Listening...");
                        let val = services.isConnected().then(console.log(val));
                    }).catch((error) => {
                        alert("Connection error", error.message);
                    });
                }
                else{
                    console.log("No device named Flextend found.")
                }
            }
        });

        // stop scanning devices after 5000 miliseconds
        setTimeout(() => {
            manager.stopDeviceScan();
        }, 5000);
    };
                
    return (
        <View>
            <Text style={styles.title}> Set Up BLE  </Text>
            <Button title="Scan for Flextend" onPress={scanForFlextend} />
            {/* <Text>{`Connected: ${device.isConnected()}`}</Text> */}
            {/* <Button title="Read Characteristics" onPress={readDeviceCharacteristics} /> */}
        </View>
    );
}  

