import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { MyCollection } from "./MyCollection";

export class ProfileCategory extends Component {
  constructor(props) {
    super(props);
    this.openMyCollection = this.openMyCollection.bind(this);
    this.openMyLikes = this.openMyLikes.bind(this);
  }

  openMyCollection() {
    const currentUser = this.props.user;
    this.props.navigation.navigate("MyCollection", { currentUser });
  }

  openMyLikes() {
    const currentUser = this.props.user;
    this.props.navigation.navigate("MyLikes", { currentUser });
  }

  render() {
    return (
      <View style={{ height: 50 }}>
        <View>
          <TouchableOpacity onPress={() => this.openMyCollection()}>
            <Text style={{ fontSize: 17, marginLeft: 10 }}>My collection</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.openMyLikes()}>
          <Text style={{ fontSize: 17, marginTop: 3, marginLeft: 10 }}>
            My Likes
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
