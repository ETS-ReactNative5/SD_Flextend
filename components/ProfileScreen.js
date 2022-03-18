import { useState, useEffect, useReducer }from "react";
import * as React from "react";
import { StatusBar, StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView, Switch, TextInput, AsyncStorage, } from "react-native";
import { CheckBox, Avatar } from 'react-native-elements'

import {Picker} from '@react-native-picker/picker';

import  ImagePicker  from "react-native-image-crop-picker";
// import { Avatar } from "../Profile_components/Avatar";
// import storage from '@react-native-firebase/storage';

import Modal from "react-native-modal";
import styles from '../styles/HomeStyle';
import styles1 from '../styles/ProfileStyle';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';


const Profile = ({navigation}) => {


    ////////////////////////////////////////For modal state///////////////////////////////////////////////////////////////////////////////

    const BODY_METRICS = 'BODY_METRICS';
    const GOALS = 'GOALS';
    const REMINDERS = 'REMINDERS';
    const PROGRESS = 'PROGRESS';

    //modal state 
    const [type, setType] = useState(BODY_METRICS);
    const [isShowing, setIsShowing] = useState(false);

    //picker for height state
    const [selectedHeightFeet, setSelectedHeightFeet] = useState('3');
    const [selectedHeightInches, setSelectedHeightInches] = useState('0');

    //input for age state
    const [selectedAge, setSelectedAge] = useState('');

    //input for weight state
    const [selectedWeight, setSelectedWeight] = useState('');

    const metricsToFirebase = () => {
        console.log(auth().currentUser.phoneNumber)
        firestore().collection('users').doc(auth().currentUser.phoneNumber).update(
            {'age':selectedAge}
        )
        firestore().collection('users').doc(auth().currentUser.phoneNumber).update(
            {'weight':selectedWeight}
        )
        firestore().collection('users').doc(auth().currentUser.phoneNumber).update(
            {'height':selectedHeightFeet + '\'' + selectedHeightInches + '\"'}
        )
    }

    //function to render body metrics screen after user inputs their metrics
    const renderBodyMetrics = () => {
        toggleModal()
        metricsToFirebase()
    }
    
    //function to open and close modal
    const toggleModal = (type) =>{
        setIsShowing(!isShowing);
        setType(type);
    }

    const renderModalContent = (type) => {
        switch(type) {
            case BODY_METRICS: {
                return (
                    <View >
                    <Text style={styles1.Title}>Add Your Body Metrics</Text>
                    {/* add text input fields or drop down options */}
                    <View style={styles1.switchRow}>
                        <Text>Age</Text>
                        <TextInput 
                            style = {styles1.textInput}
                            placeholder = 'Age'
                            textAlign ='center'
                            keyboardType = 'numeric'
                            // on value change then save this value 
                            //need to know when the user stops typing, either an OK button or automatically know after 2 characters?
                            value = {selectedAge}
                            onChangeText = {newAge => setSelectedAge(newAge)}
                            maxLength = {2}
                        />
                    </View>
                    <View style={styles1.switchRow}>
                        <View style={{flex:.3}}>
                            <Text style={styles1.height_text}>Height</Text>
                        </View>
                        {/* feet */}
                        <View style={{flex:.3}}>
                            <Picker 
                                selectedValue={selectedHeightFeet}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedHeightFeet(itemValue)
                                }>
                                <Picker.Item label="3 ft" value="3" />
                                <Picker.Item label="4 ft" value="4" />
                                <Picker.Item label="5 ft" value="5" />
                                <Picker.Item label="6 ft" value="6" />
                                <Picker.Item label="7 ft" value="7" />
                            </Picker>
                        </View>
                        {/* inches */}
                        <View style={{flex:.3}}>
                            <Picker 
                                selectedValue={selectedHeightInches}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedHeightInches(itemValue)
                                }>
                                <Picker.Item label="0 in" value="0" />
                                <Picker.Item label="1 in" value="1" />
                                <Picker.Item label="2 in" value="2" />
                                <Picker.Item label="3 in" value="3" />
                                <Picker.Item label="4 in" value="4" />
                                <Picker.Item label="5 in" value="5" />
                                <Picker.Item label="6 in" value="6" />
                                <Picker.Item label="7 in" value="7" />
                                <Picker.Item label="8 in" value="8" />
                                <Picker.Item label="9 in" value="9" />
                                <Picker.Item label="10 in" value="10" />
                                <Picker.Item label="11 in" value="11" />
                                <Picker.Item label="12 in" value="12" />
                            </Picker>
                        </View>
                    </View>
                    
                    <View style={styles1.switchRow}>
                        <Text>Weight</Text>
                        <TextInput 
                            style = {styles1.textInput}
                            placeholder = 'Weight'
                            textAlign ='center'
                            keyboardType = 'numeric'
                            value = {selectedWeight}
                            onChangeText = {newWeight => setSelectedWeight(newWeight)}
                            maxLength = {5}
                        />
                    </View>
                    <TouchableOpacity onPress={() => renderBodyMetrics()}style={styles.button1} title="Done"><Text style={styles.buttonTitle}>Done</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleModal()}style={styles.button1} title="Hide modal"><Text style={styles.buttonTitle}>Close Screen</Text></TouchableOpacity>
                    </View>
                )
            }
            case GOALS: {
                return (
                    <View >
                    <Text>Goals</Text>
                    <TouchableOpacity onPress={() => toggleModal()}style={styles.button1} title="Hide modal"><Text style={styles.buttonTitle}>Close Screen</Text></TouchableOpacity>
                    </View>
                )
            }
            case REMINDERS: {
                return (
                    <View>
                    <Text style={styles.welcome_message}>reminders</Text>
                    <Text style={styles.textContent}>{eventInfoText}</Text>
                    <TouchableOpacity onPress={() => addEventToCalendar()} style={styles.button2}><Text style={styles.buttonTitle}>Add</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => editCalendarEventWithId(eventId)} style={styles.button2}><Text style={styles.buttonTitle}>Edit</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleModal()}style={styles.button1} title="Hide modal"><Text style={styles.buttonTitle}>Close Screen</Text></TouchableOpacity>
                    </View>
                )
            }
            case PROGRESS: {
                return (
                    <View>
                    <Text>progress</Text>
                    <TouchableOpacity onPress={() => toggleModal()}style={styles.button1} title="Hide modal"><Text style={styles.buttonTitle}>Close Screen</Text></TouchableOpacity>
                    </View>
                )
            }
        }
    }
    


    

    ////////////////////////////////////////////// CALENDAR Reminders ////////////////////////////////////////////////////////////////////////

    //Helper function for adding to personal calendar
    const utcDateToString = momentInUTC => {
        let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        return s;
    };

    //function that add the event
    //need to save event info somewhere so the user is able to edit later
    //how to have multiple, will we even need multiple??? 
    const [eventId, setEventId] = useState()

    // var for reminder event details, used to display on screen for user NEED TO FINISH IMPLEMENTING
    const [eventInfoText, setEventInfoText] = useState()
  
    //retrieve eventId when re render 
    useEffect(() => {
        const asyncFetch = async () => {
            const eventIdent = await AsyncStorage.getItem("eventID");
            if (eventIdent) {
                // setter from useState
                setEventId(JSON.parse(eventIdent));
            }
        };
        asyncFetch();
    }, []);

    //save eventId for re render 
    useEffect(() => {

        const asyncStore = async () => {
        
            if(eventId){
                await AsyncStorage.setItem("eventID", JSON.stringify(eventId));
            }
        };

    }, [eventId]);

    const addEventToCalendar= (title, startDateUTC) => {
        const eventConfig = {
            title: "Measure with Flextend",
            startDate: utcDateToString(startDateUTC),
            endDate: utcDateToString(moment.utc(startDateUTC).add(15, 'minutes')),
            notes: 'Log in to Flextend and see how my knee is doing today!'
        };

        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
            .then(eventInfo => {
                //this line actually stored the event id in a state once a new event is created
                setEventId (eventInfo["eventIdentifier"]);
                setEventInfoText(JSON.stringify(eventInfo));
                console.log(eventInfo)
            })
            .catch(error => {
                alert('Error ', error);
            });
    }

    //function to edit the event in calendar 
    //edits last event that was created 
    const editCalendarEventWithId = () => {
        // getEventId()
        const eventConfig = {
        eventId,
        };

    AddCalendarEvent.presentEventEditingDialog(eventConfig)
      .then(eventInfo => {
        console.warn(JSON.stringify(eventInfo));
      })
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };
   
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   AVATAR ////////////////////////////////////////////////////////

    //uri for image picked, after upload the uri comes from firebase
    const [uri, setUri] = useState();
    
    //I want the useEffect hook to populate uri value on every re render with the url from the user profile from Firebase
    const user = auth().currentUser
    const getPhoto =  () => {
        try {
            const userPhoto  = user.photoURL
            console.log(userPhoto)
            setUri(userPhoto); 
           
        } catch {
            console.log("Error")
        }
    };

    useEffect(() => {
        console.log("EFFECT ")
        getPhoto()
    }, [])


    // function to pick photo, it sets the photo uri and then saves the uri to the user's profile
    const pickPicture = () => {
        ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        }).then((image) => {
        setUri(image.path);
        user.updateProfile({photoURL: image.path});
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Getting the name and last name of the user from Firebase current user property
    //checks that there is indeed a user signed in 
    if(auth().currentUser){
        const name = auth().currentUser.displayName;
        var first_name = ''
        var last_name = ''

        var n = name.indexOf(' ')
            
        first_name = name.substring(0, n)
        last_name = name.substring((n - 1) + 2)
    }
        

    return (
        <ScrollView style={styles1.scroll}>
        <ImageBackground  style={{width: '100%', height: '100%'}} source={require("../images/profile-background.jpg")} >
            <View style={styles1.userRow}>
                <Avatar
                // style={styles1.avatar}
                onPress={() =>pickPicture()}
                // source={auth().currentUser.photoURL} 
                source={{uri }}
                size="xlarge"
                rounded
                />
                <Text style={{color: 'white'}}>{first_name} {last_name}</Text>
            </View>      
           {/* VIEW UNDER AVATAR STARTS HERE */}
            <View style={styles1.content}>
                <TouchableOpacity onPress={() => toggleModal(BODY_METRICS)} style={styles.button1}><Text style={styles.buttonTitle}>Set Body Metrics</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModal(GOALS)} style={styles.button2}><Text style={styles.buttonTitle}>Set Goals</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModal(REMINDERS)} style={styles.button1}><Text style={styles.buttonTitle}>Set Reminders</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Progress")} style={styles.button3}><Text style={styles.buttonTitle}>Progress</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Events")} style={styles.button3}><Text style={styles.buttonTitle}>TEST CALENDAR </Text></TouchableOpacity>
                
                <Modal isVisible={isShowing} style={styles1.modalView} >
                    <View>
                        {renderModalContent(type)}
                    </View>
                </Modal>

            </View>
        </ImageBackground>
        </ScrollView>
    );
}

export default Profile;

