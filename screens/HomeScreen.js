import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const products = [
  {
    id: 1,
    image: require('../assets/bread.jpg'),
    description: 'Bread',
    originalPrice: 2.0,
    discountPrice: 0.99,
    isOutOfStock: false,
  },
  {
    id: 2,
    image: require('../assets/Milk.jpg'),
    description: 'Milk',
    originalPrice: 3.2,
    discountPrice: 2.69,
    isOutOfStock: false,
  },
  {
    id: 3,
    image: require('../assets/Yogurt.png'),
    description: 'Yogurt',
    originalPrice: 2.19,
    discountPrice: 1.64,
    isOutOfStock: true,
  },
];

const HomeScreen = ({ navigation, route }) => {
  const [favorites, setFavorites] = useState([]);
  const [username, setUsername] = useState('Guest');

  // Retrieve the username passed from Login or SignUp
  useEffect(() => {
    if (route.params && route.params.username) {
      setUsername(route.params.username);
    }
  }, [route.params]);

  // Fetch the user's favorites from Firestore
  useEffect(() => {
    const fetchFavorites = async () => {
      const userFavoritesRef = doc(db, 'favorites', username);

      try {
        const docSnap = await getDoc(userFavoritesRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFavorites(data.favorites || []);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error('Error fetching favorites: ', error);
      }
    };

    if (username) {
      fetchFavorites();
    }
  }, [username]);

  const handleFavoriteToggle = async (product) => {
    const userFavoritesRef = doc(db, 'favorites', username);

    try {
      const docSnap = await getDoc(userFavoritesRef);
      const currentFavorites = docSnap.exists() ? docSnap.data().favorites || [] : [];
      const productIsFavorited = currentFavorites.some((item) => item.productId === product.id);

      if (productIsFavorited) {
        // Remove the product from favorites
        const updatedFavorites = currentFavorites.filter((item) => item.productId !== product.id);
        await setDoc(userFavoritesRef, { favorites: updatedFavorites }, { merge: true });
        setFavorites(updatedFavorites);
        Alert.alert('Favorite Removed', `${product.description} has been removed from your favorites.`);
      } else {
        // Add the product to favorites
        const newFavorite = {
          productId: product.id,
          productName: product.description,
          favoritedAt: new Date().toISOString(),
          username: username,
        };
        const updatedFavorites = [...currentFavorites, newFavorite];
        await setDoc(userFavoritesRef, { favorites: updatedFavorites }, { merge: true });
        setFavorites(updatedFavorites);
        Alert.alert('Favorite Added', `${product.description} has been added to your favorites.`);
      }
    } catch (error) {
      console.error('Error updating favorites: ', error);
      Alert.alert('Error', 'Something went wrong while updating favorites.');
    }
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

      {/* Trending Products */}
      <Text style={styles.trendingHeading}>TRENDING PRODUCTS!!</Text>

      {/* Product List */}
      <View style={styles.table}>
        {products.map((product) => (
          <View key={product.id} style={styles.tableCell}>
            {/* Product Image */}
            <Image source={product.image} style={styles.productImage} />
            {product.isOutOfStock && (
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            )}

            {/* Product Details */}
            <View style={styles.productDetails}>
              <Text style={styles.productDescription}>{product.description}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                <Text style={styles.discountPrice}>${product.discountPrice}</Text>
              </View>

              {/* Heart Icon */}
              <TouchableOpacity
                onPress={() => handleFavoriteToggle(product)}
                style={styles.heartIcon}
              >
                <Text
                  style={{
                    color: favorites.some((item) => item.productId === product.id) ? 'red' : 'gray',
                    fontSize: 24,
                  }}
                >
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
  },
  tableCell: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  outOfStockText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 5,
    borderRadius: 5,
    color: 'red',
    fontWeight: 'bold',
  },
  productDetails: {
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    marginRight: 5,
  },
  discountPrice: {
    color: 'green',
    fontWeight: 'bold',
  },
  heartIcon: {
    marginTop: 10,
  },
});

export default HomeScreen;
