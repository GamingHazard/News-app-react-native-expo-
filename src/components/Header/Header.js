import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import ProfileScreen from "../../screens/ProfileScreen";

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View>
        <Text
          className="font-spaceGroteskBold text-2xl text-green-800 dark:text-white font-extrabold uppercase"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          stack news
        </Text>
      </View>

      {/* Icon for toggling theme and Search Icon */}
      <View className="flex-row space-x-4 rounded-full justify-center items-center">
        <TouchableOpacity
          onPress={toggleColorScheme}
          className="bg-gray-200 dark:bg-green-800 rounded-full p-2"
        >
          {colorScheme == "dark" ? (
            <MoonIcon size={20} strokeWidth={2} color="white" />
          ) : (
            <SunIcon size={20} strokeWidth={2} color="green" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleModal}
          className="bg-gray-200 dark:bg-black rounded-full p-1"
        >
          <UserCircleIcon
            size={30}
            strokeWidth={2}
            color={colorScheme == "dark" ? "white" : "green"}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for user profile */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView} className="bg-white  dark:bg-black">
            <ProfileScreen closing={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,

    borderRadius: 20,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
