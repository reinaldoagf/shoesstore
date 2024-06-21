import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SidebarLayout from './src/layouts/SidebarLayout';
import WelcomeInstructionsScreen from './src/screens/WelcomeInstructionsScreen';
import { useUserStore } from './src/store/userStore';

export default function App() {
  const {
    currentUser,
  } = useUserStore((state: any) => ({
    currentUser: state.currentUser,
  }));

  const navigationRef = useRef(null);

  return (
    <NavigationContainer ref={navigationRef}>
      {
        currentUser.showTutorial ? <WelcomeInstructionsScreen /> : <SidebarLayout />
      }
    </NavigationContainer>
  );
}


