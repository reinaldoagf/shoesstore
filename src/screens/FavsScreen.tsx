import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default function FavsScreen() {
  return (
    <View style={styles.container}>
      <Text>FavsScreen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})