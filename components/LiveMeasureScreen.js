import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, Button, Image} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

import firestore from '@react-native-firebase/firestore'
import auth, {firebase} from '@react-native-firebase/auth'
import styles from '../styles/HomeStyle';

const manager = new BleManager();
let disconnect_subscription;
let flexion_subscription;
let extension_subscription;
let measuringCharacteristicID;
let calibrationCharacteristicID;
let device_id;
let service_id;
let extension_id = "extension_transaction";
let flexion_id = "flexion_transaction";
// let service_transaction = "service_transaction";
let degree_num = 0;

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Measure Now',
    };

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            intendedDisconnect: false,
            flexion: 0,
            extension : 0,
            date: firebase.firestore.Timestamp.now().toDate()
        };
    }

    disconnectFromFlextend = async () => {
        if (this.state.isConnected)
        {
            await manager.cancelDeviceConnection(device_id);
        }
    }

    connectToFlextend = async () => {

        // display the Activityindicator
        // setIsLoading(true);
        // return_device = "";
        console.log(this.state.date)
        // scan devices
        manager.startDeviceScan(null, null, async (error, device) => {
            if (error) {
                console.warn(error);
                return;
            }

            if (device) {
                if (device.name == "Flextend"){
                    manager.stopDeviceScan();
                    await device.connect().then( async (device) => {
                        alert("Device connected successfully! You can now begin measuring.")

                        disconnect_subscription = device.onDisconnected((error, disconnectedDevice) => {
                            if (!this.state.intendedDisconnect)
                            {
                                alert("Device lost connection. Please restart the Flextend device and navigate back to Start Tracking to reestablish connection.")
                                manager.cancelTransaction(flexion_id);
                                manager.cancelTransaction(extension_id);
                                disconnect_subscription.remove();
                                flexion_subscription.remove();
                                extension_subscription.remove();
                                this.setState({ isConnected: false });
                                this.setState({ intendedDisconnect: false });
                                this.props.navigation.navigate('Home')
                            }
                        })

                        this.setState({ isConnected: true });
                        device_id = device.id;

                        
                        if (device.isConnected())
                        {
                            const allServicesAndCharacteristics = await device.discoverAllServicesAndCharacteristics();
                            const discoveredServices = await allServicesAndCharacteristics.services();
                            const flextendService = discoveredServices[0];
                            service_id = flextendService.uuid;
                            const all_characteristics = await flextendService.characteristics();
                            const flexionCharacteristic = all_characteristics[0];
                            const extensionCharacteristic = all_characteristics[1];
                            const measuringCharacteristic = all_characteristics[2];
                            const calibrationCharacteristic = all_characteristics[3];
                            measuringCharacteristicID = measuringCharacteristic.uuid;
                            calibrationCharacteristicID = calibrationCharacteristic.uuid;
                            console.log(calibrationCharacteristicID);
                            const flexion_characteristicUUID = flexionCharacteristic.uuid;
                            const extension_characteristicUUID = extensionCharacteristic.uuid;
                            flexion_subscription = flextendService.monitorCharacteristic(flexion_characteristicUUID, async (error, characteristic) => {
                                let printVal = base64.decode(characteristic.value);
                                this.setState({ flexion: printVal });
                                console.log(printVal);
                            }, flexion_id);
                            extension_subscription = flextendService.monitorCharacteristic(extension_characteristicUUID, async (error, characteristic) => {
                                let printVal = base64.decode(characteristic.value);
                                this.setState({ extension: printVal });
                                console.log(printVal);
                            }, extension_id);
                        }
                    });
                }
            }
        });

        // stop scanning devices after 1000 miliseconds
        setTimeout(() => {
            manager.stopDeviceScan();
        }, 1000);
    }

    beginMeasuring = () => {
        if (!this.state.isConnected)
        {
            alert("Device is not connected! Please restart Flextend device and navigate to Start Tracking to reestablish connection.")
            this.props.navigation.navigate('Home')
        }
        else
        {
            manager.writeCharacteristicWithResponseForDevice(device_id, service_id, measuringCharacteristicID, base64.encode('MEASURING'))
        }
    }

    stopMeasuring = () => {
        if (!this.state.isConnected)
        {
            alert("Device is not connected! Please restart Flextend device and navigate to Start Tracking to reestablish connection.")
            this.props.navigation.navigate('Home')
        }
        else
        {
            manager.writeCharacteristicWithResponseForDevice(device_id, service_id, measuringCharacteristicID, base64.encode('NOTMEASURING'))
        }
    }

    calibrate = () => {
        if (!this.state.isConnected)
        {
            alert("Device is not connected! Please restart Flextend device and navigate to Start Tracking to reestablish connection.")
            this.props.navigation.navigate('Home')
        }
        else
        {
            manager.writeCharacteristicWithResponseForDevice(device_id, service_id, calibrationCharacteristicID, base64.encode('CALIBRATING'))
        }
    }

    async componentDidMount() {
        await this.connectToFlextend()
    } 


    async componentWillUnmount() {
        firestore().collection('knee health').doc(auth().currentUser.phoneNumber).set(
            {measurment: firebase.firestore.FieldValue.arrayUnion(this.state.flexion, this.state.extension, this.state.date)}),
        manager.cancelTransaction(flexion_id);
        manager.cancelTransaction(extension_id);
        disconnect_subscription.remove();
        flexion_subscription.remove();
        extension_subscription.remove();
        this.setState({ isConnected: false });
        this.setState({ intendedDisconnect: false });
        await this.disconnectFromFlextend();
    }

    render() {
        const navigate = this.props.navigation.navigate;

        return (
            <View>
                <Text style={styles.welcome_message2}> Start Measuring</Text>
                <Text style={styles.welcome_message2}>Flexion: {this.state.flexion}</Text>
                <Text style={styles.welcome_message2}>Extension: {this.state.extension}</Text>
                <TouchableOpacity onPress={() => this.beginMeasuring()} style={styles.button1}><Text style={styles.buttonTitle}>Begin Measuring</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.stopMeasuring()} style={styles.button3}><Text style={styles.buttonTitle}>Stop Measuring</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.calibrate()} style={styles.button3}><Text style={styles.buttonTitle}>Calibrate</Text></TouchableOpacity>
            </View>

        );
    }
}