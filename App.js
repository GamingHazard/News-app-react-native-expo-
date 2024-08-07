import Bugsnag from "@bugsnag/expo";
Bugsnag.start();
Bugsnag.notify(new Error("Test error"));

import React, { useCallback } from "react";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AppNavigation from "./src/navigation";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Prevent auto-hide of the splash screen
SplashScreen.preventAutoHideAsync();

const App = () => {
  // Load the custom fonts
  const [fontsLoaded] = useFonts({
    SpaceGroteskBold: require("./assets/fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskLight: require("./assets/fonts/SpaceGrotesk-Light.ttf"),
    SpaceGroteskMedium: require("./assets/fonts/SpaceGrotesk-Medium.ttf"),
    SpaceGroteskRegular: require("./assets/fonts/SpaceGrotesk-Regular.ttf"),
    SpaceGroteskSemiBold: require("./assets/fonts/SpaceGrotesk-SemiBold.ttf"),
  });

  // Callback function to hide the splash screen once fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If fonts are not loaded, show nothing or a loading spinner
  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AppNavigation />
      </View>
    </QueryClientProvider>
  );
};

export default App;
