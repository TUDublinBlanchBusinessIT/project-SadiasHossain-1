import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert(`Email: ${email}\nUsername: ${username}\nPassword: ${password}`);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Create Username"
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

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Re-write Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Log In Link */}
      <Text style={styles.linkText}>
        Already created an account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Log In
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
    width: '25%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#800020', // Burgundy color
    paddingVertical: 10,
    paddingHorizontal: 15,
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

export default SignUpScreen;