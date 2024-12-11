import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const ProjectProposalForm = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    coordinator: "",
    subAgency: "",
    coInvestigator: "",
    further:"" , 
    conclusion:"" , 
    total:"" , 
    projectCode:"" , 
    issueDefinition: "",
    objective: "",
    justify:"" , 
    expected:"" , 
    timeextension:"" , 
    justificationArea: "",
    coalBenefit: "",
    subjectJustification: "",
    details:"" , 
    workPlan: "",
    revised:"" , 
    revised1:"" ,
    actual:"" , 
    projectName:"" , 
    methodology: "",
    organization: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const [tableData, setTableData] = useState({
    capitalExpenditure: "",
    totalCapital: "",
    salaries: "",
    consumables: "",
    travel: "",
    workshops: "",
    totalRevenue: "",
  });

  const [signatureFinance, setSignatureFinance] = useState(null);
  const [signatureLeader, setSignatureLeader] = useState(null);

  const pickImage = async (setSignature:any) => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSignature(result.assets[0].uri);
    }
  };

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleInputChange = (field:any, value:any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTableChange = (field:any, value:any) => {
    setTableData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert("Form Submitted Successfully!");
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>REVISION OF THE COST OF THE PROJECT/RE-APPROPRIATION OF FUNDS</Text>

      <Text style={styles.label}>Project name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project name"
        value={formData.projectName}
        onChangeText={(value) => handleInputChange("projectName", value)}
      />

<Text style={styles.label}>Project Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Project code"
        value={formData.projectCode}
        onChangeText={(value) => handleInputChange("projectCode", value)}
      />

      <Text style={styles.label}>Project Coordinator/Leader/Investigator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project coordinator name"
        value={formData.coordinator}
        onChangeText={(value) => handleInputChange("coordinator", value)}
      />
      <Text style={styles.label}>Sub-Agency name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Sub-agency name"
        value={formData.subAgency}
        onChangeText={(value) => handleInputChange("subAgency", value)}
      />




<Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.dateDisplay}>{formData.startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={formData.startDate}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange("startDate", event, date)}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.dateDisplay}>{formData.endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={formData.endDate}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange("endDate", event, date)}
        />
      )}

<Text style={styles.label}>Approved Objectives</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={formData.objective}
        onChangeText={(value) => handleInputChange("objective", value)}
      />

<Text style={styles.label}>Work programme alongwith schedule</Text>
      <TextInput
        style={[styles.input,{height:150}]}
        placeholder=""
        value={formData.workPlan}
        multiline
        onChangeText={(value) => handleInputChange("workPlan", value)}
      />
      <Text style={styles.label}>Details of the work done </Text>
      <TextInput
        style={[styles.input,{height:150}]}
        placeholder=""
        value={formData.details}
        multiline
        onChangeText={(value) => handleInputChange("details", value)}
      />

<Text style={styles.label}>Total Approved cost </Text>
      <TextInput
        style={[styles.input,{height:150}]}
        placeholder=""
        value={formData.total}
        multiline
        onChangeText={(value) => handleInputChange("total", value)}
      />

<Text style={styles.label}>Revised time Schedule </Text>
      <TextInput
        style={[styles.input,{height:150}]}
        placeholder=""
        value={formData.revised}
        multiline
        onChangeText={(value) => handleInputChange("revised", value)}
      />

<Text style={styles.label}>Actual Expenditure till last quarter </Text>
      <TextInput
        style={[styles.input,{height:150}]}
        placeholder=""
        value={formData.actual}
        multiline
        onChangeText={(value) => handleInputChange("actual", value)}
      />

<Text style={styles.label}>Revised Cost </Text>
      <TextInput
        style={[styles.input,{height:150}]}
        placeholder=""
        value={formData.revised1}
        multiline
        onChangeText={(value) => handleInputChange("revised", value)}
      />



       <View style={{display:"flex",flexDirection:"row" , marginTop:10 , gap:10 }}>
       {/* Signature of Associate Finance Officer */}
       <View style={styles.signatureBlock}>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setSignatureFinance)}
        >
          {signatureFinance ? (
            <Image
              source={{ uri: signatureFinance }}
              style={styles.signatureImage}
            />
          ) : (
            <Text style={styles.uploadText}>Upload Signature here</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.title}>Signature of Associate Finance Officer</Text>
        <View style={styles.info}>
          <Text>Name :</Text>
          <TextInput style={styles.input1} placeholder="" />
        </View>
        <View style={styles.info}>
          <Text>Designation :</Text>
          <TextInput style={styles.input1} placeholder="" />
        </View>
        <View style={styles.info}>
          <Text>Seal :</Text>
          <TextInput style={styles.input1} placeholder="" />
        </View>
      </View>

      {/* Signature of Project Leader */}
      <View style={styles.signatureBlock}>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setSignatureLeader)}
        >
          {signatureLeader ? (
            <Image
              source={{ uri: signatureLeader }}
              style={styles.signatureImage}
            />
          ) : (
            <Text style={styles.uploadText}>Upload Signature here</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.title}>
          Signature of Project Leader/Coordinator
        </Text>
        <View style={styles.info}>
          <Text>Name :</Text>
          <TextInput style={styles.input1} placeholder="" />
        </View>
        <View style={styles.info}>
          <Text>Designation :</Text>
          <TextInput style={styles.input1} placeholder="" />
        </View>
        <View style={styles.info}>
          <Text>Seal :</Text>
          <TextInput style={styles.input1} placeholder="" />
        </View>
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
    backgroundColor: "#fff",
    padding: 16,
  },
  signatureBlock: {
    marginBottom: 30,
    width:"50%" ,
    
  },
  uploadBox: {
    height: 120,
    width: "100%",
    borderWidth: 1,
    borderColor: "#aaa",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  uploadText: {
    color: "blue",
  },
  signatureImage: {
    height: 120,
    width: "100%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 8,
    height: 40,
    borderRadius: 4,
  },
  input1: {
    borderWidth: 1,
    borderColor: "#fff",
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 8,
    height: 40,
    borderRadius: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  
  dateDisplay: {
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: "center",
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
  tableHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
 
 
});

export default ProjectProposalForm;