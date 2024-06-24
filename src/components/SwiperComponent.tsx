// SwiperComponent.tsx

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, LogBox, Text, TouchableOpacity } from 'react-native';
import CarouselPager from 'react-native-carousel-pager';
import { TabBarIcon } from './TabBarIcon';
import { useProductStore } from '../store/productStore';

export const SwiperComponent = () => {
  const {
      products,
      updateProduct,
  } = useProductStore((state:any) => ({
      products: state.products,
      updateProduct: state.updateProduct,
  }));

  const carouselRef = useRef(null);

  // Crear una referencia de animación para cada elemento del carrusel
  const animValues = useRef(
    products.map(() => ({
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      rotate: new Animated.Value(0), // Inicializamos con 0
      opacity: new Animated.Value(0), // Inicializamos con 0
    }))
  ).current;

  useEffect(() => {
    startAnimation(1);
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const handlePageChange = (page: number) => {
    startAnimation(page);
  };

  // Función para iniciar la animación
  const startAnimation = (page: number) => {
    animValues.forEach((anim, index) => {
      // Detener cualquier animación en curso antes de iniciar una nueva
      anim.translateY.stopAnimation();
      anim.translateX.stopAnimation();
      anim.rotate.stopAnimation();
      anim.opacity.stopAnimation();

      // Resetear todos los elementos y animar solo el elemento activo
      Animated.parallel([
        Animated.timing(anim.translateY, {
          toValue: index === page ? -50 : 0, // Elevar el item activo
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateX, {
          toValue: index === page ? -20 : 0, // Elevar el item activo
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.rotate, {
          toValue: index === page ? 1 : 0, // Valor numérico para la rotación
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: index === page ? 1 : 0, // Valor numérico para la opacidad
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleLikeToggle = (item: any) => { 
    updateProduct(item.id, {...item, liked: !item.liked});
  }

  return (
    <View style={styles.container}>
      <CarouselPager
        ref={carouselRef}
        initialPage={1}
        pageStyle={{
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        onPageChange={handlePageChange}
      >
        {products.map((item: any, index: number) => {
          // Interpolación para convertir el valor numérico a grados
          const rotateInterpolation = animValues[index].rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-45deg'],
          });

          return (
            <View key={index} style={styles.pageStyle}>
              <Animated.View // Vista animada que cambiará su opacidad
                style={[
                  styles.priceContainer,
                  {
                    opacity: animValues[index].opacity, // Vincula el valor animado a la opacidad
                  },
                ]}
              >
                <Text style={styles.priceText}>
                  ${item.price}
                </Text>{/* Caja que se desvanece */}
              </Animated.View>
              {item.image && (
                <Animated.Image
                  source={item.image}
                  style={[
                    {
                      transform: [
                        { translateY: animValues[index].translateY },
                        { translateX: animValues[index].translateX },
                        { rotate: rotateInterpolation }, // Aplicar la rotación interpolada
                      ],
                    },
                  ]}
                />
              )}
              <Animated.View // Vista animada que cambiará su opacidad
                style={[
                  styles.infoContainer,
                  {
                    opacity: animValues[index].opacity, // Vincula el valor animado a la opacidad
                  },
                ]}
              >
                <View>
                  <Text style={styles.infoTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.infoDescription}>
                    {item.description}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => { handleLikeToggle(item) }}>
                    <TabBarIcon 
                      size={35} 
                      name={item.liked ? 'heart' : 'heart-outline'} 
                      color={'red'} 
                      style={{ marginBottom: 0 }} 
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          );
        })}
      </CarouselPager>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  pageStyle: {
    height: 320,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#d8ecfe',
  },
  pagePrice: {
    backgroundColor: '#ccc',
    height: 15,
    width: 50
  },
  priceContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#002446',
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: 80,
  },
  priceText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  infoContainer: {
    padding: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  infoDescription: {
    fontSize: 14
  },
});
