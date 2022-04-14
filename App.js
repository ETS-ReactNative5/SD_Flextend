import React, {useState, useEffect} from 'react';
import { View, Text, Button, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import CalendarEventTEST from "./components/CalendarEventTEST";
import RegistrationScreen from "./components/Registration";
import ReportScreen from "./components/ReportScreen";


LogBox.ignoreAllLogs(true)


//main stack 
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
          <Stack.Screen name="Home" component={HomeScreen} 
           options={({route, navigation}) => ({ // get reference to navigation
            headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Guide')} 
                  title="Guide"
                  color="red"
                />
              )
            })
          }
          />
          <Stack.Screen name="Live Measure" component={LiveMeasureScreen} options={{headerTransparent: true,}}/>
          <Stack.Screen name="Previous Results" component={PreviousResults} options={{headerTransparent: true,}}/>
          <Stack.Screen name="Progress" component={ProgressScreen} 
            options={({route, navigation }) => 
              ({ // get reference to navigation
                headerRight: () => (
                    <Button
                      onPress={() => navigation.navigate('Report')} 
                      title="Generate Report"
                      color="red"
                    />
                )
              })
            }
          />
          <Stack.Screen name="Guide" component={IntroSlider} options={{headerTransparent: true,}}/>
          <Stack.Screen name="BLE" component={BLEScreen} options={{headerTransparent: true,}}/>
          <Stack.Screen name="Device" component={DeviceScreen} options={{headerTransparent: true,}}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTransparent: true,}}/>
          <Stack.Screen name="Events" component={CalendarEventTEST} options={{headerTransparent: true,}} />
          <Stack.Screen name="Report" component={ReportScreen} options={{headerTransparent: true,}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerTransparent: true,}}/>
          <Stack.Screen name="Registration" component={RegistrationScreen} options={{headerTransparent: true,}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;