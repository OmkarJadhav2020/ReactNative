import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PieChart from "../../components/ProjectAdministrator";
import ProposalButton from "../../components/Timeline";
import { Ionicons } from "@expo/vector-icons";
import { useSearchParams } from "expo-router/build/hooks";
import axios from "axios";
import { baseURL } from "@/constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";

const ProjectCard = ({ project }: any) => {
  return (
    <ScrollView>


      {/* Title */}
      <Text style={styles.title}>Project Overview</Text>

      {/* Right Button */}

      <View style={styles.cardContainer}>
        {/* Project Header */}
        <Image source={{ uri: project.imageUrl }} style={styles.projectImage} />

        {/* Project Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.projectId}>{project.id}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.iconGroup}>
              {project.icons.map((icon, index) => (
                <Image key={index} source={{ uri: icon }} style={styles.icon} />
              ))}
            </View>
            <View
              style={[
                styles.statusContainer,
                { backgroundColor: `${project.statusColor}` },
              ]}
            >
              <Text style={[styles.statusText, { color: "white" }]}>
                {project.status}
              </Text>
            </View>
            <Image
              source={{ uri: project.statusIcon }}
              style={styles.statusIcon}
            />
            <Image source={{ uri: project.avatarUrl }} style={styles.avatar} />
          </View>
        </View>
      </View>

      {/* Dates Section */}
      <View style={styles.datesContainer}>
        <Text>Started: {project.start_date}</Text>
        <Text>End: {project.end_date}</Text>
      </View>

      {/* Progress Section */}
      <Text style={styles.sectionTitle}>Current Progress</Text>
      <View style={styles.cardContainer}>
        <PieChart completedPercentage={project.current_progress_percentage} />
      </View>

      {/* Timeline Section */}
      <Text style={styles.sectionTitle}>Timeline</Text>
      {/* <Text style={styles.sectionTitle} onPress={()=>{router.replace("/administrative_information")}}>Timeline</Text> */}
      {/* <Text style={styles.sectionTitle} onPress={()=>{router.replace("/finance")}}>Timeline</Text> */}
      
      <ScrollView
        style={styles.timelineContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row" }} // Ensures children are in a row
      >

        <ProposalButton name = "info1" />
        <ProposalButton name = "info2" />
        <ProposalButton name = "info3" />
        <ProposalButton name = "info4" />
      </ScrollView>
    </ScrollView>
  );
};

const ProjectList = () => {
  const searchParams = useSearchParams();
  const isFocused = useIsFocused();
  const [projects, setProjects] = useState(
    {
      id: "#3110654",
      description: "Project Description in 1-2 Lines",
      imageUrl: "https://via.placeholder.com/600x400",
      status: "Processing",
      statusColor: "#F57C00",
      statusIcon: "https://img.icons8.com/ios-filled/50/FFA500/clock.png",
      avatarUrl: "https://avatar.iran.liara.run/public/49",
      icons: [
        "https://img.icons8.com/ios-filled/50/000000/like.png",
        "https://img.icons8.com/ios-filled/50/000000/link.png",
      ],
      current_progress_percentage: 100,
      start_date: "1/2/2023",
      end_date: "1/2/2023",
    }
  );
  const getData = async () => {
    try {
      const projectId = searchParams.get("id");
      console.log(projectId)
      const response = await axios.post(
        `http://${baseURL}:8000/api/accounts/projectinfo/`,
        { id: projectId }
      );
      
      const updatedProject = {
        ...projects,
        id: `#${response.data.id}`,
        description: response.data.description,
        status: response.data.status,
        current_progress_percentage: response.data.current_progress_percentage,
        start_date: response.data.start_date,
        end_date: response.data.end_date,
      };

      setProjects(updatedProject);
      console.log("Updated Project:", updatedProject);
      
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    if(isFocused){getData()};
    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ProjectCard key={projects.id} project={projects} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: "#4A4A4A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A4A4A",
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "#4A4A4A",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 9,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 16,
  },
  projectImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  projectId: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    justifyContent: "space-between",
  },
  iconGroup: {
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusIcon: {
    width: 24,
    height: 24,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    borderTopWidth: 1,
    fontWeight: "600",
    marginTop: 12,
  },
  timelineContainer: {
    flexDirection: "row",

    marginTop: 14,
    width: "100%",
  },
});

export default ProjectList;
