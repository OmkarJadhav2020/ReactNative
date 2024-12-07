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

const ProjectCompletionReport = () => {
  const [formData, setFormData] = useState({
    projectName:"" , 
    code:"" , 
    progress:"" ,
    objective:"" , 
    agency:"" , 
    work:"" , 
    subAgency:"" , 
    final:"" , 
    name:"" , 
    scope:"" , 
    conclusions:"" , 
    leader:"" , 
    objectivesfullfilled:"" , 
    details:"" , 
    details1:"" , 
    need:"" , 
    actions:"" , 
    reason:"" , 
    report:"" , 
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
      <Text style={styles.heading}>Project Completion Report</Text>

      <Text style={styles.label}>Project Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Project name"
        value={formData.projectName}
        onChangeText={(value) => handleInputChange("projectName", value)}
      />

      <Text style={styles.label}>Project Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project code"
        value={formData.code}
        onChangeText={(value) => handleInputChange("code", value)}
      />

      <Text style={styles.label}>Objective</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Objective"
        value={formData.objective}
        onChangeText={(value) => handleInputChange("objective", value)}
      />

      <Text style={styles.label}>Work Programme</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Work Programme"
        value={formData.work}
        onChangeText={(value) => handleInputChange("work", value)}
      />

      <Text style={styles.label}>Objectives as outlined in the original project proposal haver been fulfilled.</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={formData.objectivesfullfilled}
        onChangeText={(value) => handleInputChange("objectivesfullfilled", value)}
      />

      <Text style={styles.label}>The Reason for not Covering all the Areas</Text>
      <TextInput
        style={styles.input}
        placeholder="Reason"
        value={formData.reason}
        onChangeText={(value) => handleInputChange("reason", value)}
      />

     

      <Text style={styles.label}>Date of commencement</Text>
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

      <Text style={styles.label}>Approved date of completion</Text>
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

<Text style={styles.label}>Details of work done during the quarter</Text>
      <TextInput
        style={styles.input}
        placeholder="Details"
        value={formData.details}
        onChangeText={(value) => handleInputChange("details", value)}
      />


<Text style={styles.label}>The need or otherwise to take up further studies in the areas not covered under this study.</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={formData.need}
        onChangeText={(value) => handleInputChange("need", value)}
      />


<Text style={styles.label}>Details of work done during the next quarter</Text>
      <TextInput
        style={styles.input}
        placeholder="Details"
        value={formData.details1}
        onChangeText={(value) => handleInputChange("details", value)}
      />

<Text style={styles.label}>Conclusions and recommendations with quantification</Text>
      <TextInput
        style={styles.input}
        placeholder="conclusions"
        value={formData.conclusions}
        onChangeText={(value) => handleInputChange("conclusions", value)}
      />


<Text style={styles.label}>Scope of application</Text>
      <TextInput
        style={styles.input}
        placeholder="scope"
        value={formData.scope}
        onChangeText={(value) => handleInputChange("scope", value)}
      />


<Text style={styles.label}>Name of person associated with project and type of expertise developed by them</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={formData.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />

<Text style={styles.label}>Final expenditure statement in form ||| & |V and duly authenticated by associated finance of the company.</Text>
      <TextInput
        style={styles.input}
        placeholder="final"
        value={formData.final}
        onChangeText={(value) => handleInputChange("final", value)}
      />


      
    

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

export default ProjectCompletionReport;