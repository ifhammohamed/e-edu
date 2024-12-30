// src/components/TouchCountDisplay.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTouchCount } from "../context/TouchCountContext";

const TouchCountDisplay = () => {
  const { touchCount } = useTouchCount();
  console.log("🚀 ~ TouchCountDisplay ~ touchCount:", touchCount);

  return (
    <View style={styles.floatingButton}>
      <Text style={styles.text}>Touches: {touchCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  text: { color: "#fff", fontWeight: "bold" },
});

export default TouchCountDisplay;
