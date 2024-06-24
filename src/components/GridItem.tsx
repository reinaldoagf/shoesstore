import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import { TabBarIcon } from './TabBarIcon';
import { useProductStore } from '../store/productStore';

export function GridItem({ item, numColumns }: { item: any, numColumns: number }) {

    // Obtén las dimensiones de la pantalla
    const { width } = Dimensions.get('window');

    // Calcula el ancho del item
    const itemWidth = (width - (numColumns + 1) * 10) / numColumns;
    const itemHeight = 200; // Altura deseada para cada item
    // Obtén los productos favoritos del store
    const updateProduct = useProductStore((state) =>
      state.updateProduct
    );
    const handleLikeToggle = (item: any) => {
      updateProduct(item.id, { ...item, liked: !item.liked });
    }
    return (
        <>
            <TouchableOpacity onPress={() => { console.log({ item }) }}>
                <View style={[styles.productContainer, { width: itemWidth, height: itemHeight }]}>
                    <View style={styles.productPriceContainer}>
                        <Text style={styles.productPriceText}>
                            ${item.price.toFixed(2)}
                        </Text>
                    </View>
                    <Image source={item.image} style={styles.productImage} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.productDescription}>{item.description}</Text>
                    </View>
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
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        backgroundColor: '#d8ecfe',
        borderRadius: 20,
        padding: 10,
        margin: 5, // Espacio alrededor del item
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    productDetails: {
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
    productPriceContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#002446',
        padding: 10,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: 80,
    },
    productPriceText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    productActions: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});