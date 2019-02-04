import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { CollectionCard } from "./CollectionCard";
import { MyCollectionHeader } from "./MyCollectionHeader";
const { userModule } = require("../../controller/userModule/userModule");

export class MyCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allPost: [] };
    this.openPostDetail = this.openPostDetail.bind(this);
    this.collectThisPost = this.collectThisPost.bind(this);
  }

  openPostDetail(p) {
    const { params } = this.props.navigation.state;
    let currentUser = params.currentUser;
    this.props.navigation.navigate("PostDetail", { p, currentUser });
  }

  collectThisPost() {
    alert("you could dis-collect this post on mainPage");
  }
  async componentDidMount() {
    const { params } = this.props.navigation.state;
    //console.log(params.currentUser.userId);
    const email = params.currentUser.userId;
    post = await userModule.getUserCollectionsById(email);
    //compare users liked post and collected post to all will-display posts

    this.setState({
      allPost: post
    });
  }

  _render() {
    let result = [];
    this.state.allPost.forEach(post => {
      result.push(
        <CollectionCard
          key={post.postId}
          post={post}
          collectThisPost={this.collectThisPost}
          openPostDetail={this.openPostDetail}
        />
      );
    });
    return result;
  }

  render() {
    let views = this._render();
    return (
      <View style={{ flex: 1 }}>
        <MyCollectionHeader />
        <ScrollView style={styles.container}>{views}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + "%",
    height: 100 + "%",
    backgroundColor: "rgb(227, 246, 249)"
    // flexDirection: "row",
    // flexWrap: "wrap"
  }
});
