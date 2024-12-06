import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    try {
      // Generate a placeholder email
      const email = `${username}@example.com`;

      // Save the user’s information to Firestore
      const userDocRef = doc(db, 'users', username);
      await setDoc(
        userDocRef,
        { username, email }, // Save username and placeholder email
        { merge: true } // Avoid overwriting existing data
      );

      console.log('User data saved to Firestore:', { username, email });

      // Navigate to HomeScreen with the username
      navigation.navigate('Home', { username });
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Not signed in?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800020', // Burgundy color
    marginBottom: 20,
  },
  input: {
    width: '25%', // Make the input boxes narrower
    padding: 8, // Reduce padding for a smaller box
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#800020', // Burgundy color
    paddingVertical: 10, // Smaller height
    paddingHorizontal: 15, // Add a bit of horizontal padding
    borderRadius: 8,
    width: '10%', // Make the button smaller than the input boxes
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
  link: {
    color: '#800020', // Burgundy for the link
    fontWeight: 'bold',
  },
});

export default LoginScreen;