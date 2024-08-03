import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const Products = ({ navigation }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.centered}>
          <Text>Error fetching data: {error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleNavigate = (url, categoryName) => {
    navigation.navigate('sub-categories', { categoryUrl: url, categoryName })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.headerText}>Products</Text>
      </View>
      <FlatList
        data={categoryData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigate(item.url, item.name)} style={styles.item}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: "cover",
  },
});

export default Products;
