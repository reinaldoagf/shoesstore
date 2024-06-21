import React from 'react';
import LoginScreen from './src/screens/HomeScreen';
import WelcomeInstructionsScreen from './src/screens/WelcomeInstructionsScreen';

export default function App() {
  return (
    true ? <WelcomeInstructionsScreen /> : <LoginScreen />
  );
}


