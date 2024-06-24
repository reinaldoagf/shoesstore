// FavsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useProductStore } from '../store/productStore'; 
import { TabBarIcon } from '../components/TabBarIcon';

export default function FavsScreen() {
  // Obtén los productos favoritos del store
  const favoriteProducts = useProductStore((state) =>
    state.products.filter((product) => product.liked)
  );
  const updateProduct = useProductStore((state) =>
    state.updateProduct
  );
  
  const setCurrentProduct = useProductStore((state) =>
    state.setCurrentProduct
  );

  const handleLikeToggle = (item: any) => {
    updateProduct(item.id, { ...item, liked: !item.liked });
  }

  const handleSelectProduct = (item: any) => {
      setCurrentProduct(item);
  }

  const renderProductItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity onPress={() => { handleSelectProduct(item) }}>
        <View style={styles.productContainer}>
          <Image source={item.image} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          </View>
          <View style={styles.productActions}>
            <TouchableOpacity onPress={() => { handleLikeToggle(item) }}>
              <TabBarIcon
                size={35}
                name={item.liked ? 'heart' : 'heart-outline'}
                color={'red'}
                style={{ marginBottom: 0 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos.</Text>
      {favoriteProducts.length === 0 ? (
        <Text style={styles.noFavoritesText}>No hay products favoritos.</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  listContainer: {
    paddingVertical: 10,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#d8ecfe',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 150,
    height: 80,
    borderRadius: 10,
    objectFit: 'cover',
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productActions: {
    justifyContent: 'center',
  },
  noFavoritesText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 20,
  },
});