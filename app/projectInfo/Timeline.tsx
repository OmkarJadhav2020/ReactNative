import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProposalButton = () => {
  return (
    <View style={styles.container}>
      {/* Circle with Checkmark Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="check" size={20} color="white" />
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <MaterialIcons name="keyboard-arrow-up" size={20} color="black" />
      </View>

      <View style={styles.arrowContainer}>
        <Text>|</Text>
      </View>

      {/* Proposal Text */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Proposal</Text>
      </TouchableOpacity>

      {/* Arrow */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center', // Dark background to match the image style
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: '#fff', // Light background for the icon circle
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3, // Reduced shadow effect for smaller size
  },
  iconCircle: {
    backgroundColor: '#000', // Blue color for the circle
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000', // Blue color for the button
    paddingVertical: 8,
    paddingHorizontal: 19,
    borderRadius: 50,
    gap:20 , 
    marginBottom: 8,
    elevation: 2,
    width:"130%" , 
    marginTop:5 , 
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
 
    color:"#000"
  },
});

export default ProposalButton;
