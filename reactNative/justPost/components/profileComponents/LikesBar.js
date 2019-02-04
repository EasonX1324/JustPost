import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

export class LikesBar extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.smallSize}
          activeOpacity={0.5}
          onPress={() => {
            this.props.openPostDetail(this.props.post);
          }}
        >
          <Image
            style={{ width: 100 + "%", height: 100 + "%", borderRadius: 15 }}
            source={{
              uri: this.props.post.image
            }}
          />
        </TouchableOpacity>
        <Text style={styles.infoContainer}>
          <Text style={styles.text}>
            {"Title: " + this.props.post.post_title + "\n"}
          </Text>
          <Text style={styles.text}>
            {"Created by: " + this.props.post.authorInfo.userNName + "\n"}
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            this.props.dislikeThisPost();
          }}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/icons/rheart.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderRightWidth: 5,
    borderTopWidth: 4,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    height: 65,
    borderRadius: 10,
    borderColor: "rgb(204, 204, 204)",
    backgroundColor: "white",
    // alignItems: "center"
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  infoContainer: {
    marginLeft: 5,
    height: 50,
    width: 80,
    marginTop: 5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 14
  },
  iconContainer: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginRight: 5,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-end"
  },
  icon: {
    maxWidth: 30,
    maxHeight: 30
  },
  smallSize: {
    height: 50,
    width: 50,
    marginTop: 5,
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
