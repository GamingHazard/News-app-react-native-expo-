import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../components/Loading/Loading";

SplashScreen.preventAutoHideAsync();

export default function SplashScreens() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskBold: require("../../assets/fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskLight: require("../../assets/fonts/SpaceGrotesk-Light.ttf"),
    SpaceGroteskMedium: require("../../assets/fonts/SpaceGrotesk-Medium.ttf"),
    SpaceGroteskRegular: require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
    SpaceGroteskSemiBold: require("../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
        navigation.navigate("Welcome"); // Navigate to Welcome screen
      }
    };

    hideSplashScreen();
  }, [fontsLoaded, fontError, navigation]);

  if (!fontsLoaded) {
    return <Loading />; // Prevents rendering until fonts are loaded
  }

  return (
    <View className="flex-1 justify-center items-center">
      <LinearGradient
        colors={["rgba(0, 85, 0, 0.95)", "rgba(0, 85, 0, 0.95)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Animated.View
        entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
      >
        <Text className="text-white text-3xl font-extrabold uppercase">
          Joe Times News
        </Text>
      </Animated.View>
    </View>
  );
}
