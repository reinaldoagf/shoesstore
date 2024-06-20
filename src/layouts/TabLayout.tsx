// TabLayout.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

const MainTab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();
    return (
      <MainTab.Navigator screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: Colors[colorScheme ?? 'light'].secondColor, // Ajusta el color del borde superior del tab bar
          backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.mainColor, // Ajusta el color de fondo del tab bar
        },
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].whiteColor, // Color de los íconos inactivos
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].secondColor, // Color de los íconos activos
        headerShown: false, // Oculta el header en cada tab
      }}>
        <MainTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }: { color: string, size: number }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <MainTab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }: { color: string, size: number }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }: { color: string, size: number }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </MainTab.Navigator>
    );
  }