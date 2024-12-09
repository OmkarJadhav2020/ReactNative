import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet , ScrollView, TouchableOpacity } from 'react-native';

import { Svg, Path, Circle, Line } from 'react-native-svg';

const GraphComponent = () => {
  const width = 300; // Width of the graph
  const height = 200; // Height of the graph
  const dataSets = [
    [50, 10, 40, 95, 85, 91, 35, 53, 24, 50, 20, 80],
    [30, 50, 75, 30, 20, 50, 90, 35, 70, 10, 30, 60],
  ];
  const colors = ['#FF6F61', '#6E44FF'];

  // Function to scale data points to graph dimensions
  const scaleX = (index:any, length:any) => (index / (length - 1)) * width;
  const scaleY = (value:any, maxValue:any) => height - (value / maxValue) * height;

  // Generate paths for each dataset
  const generatePath = (data:any) => {
    return data
      .map(
        (point:any, index:any) =>
          `${index === 0 ? 'M' : 'L'} ${scaleX(index, data.length)} ${scaleY(
            point,
            100
          )}`
      )
      .join(' ');
  };

  return (
    <View style={styles.container}>
      
      {/* Left Button */}


      {/* Title */}
      <Text style={styles.title}>Administrative Information</Text>

      {/* Right Button */}
 
   
        <Text style={{fontSize:30 , marginLeft:100 , marginBottom:5}}>Project Title</Text>
        <Text style={{fontSize:15 , marginLeft:120 , marginBottom:5 , color:"red"}}>Coal India Limited</Text>
        <View style={styles.total}>
        <Text style={styles.totalMonth}>Approved Funds</Text>
        <Text style={styles.totalValue}>78 038,34 INR</Text>
      </View>
      {/* Month and Year Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Month</Text>
        <Text style={styles.tab}>Year</Text>
      </View>

      {/* Line Graph */}
      <Svg height={height} width={width} style={styles.graph}>
        {/* Background grid lines */}
        {[...Array(5).keys()].map((i) => (
          <Line
            key={i}
            x1="0"
            y1={(i / 4) * height}
            x2={width}
            y2={(i / 4) * height}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        ))}

        {/* Data paths */}
        {dataSets.map((data, index) => (
          <Path
            key={index}
            d={generatePath(data)}
            stroke={colors[index]}
            strokeWidth="2"
            fill="none"
          />
        ))}

        {/* Data points */}
        {dataSets.map((data, dataIndex) =>
          data.map((point, index) => (
            <Circle
              key={`${dataIndex}-${index}`}
              cx={scaleX(index, data.length)}
              cy={scaleY(point, 100)}
              r="4"
              fill="#fff"
              stroke={colors[dataIndex]}
              strokeWidth="2"
            />
          ))
        )}
      </Svg>

      {/* Bottom Number Markers */}
      <View style={styles.markers}>
        {Array.from({ length: 12 }, (_, i) => (
          <Text key={i} style={styles.marker}>
            {i + 1 < 10 ? `0${i + 1}` : i + 1}
          </Text>
        ))}
      </View>

      {/* Statistics Section */}
      <View style={styles.stats} >
        <View style={{display:"flex" , flexDirection:"row" , width:"100%"}}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4 718,93 INR</Text>
          <Text style={styles.statLabel}>Thing 1</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>57 545,00 INR</Text>
          <Text style={styles.statLabel}>Thing 2</Text>
        </View>
        </View>
        
      </View>
      <View style={{display:"flex" , flexDirection:"row",width:"100%",marginBottom:5 }}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>584,85 INR</Text>
          <Text style={styles.statLabel}>Thing 3</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>6 720,00 INR</Text>
          <Text style={styles.statLabel}>Thing 4</Text>
        </View>
        </View>

      {/* Total Section */}
      <View style={styles.total}>
        <Text style={styles.totalMonth}>October</Text>
        <Text style={styles.totalValue}>78 038,34 INR</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  tab: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 16,
    color: '#aaa',
  },
  activeTab: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  graph: {
    marginBottom: 16,
  },
  markers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  marker: {
    fontSize: 12,
    color: '#777',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalMonth: {
    fontSize: 14,
    color: '#777',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GraphComponent;
