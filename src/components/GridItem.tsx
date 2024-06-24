import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { formatCurrency, getSupportedCurrencies } from 'react-native-format-currency';
import { TabBarIcon } from '../components/TabBarIcon';
/* import { usePlateStore } from '../store/plateStore'; */
import { LinearGradient } from 'expo-linear-gradient';

export function GridItem({ item }: { item: any }) {
    /* const setCurrentPlate = usePlateStore((state: any) => state.setCurrentPlate); */
    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: item.price || 0, code: "USD" })

    return (
        <>
            <TouchableOpacity style={styles.item} onPress={() => {
                /* setCurrentPlate(item) */
            }}>
                {/* <Image
                    style={styles.image}
                    source={{ uri: source={require("../../assets/nike.png")} }}
                /> */}
                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.itemGradient}
                >
                    {
                        item.price && (
                            <>
                                <View style={styles.triangle} />
                                <View style={styles.topItemInfo}>
                                    <Text style={styles.itemPrice}>{valueFormattedWithSymbol}</Text>
                                </View>
                            </>
                        )
                    }

                    <View style={styles.bottomItemInfo}>
                        <View style={styles.bottomItemInfoFavs}>
                            <TabBarIcon size={10} name={'star'} color={'#fff'} style={{marginBottom:0}}/>
                            <Text style={styles.itemFavsQuantity}>{item.favs || 0}</Text>
                        </View>
                        <Text style={styles.itemName}>{item.title}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
    item: {
        position: 'relative',
        backgroundColor: '#ddd',
        margin: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        marginHorizontal: 1,
    },
    itemGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,
    },
    topItemInfo: {
        position: 'absolute',
        right: 2,
    },
    bottomItemInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        gap: 2,
        left: 5,
        bottom: 5
    },
    bottomItemInfoFavs: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
    },
    itemFavsQuantity: {
        color: '#fff',
        lineHeight: 15,
        fontSize: 10,
    },
    itemName: {
        color: '#fff',
        lineHeight: 12,
        fontSize: 10,
    },
    itemPrice: {
        zIndex: 10,
        color: '#fff',
        fontWeight: 'bold',
        right: 2,
        top: 2,
        fontSize: 9,
    },
    triangle: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderLeftWidth: 40,  // Tamaño del triángulo
        borderBottomWidth: 20, // Tamaño del triángulo
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightWidth: 40,  // Tamaño del triángulo
        borderTopWidth: 20,    // Tamaño del triángulo
        borderRightColor: '#ff6347',  // Color del triángulo
        borderTopColor: '#ff6347',    // Color del triángulo
    },
});