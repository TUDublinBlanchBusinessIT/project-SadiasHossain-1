import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const DealsScreen = ({ navigation }) => {
  const [deals, setDeals] = useState([
    { id: 1, text: 'Claim a 20% gift card from any Convenience stores' },
    { id: 2, text: 'Claim a 10% off on any $50 purchases' },
    { id: 3, text: 'Claim a 20% gift card from any Convenience stores' },
    { id: 4, text: 'Claim a 10% off on any $50 purchases' },
    { id: 5, text: 'Claim a 20% gift card from any Convenience stores' },
    { id: 6, text: 'Claim a 10% off on any $50 purchases' },
  ]);
  const [userInfo, setUserInfo] = useState(null);
  const [savedCoupons, setSavedCoupons] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserInfo({
        username: user.displayName || 'Guest',
        email: user.email || 'Not Available',
      });

      fetchUserCoupons(user.uid); // Fetch saved coupons for the user
    }
  }, []);

  // Fetch saved coupons from Firestore
  const fetchUserCoupons = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setSavedCoupons(data.savedCoupons || []); // Load saved coupons
      }
    } catch (error) {
      console.error('Error fetching user coupons:', error);
    }
  };

  // Save coupon to Firestore
  const saveCoupon = async (couponId, userId) => {
    const updatedCoupons = [...savedCoupons, couponId];
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        savedCoupons: updatedCoupons,
      });
      setSavedCoupons(updatedCoupons);
      Alert.alert('Coupon saved', 'Your coupon has been successfully saved.');
    } catch (error) {
      console.error('Error saving coupon:', error);
      Alert.alert('Error', 'There was an issue saving the coupon.');
    }
  };

  // Delete coupon
  const deleteCoupon = (couponId) => {
    const filteredDeals = deals.filter(deal => deal.id !== couponId);
    setDeals(filteredDeals); // Remove the coupon from the list of displayed deals
    Alert.alert('Coupon removed', 'The coupon has been removed from your list.');
  };

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

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#888"
      />

      {/* Deals */}
      <View style={styles.dealsContainer}>
        {deals.map((deal) => (
          <View key={deal.id} style={styles.dealCard}>
            <Text style={styles.dealHeader}>DISCOUNT!!!</Text>
            <Text style={styles.dealText}>{deal.text}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => deleteCoupon(deal.id)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => saveCoupon(deal.id, userInfo?.username)}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
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
  searchBar: {
    height: 40,
    width: 300,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignSelf: 'center', // Center the search bar
  },
  dealsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center', // Center the deals container
  },
  dealCard: {
    width: '45%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  dealHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  dealText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '45%',
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#800020',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#800020',
    fontWeight: 'bold',
  },
});

export default DealsScreen;
