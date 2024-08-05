import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon, CameraIcon } from "react-native-heroicons/outline";
import { useColorScheme } from "nativewind";

export default function ProfileScreen({ closing }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: 270,
        alignItems: "center",
      }}
    >
      <View
        className="items-center bg-white   dark:bg-green-800 "
        style={{
          width: "100%",
          height: 300,
          elevation: 8,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        <XMarkIcon
          onPress={closing}
          style={{
            alignSelf: "flex-end",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          size={20}
          strokeWidth={2}
          color={colorScheme == "dark" ? "white" : "green"}
        />

        <View
          style={{
            backgroundColor: "white",
            width: 80,
            height: 80,

            alignSelf: "center",
            borderRadius: 70,

            padding: 5,
          }}
        >
          <Image
            style={{ width: "100%", height: "100%", borderRadius: 50 }}
            source={require("../../assets/profile.jpg")}
          />
        </View>
        <CameraIcon
          style={{
            alignSelf: "center",
            marginHorizontal: 10,
            marginVertical: 10,
            left: 30,
            bottom: 20,
          }}
          size={20}
          strokeWidth={1}
          color={colorScheme == "dark" ? "white" : "green"}
        />
        <Text
          style={{
            fontFamily: "SpaceGroteskBold",
            marginVertical: 10,
            top: -15,
          }}
          className="font-spaceGroteskBold text-2m text-green-800 dark:text-white font-extrabold uppercase"
        >
          User Name
        </Text>

        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          {/* Edit profile Button */}
          <TouchableOpacity
            className="bg-gray-200 dark:bg-white  rounded-half p-3"
            style={{
              // padding: 20,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginHorizontal: 16,
            }}
          >
            <Text className="font-spaceGroteskBold text-2m text-green-800 dark:text-green font-extrabold uppercase">
              Edit
            </Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            className="bg-gray-200 dark:bg-white  rounded-half p-3"
            style={{
              // padding: 20,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginHorizontal: 16,
            }}
          >
            <Text className="font-spaceGroteskBold text-2m text-green-800 dark:text-green font-extrabold uppercase">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        className="bg-white  dark:bg-neutral-900"
        style={{
          width: 240,
          // backgroundColor: "lightgreen",
          height: 250,
          top: -40,
          borderRadius: 10,
          elevation: 5,
          padding: 5,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 70,

            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: "whitesmoke",
            marginVertical: 5,
          }}
        ></View>
        <View
          style={{
            width: "100%",
            height: 70,

            backgroundColor: "whitesmoke",
            marginVertical: 5,
          }}
        ></View>
        <View
          style={{
            width: "100%",
            height: 70,

            backgroundColor: "whitesmoke",
            marginVertical: 5,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
}
