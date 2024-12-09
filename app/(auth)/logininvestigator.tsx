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
} from "react-native";
import { login } from "@/api"; // Ensure this API function is correct.
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseURL } from "@/constants/Colors";
const { width } = Dimensions.get("window");


export default function Login() {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://${baseURL}:8000/api/accounts/login/`, credentials,{withCredentials: true});
      if (response.status === 200) {
        console.log(response)
        // Save session ID in AsyncStorage
        const tokenId = response.data.token // Adjust based on backend
        if (tokenId) {
          await AsyncStorage.setItem('sessionid', tokenId);
          await AsyncStorage.setItem('id', `${response.data.id}`);
          console.log('Login successful');
          router.replace("/(investigator)")
        }
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      alert(error);
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

      <View style={styles.formSection}>
        <Text style={styles.title}>Investigator Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          placeholderTextColor="#999"
          value={credentials.username}
          onChangeText={(text) => setCredentials({ ...credentials, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.links}>
          <Text style={styles.linkText}>
            Admin login{" "}
            <Text
              style={styles.link}
              onPress={() => router.push("/(auth)/loginadmin")}
            >
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
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  loginButtonText: {
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
