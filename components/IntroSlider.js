import AppIntroSlider from 'react-native-app-intro-slider';
import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, StatusBar, Animated, Easing} from 'react-native';
import { useState, useEffect, useReducer }from "react";
import styles from '../styles/GuideStyle';

//slides data 
const slides = [
  {
    key: 'one',
    title: 'Live Measure',
    text: 'Watch how your knee moves in real time',
    image: require('../images/slide1-1.png'),
    backgroundColor: '#cd5c5c',
  },
  {
    key: 'two',
    title: 'Plan Your Goals',
    text: 'We Help You Keep That Target',
    //image: require('./assets/2.jpg'),
    backgroundColor: '#ffc107',
  },
  {
    key: 'three',
    title: 'Progress Reports',
    text: 'See How You Are Doing',
    //image: require('../images/graph-icon2.jpg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 'four',
    title: 'Set Reminders',
    text: 'We Help You Keep Your Agenda',
    image: require('../images/slide4-1.png'),
    backgroundColor: '#ff6347',
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
      
          <Text style={styles.title}>{item.title}</Text>
          <Animated.View style={[styles.container, {transform: [ {scale: startValue,}, ], }, ]}>
            <Image style={styles.image} source={item.image} />
          </Animated.View>
          <Text style={styles.text}>{item.text}</Text>
        
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