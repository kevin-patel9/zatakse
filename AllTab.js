import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Profile from "./Screens/Profile";
import Overview from "./Screens/Overview";
import Products from "./Screens/Products";
import Orders from "./Screens/Orders";

const AllTab = () => {
  const OrderIcon = (tabInfo) => {
    return (
      <View style={styles.iconContainer}>
        <View style={{ zIndex: 2 }}>
          <View style={{ height: 24, width: 24 }}>
            <Image
              // source={require("./assets/MainIcons/ticket2.png")}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
        </View>
        <View
          style={[
            styles.iconBackground,
            { backgroundColor: tabInfo.focused ? "grey" : "none" },
          ]}
        />
      </View>
    );
  };
  const ProductsIcon = (tabInfo) => {
    return (
      <View style={styles.iconContainer}>
        <View style={{ zIndex: 2 }}>
          <View style={{ height: 24, width: 24 }}>
            <Image
              // source={require("./assets/MainIcons/ticket2.png")}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
        </View>
        <View
          style={[
            styles.iconBackground,
            { backgroundColor: tabInfo.focused ? "grey" : "none" },
          ]}
        />
      </View>
    );
  };
  const OverviewIcon = (tabInfo) => {
    return (
      <View style={styles.iconContainer}>
        <View style={{ zIndex: 2 }}>
          <View style={{ height: 24, width: 24 }}>
            <Image
              // source={require("./assets/MainIcons/ticket2.png")}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
        </View>
        <View
          style={[
            styles.iconBackground,
            { backgroundColor: tabInfo.focused ? "grey" : "none" },
          ]}
        />
      </View>
    );
  };
  const ProfileIcon = (tabInfo) => {
    return (
      <View style={styles.iconContainer}>
        <View style={{ zIndex: 2 }}>
          <View style={{ height: 24, width: 24 }}>
            <Image
              // source={require("./assets/MainIcons/ticket2.png")}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
        </View>
        <View
          style={[
            styles.iconBackground,
            { backgroundColor: tabInfo.focused ? "grey" : "none" },
          ]}
        />
      </View>
    );
  };

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={"OrderScreen"}
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
        name="OrdersScreen"
        component={Orders}
        options={{
          tabBarIcon: OrderIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProductsScreen"
        component={Products}
        options={{
          tabBarIcon: ProductsIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OverviewScreen"
        component={Overview}
        options={{
          tabBarIcon: OverviewIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ProfileIcon,
          headerShown: false,
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
