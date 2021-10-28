import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Login Screen"
          component = { LoginScreen }
        />
        <Stack.Screen
          name = "Home Screen"
          component = { HomeScreen }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;