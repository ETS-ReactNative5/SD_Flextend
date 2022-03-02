import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from '@react-native-firebase/auth';

//importing components for page routings
import HomeScreen from "./components/HomeScreen";
import LiveMeasureScreen from "./components/LiveMeasureScreen";
import PreviousResults from "./components/PreviousResults";
import ProgressScreen from "./components/ProgressScreen";
import BLEScreen from "./components/BLEScreen";
import LoginScreen from "./components/LoginScreen";
import DeviceScreen from "./components/DeviceScreen";
import DeviceCard from "./BLE_components/DeviceCard";
import IntroSlider from "./components/IntroSlider";
import ProfileScreen from "./components/ProfileScreen";
import BodyMetricsScreen from "./components/BodyMetricsScreen";
import CalendarEventTEST from "./components/CalendarEventTEST";
import RegistrationScreen from "./components/Registration";


const Stack = createNativeStackNavigator();


const App = () =>{

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);


  if (initializing) return null;

  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Guide" component={IntroSlider} />
          <Stack.Screen name="Live Measure" component={LiveMeasureScreen} />
          <Stack.Screen name="Previous Results" component={PreviousResults} />
          <Stack.Screen name="Progress" component={ProgressScreen} />
          <Stack.Screen name="BLE" component={BLEScreen} />
          <Stack.Screen name="Device" component={DeviceScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} 
            options={({route, navigation}) => ({ // get reference to navigation
              headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('Guide')} // call .navigate on navigation
                    title="Guide"
                    color="red"
                  />
                )
              })
            }
          />
          
          <Stack.Screen name="Body Metrics" component={BodyMetricsScreen} />
          <Stack.Screen name="Events" component={CalendarEventTEST} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;