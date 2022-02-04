import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createSwitchNavigator } from 'react-navigation';

//importing components for page routings
import HomeScreen from "./components/HomeScreen";
import LiveMeasureScreen from "./components/LiveMeasureScreen";
import MetricsScreen from "./components/MetricsScreen";
import ProgressScreen from "./components/ProgressScreen";
import BLEScreen from "./components/BLEScreen";
import LoginScreen from "./components/LoginScreen";
import DeviceScreen from "./components/DeviceScreen";
import DeviceCard from "./BLE_components/DeviceCard";
import IntroSlider from "./components/IntroSlider";
import ProfileScreen from "./components/ProfileScreen";
import RegistrationScreen from "./components/Registration"


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Guide" component={IntroSlider} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Live Measure" component={LiveMeasureScreen} />
        <Stack.Screen name="Metrics" component={MetricsScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="BLE" component={BLEScreen} />
        <Stack.Screen name="Device" component={DeviceScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;