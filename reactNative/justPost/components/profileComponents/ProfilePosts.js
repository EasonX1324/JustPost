import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter
} from "react-native";
import { ProfilePostCard } from "./ProfilePostComponent/ProfilePostCard";
const { userModule } = require("../../controller/userModule/userModule");
const projectApi = require("../../controller/ProjectAPI");

export class ProfilePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: []
      // first: true,
      // refresh: 0
    };
    this.openPostDetail = this.openPostDetail.bind(this);
  }

  // async componentDidMount() {
  //   this.listener = DeviceEventEmitter.addListener("refresh_Profile", key => {
  //     let currentPosts = this.state.userPosts;
  //     new Promise((resolve, reject) => {
  //       resolve(projectApi.getPostsbyId([key])[0]);
  //     }).then(newPost => {
  //       currentPosts.push(newPost);
  //       this.setState({ userPosts: currentPosts });
  //     });
  //   });
  //   let userPosts = await userModule.getUserPostsById(this.props.user.userId);
  //   this.setState({ userPosts: userPosts });
  // }

  async componentDidMount() {
    this.listener = DeviceEventEmitter.addListener("refresh_Profile", post => {
      // console.log(this.state);
      this.setState({ userPosts: post })
    });
    let userPosts = this.props.userPosts
    // console.log(userPosts);
    this.setState({ userPosts: userPosts })
  }

  componentWillUnmount() {
    this.listener.remove();
  }
  openPostDetail(p) {
    let currentUser = this.props.user;
    this.props.navigation.navigate("PostDetail", { p, currentUser });
  }

  _render() {
    let result = [];
    this.state.userPosts.forEach(post => {
      result.push(
        <ProfilePostCard
          key={post.postId}
          post={post}
          openPostDetail={this.openPostDetail}
        />
      );
    });
    return result;
  }

  render() {
    // console.log(this.props.userPosts);
    let views = this._render();
    return (
      <View>
        <View style={styles.container}>{views}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + "%",
    height: 100 + "%",
    backgroundColor: "rgb(227, 246, 249)",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
