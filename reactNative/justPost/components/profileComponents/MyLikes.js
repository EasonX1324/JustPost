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
import { LikesBar } from "./LikesBar";
import { MyLikesHeader } from "./MyLikesHeader";
const { userModule } = require("../../controller/userModule/userModule");

export class MyLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allPost: [] };
    this.openPostDetail = this.openPostDetail.bind(this);
    this.dislikeThisPost = this.dislikeThisPost.bind(this);
  }

  openPostDetail(p) {
    const { params } = this.props.navigation.state;
    let currentUser = params.currentUser;
    this.props.navigation.navigate("PostDetail", { p, currentUser });
  }

  dislikeThisPost() {
    alert("you could dislike this post on mainPage");
  }

  async componentDidMount() {
    const { params } = this.props.navigation.state;
    // console.log(params.currentUser.userId)
    const email = params.currentUser.userId;
    post = await userModule.getUserLikedPostById(email);

    this.setState({
      allPost: post
    });
  }

  _render() {
    let result = [];
    this.state.allPost.forEach(post => {
      result.push(
        <LikesBar
          key={post.postId}
          post={post}
          dislikeThisPost={this.dislikeThisPost}
          openPostDetail={this.openPostDetail}
        />
      );
    });
    return result;
  }

  render() {
    let views = this._render();
    return (
      <View>
        <MyLikesHeader />
        <ScrollView>{views}</ScrollView>
      </View>
    );
  }
}
