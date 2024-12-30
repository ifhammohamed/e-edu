import React from "react";
import { StyleSheet, TouchableOpacity, View, Linking } from "react-native";
import { Card, Paragraph, Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { theme } from "../../theme";

/**
 * @typedef {Object} DetailContentProps
 * @property {string} kind
 * @property {string} url
 * @property {string} fullSortKey
 * @property {() => void} onIncrementTouch
 */
export const DetailContent = ({ kind, url, fullSortKey, onIncrementTouch }) => {
  const handleOpenLink = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <Animatable.View animation="slideInUp" duration={800}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.infoRow}>
            <Paragraph style={styles.label}>Type</Paragraph>
            <Paragraph style={styles.value}>
              {kind || "Not Available"}
            </Paragraph>
          </View>

          <View style={styles.infoRow}>
            <Paragraph style={styles.label}>URL</Paragraph>
            <TouchableOpacity onPress={handleOpenLink}>
              <Paragraph style={styles.link} numberOfLines={1}>
                {url || "Not Available"}
              </Paragraph>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <Paragraph style={styles.label}>Sort Key</Paragraph>
            <Paragraph style={styles.value} numberOfLines={1}>
              {fullSortKey || "Not Available"}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={onIncrementTouch}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Increment Touch Count
        </Button>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: theme.colors.surface,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: theme.colors.text,
  },
  link: {
    fontSize: 16,
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 4,
    backgroundColor: theme.colors.primary,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
