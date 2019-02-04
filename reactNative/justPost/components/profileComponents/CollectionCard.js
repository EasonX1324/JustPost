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

export class CollectionCard extends Component {
  render() {
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity
          style={{ height: 280, width: 100 + "%" }}
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

        <View style={styles.iconBar}>
          <Text style={styles.postAuthor}>{this.props.post.post_title}</Text>

          <TouchableOpacity
            style={{ width: 25, height: 25 }}
            onPress={() => {
              this.props.collectThisPost();
            }}
          >
            <Image
              style={styles.icon}
              source={
                // this.state.ifSave[j]
                // ? require("../../assets/icons/ystar.png")
                // : require("../../assets/icons/wstar.png")
                require("../../assets/icons/ystar.png")
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    borderStyle: "solid",
    borderRightWidth: 5,
    borderTopWidth: 4,
    // borderBottomWidth: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    // marginRight: 20,
    // width: 320,
    // height: 320,
    flex: 1,
    borderRadius: 10,
    borderColor: "rgb(204, 204, 204)",
    backgroundColor: "white",
    alignItems: "center"
  },
  postAuthor: {
    height: 100 + "%",
    width: 50 + "%",
    fontSize: 18
  },
  iconBar: {
    width: 90 + "%",
    height: 25,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-end",
    marginBottom: 10
  },
  icon: {
    maxWidth: 25,
    maxHeight: 25
  }
});
