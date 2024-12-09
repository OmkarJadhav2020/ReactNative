import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker"; // Add Picker import
import { baseURL } from "@/constants/Colors";
const ProjectProposalForm = () => {
  const [formData, setFormData] = useState({
    agency_name: "",
    coordinator: "", // Dropdown value
    sub_agency: "",
    co_investigator: "", // Dropdown value
    issue_definition: "",
    objective: "",
    justification_area: "",
    coal_benefit: "",
    subject_justification: "",
    work_plan: "",
    methodology: "",
    organization: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
  });

  const [tableData, setTableData] = useState({
    capital_expenditure: "",
    total_capital: "",
    salaries: "",
    consumables: "",
    travel: "",
    workshops: "",
    total_revenue: "",
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [coordinatorOption,setCoordinatorOption] = useState([{"id" : 1,"username" : "omkar"}]);

  useEffect(()=>{
    const getData = async ()=>{
      const response = await axios.get(`http://${baseURL}:8000/api/accounts/getlist`);
      if(response)
      {
        setCoordinatorOption(response.data.data)
        console.log(coordinatorOption)
      }
    }
    getData();
  },[])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTableChange = (field, value) => {
    setTableData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://${baseURL}:8000/api/accounts/proposals/`, {
        ...formData,
        ...tableData,
      });
      Alert.alert("Success", "Project Proposal Submitted Successfully!");
      console.log("Response:", response.data);
      router.replace("/(investigator)");
    } catch (error) {
      console.error("Submission Error:", error.response.data);
      Alert.alert("Error", "Failed to submit form. Please check your input.");
    }
  };

  const handleDateChange = (field, event, selectedDate) => {
    const currentDate = selectedDate || formData[field];
    setFormData((prev) => ({ ...prev, [field]: currentDate.toISOString().split("T")[0] }));
    if (Platform.OS === "android") {
      field === "start_date"
        ? setShowStartDatePicker(false)
        : setShowEndDatePicker(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Project Proposal for S&T Grant of MOC</Text>

      {Object.keys(formData).map((field, index) => (
        <View key={index}>
          <Text style={styles.label}>{field.replace(/_/g, " ").toUpperCase()}</Text>
          {field === "start_date" || field === "end_date" ? (
            <>
              <TouchableOpacity
                onPress={() =>
                  field === "start_date"
                    ? setShowStartDatePicker(true)
                    : setShowEndDatePicker(true)
                }
              >
                <Text style={styles.dateDisplay}>{formData[field]}</Text>
              </TouchableOpacity>
              {showStartDatePicker && field === "start_date" && (
                <DateTimePicker
                  value={new Date(formData.start_date)}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleDateChange(field, event, date)}
                />
              )}
              {showEndDatePicker && field === "end_date" && (
                <DateTimePicker
                  value={new Date(formData.end_date)}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleDateChange(field, event, date)}
                />
              )}
            </>
          ) : field === "coordinator" ? (
            <Picker
              selectedValue={formData.coordinator}
              onValueChange={(value) => handleInputChange("coordinator", value)}
              style={styles.input}
            >
              <Picker.Item label="Select Coordinator" value="" />
              {coordinatorOption.map((option, idx) => (
                <Picker.Item key={option.id} label={option.username} value={option.id} />
              ))}
            </Picker>
          ) : field === "co_investigator" ? (
            <Picker
              selectedValue={formData.co_investigator}
              onValueChange={(value) => handleInputChange("co_investigator", value)}
              style={styles.input}
            >
              <Picker.Item label="Select Co-Investigator" value="" />
              {coordinatorOption.map((option, idx) => (
                <Picker.Item key={option.id} label={option.username} value={option.id} />
              ))}
            </Picker>
          ) : (
            <TextInput
              style={styles.input}
              value={formData[field]}
              onChangeText={(value) => handleInputChange(field, value)}
            />
          )}
        </View>
      ))}

      {Object.keys(tableData).map((field, index) => (
        <View key={index}>
          <Text style={styles.label}>{field.replace(/_/g, " ").toUpperCase()}</Text>
          <TextInput
            style={styles.input}
            value={tableData[field]}
            onChangeText={(value) => handleTableChange(field, value)}
            keyboardType="numeric"
          />
        </View>
      ))}

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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 16,
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
  submitButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 19,
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProjectProposalForm;