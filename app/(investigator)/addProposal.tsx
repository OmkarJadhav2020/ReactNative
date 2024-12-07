import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ProjectProposalForm = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    coordinator: "",
    subAgency: "",
    coInvestigator: "",
    issueDefinition: "",
    objective: "",
    justificationArea: "",
    coalBenefit: "",
    subjectJustification: "",
    workPlan: "",
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
      <Text style={styles.heading}>Project Proposal for S&T Grant of MOC</Text>

      <Text style={styles.label}>Implementing Agency Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter implementing agency name"
        value={formData.agencyName}
        onChangeText={(value) => handleInputChange("agencyName", value)}
      />

      <Text style={styles.label}>Project Coordinator/Leader/Investigator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project coordinator name"
        value={formData.coordinator}
        onChangeText={(value) => handleInputChange("coordinator", value)}
      />

      <Text style={styles.label}>Sub Implementing Agency</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter sub implementing agency"
        value={formData.subAgency}
        onChangeText={(value) => handleInputChange("subAgency", value)}
      />

      <Text style={styles.label}>Co-Investigator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter co-investigator name"
        value={formData.coInvestigator}
        onChangeText={(value) => handleInputChange("coInvestigator", value)}
      />

      <Text style={styles.label}>Definition of Issue</Text>
      <TextInput
        style={styles.input}
        placeholder="Define the issue"
        value={formData.issueDefinition}
        onChangeText={(value) => handleInputChange("issueDefinition", value)}
      />

      <Text style={styles.label}>Objective</Text>
      <TextInput
        style={styles.input}
        placeholder="Select objective"
        value={formData.objective}
        onChangeText={(value) => handleInputChange("objective", value)}
      />

      <Text style={styles.label}>Justification of Project Area</Text>
      <TextInput
        style={styles.input}
        placeholder="Justify the project area"
        value={formData.justificationArea}
        onChangeText={(value) => handleInputChange("justificationArea", value)}
      />

      <Text style={styles.label}>How is the Project Beneficial for Coal Industry?</Text>
      <TextInput
        style={styles.input}
        placeholder="Explain the benefits"
        value={formData.coalBenefit}
        onChangeText={(value) => handleInputChange("coalBenefit", value)}
      />

      <Text style={styles.label}>Justification for Subject Area</Text>
      <TextInput
        style={styles.input}
        placeholder="Justify the subject area"
        value={formData.subjectJustification}
        onChangeText={(value) => handleInputChange("subjectJustification", value)}
      />

      <Text style={styles.label}>Work Plan</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the work plan"
        value={formData.workPlan}
        onChangeText={(value) => handleInputChange("workPlan", value)}
      />

      <Text style={styles.label}>Methodology</Text>
      <TextInput
        style={styles.input}
        placeholder="Explain the methodology"
        value={formData.methodology}
        onChangeText={(value) => handleInputChange("methodology", value)}
      />

      <Text style={styles.label}>Organization of Work Element</Text>
      <TextInput
        style={styles.input}
        placeholder="Organize work element"
        value={formData.organization}
        onChangeText={(value) => handleInputChange("organization", value)}
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

      <Text style={styles.tableHeading}>Budget Details</Text>
      {Object.keys(tableData).map((field, index) => (
        <View key={index}>
          <Text style={styles.label}>{field.replace(/([A-Z])/g, " $1")}</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={tableData[field]}
            onChangeText={(value) => handleTableChange(field, value)}
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
  tableHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    bottom:10 ,
    marginBottom:19 ,  
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    
  },
});

export default ProjectProposalForm;