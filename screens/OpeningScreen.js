// Import necessary React and React Native components
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// OpeningScreen component
const OpeningScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* App logo */}
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />

      {/* Navigate to Login Screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Navigate to Sign Up Screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full height of the screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#fff', // White background
  },
  logo: {
    width: 250, // Width of the logo
    height: undefined, // Let aspect ratio control height
    aspectRatio: 1, // Maintain 1:1 aspect ratio
    resizeMode: 'contain', // Ensure the logo fits within the box
    marginBottom: 20, // Space below the logo
  },
  button: {
    backgroundColor: '#800020', // Burgundy color for buttons
    padding: 15, // Padding inside the button
    borderRadius: 10, // Rounded corners for the button
    width: '60%', // Button width is 60% of the screen
    maxWidth: 300, // Maximum width for larger screens
    marginVertical: 10, // Vertical spacing between buttons
    alignItems: 'center', // Center the text horizontally
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 18, // Font size for the button text
    fontWeight: '600', // Slightly bold text
  },
});

export default OpeningScreen;
