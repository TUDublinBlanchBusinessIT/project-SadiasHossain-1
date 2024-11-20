import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Username: ${username}, Password: ${password}`);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Log In</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Log In Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.linkText}>
        Not signed in?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('SignUp')}
        >
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
    marginBottom: 20
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