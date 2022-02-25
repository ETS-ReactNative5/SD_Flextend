import { useState, useEffect, useReducer }from "react";
import * as React from "react";
import { StatusBar, StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView, Switch, TextInput, AsyncStorage } from "react-native";
import { CheckBox } from 'react-native-elements'

import {Picker} from '@react-native-picker/picker';

import  ImagePicker  from "react-native-image-crop-picker";
import { Avatar } from "../Profile_components/Avatar";
// import storage from '@react-native-firebase/storage';

import Modal from "react-native-modal";
import styles from '../styles/HomeStyle';
import styles1 from '../styles/ProfileStyle';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';


const Profile = ({navigation}) => {

    // for profile picture
    onAvatarChange = (image: ImageOrVideo) => {
        // auth().currentUser.updateProfile({photoURL: image.path}).then(console.log("After upload: " + auth().currentUser.photoURL));
        //need to add the image to firestore
        // user = auth().currentUser
    };

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

    //function to render body metrics screen after user inputs their metrics
    const renderBodyMetrics = () => {
        toggleModal()
        navigation.navigate('Body Metrics', {
              age: selectedAge,
              weight: selectedWeight,
              heightFt: selectedHeightFeet,
              heightIn: selectedHeightInches,
            })
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
                    <Text style={styles1.Title}>Add your body metrics</Text>
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
                            <Text>Height</Text>
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
                            placeholder = 'Age'
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

    // var for reminder event details, used to display on screen for user
    const [eventInfoText, setEventInfoText] = useState()
    // //save eventId
    // useEffect(() => {
    //     if(eventId){
    //         AsyncStorage.setItem('eventId', JSON.stringify(eventId));
    //     }
    // }, [eventId]); 
  
    // //retrieve eventId
    // useEffect(() => {
    //     const savedEventId = AsyncStorage.getItem('eventId');
    //     setEventId(JSON.parse(savedEventId))
    //     console.log("Event id retrived " + eventId)
    // }, [setEventId]); 

    const addEventToCalendar= (title, startDateUTC) => {
        const eventConfig = {
            title: "Measure with Flextend",
            startDate: utcDateToString(startDateUTC),
            endDate: utcDateToString(moment.utc(startDateUTC).add(15, 'minutes')),
            notes: 'Log in to Flextend and see how my knee is doing today!'
        };

        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
            .then(eventInfo => {
                // setEventId (eventInfo["eventIdentifier"]);
                console.log(eventInfo)
                // const tempEvent = eventInfo["eventIdentifier"]
                // setEventInfo(eventInfo);
                // saveEventId();
            })
            .catch(error => {
                alert('Error ', error);
            });
    }

    //function to edit the event in calendar 
    //edits last event that was created 
//     const editCalendarEventWithId = () => {
//         // getEventId()
//         const eventConfig = {
//         eventId,
//         };

//     AddCalendarEvent.presentEventEditingDialog(eventConfig)
//       .then(eventInfo => {
//         console.warn(JSON.stringify(eventInfo));
//       })
//       .catch((error: string) => {
//         // handle error such as when user rejected permissions
//         console.warn(error);
//       });
//   };
   
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
                onChange={onAvatarChange()}
                source={auth().currentUser.photoURL} 
                // source={require("../images/profile_placeholder.png")} 
                // size={120}
                />
                <Text style={{color: 'white'}}>{first_name} {last_name}</Text>
            </View>      
           {/* VIEW UNDER AVATAR STARTS HERE */}
            <View style={styles1.content}>
                <TouchableOpacity onPress={() => toggleModal(BODY_METRICS)} style={styles.button1}><Text style={styles.buttonTitle}>Set Body Metrics</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModal(GOALS)} style={styles.button2}><Text style={styles.buttonTitle}>Set Goals</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModal(REMINDERS)} style={styles.button1}><Text style={styles.buttonTitle}>Set Reminders</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModal(PROGRESS)} style={styles.button3}><Text style={styles.buttonTitle}>Progress</Text></TouchableOpacity>
                
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

