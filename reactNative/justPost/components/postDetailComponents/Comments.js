import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
const { postModule } = require("../../controller/postModule/postModule");

export class Comments extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      allComments: null
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    allComments = await postModule.getAllCommentsByPostId(
      this.props.post.postId
    );
    if (this._isMounted) {
      this.setState({ allComments: allComments });
    }
  }

  async componentDidUpdate() {
    this._isMounted = true;
    allComments = await postModule.getAllCommentsByPostId(
      this.props.post.postId
    );
    if (this._isMounted) {
      this.setState({ allComments: allComments });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.allComments === null) {
      return (
        <Text style={{ fontSize: 16, color: "gray" }}>
          Be the first one to leave a comment!{" "}
        </Text>
      );
    } else {
      render_comments = [];
      let i = 0;
      this.state.allComments.forEach(comment => {
        let author = Object.keys(comment)[0];
        let commentContent = comment[author];
        render_comments.unshift(
          <View
            key={i}
            style={{
              width: 100 + "%",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 2,
              marginBottom: 2,
              marginLeft: 3,
              marginRight: 3
              // height: 70
            }}
          >
            <Text numberOfLines={3} style={{ fontSize: 18, color: "skyblue" }}>
              {author}:{" "}
            </Text>
            <Text
              style={{ lineHeight: 20, fontSize: 18, color: "black" }}
              numberOfLines={3}
            >
              {commentContent}
            </Text>
          </View>
        );
        i = i + 1;
      });
      return (
        <View
          style={{
            height: 90 + "%",
            width: 100 + "%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          {render_comments}
        </View>
      );
    }
  }
}
