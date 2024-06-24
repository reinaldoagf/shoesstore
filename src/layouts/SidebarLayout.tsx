// SidebarLayout.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import TabLayout from './TabLayout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native'; // Importa Image y StyleSheet
import { useShoppingCartStore } from '../store/shoppingCartStore';

const Drawer = createDrawerNavigator();

export default function SidebarLayout() {
  const colorScheme = useColorScheme();

  const {
    shoppingCart,
    setIsModalVisible,
  } = useShoppingCartStore((state: any) => ({
    shoppingCart: state.shoppingCart,
    setIsModalVisible: state.setIsModalVisible,
  }));

  return (
    <Drawer.Navigator
      initialRouteName='Index'
      screenOptions={{
        drawerActiveBackgroundColor: Colors[colorScheme ?? 'light'].secondColor,
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].whiteColor,
        drawerInactiveTintColor: Colors[colorScheme ?? 'light'].whiteColor,
        drawerStyle: {
          backgroundColor: 'white', // Cambia el color de fondo del drawer
        },
      }}
    >
      <Drawer.Screen
        name='Index'
        component={TabLayout}
        options={{
          drawerLabel: 'Inicio',
          headerShown: true,
          headerTitle: '',
          headerBackground: () => (
            <View style={styles.headerImageContainer}>
              <Image
                source={require('../../assets/nike.png')}
                style={[styles.headerImage, { marginTop: StatusBar.currentHeight }]} // Aplica estilos personalizados
              />
            </View>
          ),
          headerTintColor: Colors.light.mainColor,
          headerRightContainerStyle: {
            paddingRight: 10
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => {
              setIsModalVisible(true)
            }}>
              <View style={styles.cartProducts}>
                <Text style={styles.cartProductsNumber}>
                  {shoppingCart.length}
                </Text>
              </View>
              <Ionicons name="cart-outline" size={25} color={Colors.light.mainColor} />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  headerImageContainer: {
    justifyContent: 'center', // Asegura que la imagen cubra el área del header,
    alignItems: 'center',
  },
  headerImage: {
    width: 80,
    height: 50,
  },
  cartProducts: {
    backgroundColor: 'red',
    width: 15,
    height: 15,
    position: 'absolute',
    top: -5,
    right: -5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    zIndex: 1
  },
  cartProductsNumber: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});