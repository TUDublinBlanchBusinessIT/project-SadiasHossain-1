import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
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

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImage}>
          <Text style={styles.addIcon}>+</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Account Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Account Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#800020',
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
  profileSection: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#800020',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addIcon: {
    fontSize: 24,
    color: '#800020',
  },
  button: {
    width: '80%',
    backgroundColor: '#800020',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#800020',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  logoutButtonText: {
    color: '#800020',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
