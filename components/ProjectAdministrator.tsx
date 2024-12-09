import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const PieChart = ({ completedPercentage }:any) => {
  const circleRadius = 50; // Radius of the pie chart
  const strokeWidth = 20; // Width of the pie chart stroke

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * circleRadius;

  // Calculate the stroke dasharray and dashoffset for the "Completed" portion
  const completedCircumference = (completedPercentage / 100) * circumference;
  const remainingCircumference = circumference - completedCircumference;

  return (
    <View style={styles.container}>
      <Svg width={circleRadius * 2} height={circleRadius * 2} viewBox={`0 0 ${circleRadius * 2} ${circleRadius * 2}`}>
        {/* Outline circle (border) */}
        <Circle
          cx={circleRadius}
          cy={circleRadius}
          r={circleRadius}
          stroke="#E0E0E0" // Light grey for outline
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Remaining portion of the circle */}
        <Circle
          cx={circleRadius}
          cy={circleRadius}
          r={circleRadius}
          stroke="#D1D1D1" // Grey for remaining
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Completed portion of the circle */}
        <Circle
          cx={circleRadius}
          cy={circleRadius}
          r={circleRadius}
          stroke="green" // Black for completed
          strokeWidth={strokeWidth}
          strokeDasharray={`${completedCircumference} ${remainingCircumference}`}
          strokeDashoffset={-Math.PI * circleRadius}
          fill="none"
        />
      </Svg>

      {/* Percentage Text */}
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageText}>{completedPercentage}%</Text>
      </View>
      <View style={styles.legendContainer}>
        <Text style={styles.legendText}>Completed</Text>
        <Text style={[styles.legendText, styles.legendRemaining]}>Remaining</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    gap:5 , 
    marginTop: 10,
  },
  legendText: {
    fontSize: 14,
    color: 'green',
    marginRight: 5,
  },
  legendRemaining: {
    color: '#D1D1D1', // Grey for remaining
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  percentageContainer: {
    position: 'absolute',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PieChart;
