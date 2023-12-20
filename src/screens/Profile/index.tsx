import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Footer } from "./components/Footer";
import { Content } from "./components/Content";
import { Header } from "@components/Header";

export const Profile: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1, padding: 0 }}>
        <Content />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 0,
  },
});
