import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: "#333" },
          headerTintColor: "#fff",
          drawerStyle: { backgroundColor: "#333" },
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#aaa",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Dashboard",
          }}
        />
        <Drawer.Screen
          name="proposalList"
          options={{
            drawerLabel: "View Proposals",
            title: "Proposal",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}