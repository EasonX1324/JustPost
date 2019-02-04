import React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  DeviceEventEmitter
} from "react-native";
import { PostCard } from "./PostCard";
const projectApi = require("../../controller/ProjectAPI");
import { postModule } from "../../controller/postModule/postModule";

export class PostMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPost: [],
      showing: (
        <View>
          <Image
            style={{ height: 300, width: 100 + "%" }}
            source={require("../../assets/images/loading.gif")}
          />
        </View>
      )
    };
    this.openPostDetail = this.openPostDetail.bind(this);
    this.likeThisPost = this.likeThisPost.bind(this);
    this.collectThisPost = this.collectThisPost.bind(this);
    this.cancelLikes = this.cancelLikes.bind(this);
    // console.log(this.props);
  }

  openPostDetail(p) {
    projectApi.incviews(p.postId);
    let currentUser = this.props.user;
    this.props.navigation.navigate("PostDetail", { p, currentUser });
  }

  async likeThisPost(postId, userId) {
    await projectApi.addLikes(postId, userId);
  }
  async cancelLikes(postId, userId) {
    await postModule.cancelLikes(postId, userId);
  }

  async collectThisPost(postId, userId) {
    await projectApi.addCollection(postId, userId);
  }

  async cancelCollection(postId, userId) {
    await postModule.cancelCollection(postId, userId);
  }
  async componentDidMount() {
    this.listener = DeviceEventEmitter.addListener("refresh", post =>
      this.setState({ allPost: post })
    );
    post = await projectApi.readPostData();
    //compare users liked post and collected post to all will-display posts

    this.setState({
      allPost: post
    });
  }
  componentWillUnmount() {
    this.listener.remove();
  }
  _render() {
    let result = [];
    this.state.allPost.forEach(post => {
      result.push(
        <PostCard
          key={post.postId}
          post={post}
          user={this.props.user}
          likeThisPost={this.likeThisPost}
          collectThisPost={this.collectThisPost}
          cancelCollection={this.cancelCollection}
          openPostDetail={this.openPostDetail}
          cancelLikes={this.cancelLikes}
        />
      );
    });
    return result;
  }

  render() {
    let views = this._render();
    if (this.state.allPost.length === 0) {
      setTimeout(() => {
        this.setState({
          showing: (
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                Sorry, no result found
              </Text>
            </View>
          )
        });
      }, 10000);
      return this.state.showing;
    } else {
      return <View style={styles.container}>{views}</View>;
    }
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
