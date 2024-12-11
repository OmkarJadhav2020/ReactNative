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
    projectname:"" ,
    code:"" , 
    principle:"" , 
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
      <Text style={styles.heading}>Details of Equipment</Text>

      <Text style={styles.label}>Project name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project name"
        value={formData.projectname}
        onChangeText={(value) => handleInputChange("projectname", value)}
      />

      <Text style={styles.label}>Project code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project code"
        value={formData.code}
        onChangeText={(value) => handleInputChange("code", value)}
      /> 

       <Text style={styles.label}>Principle Implementing agency</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter principle implementing agency name"
        value={formData.principle}
        onChangeText={(value) => handleInputChange("principle", value)}
      />

      <Text style={styles.label}>Sub Implementing Agency</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter sub implementing agency"
        value={formData.subAgency}
        onChangeText={(value) => handleInputChange("subAgency", value)}
      />

      
<Text style={styles.label}>*Fill details in following table</Text>

<View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Sr.No</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Details of Computers/software</Text>
       

        </View>
        {[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ].map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{item}</Text>
            <TextInput style={[styles.tableCell, styles.input]} placeholder="" />
           
          </View>
        ))}
        
      </View>

     

      

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.label}>NOTE</Text>
   
      <Text>• A list of all equipment procured for the last seven years from S&T/R&D Fund giving the status and its present utilisation.</Text>
      <Text>• The status should cover whether the equipment is in working condition or under breakdown. If under breakdown, can it be repaired & used in this research project?</Text>
      <Text>• In the light of the above please give detailed justification for procurement of additional equipment when such equipment had been procured earlier under other S&T/R&D funding.</Text>
      <Text style={{marginBottom:20}}>• This form should be signed by Project Leader and Project Coordinator and to be incorporated in the project proposal.</Text>
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
  tableHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
 
 
});

export default ProjectProposalForm;