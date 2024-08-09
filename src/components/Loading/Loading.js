import { View, ActivityIndicator, Text } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text
        className="text-black dark:text-white"
        style={{ fontWeight: "bold" }}
      >
        Loading...
      </Text>
      <ActivityIndicator size="small" color="green" />
    </View>
  );
}
