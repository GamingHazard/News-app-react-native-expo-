import React from "react";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation";

import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://e328c0b26c2e12d2bf2c1f348f242065@o4507733087813632.ingest.de.sentry.io/4507744062996560",
  debug: true,
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1 }}>
        <AppNavigation />
      </View>
    </QueryClientProvider>
  );
};

export default Sentry.wrap(App);
