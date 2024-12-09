import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import TrackFinanceCharts from "../../components/Graphfin";
import ExpenseTimeline from "../../components/Timelinefin";
import { Ionicons } from "@expo/vector-icons";

const FinancialOverview = () => {
  return (
    <ScrollView>

      {/* Title */}
      <Text style={styles.title}>Track Finance</Text>

      {/* Right Button */}

    <View style={styles.container}>
    
      {/* Total Fund */}
      <View style={styles.card}>
        <Text style={styles.label}>Total Fund</Text>
        <Text style={styles.value}>500</Text>
      </View>

      {/* Total Spending */}
      <View style={styles.card}>
        <Text style={styles.label}>Total Spending</Text>
        <Text style={styles.value}>₹36,672</Text>
      </View>

      {/* Remaining */}
      <View style={styles.card}>
        <Text style={styles.label}>Remaining</Text>
        <Text style={styles.value}>₹291,912</Text>
      </View>
      
    </View>
    <TrackFinanceCharts />
    <ExpenseTimeline />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#F9F9F9", // Background color of the parent view
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: '#4A4A4A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    textAlign: 'center',
    textDecorationLine:"underline",
    textDecorationColor:"#4A4A4A" ,  
    
  },
  card: {
    backgroundColor: "#4A4A4A",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "30%", // Adjusts width dynamically
  },
  label: {
    fontSize: 10,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 4,
  },
  value: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default FinancialOverview;
