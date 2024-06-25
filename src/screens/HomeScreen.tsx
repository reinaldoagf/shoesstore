import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { HeroSpace } from '../components/HeroSpace';
import { SwiperComponent } from '../components/SwiperComponent';



export default function HomeScreen() {

  return (<>
    <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>New Collection</Text>
        <Text style={styles.subtitle}>Nike Original 2024</Text>
      </View>
      {/* hero */}
      <View style={styles.section}>
        <HeroSpace />
      </View>
    </View>

      {/* test */}    
      <SwiperComponent />
  </SafeAreaView>
  </>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  header: {
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  subtitle: {
    color: '#ff8462',
  },
  section: {
    height: 180,
    marginBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
})