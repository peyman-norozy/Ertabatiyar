import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDevice } from '../context/DeviceContext';

export function DeviceStatus() {
  const { state } = useDevice();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Device Status</Text>
      <Text style={styles.status}>💡 Light: {state.light}</Text>

      {state.lastMessage && (
        <Text style={styles.message}>{state.lastMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1e1e1e',
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  status: {
    color: '#00ff9c',
    fontSize: 16,
    marginTop: 6,
  },
  message: {
    color: '#aaa',
    marginTop: 4,
  },
});
