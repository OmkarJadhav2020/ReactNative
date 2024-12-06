import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProposalFormData = {
  name: string;
  description: string;
  budget: string;
  duration_years: string;
  duration_months: string;
};

const AddProposal: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ProposalFormData>();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);

  // Function to pick image from the gallery
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'You need to grant gallery access to pick an image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0]); // Set the selected image
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Unable to open image picker.');
    }
  };

  // Function to retrieve the user ID from AsyncStorage
  const getSubmittedBy = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem('sessionid');
      return token ? token : null;
    } catch (error) {
      console.error('Error fetching session ID:', error);
      return null;
    }
  };

  // Form submission handler
  const onSubmit = async (data: ProposalFormData) => {
    setLoading(true);

    try {
      const submittedBy = await getSubmittedBy();
      if (!submittedBy) {
        Alert.alert('Error', 'User not authenticated.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('budget', data.budget);
      formData.append('duration_years', data.duration_years);
      formData.append('duration_months', data.duration_months);
      formData.append('submitted_by', submittedBy);

      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.fileName || 'upload.jpg',
        });
      }
      
      const response = await axios.post(
        'http://192.168.63.86:8000/api/accounts/proposals/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response)
      if (response.status === 201) {
        Alert.alert('Success', 'Proposal submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting proposal:', error.response || error.message);
      const message =
        error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Proposal</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.errorBorder]}
              onChangeText={onChange}
              value={value}
              placeholder="Enter proposal name"
            />
          )}
          name="name"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <Controller
          control={control}
          rules={{ required: 'Description is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.description && styles.errorBorder]}
              onChangeText={onChange}
              value={value}
              placeholder="Enter proposal description"
              multiline
            />
          )}
          name="description"
        />
        {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Budget</Text>
        <Controller
          control={control}
          rules={{ required: 'Budget is required', pattern: /^\d+(\.\d{1,2})?$/ }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.budget && styles.errorBorder]}
              onChangeText={onChange}
              value={value}
              placeholder="Enter budget"
              keyboardType="numeric"
            />
          )}
          name="budget"
        />
        {errors.budget && <Text style={styles.errorText}>{errors.budget.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Duration (Years)</Text>
        <Controller
          control={control}
          rules={{ required: 'Duration in years is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.duration_years && styles.errorBorder]}
              onChangeText={onChange}
              value={value}
              placeholder="Enter years"
              keyboardType="numeric"
            />
          )}
          name="duration_years"
        />
        {errors.duration_years && <Text style={styles.errorText}>{errors.duration_years.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Duration (Months)</Text>
        <Controller
          control={control}
          rules={{ required: 'Duration in months is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.duration_months && styles.errorBorder]}
              onChangeText={onChange}
              value={value}
              placeholder="Enter months"
              keyboardType="numeric"
            />
          )}
          name="duration_months"
        />
        {errors.duration_months && <Text style={styles.errorText}>{errors.duration_months.message}</Text>}
      </View>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>{image ? 'Change Image' : 'Pick an Image'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  formGroup: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, backgroundColor: '#f9f9f9' },
  errorBorder: { borderColor: 'red' },
  errorText: { color: 'red', marginTop: 5 },
  imagePicker: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginBottom: 15 },
  imagePickerText: { color: '#fff', textAlign: 'center' },
  imagePreview: { width: '100%', height: 200, marginVertical: 15, borderRadius: 5 },
  submitButton: { backgroundColor: '#28A745', padding: 15, borderRadius: 5 },
  submitButtonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  disabledButton: { backgroundColor: '#6c757d' },
});

export default AddProposal;