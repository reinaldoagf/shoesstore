// TabLayout.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native'; // Importa View y StyleSheet
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FavsScreen from '../screens/FavsScreen';
import { Colors } from '../constants/Colors';

const MainTab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarInactiveTintColor: Colors.light.mainColor, // Color de los íconos inactivos
        tabBarActiveTintColor: Colors.light.mainColor, // Color de los íconos activos
        headerShown: false, // Oculta el header en cada tab
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getIconName(route.name); // Función auxiliar para obtener el nombre del ícono
          return (
            <View style={focused ? styles.activeIconContainer : null}>
              <Ionicons name={iconName} color={color} size={size} />
            </View>
          );
        },
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Explore" component={ExploreScreen} />
      <MainTab.Screen name="Favs" component={FavsScreen} />
    </MainTab.Navigator>
  );
}

// Función auxiliar para obtener el nombre del ícono basado en la ruta
const getIconName = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Explore':
      return 'search';
    case 'Favs':
      return 'heart';
    default:
      return 'home';
  }
};

// Estilos
const styles = StyleSheet.create({
  activeIconContainer: {
    width: 100,
    height: 50,// 50% del tamaño para hacer el borde redondo
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ff8462',
    borderTopWidth: 2
  },
});
