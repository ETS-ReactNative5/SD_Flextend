import * as React from 'react';
// import LoginScreen from './screens/LoginScreen';

import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing components for page routings
import HomeScreen from "./components/HomeScreen";
import LiveMeasureScreen from "./components/LiveMeasureScreen";
import MetricsScreen from "./components/MetricsScreen";
import ProgressScreen from "./components/ProgressScreen";
import BLEScreen from "./components/BLEScreen";
import LoginScreen from "./components/LoginScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Live Measure" component={LiveMeasureScreen} />
        <Stack.Screen name="Metrics" component={MetricsScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="BLE" component={BLEScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;