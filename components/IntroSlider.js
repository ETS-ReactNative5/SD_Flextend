import AppIntroSlider from 'react-native-app-intro-slider';
import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, StatusBar, Animated, Easing, ImageBackground} from 'react-native';
import { useState, useEffect, useReducer }from "react";
import styles from '../styles/GuideStyle';

//slides data 
const slides = [
  {
    key: 'one',
    title: '',
    text: '',
    image: require('../images/guide1.png'),
    backgroundColor: '',
  },
  {
    key: 'two',
    title: '',
    text: '',
    image: require('../images/guide2.png'),
    backgroundColor: '',
  },
  {
    key: 'three',
    title: 'Progress Reports',
    text: 'See How You Are Doing',
    image: require('../images/guide3.png'),
    backgroundColor: '',
  },
  {
    key: 'four',
    title: 'Set Reminders',
    text: 'We Help You Keep Your Agenda',
    image: require('../images/guide4.png'),
    backgroundColor: '',
  }
  
];


const IntroSlider = ({navigation}) => {

  ///////////////////////////// Animating the slides ////////////////////////////////////////////////
  const startValue = new Animated.Value(1);
  const endValue = 1.1;
  const duration = 2000;

  useEffect(() => {
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [startValue, endValue, duration]);

  

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex:1, backgroundColor: item.backgroundColor}}>
        <ImageBackground source={item.image} style={{width: '100%', height: '100%', resizeMode:'contain'}}>
          {/* <Text style={styles.title}>{item.title}</Text>
          <Animated.View style={[styles.container, {transform: [ {scale: startValue,}, ], }, ]}>
            <Image style={styles.image} source={item.image} />
          </Animated.View>
          <Text style={styles.text}>{item.text}</Text> */}
        </ImageBackground>
        
      </View>
    );
  }

  
  const onDone = () => {
    // const navigate = this.props.navigation.navigate;
    navigation.navigate('Home')
  }

  const onSkip = () => {
    // const navigate = this.props.navigation.navigate;
    navigation.navigate('Home')
  }

  
  return (
    <AppIntroSlider 
      renderItem={renderItem} 
      data={slides} 
      onDone={onDone} 
      onSkip={onSkip}
      showSkipButton
      showPrevButton/>
  ); 
}

export default IntroSlider;