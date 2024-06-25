import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform, FlatList, StatusBar, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useProductStore } from '../store/productStore';
import { useShoppingCartStore } from '../store/shoppingCartStore';
import { TabBarIcon } from '../components/TabBarIcon';


export default function ProductDetailScreen() {
  const {
    currentProduct,
    setCurrentProduct,
    getProductById
  } = useProductStore((state: any) => ({
    currentProduct: state.currentProduct,
    setCurrentProduct: state.setCurrentProduct,
    getProductById: state.getProductById,
  }));

  const {
    shoppingCart,
    addItem,
    setIsModalVisible,
  } = useShoppingCartStore((state: any) => ({
    shoppingCart: state.shoppingCart,
    addItem: state.addItem,
    setIsModalVisible: state.setIsModalVisible,
  }));

  const productViewRef = useRef(null);
  const infoViewRef = useRef(null);

  const [sizes, setSizes] = useState([{
    number: 9,
    selected: true
  }, {
    number: 9.5,
    selected: false
  }, {
    number: 10,
    selected: false
  }, {
    number: 10.5,
    selected: false
  }]);

  const handleSelectSize = (item: any) => {
    setSizes([...sizes.map(e => {
      return { ...e, selected: e.number == item.number }
    })])
  }

  const handleSelectProduct = (item: any) => {
    const product = getProductById(item.id)
    setCurrentProduct(product);
  }

  const renderSizeItem = (element: any) => {
    return <TouchableOpacity
      onPress={() => { handleSelectSize(element.item) }}>
      <View style={[styles.sizeItem, {
        backgroundColor: element.item.selected ? "#000" : "gray"
      }]}>
        <Text style={{ color: "#fff" }}>{element.item.number}</Text>
      </View>
    </TouchableOpacity>
  };

  const renderColorItem = (element: any) => {
    return <TouchableOpacity
      onPress={() => { handleSelectProduct(element.item) }}>
      <View style={[styles.colorItem, { backgroundColor: element.item.color }]}></View></TouchableOpacity>
  };

  const startAnimation = () => {
    productViewRef.current?.fadeOutRight(300).then(() => {
      productViewRef.current?.fadeInLeft(300);
    });
    infoViewRef.current?.fadeInUp(800).then(() => {
      infoViewRef.current?.fadeInDown(-800);
    });
  };

  const handleAddToShoppingCart = (item: any) => {
    const size = sizes.find(e => e.selected) ? sizes.find(e => e.selected) : null
    addItem({ ...item, size: size ? size.number : 9 })
  }

  useEffect(() => {
    startAnimation();
  }, [currentProduct]);

  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor: currentProduct.color, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0  }}>
      <LinearGradient
        // Background Linear Gradient
        style={styles.container}
        colors={[currentProduct.color, '#fff']}
      >
        <View style={styles.container}>
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
                setIsModalVisible(true)
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
        <View style={styles.sideContainer}>
          <Text style={styles.sizeTitle}>
            Size
          </Text>
          <FlatList
            data={sizes}
            renderItem={renderSizeItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
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
          <View style={styles.productColorsContainer}>
            <FlatList
              horizontal={true}
              data={currentProduct.colors}
              renderItem={renderColorItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
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
    </SafeAreaView>
    <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 35,
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
    height: 50,
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
    borderTopRightRadius: 20,
    height: 50,
    width: 120,
    justifyContent: 'center',
    flex: 1
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
    flex: 1
  },
  addToCart: {
    bottom: 0,
    left: 0,
    padding: 10,
    borderTopLeftRadius: 20,
    height: 50,
    width: "100%",
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff8462',
    gap: 5,

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
  productColorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  colorItem: {
    width: 20,
    height: 20,
    borderRadius: 100,
    margin: 5
  },
  listContainer: {
    width: '100%',
    justifyContent: 'center', // Alinea el contenido en el centro
  },
  sideContainer: {
    position: 'absolute',
    right: 10,
    bottom: 80
  },
  sizeTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8
  },
  sizeItem: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 5
  },
});