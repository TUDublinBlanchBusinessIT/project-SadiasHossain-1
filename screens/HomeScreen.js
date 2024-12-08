import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { doc, setDoc, deleteDoc } from 'firebase/firestore'; // Firebase Firestore functions
import { db } from '../firebaseConfig'; // Firebase configuration

// List of products to display on the home screen
const products = [
  {
    id: 1,
    image: require('../assets/bread.jpg'),
    description: 'Bread',
    originalPrice: 2.0,
    discountPrice: 0.99,
    isOutOfStock: false,
    link: 'https://www.tesco.ie/groceries/en-IE/products/303544117',
  },
  {
    id: 2,
    image: require('../assets/Milk.jpg'),
    description: 'Milk',
    originalPrice: 3.2,
    discountPrice: 2.69,
    isOutOfStock: false,
    link: 'https://www.dunnesstoresgrocery.com/sm/delivery/rsid/258/product/avonmore-fresh-milk-2l-id-100130059/',
  },
  {
    id: 3,
    image: require('../assets/Yogurt.png'),
    description: 'Yogurt',
    originalPrice: 2.19,
    discountPrice: 1.64,
    isOutOfStock: true,
    link: 'https://www.lidl-ni.co.uk/p/authentic-greek-yogurt/p10007151',
  },
];

// Main HomeScreen component
const HomeScreen = ({ navigation, route }) => {
  const [favorites, setFavorites] = useState([]); // State to track favorite products

  // Handle toggling a product as a favorite
  const handleFavoriteToggle = async (product) => {
    const productIsFavorited = favorites.includes(product.id); // Check if the product is already favorited
    const favoriteRef = doc(db, 'favorites', `${username}_${product.id}`); // Firestore document reference

    try {
      if (productIsFavorited) {
        // If already favorited, remove from the favorites list and delete from Firestore
        setFavorites(favorites.filter((id) => id !== product.id));
        await deleteDoc(favoriteRef);
        Alert.alert('Favorite Removed', `${product.description} has been removed from your favorites.`);
      } else {
        // If not favorited, add to the favorites list and save to Firestore
        setFavorites([...favorites, product.id]);
        await setDoc(favoriteRef, {
          username,
          productId: product.id,
          productName: product.description,
          favoritedAt: new Date().toISOString(), // Timestamp for when it was favorited
        });
        Alert.alert('Favorite Added', `${product.description} has been added to your favorites.`);
      }
    } catch (error) {
      console.error('Error updating favorites: ', error); // Log any errors
      Alert.alert('Error', 'Something went wrong while updating favorites.');
    }
  };

  return (
    <View style={styles.container}>
      {/* App logo */}
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />

      {/* Navigation bar */}
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

      {/* Trending products section */}
      <Text style={styles.trendingHeading}>TRENDING PRODUCTS!!</Text>

      {/* Display products in a table layout */}
      <View style={styles.table}>
        {products.map((product) => (
          <View key={product.id} style={styles.tableCell}>
            {/* Clickable product image */}
            <TouchableOpacity
              onPress={() => Linking.openURL(product.link)} // Open product link in browser
              style={styles.imageContainer}
            >
              <Image source={product.image} style={styles.productImage} />
              {product.isOutOfStock && (
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              )}
            </TouchableOpacity>

            {/* Product details and favorite button */}
            <View style={styles.productDetails}>
              <Text style={styles.productDescription}>{product.description}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                <Text style={styles.discountPrice}>${product.discountPrice}</Text>
              </View>

              {/* Favorite heart button */}
              <TouchableOpacity
                onPress={() => handleFavoriteToggle(product)}
                style={styles.heartIcon}
              >
                {/* Change color based on whether the product is favorited */}
                <Text style={{ color: favorites.includes(product.id) ? 'red' : 'gray', fontSize: 24 }}>
                  ♥
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// Styles for the component
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
  navDivider: {
    width: 1,
    backgroundColor: 'white',
    height: '60%',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  trendingHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800020',
    textAlign: 'center',
    marginVertical: 20,
  },
  table: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tableCell: {
    width: '30%',
    height: 320,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 10,
  },
  outOfStockText: {
    position: 'absolute',
    top: '40%',
    left: '47%',
    transform: [{ translateX: -50 }],
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productDetails: {
    width: '100%',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  heartIcon: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
