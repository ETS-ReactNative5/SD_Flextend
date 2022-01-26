import AppIntroSlider from 'react-native-app-intro-slider';
import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import styles from '../styles/GuideStyle';

//slides data 
const slides = [
  {
    key: 'one',
    title: 'Live Measure',
    text: 'Watch how your knee moves in real time',
    //image: require('../images/Logo.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Plan Your Goals',
    text: 'We Help You Keep That Target',
    //image: require('./assets/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Progress Reports',
    text: 'See How You Are Doing',
    //image: require('./assets/3.jpg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 'four',
    title: 'Set Reminders',
    text: 'We Help You Keep Your Agenda',
    //image: require('./assets/3.jpg'),
    backgroundColor: '#22bcb5',
  }
  
];


export default class IntroSlider extends React.Component {
  

  //STATE MIGHT BE NEEDED  LATER FOR WHEN SLIDES ARE AVAILABLE IN USER PROFILE 
  // constructor(){
  //   super();
  //   this.state = {
  //     showRealApp: false
  //   }
  // }
    
  _renderItem = ({ item }) => {
    return (
      <View style={{ flex:1, backgroundColor: item.backgroundColor}}>
        <SafeAreaView style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} />
          <Text style={styles.text}>{item.text}</Text>
        </SafeAreaView>
      </View>
    );
  }
  _onDone = () => {
    const navigate = this.props.navigation.navigate;
    navigate("Home")
  }
  render() {
    
    return <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone}/>;
    
  }
}
