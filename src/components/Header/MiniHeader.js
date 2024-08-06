import { View, Text } from "react-native";
import React from "react";
import "../styles.css";

export default function MiniHeader({ label }) {
  return (
    <View className="px-4 my-4 justify-between flex-row items-center">
      <Text
        className="text-2xl text-green-800 dark:text-white "
        style={{
          fontFamily: "SpaceGroteskBold",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
