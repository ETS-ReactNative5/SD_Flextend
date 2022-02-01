import * as React from "react";
import { StatusBar, StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView } from "react-native";
import { ImageOrVideo } from "react-native-image-crop-picker";
import { Avatar } from "../Profile_components/Avatar";
import styles from '../styles/HomeStyle';

export default class Pofile extends React.Component {

  onAvatarChange = (image: ImageOrVideo) => {
    console.log(image);
    // upload image to server here
  };

    render() {
        return (
            <ScrollView style={styles1.scroll}>
            <ImageBackground  style={{width: '100%', height: '100%'}} source={require("../images/background_image.jpg")} >
                <View style={styles1.userRow}>
                    <Avatar
                    onChange={this.onAvatarChange()}
                    source={require("../images/profile_placeholder.png")} 
                    size={120}
                    />
                </View>
                <View style={styles1.content}>
                    <TouchableOpacity onPress={() => navigate( 'Live Measure' )} style={styles.button1}><Text style={styles.buttonTitle}>Set Body Metrics</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate( 'Metrics' )} style={styles.button2}><Text style={styles.buttonTitle}>Set Goals</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate( 'Progress' )} style={styles.button3}><Text style={styles.buttonTitle}>SetReminders</Text></TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => logout()} style={styles.button2}><Text style={styles.buttonTitle}>Sign Out</Text></TouchableOpacity> */}
                </View>
            </ImageBackground>
            </ScrollView>
        );
    };
}

const styles1 = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
    flex: 1,
  },
  userRow: {
    alignItems: "center",
    padding: 15,
    marginTop: 80,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
});