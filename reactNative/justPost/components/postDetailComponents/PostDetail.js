import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Comments } from "./Comments";
const { postModule } = require("../../controller/postModule/postModule");

export class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
    this.like = this.like.bind(this);
    this.makeCollection = this.makeCollection.bind(this);
    this.makeComment = this.makeComment.bind(this);
  }

  like() {
    alert("you could like this post on mainPage");
  }

  makeCollection() {
    alert("you could collect this post on mainPage");
  }

  makeComment() {
    const { params } = this.props.navigation.state;
    const date = new Date();
    var datestring =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    let commentContent = datestring + " : " + this.state.comment;
    postModule.commentThisPost(
      params.currentUser.nikiName,
      params.p.postId,
      commentContent
    );
    this.setState({ comment: "" });
    this.forceUpdate();
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "rgb(227, 246, 249)" }}
      >
        <ScrollView
          keyboardDismissMode="on-drag"
          style={{ flex: 1, marginBottom: 30 }}
        >
          <View style={styles.headerContainer}>
            <View
              style={{
                height: 100 + "%",
                width: 50 + "%",
                justifyContent: "space-around",
                flexDirection: "row"
              }}
            >
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/motion.jpg")}
                />
              </View>

              <View style={styles.authorContainer}>
                <View style={{ marginTop: 12, marginBottom: 12 }}>
                  <Text style={styles.username}>
                    {params.p.authorInfo.userNName}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={this.like}
                style={styles.flexInRow}
                activeOpacity={0.5}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/icons/wheart.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.makeCollection}
                style={[styles.flexInRow, styles.marginBtn]}
                activeOpacity={0.5}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/icons/wstar.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.postContainer}>
            <Image
              style={{ height: 400, width: 100 + "%" }}
              source={{ url: params.p.image }}
            />
          </View>

          <View style={styles.postInfoContainer}>
            <View style={{ height: 25, marginTop: 5, marginBottom: 10 }}>
              <Text style={styles.titleText} onPress={this.onPressTitle}>
                {params.p.post_title}
              </Text>
            </View>

            <View
              style={{
                height: 60,
                marginTop: 10,
                marginBottom: 5,
                backgroundColor: "white"
              }}
            >
              <Text
                style={styles.text}
                onPress={this.onPressTitle}
                numberOfLines={5}
              >
                {params.p.post_Describtion}
              </Text>
            </View>

            <View style={{ height: 30 }} />

            <View style={styles.tagContainer}>
              <View style={{ width: 50 + "%" }}>
                <Text style={styles.infoText}>
                  {params.p.view} views, {params.p.likes} likes
                </Text>
              </View>

              <View style={styles.tag}>
                <View
                  style={{ marginTop: 8, marginBottom: 8, width: 100 + "%" }}
                >
                  <Text
                    style={{
                      width: 90 + "%",
                      height: 100 + "%",
                      backgroundColor: "white",
                      fontSize: 18,
                      textAlign: "center"
                    }}
                  >
                    {Object.keys(params.p.tags)[0]}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.commentContainer}>
            <ScrollView style={{ height: 100 + "%", width: 100 + "%" }}>
              <View
                style={{
                  height: 100 + "%",
                  width: 100 + "%",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <Comments post={params.p} />
              </View>
            </ScrollView>
          </View>

          <View style={styles.commentCreater}>
            <View style={{ width: 70 + "%" }}>
              <View style={styles.inputBox}>
                <TextInput
                  style={{ width: 90 + "%", height: 100 + "%", fontSize: 20 }}
                  onChangeText={comment => this.setState({ comment })}
                  placeholder=" Comment here!"
                  placeholderTextColor="gray"
                  autoCapitalize="sentences"
                  returnKeyType="done"
                  value={this.state.comment}
                />
              </View>
            </View>

            <View>
              <Button
                color="rgb(255,100,97)"
                onPress={this.makeComment}
                title="Send"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  flexInRow: {
    flex: 1,
    flexDirection: "row"
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 10,
    height: 50,
    width: 100 + "%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  authorContainer: {
    width: 70 + "%",
    height: 100 + "%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 10
  },
  avatar: {
    width: 100 + "%",
    height: 100 + "%",
    borderRadius: 25
  },
  username: {
    fontSize: 22,
    fontWeight: "bold"
  },
  header: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 15
  },

  postContainer: {
    marginTop: 10,
    backgroundColor: "white",
    height: 400
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 100 + "%",
    width: 30 + "%",
    flexDirection: "row"
  },
  marginBtn: {
    marginLeft: 10
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  text: {
    fontSize: 18,
    color: "black"
  },
  titleText: {
    height: 40,
    fontSize: 25,
    fontWeight: "bold"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  postInfoContainer: {
    margin: 20,
    flexDirection: "column"
  },
  inputBox: {
    height: 40,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 15,
    alignItems: "center"
  },
  commentCreater: {
    height: 40,
    width: 100 + "%",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10
  },
  commentContainer: {
    height: 150,
    width: 100 + "%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10
  },
  comment: {
    width: 100 + "%",
    fontSize: 16
  },
  tagContainer: {
    height: 40,
    width: 100 + "%",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  tag: {
    width: 150,
    height: 40,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderColor: "rgba(255,100,97, 0.7)",
    borderRadius: 5,
    borderWidth: 2
  }
});
