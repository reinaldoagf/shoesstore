import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Modal, View, Text, Platform, TouchableOpacity, Image, FlatList, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TabBarIcon } from './TabBarIcon';
import { useShoppingCartStore } from '../store/shoppingCartStore';

export function ShoppingCartModal() {
    // Obtén las dimensiones de la pantalla
    const { height } = useWindowDimensions();
    // Calcula el 80% del alto de la pantalla
    const maxHeight = height * 0.7;

    const {
        isModalVisible,
        setIsModalVisible,
        shoppingCart,
        addItem,
        removeItem,
        deleteItem
    } = useShoppingCartStore(state => ({
        isModalVisible: state.isModalVisible,
        setIsModalVisible: state.setIsModalVisible,
        shoppingCart: state.shoppingCart,
        addItem: state.addItem,
        removeItem: state.removeItem,
        deleteItem: state.deleteItem,
    }));

    // Calcula el total de los precios de los productos en el carrito
    const total = shoppingCart.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    // Acción del botón de pago
    const handlePayment = () => {
        // Implementar la lógica para proceder al pago
        console.log('Proceeding to payment...');
    };
    // Renderiza cada item del carrito
    const renderCartItem = ({ item }: { item: any }) => (
        <View style={styles.productItemContainer}>
            <View style={styles.productContainer}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productDescription}>{item.description}</Text>
                    <View style={styles.productPriceAndSize}>
                        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                        <View style={styles.productSizeContainer}>
                            <Text style={styles.productSize}>Size: {item.size ? item.size : 9}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.productActions}>
                <View style={styles.productQuantityActions}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'gray', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
                        onPress={() => {
                            removeItem(item)
                        }}>
                        <TabBarIcon
                            size={35}
                            name={'remove'}
                            color={'#000'}
                            style={{ marginBottom: 0 }}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 2 }}>
                        <Text style={{ textAlign: 'center' }}>{item.quantity}</Text>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: 'gray', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
                        onPress={() => {
                            addItem(item)
                        }}>
                        <TabBarIcon
                            size={35}
                            name={'add'}
                            color={'#000'}
                            style={{ marginBottom: 0 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.productActions}>
                    <TouchableOpacity onPress={() => { deleteItem(item) }}>
                        <TabBarIcon
                            size={35}
                            name={'trash'}
                            color={'red'}
                            style={{ marginBottom: 0 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <LinearGradient style={styles.modalContent} colors={['#ede7f6', '#fff']}>
                    <View style={styles.modalHeader}>
                        <Text>Shopping Cart</Text>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(false)}>
                            <TabBarIcon
                                name={'close'}
                                size={18}
                                color={'#000'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.modalBodyContainer, { paddingBottom: Platform.OS === 'android' ? 0 : 20 }]}>
                        <View style={styles.modalBodyContent}>
                            <FlatList
                                data={shoppingCart}
                                renderItem={renderCartItem}
                                keyExtractor={(item) => `${item.id}-${item.size}`}
                                contentContainerStyle={styles.listContainer}
                                style={{ maxHeight: maxHeight }} // Aplica el maxHeight
                            />
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
                            <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
                                <Text style={styles.paymentButtonText}>Pay Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    modalBodyContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        gap: 20
    },
    modalBodyContent: {
        gap: 5
    },
    listContainer: {
        flexGrow: 1,
    },
    productItemContainer: {
        backgroundColor: '#d8ecfe',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        gap: 10
    },
    productContainer: {
        flexDirection: 'row',
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    productPriceAndSize: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    productSizeContainer: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5
    },
    productSize: {
        fontSize: 12,
        color: '#fff',
    },
    productActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    productQuantityActions: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    footer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    paymentButton: {
        backgroundColor: '#ff8462',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    paymentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});