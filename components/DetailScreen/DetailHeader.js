import React from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Title, Paragraph } from "react-native-paper";
import { theme } from "../../theme";

/**
 * @typedef {Object} DetailHeaderProps
 * @property {string} imageUrl
 * @property {string} title
 * @property {string} author
 * @property {string} genre
 * @property {string} epoch
 */
export const DetailHeader = ({ imageUrl, title, author, genre, epoch }) => (
  <View style={styles.headerContainer}>
    <Animatable.View
      animation="fadeIn"
      duration={1000}
      style={styles.imageWrapper}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.coverImage}
        resizeMode="cover"
      />
    </Animatable.View>
    <View style={styles.headerInfo}>
      <Title style={styles.title}>{title || "Title Not Available"}</Title>
      <Paragraph style={styles.author}>
        by {author || "Unknown Author"}
      </Paragraph>
      <View style={styles.tags}>
        <Paragraph style={styles.tag}>
          {genre || "Genre Not Available"}
        </Paragraph>
        <Paragraph style={styles.tag}>
          {epoch || "Epoch Not Available"}
        </Paragraph>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    padding: 20,
  },
  imageWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  coverImage: {
    width: 180,
    height: 260,
    borderRadius: 15,
  },
  headerInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: theme.colors.primary,
  },
  author: {
    fontSize: 16,
    color: theme.colors.secondary,
    marginTop: 8,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 12,
  },
  tag: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 4,
    color: theme.colors.primary,
    fontSize: 14,
  },
});
