import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <StatusBar hidden="true" /> */}
      <AppNavigation />
    </QueryClientProvider>
  );
}
