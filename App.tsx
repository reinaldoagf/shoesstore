import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeInstructionsScreen from './src/screens/WelcomeInstructionsScreen';
import { useUserStore } from './src/store/userStore';

export default function App() {
  const {
    currentUser,
  } = useUserStore((state:any) => ({
    currentUser: state.currentUser,
  }));
  return (
    currentUser.showTutorial ? 
      <WelcomeInstructionsScreen /> : 
      <HomeScreen />
  );
}


