import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export class ProfilePostCard extends Component {
  render() {
    return (
      <View style={styles.post}>
        <TouchableOpacity
          style={{ height: 198, width: 100 + "%" }}
          activeOpacity={0.5}
          onPress={() => {
            this.props.openPostDetail(this.props.post);
          }}
        >
          <Image
            style={{
              flex: 1,
              // margin:5,
              width: 100 + "%",
              height: 100 + "%",
              borderRadius: 15
            }}
            source={{
              uri: this.props.post.image
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  post: {
    //flex: 1,
    width: 47 + "%",
    height: 200,
    margin: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
