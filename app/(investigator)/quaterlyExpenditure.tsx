import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import * as ImagePicker from "expo-image-picker";

const QuarterlyExpenditure = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectcode, setProjectCode] = useState("");
  const [Company, setCompany] = useState("");
  const [Date, setDate] = useState("");
  const [signature, setSignature] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [formData, setFormData] = useState({
  });


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

  const handleDateChange = (field:any, event:any, selectedDate:any) => {
    const currentDate = selectedDate || formData[field];
    if (Platform.OS === "android") {
      field === "startDate"
        ? setShowStartDatePicker(false)
        : setShowEndDatePicker(false);
    }
    setFormData((prev) => ({ ...prev, [field]: currentDate }));
  };


  const handleSubmit = () => {
    alert("Form submitted!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>QUARTERLY EXPENDITURE STATEMENT</Text>

      <Text style={styles.label}>Project Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project title"
        value={projectTitle}
        onChangeText={setProjectTitle}
      />
      <Text style={styles.label}>Project Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project code"
        value={projectcode}
        onChangeText={setProjectCode}
      />
      <Text style={styles.label}>Company/Institute:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Company"
        value={Company}
        onChangeText={setCompany}
      />
      <Text style={styles.label}>Quarter Ending Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Ending Date"
        value={Date}
        onChangeText={setDate}
      />

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Items</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Total approved cost</Text>
        </View>
        {[
          "Land & Building",
          "Capital Equipment",
          "Manpower",
          "Consumable",
          "TA/DA",
          "Contingencies",
          "Organizing seminars",
        ].map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{item}</Text>
            <TextInput style={[styles.tableCell, styles.input]} placeholder="Enter value" />
          </View>
        ))}
        
      </View>

      <Text style={styles.description}>
        *Details to be submitted as per sanction letter
      </Text>
      

      <Text style={styles.totalLabel}>Funds Advanced till Date:</Text>
      <TextInput style={styles.input} placeholder="20/04/2024" /> 

      <Text style={styles.totalLabel}>Expenditure incurred till Date:</Text>
      <TextInput style={styles.input} placeholder="20/04/2024" /> 

      <Text style={styles.totalLabel}>Unspent Balance in hand:</Text>
      <TextInput style={styles.input} placeholder="" /> 


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
    // marginTop:10 , 
    color: "#343a40",
  },
  description: {
    fontSize: 14,
    // marginVertical: 1,  
    color: "#495057",
    height:"5%" , 
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

export default QuarterlyExpenditure;