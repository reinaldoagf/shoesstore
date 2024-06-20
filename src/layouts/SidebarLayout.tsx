// SidebarLayout.tsx
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import TabLayout from './TabLayout';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

export default function SidebarLayout() {
  const colorScheme = useColorScheme();


  return (
    <Drawer.Navigator
      initialRouteName='Index'
      screenOptions={{
        drawerActiveBackgroundColor: Colors[colorScheme ?? 'light'].secondColor,
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].whiteColor,
        drawerInactiveTintColor: Colors[colorScheme ?? 'light'].whiteColor,
        drawerStyle: {
          backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.mainColor, // Cambia el color de fondo del drawer
        },
      }}
    >
      <Drawer.Screen
        name='Index'
        component={TabLayout}
        options={{ 
          drawerLabel: 'Inicio', 
          headerShown: true, 
          headerTitle: 'Milcomidas',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.mainColor,
          },
          headerBackgroundContainerStyle: {
            backgroundColor: "red",
          },
          headerTintColor: Colors[colorScheme ?? 'light'].whiteColor,
          headerRightContainerStyle: {
            paddingRight: 10
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => {
              console.log("headerRight")
            }}>
              <Ionicons name="camera" size={25} color={Colors[colorScheme ?? 'light'].whiteColor} />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
