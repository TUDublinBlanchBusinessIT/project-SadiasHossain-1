import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions
import { db } from '../firebaseConfig'; // Firebase configuration

// LoginScreen component
const LoginScreen = ({ navigation }) => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle user login
  const handleLogin = async () => {
    // Validate input fields
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.'); // Show error if fields are empty
      return;
    }

    try {
      // Generate a placeholder email based on the username
      const email = `${username}@example.com`;

      // Save the user’s information to Firestore
      const userDocRef = doc(db, 'users', username); // Reference Firestore document for the user
      await setDoc(
        userDocRef,
        { username, email }, // Save the username and generated email
        { merge: true } // Avoid overwriting existing data
      );

      console.log('User data saved to Firestore:', { username, email }); // Log saved data

      // Navigate to the HomeScreen and pass the username
      navigation.navigate('Home', { username });
    } catch (error) {
      // Handle Firestore errors
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* App logo */}
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Log In</Text>

      {/* Username input field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true} // Mask password input
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Navigation link to SignUp screen */}
      <Text style={styles.linkText}>
        Not signed in?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

// Styles for the component
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800020', // Burgundy color
    marginBottom: 20,
  },
  input: {
    width: '25%', // Width of the input field
    padding: 8, // Padding inside the input field
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8, // Rounded corners for the input field
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#800020', // Burgundy background color for the button
    paddingVertical: 10, // Vertical padding for the button
    paddingHorizontal: 15, // Horizontal padding for the button
    borderRadius: 8, // Rounded corners for the button
    width: '10%', // Button width relative to the screen
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
  link: {
    color: '#800020', // Burgundy color for the link
    fontWeight: 'bold',
  },
});

export default LoginScreen;
