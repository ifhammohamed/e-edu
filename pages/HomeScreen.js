import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import InfiniteScrollView from "react-native-infinite-scroll-view";
import apiService from "../service/apiService";
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [howManyCountTouched, setHowManyCountTouched] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page, searchQuery, perPage]);

  const fetchData = async () => {
    setIsLoading(true);
    // Fetch data from API based on page and searchQuery
    const response = await fetch(
      `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=R7JFUQhojHbNwMnx2U4P3PtYZVRVcvIzSJwCs6EE&page=${page}&per_page=${perPage}`
    );
    const result = await response.json();
    setData((prevData) => [...prevData, ...result.results]);
    setIsLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setData([]);
  };

  const handleTouchCount = () => {
    setHowManyCountTouched((prevCount) => prevCount + 1);
  };

  const renderItem = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={800}>
      <TouchableOpacity>
        <Card
          style={styles.card}
          onPress={() => {
            handleTouchCount();
            navigation.navigate("Detail", { item });
          }}
        >
          <Card.Content>
            <Title>{item.school.name}</Title>
            <Paragraph>
              {item.school.city}, {item.school.state}
            </Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => setPage((prevPage) => prevPage + 1)} // Increment page for new data
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" /> : null
        }
        renderScrollComponent={(props) => (
          <InfiniteScrollView
            {...props}
            onLoadMoreAsync={() => setPage((prevPage) => prevPage + 1)} // Load more items here
          />
        )}
      />

      {/* Touch Count Display */}
      <View style={styles.touchCountContainer}>
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          style={styles.touchCountText}
        >
          Touched {howManyCountTouched} times
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    color: "black", // Changed color to black
    borderRadius: 5,
  },
  card: {
    marginBottom: 10,
  },
  touchCountContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#6200ea",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  touchCountText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    justifyContent: "center",
  },
});

export default HomeScreen;
