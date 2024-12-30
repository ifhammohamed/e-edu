import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
import { useTouchCount } from "../context/TouchCountContext";
import { theme } from "../theme";
import TouchCountDisplay from "../components/TouchCountDisplay";
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { incrementTouchCount } = useTouchCount();

  useEffect(() => {
    fetchData();
  }, [page, searchQuery]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/`
      );
      const result = await response.json();
      setData((prevData) => [...prevData, ...result]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setData([]);
  };

  const renderItem = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", { item });
          incrementTouchCount();
        }}
      >
        <View style={styles.cardContent}>
          <Image source={{ uri: item.simple_thumb }} style={styles.thumbnail} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.details}>
              Genre: {item.genre} | Epoch: {item.epoch}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Data List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.slug}-${index}`}
        onEndReached={() => setPage((prevPage) => prevPage + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" /> : null
        }
      />

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
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  searchBar: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnail: {
    width: 80,
    height: 100,
    borderRadius: 8,
    margin: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  author: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  details: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
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

export default HomeScreen;
