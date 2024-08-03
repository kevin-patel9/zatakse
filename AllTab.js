import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Profile from "./Screens/Profile";
import Overview from "./Screens/Overview";
import Orders from "./Screens/Orders";
import Products from "./Screens/Products/Products";

const AllTab = () => {
  const OrderIcon = (tabInfo) => {
    return (
      <View style={styles.iconContainer}>
        <View style={{ zIndex: 2 }}>
          <View style={{ height: 22, width: 22 }}>
            <Image
              source={require("./assets/bottomTabImages/orders.png")}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
        </View>
        <View
          style={[
            styles.iconBackground,
            { backgroundColor: tabInfo.focused ? "lightgrey" : "none" },
          ]}
        />
      </View>
    );
  };
  const ProductsIcon = (tabInfo) => {
    return (
      <View style={styles.iconContainer}>
        <View style={{ zIndex: 2 }}>
          <View style={{ height: 22, width: 22 }}>
            <Image
              source={require("./assets/bottomTabImages/products.png")}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
        </View>
        <View
          style={[
            styles.iconBackground,
            { backgroundColor: tabInfo.focused ? "lightgrey" : "none" },
          ]}
        />
      </View>
    );
  };
  const OverviewIcon = (tabInfo) => {
    return (
      <View style={styles.iconContainer}>
        <View style={{ zIndex: 2 }}>
          <View style={{ height: 22, width: 22 }}>
            <Image
              source={require("./assets/bottomTabImages/currency_rupee.png")}
              style={{ flex: 1, width: null, height: null, resizeMode: "contain" }}
            />
          </View>
        </View>
        <View
          style={[
            styles.iconBackground,
            { backgroundColor: tabInfo.focused ? "lightgrey" : "none" },
          ]}
        />
      </View>
    );
  };
  const ProfileIcon = (tabInfo) => {
    return (
      <View style={styles.iconContainer}>
        <View style={{ zIndex: 2 }}>
          <View style={{ height: 22, width: 22 }}>
            <Image
              source={require("./assets/bottomTabImages/person.png")}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
        </View>
        <View
          style={[
            styles.iconBackground,
            { backgroundColor: tabInfo.focused ? "lightgrey" : "none" },
          ]}
        />
      </View>
    );
  };

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={"Products"}
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          position: "absolute",
        },
      }}
      tabBarOptions={{ showLabel: false }}
    >
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: OrderIcon,
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ProductsIcon,
        }}
      />
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          tabBarIcon: OverviewIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default AllTab;

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBackground: {
    height: 41,
    width: 60,
    position: "absolute",
    borderRadius: 8,
  },
});
