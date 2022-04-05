import { useState, useEffect, useReducer }from "react";
import * as React from "react";
import { StatusBar, StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView, Switch, TextInput, AsyncStorage, } from "react-native";
import { CheckBox, Avatar } from 'react-native-elements'

import {Picker} from '@react-native-picker/picker';

import  ImagePicker  from "react-native-image-crop-picker";
// import { Avatar } from "../Profile_components/Avatar";
import storage from '@react-native-firebase/storage';

import Modal from "react-native-modal";
import styles from '../styles/HomeStyle';
import styles1 from '../styles/ProfileStyle';

import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';


import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';

// import AnimatedSplash from "react-native-animated-splash-screen";


const Profile = ({navigation}) => {


    ////////////////////////////////////////Loading screen ///////////////////////////////////////////////////////////////////////////////

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000)
    }, [])

    ////////////////////////////////////////For modal state///////////////////////////////////////////////////////////////////////////////

    const BODY_METRICS = 'BODY_METRICS';
    const GOALS = 'GOALS';
    const REMINDERS = 'REMINDERS';
    const PROGRESS = 'PROGRESS';

    //modal state 
    const [type, setType] = useState(BODY_METRICS);
    const [isShowing, setIsShowing] = useState(false);

    //input for age state
    const [selectedAge, setSelectedAge] = useState('');

    //input for weight state
    const [selectedStatus, setSelectedStatus] = useState(false);

    const [goal, setGoal] = useState('')

    const metricsToFirebase = () => {
        firestore().collection('users').doc(auth().currentUser.phoneNumber).update(
            {'age':selectedAge}
        )
        firestore().collection('users').doc(auth().currentUser.phoneNumber).update(
            {'recent_surgery':selectedStatus}
        )
    }

    //function to render body metrics screen after user inputs their metrics
    const renderBodyMetrics = () => {
        toggleModal()
        metricsToFirebase()
    }

    const renderGoals = (goal) => {
        toggleModal()
        firestore().collection('users').doc(auth().currentUser.phoneNumber).update(
            {goals: firebase.firestore.FieldValue.arrayUnion(goal)}
        )
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
                    <Text style={styles1.modal_title}>Add Metrics</Text>
                    {/* add text input fields or drop down options */}
                    <View style={styles1.switchRow}>
                        <Text style={styles1.info_text}>Age</Text>
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
                            <Text style={styles1.info_text}>Recent Knee Surgery?</Text>
                        </View>
                        <View style={{flex:.3}}>
                            <Picker 
                                selectedValue={selectedStatus}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedStatus(itemValue)
                                }>
                                <Picker.Item label='False' value={false}/>
                                <Picker.Item label='True' value={true}/>
                            </Picker>
                        </View>
                        
                    </View>
                    
                    <TouchableOpacity onPress={() => renderBodyMetrics()}style={styles.button1} title="Done"><Text style={styles.buttonTitle}>Done</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleModal()}style={styles.button1} title="Hide modal"><Text style={styles.buttonTitle}>Close Screen</Text></TouchableOpacity>
                    </View>
                )
            }
            case GOALS: {
                return (
                    <View >
                    <Text style={styles1.modal_title}>Goals</Text>
                    <Text style={styles1.modal_text}>Use this feature to add your specific goals!</Text>
                    <Text></Text>
                    <Text style={styles1.modal_text}>Navigate to the Home Page to see your goals!</Text>
                    <TextInput 
                        style = {styles1.goalInput}
                        placeholder = 'Enter your goal here'
                        textAlign ='left'
                        keyboardType = 'default'
                        value = {goal}
                        onChangeText = {newGoal => setGoal(newGoal)}
                    />
                    <TouchableOpacity onPress={() => renderGoals(goal)}style={styles.button1} title="Done"><Text style={styles.buttonTitle}>Done</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleModal()}style={styles.button1} title="Hide modal"><Text style={styles.buttonTitle}>Close Screen</Text></TouchableOpacity>
                    </View>
                )
            }
            case REMINDERS: {
                return (
                    <View>
                    <Text style={styles1.modal_title}>Reminders</Text>
                    <Text style={styles1.modal_text}>Use this feature to add events to your calendar to keep measuring with Flextend!</Text>
                    {eventId? <TouchableOpacity onPress={() => editCalendarEventWithId(eventId)} style={styles.button2}><Text style={styles.buttonTitle}>Edit</Text></TouchableOpacity> 
                    : 
                    <TouchableOpacity onPress={() => addEventToCalendar()} style={styles.button2}><Text style={styles.buttonTitle}>Add</Text></TouchableOpacity>}
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
    // const [eventInfoText, setEventInfoText] = useState()
  
    //retrieve eventId when re render 
    const asyncFetch = async () => {
            const eventIdent = await AsyncStorage.getItem("eventID");
            if (eventIdent) {
                // setter from useState
                setEventId(JSON.parse(eventIdent));
            }
    };
    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncStore = async () => {
        
        if(eventId){
            await AsyncStorage.setItem("eventID", JSON.stringify(eventId));
        }
    };

    //save eventId for re render 
    useEffect(() => {
        asyncStore();
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
    const getPhoto = async () => {
        try {
            const user_ref = storage().ref(auth().currentUser.displayName);
            const userPhoto = await user_ref.getDownloadURL();
        } catch {
            console.log("No user photo saved in Firebase")
            const placeholder_ref = storage().ref('profile_placeholder.png');
            const placeholderPhoto = await placeholder_ref.getDownloadURL();
            setUri(placeholderPhoto)
        }
    };

    useEffect(() => {
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
        store_new_image()
        // user.updateProfile({photoURL: image.path});
        });
    };

    //NEED TO DO: Stall user while image loads
    const store_new_image = () =>{
        const image_upload = storage()
        .ref(auth().currentUser.displayName)
        .putFile(uri.toString())
        .then((snapshot) => {
            //After uploading the picture then update profile 
            // const reference = storage().ref(uri.toString());
            // user.updateProfile({photoURL: reference});
            //You can check the image is now uploaded in the storage bucket
            console.log(`Image has been successfully uploaded.`);
        })
        .catch((e) => console.log('uploading image error => ', e));
    } 

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
        
    // retunr the loading screen to wait for all components to render

    //after timeout for rendering components is done return the profile view
    return (
        <ScrollView style={styles1.scroll}>
        <ImageBackground  style={{width: '100%', height: '100%'}} source={require("../images/profile-background.jpg")} >
            <View style={styles1.userRow}>
                <Avatar
                onPress={() =>pickPicture()}
                source={{uri}}
                size="xlarge"
                rounded
                />
                <Text style={{color: 'white', fontSize: 30}}>{first_name} {last_name}</Text>
            </View>      
           {/* VIEW UNDER AVATAR STARTS HERE */}
            <View style={styles1.content}>
                <TouchableOpacity onPress={() => toggleModal(BODY_METRICS)} style={styles.button1}><Text style={styles.buttonTitle}>Set Metrics</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModal(GOALS)} style={styles.button3}><Text style={styles.buttonTitle}>Set Goals</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModal(REMINDERS)} style={styles.button1}><Text style={styles.buttonTitle}>Set Reminders</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Progress")} style={styles.button2}><Text style={styles.buttonTitle}>Progress</Text></TouchableOpacity>
                
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

