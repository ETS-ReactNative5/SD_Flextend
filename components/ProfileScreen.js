import * as React from "react";
import { StatusBar, StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView } from "react-native";
import { ImageOrVideo } from "react-native-image-crop-picker";
import { Avatar } from "../Profile_components/Avatar";
import Modal from "react-native-modal";
import styles from '../styles/HomeStyle';

export default class Pofile extends React.Component {

    //for profile picture
  onAvatarChange = (image: ImageOrVideo) => {
    console.log(image);
    // upload image to server here
  };

   //for pop up screen
    state = {
        isModalVisible:false
    }

    openModal = () =>{
        this.setState({
            isModalVisible:true
        })
    }
    closeModal = () =>{
        this.setState({
            isModalVisible:false
        })
    }

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

                    <TouchableOpacity onPress={() => this.openModal()} style={styles.button1}><Text style={styles.buttonTitle}>Set Body Metrics</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openModal()} style={styles.button2}><Text style={styles.buttonTitle}>Set Goals</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openModal()} style={styles.button1}><Text style={styles.buttonTitle}>Set Reminders</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openModal()} style={styles.button3}><Text style={styles.buttonTitle}>Progress</Text></TouchableOpacity>

                    <Modal isVisible={this.state.isModalVisible} style={{backgroundColor:'white'}}>
                        <View style={{ flex: 1 }}>
                        <Text>Hello!</Text>
                        <TouchableOpacity onPress={() => this.closeModal()}style={styles.button1} title="Hide modal"><Text style={styles.buttonTitle}>Close Screen</Text></TouchableOpacity>
                        </View>
                    </Modal>

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