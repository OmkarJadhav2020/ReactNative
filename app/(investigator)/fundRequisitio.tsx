import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const FundRequisitionForm = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [signature, setSignature] = useState(null);

  const handleFileUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSignature(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Something went wrong while uploading the signature.");
    }
  };

  const handleSubmit = () => {
    alert("Form submitted!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>FUND REQUISITION</Text>

      <Text style={styles.label}>Project Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project title"
        value={projectTitle}
        onChangeText={setProjectTitle}
      />

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Items</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Values</Text>
        </View>
        {[
          "Total approved Cost (1)",
          "Total Fund Received (2)",
          "Interest Earned (3)",
          "Expenditure incurred till date (4)",
          "Balance fund available (5) = (2) + (3) - (4)",
          "Fund provision in corresponding year",
          "Fund required for the period",
        ].map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{item}</Text>
            <TextInput style={[styles.tableCell, styles.input]} placeholder="Enter value" />
          </View>
        ))}
        
      </View>

      <Text style={styles.description}>
        A - Land & Building{"\n"}
        B - Capital equipment{"\n"}
        C - Manpower{"\n"}
        D - Consumables{"\n"}
        E - Travel{"\n"}
        F - Contingencies{"\n"}
        G - Attending/organizing workshop/seminar etc.
      </Text>
      

      <Text style={styles.totalLabel}>Total:</Text>
      <TextInput style={styles.input} placeholder="Enter total" />

<View style={{display:"flex" , flexDirection:"row" , gap:30}}>
      <View style={styles.signatureContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Text style={styles.uploadText}>
            {signature ? "Change Signature" : "Upload Signature"}
          </Text>
        </TouchableOpacity>
        {signature && (
          <Image source={{ uri: signature }} style={styles.signatureImage} />
        )}
        <Text>Signature of </Text>
        <Text >Associate Finance Officier</Text>
      </View>
      <View style={styles.signatureContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Text style={styles.uploadText}>
            {signature ? "Change Signature" : "Upload Signature"}
          </Text>
        </TouchableOpacity>
        {signature && (
          <Image source={{ uri: signature }} style={styles.signatureImage} />
        )}
        <Text>Signature of </Text>
        <Text>Project Leader/Coordinator</Text>
      </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#343a40",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: "#495057",
  },
  input: {
    borderWidth: 1,
    marginTop:5 , 
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop:10 , 
    color: "#343a40",
  },
  description: {
    fontSize: 14,
    marginVertical: 12,
    marginBottom:1 ,  
    color: "#495057",
    height:"15%" , 
  },
  table: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f8f9fa",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  tableHeader: {
    backgroundColor: "#6c757d",
  },
  tableHeaderText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  signatureContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#6c757d",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#e9ecef",
  },
  uploadText: {
    fontSize: 14,
    color: "#495057",
  },
  signatureImage: {
    width: 100,
    height: 100,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#343a40",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom:80 , 
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FundRequisitionForm;