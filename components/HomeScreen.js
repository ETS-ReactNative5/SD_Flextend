import React from 'react';
import { TouchableOpacity, Text, View, Image, ScrollView} from 'react-native';
import { Avatar } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';

import { firebase } from '@react-native-firebase/auth'
import styles from '../styles/HomeStyle';
import { BleManager, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64'

const manager = new BleManager();
let services;
let characteristic;
let device_id;
let transaction_id = "flextend_transaction";

export default class HomeScreen extends React.Component {

    // static navigationOptions = {
    //     title: 'HomeScreen',
    // };

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false
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

    componentDidMount() {
        this.connectToFlextend().then(() => {
            if (this.state.isConnected)
            {
                alert("Flextend connected successfully!");
            }
            else
            {
                alert("Flextend did not connect. Please check if the device is on and if Bluetooth is on.");
            }
        });
        
    }

    async componentWillUnmount() {
        await this.disconnectFromFlextend();
    }

    render() {
        const navigate = this.props.navigation.navigate;

        const logout = () => {
            console.log(firebase.auth().currentUser);
            firebase.auth().signOut().then(() => {
                console.log(firebase.auth().currentUser);
           });
        }

        const name = firebase.auth().currentUser.displayName;
        var first_name = ''
        var last_name = ''

        // var n = name.indexOf(' ')
        
        // first_name = name.substring(0, n)
        // last_name = name.substring((n - 1) + 2)

        return (
            <ScrollView style= {styles.container}>
                <Text style={styles.welcome_message}> Welcome to Flextend!</Text>
                <Text style={styles.italic}> Your at-home knee monitoring platform </Text>
                <Image
                    style={styles.home_image}
                    source={require("../images/home_image.jpg")}
                />
                {/* <TouchableOpacity onPress={() => navigate( 'BLE' )} style={styles.button3}><Text style={styles.buttonTitle}>Set Up BLE Communication</Text></TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigate( 'Live Measure' )} style={styles.button1}><Text style={styles.buttonTitle}>Start Tracking</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigate( 'Metrics' )} style={styles.button3}><Text style={styles.buttonTitle}>Previous Results</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => logout()} style={styles.button2}><Text style={styles.buttonTitle}>Sign Out</Text></TouchableOpacity>
                
                {/* Avatar to access user profile */}
                <View style= {styles.container2}>
                    <Avatar
                        size={120}
                        containerStyle={{backgroundColor: '#ffdab9'}}
                        rounded
                        title={first_name[0] + last_name[0]}
                        //on press navigate to profile screen 
                        onPress={() => navigate( 'Profile' )}
                    />
                </View>
            </ScrollView>
        );
    }
}
