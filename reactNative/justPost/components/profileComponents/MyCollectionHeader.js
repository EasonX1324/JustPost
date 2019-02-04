
import React, { Component } from "react";
// import LinearGradient from "react-native-linear-gradient";
import {
    Text,
    View,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    BVLinearGradient
} from "react-native";

export class MyCollectionHeader extends Component {
    render() {
        return (
            <View style={styles.bar}>
                <Text style={[styles.text]}>
                    My Collection
                </Text>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    },
    border: {
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "red"
    },
    bar: {
        backgroundColor: "white"
    }
  
  });