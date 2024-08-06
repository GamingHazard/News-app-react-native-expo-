import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

export default function SavedScreen() {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [savedArticles, setSavedArticles] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const [urlList, setUrlList] = useState([]);

  // Function to handle click on an item
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  useEffect(() => {
    const urls = savedArticles.map((item) => item.url);
    setUrlList(urls);
  }, [savedArticles]);

  // Function to format the date
  function formatDate(isoDate) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.error("Error Saving/Removing Article", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];
          setSavedArticles(savedArticlesArray);
        } catch (error) {
          console.error("Error loading saved articles", error);
        }
      };

      loadSavedArticles();
    }, [navigation])
  );

  const clearSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem("savedArticles");
      setSavedArticles([]);
    } catch (error) {
      console.error("Error clearing saved articles", error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="flex-1 my-2 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%] shadow-sm">
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{
                uri:
                  item.urlToImage ||
                  "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
              style={{ width: hp(9), height: hp(10) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>
          <View className="w-[70%] pl-4 justify-center space-y-1">
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item.author}
            </Text>
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white"
              style={{
                fontSize: hp(1.7),
                fontFamily: "SpaceGroteskBold",
              }}
            >
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </Text>
            <Text className="text-xs text-gray-700 dark:text-neutral-300">
              {formatDate(item.publishedAt)}
            </Text>
          </View>
          <TouchableOpacity
            className="justify-center items-center px-4"
            onPress={() => toggleBookmarkAndSave(item, index)}
          >
            <BookmarkSquareIcon
              size={30}
              color={bookmarkStatus[index] ? "green" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 pt-4 px-4 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <View className="flex-row justify-between">
        <Text
          className="text-3xl text-green-800 dark:text-white"
          style={{ fontFamily: "SpaceGroteskBold" }}
        >
          Saved
        </Text>
        <TouchableOpacity onPress={clearSavedArticles}>
          <Text
            className="text-base text-gray-600 dark:text-neutral-300"
            style={{ fontFamily: "SpaceGroteskMedium" }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      {savedArticles.length > 0 ? (
        <FlatList
          data={savedArticles}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
        />
      ) : (
        <Text className="text-center text-gray-600 dark:text-neutral-300">
          No saved articles
        </Text>
      )}
    </SafeAreaView>
  );
}
