import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTouchCount } from "../context/TouchCountContext";
import TouchCountDisplay from "../components/TouchCountDisplay";
import { DetailHeader } from "../components/DetailScreen/DetailHeader";
import { DetailContent } from "../components/DetailScreen/DetailContent";
import { theme } from "../theme";

const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const { incrementTouchCount } = useTouchCount();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <DetailHeader
          imageUrl={item.simple_thumb}
          title={item.title}
          author={item.author}
          genre={item.genre}
          epoch={item.epoch}
        />

        <DetailContent
          kind={item.kind}
          url={item.url}
          fullSortKey={item.full_sort_key}
          onIncrementTouch={incrementTouchCount}
        />
      </ScrollView>

      <Animatable.View
        animation="bounceIn"
        duration={1500}
        style={styles.touchCountWrapper}
      >
        <TouchCountDisplay />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  touchCountWrapper: {
    position: "absolute",
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default DetailScreen;
