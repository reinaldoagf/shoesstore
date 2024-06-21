import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
/* import { Shadow } from 'react-native-shadow-2';  */
import { Dots } from '../components/Dots';

const steps = [
  {
    image: require("../../assets/shoes/airmax270-1.png"),
    color: "#b1baee",
    title: "¡Bienvenido a Nike Sports Store!",
    description: "Explora lo último en zapatos deportivos. Estilo y rendimiento se unen en cada paso."
  },
  {
    image: require("../../assets/shoes/junipertrail-2.png"),
    color: "#f88268",
    title: "¡Empieza tu Viaje con Nike!",
    description: "Descubre calzado innovador diseñado para acompañarte en cada meta. ¡Vamos a correr!"
  },
  {
    image: require("../../assets/shoes/streakfly-1.png"),
    color: "#caeb7e",
    title: "¡Descubre la Excelencia con Nike!",
    description: "Encuentra tus zapatillas ideales para cada desafío. Nike, donde el rendimiento es todo."
  }, {
    image: require("../../assets/shoes/zoomfly-1.png"),
    color: "#ff4583",
    title: "¡Nike te da la Bienvenida!",
    description: "Sumérgete en el mundo de Nike. Elige entre nuestros mejores zapatos deportivos y luce increíble."
  },
];

export default function WelcomeInstructionsScreen() {
  const stepViewRef = useRef(null);
  const infoViewRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      stepViewRef.current?.fadeOutRight(300).then(() => {
        setCurrentStep(currentStep + 1);
        stepViewRef.current?.fadeInLeft(300);
      });
      infoViewRef.current?.fadeInUp(300).then(() => {
        infoViewRef.current?.fadeInDown(300);
      });
    } else {
      console.log("else")
      /* setProfile({ ...profile, is_new: false }) */
    }
  };

  const handleSkip = () => {
    console.log("handleSkip")
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      style={styles.container}
      colors={[steps[currentStep].color, 'transparent']}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/nike.png")} style={styles.logo} />
        </View>
        <View  style={styles.stepContainer} >
          <Animatable.View ref={infoViewRef} style={styles.stepInfo} animation="fadeInUp">
            <View>
              <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
              {
                steps[currentStep].description && (
                  <Text style={styles.stepDescription}>{steps[currentStep].description}</Text>
                )
              }
            </View>
            <Image source={require("../../assets/nike-letter.png")} style={styles.logoLetter} />
          </Animatable.View>
          <Animatable.View ref={stepViewRef} animation="fadeInLeft">

            {
              steps[currentStep].image && (
                <View>
                  <Image source={steps[currentStep].image} style={styles.image} />
                </View>
              )
            }
          </Animatable.View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Saltar</Text>
        </TouchableOpacity>
        <Dots currentStep={currentStep} totalSteps={steps.length} />
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20
  },
  title: {
    fontFamily: 'Anton',
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
  },
  logoLetter: {
    width: 350,
    height: 120,
    opacity: .5
  },
  stepInfo: {
    gap: 20,
    paddingHorizontal: 15
  },
  stepContainer: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  stepDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontWeight: 'bold',
    color: '#b1b1b1',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#ff8462',
    padding: 10,
    borderRadius: 5,
  },
  nextText: {
    color: '#FFF',
    fontSize: 16,
  },
  image: {
    width: 400,
    height: 220,
    transform: [
      { translateY: -50 },
      { translateX: -30 },
      { rotate: '-45deg' }
    ]
  },
});
