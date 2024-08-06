// BreakingNewsCard.js
import React from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import "../styles.css";

var { width, height } = Dimensions.get("window");

export default function BreakingNewsCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={{ position: "relative", marginBottom: 20 }}>
        <Image
          source={{
            uri:
              item.urlToImage ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={{
            width: width * 0.8,
            height: height * 0.22,
            borderRadius: 24,
          }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
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

        <View
          style={{
            position: "absolute",
            bottom: 6,
            left: 4,
            justifyContent: "flex-end",
            height: "80%",
          }}
        >
          <View style={{ marginBottom: 5 }}>
            <View style={{ maxWidth: "98%" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {item.title.length > 60
                  ? item.title.slice(0, 58) + "..."
                  : item.title.split("-")[0] || "N/A"}
              </Text>
            </View>

            <View>
              <Text
                style={{ color: "#d3d3d3", fontSize: 14, fontWeight: "500" }}
              >
                {item?.author?.length > 20
                  ? item.author.slice(0, 20) + "..."
                  : item.author}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
