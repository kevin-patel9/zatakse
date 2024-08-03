import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import BackButtonSvg from "../../assets/svg/BackButtonSvg";
import SearchIconSvg from "../../assets/svg/SearchIconSvg";

const Subcategory = ({ route, navigation }) => {
  const { categoryUrl, categoryName } = route.params;
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch(categoryUrl)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data?.products || []);
      })
      .catch((err) => {
        // Handle error here if needed
      });
  }, [categoryUrl]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item?.thumbnail }} style={styles.image} />
      <Text style={styles.text}>{item?.title}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.topBar}>
        <View style={styles.topBarDetailsContainer}>
          <Pressable onPress={() => navigation.pop()}>
            <BackButtonSvg />
          </Pressable>
          <View>
            <Text style={styles.topBarTitle}>{categoryName}</Text>
            <Text style={styles.topBarSubtitle}>Select any product to add</Text>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate("searchPage")}>
          <SearchIconSvg />
        </Pressable>
      </View>
      <View style={styles.container}>
        <FlatList
          data={allProducts}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    elevation: 2,
  },
  topBarDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topBarSubtitle: {
    fontSize: 14,
    color: "grey",
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
  item: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  image: {
    height: 80,
    width: 80,
  },
  text: {
    marginTop: 4,
    textAlign: "center",
  },
});

export default Subcategory;
