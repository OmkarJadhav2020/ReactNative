import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { register } from "@/api"; // Import the API call function
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure AsyncStorage is configured correctly

const { width } = Dimensions.get("window");

export default function Signup() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
 
  };

  const handleSignup = async () => {
    const { username, email, password, confirm_password } = formData;

    if (!username || !email || !password || !confirm_password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== confirm_password) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {

      const data = await register({
        username,
        email,
        password,
      });
      console.log(data)
      // Store tokens (if returned)
      if (data.access && data.refresh) {
        await AsyncStorage.setItem("accessToken", data.access);
        await AsyncStorage.setItem("refreshToken", data.refresh);
      }

      Alert.alert("Success", "Registration successful!");
      router.replace("/(main)"); // Redirect to the main page
    } catch (err) {
      Alert.alert(
        "Error",
        err?.response?.data?.detail || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={formData.username}
          onChangeText={(text) => handleInputChange("username", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={formData.confirm_password}
          onChangeText={(text) =>
            handleInputChange("confirm_password", text)
          }
        />
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.links}>
          <Text style={styles.linkText}>
            Already have an account?{" "}
            <Text style={styles.link} onPress={() => router.back()}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  logoSection: {
    flex: 0.2,
    backgroundColor: "#464655",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "60%",
    height: "40%",
  },
  formSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  links: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  link: {
    color: "#3897f0",
    fontWeight: "bold",
  },
});
