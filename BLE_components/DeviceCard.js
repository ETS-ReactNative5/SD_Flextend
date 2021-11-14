import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { useNavigation } from '@react-navigation/native';


type DeviceCardProps = {
  device: Device;
};

const DeviceCard = ({ device }: DeviceCardProps) => {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // is the device connected?
    device.isConnected().then(setIsConnected);
  }, [device]);

  const connectDevice = async () => {
    // connect to the device
    const connectedDevice = await device.connect();
    setIsConnected(true);

  };

  const disconnectDevice = async () => {
        const isDeviceConnected = await device.isConnected();
        if (isDeviceConnected) {
        await device.cancelConnection();
        }
    };

  return (
    <View>
      <TouchableOpacity onPress={() => disconnectDevice()}> Disconnect Device</TouchableOpacity>
      <TouchableOpacity onPress={() => connectDevice()}>
        <Text style={styles.green}>{`Id : ${device.id}`}</Text>
        <Text>{`Name : ${device.name}`}</Text>
        <Text>{`Is connected : ${isConnected}`}</Text>
        <Text>{`RSSI : ${device.rssi}`}</Text>
        <Text>{`ServiceData : ${device.serviceData}`}</Text>
        <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
      </TouchableOpacity>
    </View>
  );
};


//
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: 'rgba(60,64,67,0.3)',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
  green: {
    color: "green"
  }
});

export { DeviceCard };