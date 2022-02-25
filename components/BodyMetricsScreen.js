import { useState, useEffect, useReducer }from "react";
import * as React from "react";
import { StatusBar, StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView, Switch, TextInput } from "react-native";
import styles1 from '../styles/ProfileStyle';


const Profile = ({route}) => {

        

    return (
        <ScrollView style={styles1.scroll}>
            <Text>
            Values passed from First page: {route.params.age}
            Values passed from First page: {route.params.weight}
            </Text>
        </ScrollView>
    );
}

export default Profile;

