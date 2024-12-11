  import React, { useState } from 'react';
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
  } from 'react-native';
  import * as DocumentPicker from 'expo-document-picker';
  import axios from 'axios';
  const FileUploadForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProjectId] = useState('');
    const [file, setFile] = useState(null);

    const handleFilePicker = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: "/", // Allow all file types
          copyToCacheDirectory: true,
        });
        const selectedFile = result.assets[0]; // Access the first file from the assets array
        setFile(selectedFile);
        if (!result.canceled) {
        } else {
          Alert.alert("File selection canceled");
        }
      } catch (error) {
        Alert.alert("Error selecting file", error.message);
      }
    };
    
    const handleSubmit = async () => {
      console.log(file)
      console.log("CLICKED")
      if (!name || !description || !project || !file) {
        Alert.alert("Please fill all fields and select a file.");
        return;
      }
      const formData = new FormData();
      formData.append("name",name)
      formData.append("description",description)
      formData.append("project",project)
      formData.append("file",{
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
  
      })
      try{
        const response = await axios.post("http://127.0.0.1:8000/api/accounts/reports/",formData,
          {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer 483f72fa4eb903af3918f1c4468a88e017039189',
          }});
        console.log(response.data)
      }
      catch{
        console.log("SOME ERROR ")
      }
      console.log("Form submitted:", formData);
      Alert.alert("Form Submitted", `File: ${file.name}`);
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Project ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter project ID"
          value={project}
          onChangeText={setProjectId}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.filePicker} onPress={handleFilePicker}>
          <Text style={styles.filePickerText}>
            {file ? file.name : "Select File"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f5f5f5",
    },
    label: {
      fontSize: 16,
      marginVertical: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      backgroundColor: "#fff",
    },
    filePicker: {
      backgroundColor: "#007bff",
      borderRadius: 5,
      padding: 15,
      marginVertical: 15,
      alignItems: "center",
    },
    filePickerText: {
      color: "#fff",
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: "#28a745",
      borderRadius: 5,
      padding: 15,
      alignItems: "center",
    },
    submitButtonText: {
      color: "#fff",
      fontSize: 16,
    },
  });

  export default FileUploadForm;