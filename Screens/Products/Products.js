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
import { commonPoint } from "../../common/Apicall";

// Fetch image URL based on the category URL
const fetchImageUrl = async (url) => {
  try {
    const res = await fetch(url + "?limit=1");
    const data = await res.json();
    return data.products[0].thumbnail;
  } catch (error) {
    console.error("Failed to fetch image URL", error);
    return null;
  }
};

const Products = ({ navigation }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch category data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${commonPoint}/products/categories`
        );
        const data = await response.json();
        setCategoryData(data);

        // Fetch image URLs for each category
        const urls = {};
        for (const category of data) {
          const imageUrl = await fetchImageUrl(category.url);
          if (imageUrl) {
            urls[category.url] = imageUrl;
          }
        }
        setImageUrls(urls);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text>Loading... Wait few second</Text>
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
    navigation.navigate("sub-categories", { categoryUrl: url, categoryName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <FlatList
        data={categoryData}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigate(item.url, item.name)}
            style={styles.item}
          >
            {imageUrls[item.url] ? (
              <Image
                source={{ uri: imageUrls[item.url] }}
                style={styles.image}
              />
            ) : (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    margin: 8,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 16,
    resizeMode: "cover",
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
  contentContainer: {
    paddingHorizontal: 8,
    paddingBottom: 80,
    paddingTop: 10
  },
});

export default Products;
