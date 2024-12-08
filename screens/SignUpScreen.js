// Import necessary React and React Native components
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { collection, addDoc } from 'firebase/firestore'; // Firebase Firestore functions
import { db } from '../firebaseConfig'; // Firebase configuration

// Main SignUpScreen component
const SignUpScreen = ({ navigation }) => {
  // State variables to manage user input
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle the sign-up process
  const handleSignUp = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match!"); // Show alert if passwords don't match
      return;
    }

    try {
      // Add user data to Firestore
      await addDoc(collection(db, 'users'), {
        email: email, // Save email
        username: username, // Save username
      });

      // Navigate to HomeScreen and pass the username
      navigation.navigate('Home', { username });
    } catch (e) {
      // Handle errors during Firestore operations
      console.error('Error adding user: ', e);
      alert('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* App logo */}
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />

      {/* Screen title */}
      <Text style={styles.title}>Sign Up</Text>

      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Username input field */}
      <TextInput
        style={styles.input}
        placeholder="Create Username"
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

      {/* Confirm Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Re-write Password"
        secureTextEntry={true} // Mask password input
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {/* Sign-Up button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigation link to Login screen */}
      <Text style={styles.linkText}>
        Already created an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Log In
        </Text>
      </Text>
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
  title: {
    fontSize: 24, // Font size for the title
    fontWeight: 'bold', // Bold font
    color: '#800020', // Burgundy color for the title
    marginBottom: 20, // Space below the title
  },
  input: {
    width: '25%', // Width of the input field
    padding: 8, // Padding inside the input field
    borderWidth: 1, // Border width
    borderColor: '#ddd', // Light gray border color
    borderRadius: 8, // Rounded corners for the input field
    marginBottom: 15, // Space below each input field
    fontSize: 16, // Font size for input text
  },
  button: {
    backgroundColor: '#800020', // Burgundy background color for the button
    paddingVertical: 10, // Vertical padding for the button
    paddingHorizontal: 15, // Horizontal padding for the button
    borderRadius: 8, // Rounded corners for the button
    width: '10%', // Button width relative to the screen
    alignItems: 'center', // Center align button text
    marginTop: 10, // Space above the button
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16, // Font size for the button text
    fontWeight: '600', // Slightly bold text
  },
  linkText: {
    marginTop: 10, // Space above the link text
    fontSize: 14, // Font size for the link text
    color: '#000', // Black color for the link text
  },
  link: {
    color: '#800020', // Burgundy color for the link
    fontWeight: 'bold', // Bold text for the link
  },
});

export default SignUpScreen;