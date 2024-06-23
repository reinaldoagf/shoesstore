import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HeroSpace } from '../components/HeroSpace';

export default function HomeScreen() {
  return (<>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>New Collection</Text>
          <Text style={styles.subtitle}>Nike Original 2024</Text>
        </View>
        <ScrollView style={styles.verticalScrollView}>
          {/* hero */}
          <View style={styles.section}>
            <HeroSpace />
          </View>
        </ScrollView>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  verticalScrollView: {
    width: '100%',
  },
  section: {
    marginBottom: 20,
  },
})