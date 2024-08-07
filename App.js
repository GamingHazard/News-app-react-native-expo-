import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation";
import { View, ScrollView } from "react-native";
import React, { useState } from "react";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <AppNavigation />
      {/* <SplashScreens /> */}
    </View>
  );
};

export default App;
