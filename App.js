// Import necessary React and React Native components
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Container for navigation
import { createStackNavigator } from '@react-navigation/stack'; // Stack navigator for screen transitions
import OpeningScreen from './screens/OpeningScreen'; // Import Opening screen
import LoginScreen from './screens/LoginScreen'; // Import Login screen
import SignUpScreen from './screens/SignUpScreen'; // Import Sign-Up screen
import HomeScreen from './screens/HomeScreen'; // Import Home screen
import DealsScreen from './screens/DealsScreen'; // Import Deals screen
import ProfileScreen from './screens/ProfileScreen'; // Import Profile screen

// Create a Stack Navigator instance
const Stack = createStackNavigator();

export default function App() {
  return (
    // Wrap the app with NavigationContainer to enable navigation
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Opening"> 
        {/* Define the initial screen as the Opening screen */}

        {/* Opening Screen */}
        <Stack.Screen
          name="Opening" // Name of the screen
          component={OpeningScreen} // Component to render
          options={{ headerShown: false }} // Hide the header bar
        />

        {/* Login Screen */}
        <Stack.Screen
          name="Login" // Name of the screen
          component={LoginScreen} // Component to render
          options={{ title: 'Log In' }} // Title displayed in the header bar
        />

        {/* Sign-Up Screen */}
        <Stack.Screen
          name="SignUp" // Name of the screen
          component={SignUpScreen} // Component to render
          options={{ title: 'Sign Up' }} // Title displayed in the header bar
        />

        {/* Home Screen */}
        <Stack.Screen
          name="Home" // Name of the screen
          component={HomeScreen} // Component to render
          options={{ headerShown: false }} // Hide the header bar
        />

        {/* Deals Screen */}
        <Stack.Screen
          name="Deals" // Name of the screen
          component={DealsScreen} // Component to render
          options={{ headerShown: false }} // Hide the header bar
        />

        {/* Profile Screen */}
        <Stack.Screen
          name="Profile" // Name of the screen
          component={ProfileScreen} // Component to render
          options={{ headerShown: false }} // Hide the header bar
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
