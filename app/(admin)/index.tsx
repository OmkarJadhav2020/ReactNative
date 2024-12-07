import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For icons

const DUMMY_DATA = [
  {
    id: '1',
    title: 'Oil Refinery Project',
    projectId: '32565432',
    startDate: '15 Nov 2024',
    endDate: '15 Jan 2025',
    status: 'Processing',
    progress: { completed: 80, remaining: 20 },
    image: 'https://via.placeholder.com/400', // Replace with an actual image URL
  },
  {
    id: '2',
    title: 'Factory Upgrade',
    projectId: '87234623',
    startDate: '01 Dec 2024',
    endDate: '15 Feb 2025',
    status: 'In Review',
    progress: { completed: 50, remaining: 50 },
    image: 'https://via.placeholder.com/400', // Replace with another image URL
  },
];

const ProjectCard = ({ project }) => {
  return (
    <View style={styles.card}>
      {/* Project Image */}
      <Image source={{ uri: project.image }} style={styles.image} />

      {/* Project Details */}
      <View style={styles.details}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectId}>ID: {project.projectId}</Text>
        <Text style={styles.date}>
          Start Date: <Text style={styles.bold}>{project.startDate}</Text>
        </Text>
        <Text style={styles.date}>
          End Date: <Text style={styles.bold}>{project.endDate}</Text>
        </Text>

        {/* Status and Progress */}
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              project.status === 'Processing' ? styles.statusProcessing : styles.statusReview,
            ]}
          >
            {project.status}
          </Text>
          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              <Text style={styles.percentage}>{project.progress.completed}%</Text>
              <Text style={styles.textSmall}>Completed</Text>
            </View>
            <View style={styles.chart}>
              <Text style={styles.percentage}>{project.progress.remaining}%</Text>
              <Text style={styles.textSmall}>Remaining</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Summary Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Summary</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ongoing Projects</Text>
        <FontAwesome name="cog" size={24} color="#555" />
      </View>

      {/* Project List */}
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProjectCard project={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  details: {
    padding: 16,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  projectId: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  status: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    color: '#fff',
    marginRight: 16,
  },
  statusProcessing: {
    backgroundColor: '#ffcc80',
  },
  statusReview: {
    backgroundColor: '#80bfff',
  },
  chartContainer: {
    flexDirection: 'row',
  },
  chart: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  textSmall: {
    fontSize: 12,
    color: '#777',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;