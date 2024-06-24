import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SidebarLayout from './src/layouts/SidebarLayout';
import WelcomeInstructionsScreen from './src/screens/WelcomeInstructionsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import { useUserStore } from './src/store/userStore';
import { useProductStore } from './src/store/productStore';

export default function App() {
  const {
    currentUser,
  } = useUserStore((state: any) => ({
    currentUser: state.currentUser,
  }));

  const {
    currentProduct,
  } = useProductStore((state: any) => ({
    currentProduct: state.currentProduct,
  }));

  const navigationRef = useRef(null);

  return (
    <NavigationContainer ref={navigationRef}>
      {
        currentUser.showTutorial ? 
        <WelcomeInstructionsScreen /> : 
        ( 
          currentProduct ? 
          <ProductDetailScreen /> : 
          <SidebarLayout />
        )        
      }
    </NavigationContainer>
  );
}


