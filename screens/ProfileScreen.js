
  import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
  import { getAuth } from 'firebase/auth';
  
  const ProfileScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showSubscription, setShowSubscription] = useState(false); // Initialize showSubscription
  
    useEffect(() => {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        setUserInfo({
          username: user.displayName || 'User',
          email: user.email || 'Not Available',
        });
      }
    }, []);
  
    return (
        <View style={styles.container}>
          {/* Logo */}
          <Image source={require('../assets/logo.jpg')} style={styles.logo} />
    
          {/* Navigation Bar */}
          <View style={styles.navbar}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={[styles.navItem, styles.navItemFirst]}
            >
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <View style={styles.navDivider} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Deals')}
              style={styles.navItem}
            >
              <Text style={styles.navText}>Deals</Text>
            </TouchableOpacity>
            <View style={styles.navDivider} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={[styles.navItem, styles.navItemLast]}
            >
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
          </View>
  
        <View style={styles.profileImageContainer}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>+</Text>
          </View>
        </View>
  
        {/* Username Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{userInfo?.username || 'Guest'}</Text>
        </TouchableOpacity>
  
        {/* Account Information Button */}
        <TouchableOpacity style={styles.button} onPress={() => setShowDetails(!showDetails)}>
          <Text style={styles.buttonText}>Account Information</Text>
        </TouchableOpacity>
        {showDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Email: {userInfo?.email}</Text>
            <Text style={styles.detailsText}>Username: {userInfo?.username}</Text>
          </View>
        )}
  
        {/* Subscription Button */}
        <TouchableOpacity style={styles.button} onPress={() => setShowSubscription(!showSubscription)}>
          <Text style={styles.buttonText}>Subscription</Text>
        </TouchableOpacity>
        {showSubscription && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Your subscription plan: Premium</Text>
            <Text style={styles.detailsText}>Renewal Date: 01/01/2025</Text>
          </View>
        )}
  
        {/* Log Out Button */}
        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    logo: {
      width: 250,
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
      marginBottom: 20,
      alignSelf: 'center',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#800020', // Burgundy background color
        borderRadius: 10,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
      },
      navItem: {
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      navItemFirst: {
        borderLeftWidth: 0,
      },
      navItemLast: {
        borderRightWidth: 0,
      },
      navText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
      navDivider: {
        width: 1,
        backgroundColor: 'white',
        height: '60%',
        alignSelf: 'center',
        marginHorizontal: 10,
      },
    profileImageContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    profileCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#800020',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileText: {
      fontSize: 36,
      color: '#800020',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#800020',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      marginVertical: 10,
      alignItems: 'center',
      width: '25%',
      alignSelf: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    detailsContainer: {
      backgroundColor: '#f9f9f9',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      width: '25%',
      height: '10%',
      alignSelf: 'center', 
    },
    detailsText: {
      fontSize: 14,
      color: '#555',
      marginBottom: 5,
    },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#800020',
    width: '10%',
    height: '5%',
    alignSelf: 'center',
  },
  logoutText: {
    color: '#800020',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
