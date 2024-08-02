import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllTab from "./AllTab";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import ConnectionLost from "./Screens/connection/connectionLost";

export default function App() {
  const [connection, setConnection] = useState(true);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnection(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!connection) {
    return <ConnectionLost />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="allTabs"
          component={AllTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
