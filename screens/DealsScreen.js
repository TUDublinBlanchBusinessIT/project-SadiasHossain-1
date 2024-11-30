import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const DealsScreen = () => {
  const deals = [
    { id: 1, text: 'Claim a 20% gift card from any Convenience stores' },
    { id: 2, text: 'Claim a 10% off on any $50 purchases' },
    { id: 3, text: 'Claim a 20% gift card from any Convenience stores' },
    { id: 4, text: 'Claim a 10% off on any $50 purchases' },
    { id: 5, text: 'Claim a 20% gift card from any Convenience stores' },
    { id: 6, text: 'Claim a 10% off on any $50 purchases' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>SHOPSMART</Text>

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
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800020',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dealsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
