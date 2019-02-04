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
const { userModule } = require("../../controller/userModule/userModule");

export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, collected: false };
    this.render_heart.bind(this);
    // this.like_or_cancel.bind(this);
  }

  async componentWillMount() {
    let postId = this.props.post.postId;
    // console.log(this.props.user);
    let email = this.props.user.userId;
    let likedPost = await userModule.getUserLikedPostById(email);
    let collectedPost = await userModule.getUserCollectionsById(email);
    // console.log(email);
    // console.log(likedPost);
    if (likedPost) {
      likedPost.forEach(element => {
        if (element.postId === postId) {
          this.setState({
            liked: true
          });
        }
      });
    }
    if (collectedPost) {
      collectedPost.forEach(element => {
        if (element.postId === postId) {
          this.setState({
            collected: true
          });
        }
      });
    }
  }
  render_heart() {
    return (
      <Image
        style={styles.icon}
        source={
          this.state.liked
            ? require("../../assets/icons/rheart.png")
            : require("../../assets/icons/wheart.png")
        }
      />
    );
  }
  render_star() {
    return (
      <Image
        style={styles.icon}
        source={
          this.state.collected
            ? require("../../assets/icons/ystar.png")
            : require("../../assets/icons/wstar.png")
        }
      />
    );
  }

  async like_or_cancel() {
    // console.log(this.state);
    if (!this.state.liked) {
      this.setState({
        liked: true
      });
      await this.props.likeThisPost(
        this.props.post.postId,
        this.props.user.userKey
      );
    } else {
      this.setState({
        liked: false
      });
      await this.props.cancelLikes(
        this.props.post.postId,
        this.props.user.userKey
      );
    }
  }
  async collect_or_cancel() {
    // console.log(this.state);
    if (!this.state.collected) {
      this.setState({
        collected: true
      });
      await this.props.collectThisPost(
        this.props.post.postId,
        this.props.user.userKey
      );
    } else {
      this.setState({
        collected: false
      });
      await this.props.cancelCollection(
        this.props.post.postId,
        this.props.user.userKey
      );
    }
  }
  render() {
    return (
      <View style={styles.post}>
        <TouchableOpacity
          style={{ height: 180, width: 100 + "%" }}
          activeOpacity={0.5}
          onPress={() => {
            this.props.openPostDetail(this.props.post);
            // console.log(this.props.user);
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
            onPress={this.like_or_cancel.bind(this)}
          >
            {/* <Image
              style={styles.icon}
              source={
                // this.state.ifLike[j]
                //     ? require("../../assets/icons/rheart.png")
                //     : require("../../assets/icons/wheart.png")
                require("../../assets/icons/wheart.png")
              }
            /> */}
            {this.render_heart()}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 25, height: 25 }}
            onPress={this.collect_or_cancel.bind(this)}
          >
            {/* <Image
              style={styles.icon}
              source={
                // this.state.ifSave[j]
                // ? require("../../assets/icons/ystar.png")
                // : require("../../assets/icons/wstar.png")
                require("../../assets/icons/wstar.png")
              }
            /> */}
            {this.render_star()}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    width: 50 + "%",
    height: 220,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,100,97,0.7)",
    backgroundColor: "white",
    alignItems: "center"
  },
  postAuthor: {
    height: 100 + "%",
    width: 70 + "%",
    fontSize: 20
  },
  catagoryText: {
    color: "black",
    fontSize: 20,
    textAlign: "center"
  },
  iconBar: {
    width: 90 + "%",
    height: 25,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-end"
  },
  icon: {
    maxWidth: 25,
    maxHeight: 25
  },
  searchIcon: {
    maxWidth: 40,
    maxHeight: 40
  }
});
