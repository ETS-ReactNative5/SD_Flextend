import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, Button, Image} from 'react-native';
import styles from '../styles/MetricStyle';
import { BleManager, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const manager = new BleManager();
let services;
let characteristic;
let device_id;
let transaction_id = "flextend_transaction";
let degree_num = 0;

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Measure Now',
    };

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            degrees: 0
        };
    }

    disconnectFromFlextend = async () => {
        if (this.state.isConnected)
        {
            await manager.cancelTransaction(transaction_id);
            await manager.cancelDeviceConnection(device_id);
            this.state.isConnected = false;
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
                    device_id = device.id;
                    this.state.isConnected = true;
                    const allServicesAndCharacteristics = await device.discoverAllServicesAndCharacteristics(transaction_id);
                    // get the services only
                    const discoveredServices = await allServicesAndCharacteristics.services();
                    const myService = discoveredServices[0]; //isolating this service just for testing
                    const myCharacteristics = await myService.characteristics();
                    // const readData = myCharacteristics.read();
                    const characteristicUUID = myCharacteristics[0].uuid;
                    // const readData =  await myService.readCharacteristic(characteristicUUID);
                    // console.log(readData);
                    myService.monitorCharacteristic(characteristicUUID, async (error, characteristic) => {
                        let printVal = base64.decode(characteristic.value);
                        this.setState({ degrees: printVal });
                        console.log(printVal);
                    }, transaction_id);
                    return;
                }
            }
        });

        // stop scanning devices after 1000 miliseconds
        setTimeout(() => {
            manager.stopDeviceScan();
        }, 1000);
    }

    async componentDidMount() {
        await this.connectToFlextend()
    } 


    async componentWillUnmount() {
        firestore().collection('knee health').update(auth().currentUser.phoneNumber).update(
            {'degrees':this.state.degrees}
        )
        await this.disconnectFromFlextend();
    }

    render() {
        const navigate = this.props.navigation.navigate;

        return (
            <View>
                <Text style={styles.title}> Start Measuring</Text>
                <Text style={styles.result_text}>Degrees: {this.state.degrees}</Text>
            </View>

        );
    }
}