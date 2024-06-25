import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { useShoppingCartStore } from '../store/shoppingCartStore';

const steps = [
    {
        image: require("../../assets/shoes/airmax270-1.png"),
        color: "#b1baee",
        price: 40.5,
        title: "Nike Air Max 270",
        description: "Nike womens Moderns"
    },
    {
        image: require("../../assets/shoes/junipertrail-2.png"),
        color: "#f88268",
        price: 50.5,
        title: "Nike Juniper Trail",
        description: "Zapatillas de trail running - Hombre"
    },
    {
        image: require("../../assets/shoes/streakfly-1.png"),
        color: "#caeb7e",
        price: 45.5,
        title: "Nike Streakfly",
        description: "Zapatillas de competición para asfalto"
    }, {
        image: require("../../assets/shoes/zoomfly-1.png"),
        color: "#ff4583",
        price: 65.0,
        title: "Nike Zoom Fly 3",
        description: "Amortiguación de la puntera al talón"
    },
];

export function HeroSpace() {
    const {
        addItem,
    } = useShoppingCartStore((state:any) => ({
        addItem: state.addItem,
    }));

    const handleAddToShoppingCart = (item:any) => {
        addItem(item)
    }

    return (
        <>
            <Swiper
                style={styles.slideWrapper}
                autoplay={true}
                autoplayTimeout={5}
                dotColor='gray'
                activeDotColor='#ff8462'
                paginationStyle={{
                    display: 'flex',
                    position: 'absolute',
                    flex: 1,
                    justifyContent: 'center',
                    bottom: -15
                }}
            >
                {
                    steps.map((item: any, index: number) => (
                        <View key={index} style={styles.slide}>
                            <LinearGradient
                                // Background Linear Gradient
                                colors={[item.color, '#fff']}
                                style={styles.slideBackground}
                            >
                                <View style={styles.slideInfo}>
                                    <View>
                                        <Text style={styles.slideTitle}>{item.title}</Text>
                                        <Text style={styles.slideSubtitle}>{item.description}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.slideCallToAction}
                                        onPress={() => { handleAddToShoppingCart(item) }}>
                                        <Text style={styles.slideCallToActionText}>Add to shopping cart</Text>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                            {
                                item.image && (
                                    <View>
                                        <Image source={item.image} style={styles.slideImage} />
                                    </View>
                                )
                            }
                        </View>
                    ))
                }
            </Swiper>
        </>
    )
}

const styles = StyleSheet.create({
    slideWrapper: {
        height: 180
    },
    slideBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 160,
        borderRadius: 10
    },
    slideInfo: {
        display: 'flex',
        flexDirection: 'column',
        left: 10,
        gap: 20,
        top: 20
    },
    slideTitle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    slideSubtitle: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    slideImage: {
        zIndex: 1,
        width: 180,
        height: 100,
        transform: [
            { translateY: 5 },
            { translateX: 100 },
            { rotate: '-45deg' }
        ]
    },
    slideCallToAction: {
        width: 180,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff8462'
    },
    slideCallToActionText: {
        color: '#fff',
    },
    slide: {
        position: 'relative',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
});
