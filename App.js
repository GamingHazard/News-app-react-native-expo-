import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation";
import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import SplashScreens from "./src/screens/SplashScreens";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <AppNavigation />
      {/* <SplashScreens /> */}
    </View>
  );
}
