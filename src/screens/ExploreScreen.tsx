import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import { GridItem } from '../components/GridItem';
import { useProductStore } from '../store/productStore';

export default function ExploreScreen() {
  // Obtén los productos del store
  const products = useProductStore((state) => state.products);

  const numColumns = 2;  

  const renderProductItem = ({ item }: { item: any }) => {
    return (
      <GridItem item={item} numColumns={numColumns}/>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper} 
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
    alignItems: 'flex-start', // Alinea el contenido en el centro
  }, 
  columnWrapper: {
    justifyContent: 'center', // Ajusta el espacio entre columnas
  },
});
