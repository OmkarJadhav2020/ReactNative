import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import { baseURL } from "@/constants/Colors";
const ProjectProposalForm = () => {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null); // Store the selected proposal for the modal
  const [modalVisible, setModalVisible] = useState(false); // Control the visibility of the modal

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://${baseURL}:8000/api/accounts/proposals/`);
      if (response) {
        setProposals(response.data.data);
      }
    };
    getData();
  }, []);

  const handleDelete = async (proposalId) => {
    try {
      await axios.delete(`http://${baseURL}:8000/api/accounts/proposals/${proposalId}/`);
      Alert.alert("Deleted", "Proposal deleted successfully!");
      setProposals(proposals.filter((proposal) => proposal.id !== proposalId));
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to delete the proposal.");
      console.error("Delete Error:", error.response.data);
    }
  };

  const handleApprove = async (proposalId) => {
    try {
      await axios.patch(`http://${baseURL}/api/accounts/proposals/${proposalId}/`, { status: "approved" });
      Alert.alert("Approved", "Proposal approved successfully!");
      setProposals(proposals.filter((proposal) => proposal.id !== proposalId));

      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to approve the proposal.");
      console.error("Approve Error:", error.response.data);
    }
  };

  const openModal = (proposal) => {
    setSelectedProposal(proposal);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Project Proposals</Text>
      <ScrollView>
        {proposals.map((proposal, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.proposalItem} 
            onPress={() => openModal(proposal)}
          >
            <Text style={styles.proposalTitle}>{proposal.agency_name}</Text>
            <Text style={styles.proposalSubtitle}>Coordinator: {proposal.organization}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedProposal && (
          <ScrollView style={styles.modalContainer}>
            <Text style={styles.modalHeading}>Proposal Details</Text>

            {Object.entries(selectedProposal).map(([key, value], index) => (
              <View key={index} style={styles.infoBox}>
                <Text style={styles.label}>{key.replace(/_/g, " ").toUpperCase()}</Text>
                <Text style={styles.infoText}>{value ? value.toString() : "N/A"}</Text>
              </View>
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(selectedProposal.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.approveButton}
                onPress={() => handleApprove(selectedProposal.id)}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  proposalItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  proposalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  proposalSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 16,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "#4caf50",
    padding: 16,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#555",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProjectProposalForm;
