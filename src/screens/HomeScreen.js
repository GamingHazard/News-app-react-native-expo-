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
import BreakingNews from "../components/BreakingNews/index";

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();

  // Breaking News
  const {
    data,
    isLoading: isBreakingLoading,
    error: breakingNewsError,
  } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
  });

  // Recommended News
  const {
    data: recommendedNew,
    isLoading: isRecommendedLoading,
    error: recommendedNewsError,
  } = useQuery({
    queryKey: ["recommededNews"],
    queryFn: fetchRecommendedNews,
  });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <Header />

        {/* Breaking News */}
        {isBreakingLoading ? (
          <Loading />
        ) : breakingNewsError ? (
          <Text>Error loading breaking news.</Text>
        ) : (
          <View>
            <MiniHeader label="Breaking News" />
            <BreakingNews label="Breaking News" data={data?.articles} />
          </View>
        )}

        {/* Recommended News */}
        <View>
          <MiniHeader label="Top Headlines" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(80),
            }}
          >
            {isRecommendedLoading ? (
              <Loading />
            ) : recommendedNewsError ? (
              <Text style={{ alignSelf: "center", top: 50 }}>
                Error loading Top Headlines
              </Text>
            ) : (
              <NewsSection
                label="Recommendation"
                newsProps={recommendedNew?.articles}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
