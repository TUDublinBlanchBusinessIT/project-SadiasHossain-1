import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

const OpeningScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')} // Navigate to Login Screen
    >
  <Text style={styles.buttonText}>Log In</Text>
</TouchableOpacity>

    <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')} // Navigate to Sign Up Screen
    >
  <Text style={styles.buttonText}>Sign Up</Text>
</TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 250,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#800020',
    padding: 15,
    borderRadius: 10,
    width: '60%', // Reduce width to 60% of the screen
    maxWidth: 300,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OpeningScreen;