import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useProductStore } from '../store/productStore';
import { useShoppingCartStore } from '../store/shoppingCartStore';
import { TabBarIcon } from '../components/TabBarIcon';

export default function ProductDetailScreen() {
  const {
    currentProduct,
    setCurrentProduct
  } = useProductStore((state: any) => ({
    currentProduct: state.currentProduct,
    setCurrentProduct: state.setCurrentProduct,
  }));
  const {
    shoppingCart,
    addItem,
  } = useShoppingCartStore((state: any) => ({
    shoppingCart: state.shoppingCart,
    addItem: state.addItem,
  }));



  const productViewRef = useRef(null);
  const infoViewRef = useRef(null);

  const startAnimation = () => {
    productViewRef.current?.fadeOutRight(300).then(() => {
      productViewRef.current?.fadeInLeft(300);
    });
    infoViewRef.current?.fadeInUp(800).then(() => {
      infoViewRef.current?.fadeInDown(-800);
    });
  };
  const handleAddToShoppingCart = (item: any) => {
    addItem(item)
  }

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <LinearGradient
      // Background Linear Gradient
      style={styles.container}
      colors={[currentProduct.color, 'transparent']}
    >
      <View style={[styles.container, {
        paddingBottom: Platform.OS === 'android' ? 10 : 30,
        paddingVertical: Platform.OS === 'android' ? 10 : 20
      }]}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => {
              setCurrentProduct(null)
            }}>
              <TabBarIcon
                size={25}
                name={'arrow-back-outline'}
                color={'#000'}
                style={{ marginBottom: 0 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/nike.png")} style={styles.logo} />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => {
              console.log("show cart")
            }}>
              <View style={styles.cartProducts}>
                <Text style={styles.cartProductsNumber}>
                  {shoppingCart.length}
                </Text>
              </View>
              <TabBarIcon name="cart-outline" size={25} color={"#000"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productContainer} >
          <Animatable.View ref={infoViewRef} style={styles.productInfo} animation="fadeInUp">
            <View style={styles.productInfoContent}>
              <Text style={styles.productTitle}>{currentProduct.title}</Text>
              {
                currentProduct.description && (
                  <Text style={styles.productDescription}>{currentProduct.description}</Text>
                )
              }
            </View>
            <Image source={require("../../assets/nike-letter.png")} style={[styles.logoLetter, styles.productInfoContent]} />
          </Animatable.View>
          <Animatable.View ref={productViewRef} animation="fadeInLeft">
            {
              currentProduct.image && (
                <View>
                  <Image source={currentProduct.image} style={styles.image} />
                </View>
              )
            }
          </Animatable.View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPriceTextQuantity}>
            ${currentProduct.price.toFixed(2)}
          </Text>
          <Text style={styles.productPriceText}>
            Price
          </Text>
        </View>
        <View style={styles.productActionsContainer}>
          <TouchableOpacity
            style={styles.addToCart}
            onPress={() => { handleAddToShoppingCart(currentProduct) }}>
            <Text style={styles.addToCartText}>Add to cart</Text>
            
            <TabBarIcon
                size={25}
                name={'cart'}
                color={'#fff'}
                style={{ marginBottom: 0 }}
              />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    paddingVertical: Platform.OS === 'android' ? 30 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10
  },
  headerLeft: {
  },
  headerRight: {
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoLetter: {
    width: 350,
    height: 120,
    opacity: .5
  },
  productInfo: {
    gap: 20,
    paddingHorizontal: 15,
  },
  productInfoContent: {
    transform: [
      { translateY: -100 },]
    ,
  },
  productContainer: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
  },  
  image: {
    width: 400,
    height: 220,
    transform: [
      { translateY: -100 },
      { translateX: -30 },
      { rotate: '-45deg' }
    ]
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPriceContainer: {
    bottom: 0,
    left: 0,
    backgroundColor: '#002446',
    padding: 10,
    paddingRight: 30,
    borderTopRightRadius: 20,
    height: 50,
    justifyContent: 'center',
  },
  productPriceText: {
    color: '#fff',
    fontSize: 12
  },
  productPriceTextQuantity: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  productActionsContainer: {
    paddingHorizontal: 10
  },
  addToCart: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8462',
    borderRadius: 5,
    gap: 10
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
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