import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const Dots = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
    // Crear una referencia para almacenar los valores de animación de cada punto
    const widthAnims = useRef(
        Array.from({ length: totalSteps }, () => new Animated.Value(10))
    ).current;

    useEffect(() => {
        // Resetea todos los puntos a su tamaño inicial
        widthAnims.forEach((anim, index) => {
            if (index !== currentStep) {
                Animated.timing(anim, {
                    toValue: 10,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            }
        });

        // Anima el punto activo a su tamaño final
        Animated.timing(widthAnims[currentStep], {
            toValue: 20,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [currentStep]);

    return (
        <View style={styles.dotsContainer}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.dot,
                        { width: widthAnims[index] }, // Aplicar la animación de ancho
                        currentStep === index && styles.activeDot, // Cambiar el color del punto activo
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#CCCCCC',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#ff8462', // Naranja
    },
});
