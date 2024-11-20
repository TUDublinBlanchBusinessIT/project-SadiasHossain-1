import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OpeningScreen from './screens/OpeningScreen';
import LoginScreen from './screens/LoginScreen'; // Import the new Login Screen
import SignUpScreen from './screens/SignUpScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Opening">
        <Stack.Screen
          name="Opening"
          component={OpeningScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Log In' }} // Adds a header with "Log In" text
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
