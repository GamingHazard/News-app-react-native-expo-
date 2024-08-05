// HomeScreen.js
import { View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import NewsSection from "../components/NewsSection/NewsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreakingNews from "../components/BreakingNews";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
  });

  // Recommended News
  const { data: recommendedNew, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommendedNews"],
    queryFn: fetchRecommendedNews,
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
      }}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <Header />

        {/* Breaking News */}
        {isBreakingLoading ? (
          <Loading />
        ) : (
          <View>
            <MiniHeader label="Breaking News" />
            <BreakingNews data={data.articles} />
          </View>
        )}

        {/* Recommended News */}
        <View>
          <MiniHeader label="Recommended" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(80),
            }}
          >
            {isRecommendedLoading ? (
              <Loading />
            ) : (
              <NewsSection
                label="Recommendation"
                newsProps={recommendedNew.articles}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
