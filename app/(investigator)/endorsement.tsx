import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const EndorsementForm = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  const handleFileUpload = () => {
    alert("File upload functionality not implemented yet.");
  };

  const handleSubmit = () => {
    alert("Form submitted successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>ENDORSEMENT FROM THE HEAD OF THE INSTITUTION</Text>
      <Text style={styles.subHeading}>(To be given on the letter head)</Text>

      <Text style={styles.label}>Project Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project title"
        value={projectTitle}
        onChangeText={setProjectTitle}
      />

      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraph}>
          1. Certified that the Company/Institute intends to undertake the above project with Dr/Sri/Smt .................................. as a Project Leader/Coordinator/Principal Investigator of the project.
        </Text>
        <Text style={styles.paragraph}>
          2. Certified that necessary infrastructure facilities shall be made available to the Project Team. Accommodation, transport, manpower, etc., will be provided at the project site to the research team for undertaking the fieldwork.
        </Text>
        <Text style={styles.paragraph}>
          3. Certified that equipment proposed to be procured from the S&T Grant are not readily available in the Company/Institute for the purpose.
        </Text>
        <Text style={styles.paragraph}>
          4. The Company/Institute assumes to undertake the financial and other management responsibilities of the project.
        </Text>
      </View>

      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Place:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter place"
        value={place}
        onChangeText={setPlace}
      />

      <View style={styles.signatureContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Text style={styles.uploadText}>Upload Signature here</Text>
        </TouchableOpacity>
        <Text style={styles.signatureLabel}>
          Name and signature of Head of the Company/Institution (With seal)
        </Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Text>All rights reserved</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  paragraphContainer: {
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    color: "#333",
  },
  signatureContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 14,
    color: "#555",
  },
  signatureLabel: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EndorsementForm;