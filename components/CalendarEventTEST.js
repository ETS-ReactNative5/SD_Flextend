import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView, Switch, TextInput, AsyncStorage, } from "react-native";
import RNCalendarEvents from "react-native-calendar-events";
import styles from '../styles/HomeStyle';
import moment from 'moment';


const Calendar = () =>{

    //Helper function for adding to personal calendar
    const utcDateToString = momentInUTC => {
        let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        return s;
    };

    //basic functionality just adds a calendar event, it is not customiable by the user event was added
    const addEventToCalendar = (startDateUTC) =>{
        RNCalendarEvents.checkPermissions((readOnly = false));
        RNCalendarEvents.saveEvent("Measure with Flextend", {
            startDate: utcDateToString(startDateUTC),
            endDate: utcDateToString(moment.utc(startDateUTC).add(15, 'minutes')),
            notes: 'Log in to Flextend and see how my knee is doing today!',
            alarms: [{
                date: utcDateToString(moment.utc(startDateUTC).add(30, 'seconds'))
            }]
        }) 
    }

    //this function saves a calendar event that happens ferquently 
    //ferquency values option: daily, weekly, monthly, yearly
    const addFrequentEvent = (startDateUTC) => {
        RNCalendarEvents.saveEvent('Title of event', {
            startDate: utcDateToString(startDateUTC),
            recurrenceRule: {
                frequency: 'weekly',
                endDate: '2022-08-19T19:26:00.000Z',
            }
        })
    }

    return (
        <View>
        <Text style={styles.welcome_message}>Reminders</Text>
        {/* <Text style={styles.textContent}>{eventInfoText}</Text> */}
        <TouchableOpacity onPress={() => addEventToCalendar()} style={styles.button2}><Text style={styles.buttonTitle}>Add</Text></TouchableOpacity>
        {/* <TouchableOpacity onPress={() => editCalendarEventWithId(eventId)} style={styles.button2}><Text style={styles.buttonTitle}>Edit</Text></TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => toggleModal()}style={styles.button1} title="Hide modal"><Text style={styles.buttonTitle}>Close Screen</Text></TouchableOpacity> */}
        </View>
    )
}

export default Calendar;


//IMPORTANT NOTES
//I need to implement a better ui for this because the user will need to specify frequency and so on before I can create the event
//this means that I will be able to show the event info in the screen after it is created 