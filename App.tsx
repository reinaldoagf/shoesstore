import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/HomeScreen';
import WelcomeInstructionsScreen from './src/screens/WelcomeInstructionsScreen';

const StackNavigator = createStackNavigator();

export default function App() {
  return (
    true ? <WelcomeInstructionsScreen /> : <LoginScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
