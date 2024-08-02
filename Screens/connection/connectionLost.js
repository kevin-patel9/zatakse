import React from "react";
import {
View,
Text,
StyleSheet,
Dimensions,
} from "react-native";

const height = Dimensions.get("window").height;

const ConnectionLost = () => {
return (
    <View style={styles.connectionContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.head}>Connection Lost</Text>
            <Text style={styles.content}>
                Please check your connection!
            </Text>
        </View>
    </View>
    );
};

export default ConnectionLost;

const styles = StyleSheet.create({
    connectionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        width: "62%",
        top: -height * 0.1,
    },
    head: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: "bold",
        color: "skyblue",
    },
    content: {
        textAlign: "center",
        marginTop: 16,
        lineHeight: 25,
    }
});