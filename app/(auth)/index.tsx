import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from "expo-router";

export default function AuthPage() {


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Role</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(auth)/loginadmin")}
            >
                <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(auth)/logininvestigator")}
            >
                <Text style={styles.buttonText}>Investigator</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#6200ea',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});
