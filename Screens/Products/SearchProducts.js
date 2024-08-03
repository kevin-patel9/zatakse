import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import SearchIconSvg from "../../assets/svg/SearchIconSvg";
import BackButtonSvg from "../../assets/svg/BackButtonSvg";
import { debounce } from "lodash";
import CrossButton from "../../assets/svg/CrossButton";

const SearchProducts = ({ navigation }) => {
  const [searchList, setSearchList] = useState([]);
  const [productSearchName, setProductSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce the search input to limit API calls
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm) {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(
            `https://dummyjson.com/products/search?q=${searchTerm}&limit=9`
          );
          const data = await res.json();
          setSearchList(data?.products || []);
        } catch (err) {
          setError("Failed to fetch data");
        } finally {
          setLoading(false);
        }
      } else {
        setSearchList([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(productSearchName);
  }, [productSearchName, debouncedSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <BackButtonSvg />
        </TouchableOpacity>
        <TextInput
          placeholder="Search to add products"
          onChangeText={(text) => setProductSearchName(text)}
          style={styles.input}
          value={productSearchName}
        />
        {productSearchName && (
          <TouchableOpacity onPress={() => setProductSearchName("")}>
            <CrossButton />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{ paddingLeft: 8 }}>
          <SearchIconSvg />
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {error && (
        <View style={styles.centered}>
          <Text>{error}</Text>
        </View>
      )}
      {productSearchName && !loading && !error && (
        <FlatList
          data={searchList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.images[0] }} style={styles.image} />
              <Text>
                {item.title.length < 32 ? (
                  item.title
                ) : (
                  <>{item.title.substring(0, 32)}...</>
                )}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    marginHorizontal: 10,
    marginTop: 16,
    borderRadius: 40,
    elevation: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  image: {
    height: 48,
    width: 48,
    marginRight: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchProducts;
