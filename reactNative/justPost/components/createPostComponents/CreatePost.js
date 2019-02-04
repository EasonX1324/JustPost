import React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  PixelRatio,
  TextInput,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { ImagePicker, Permissions } from "expo";
const projectApi = require("../../controller/ProjectAPI");

let tags = [];

export class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.createThisPost = this.createThisPost.bind(this);
  }

  state = {
    post_title: "",
    post_Describtion: "",
    image: null,
    curTag: "",
    user: null
  };

  async createThisPost() {
    if (
      this.state.post_title !== "" &&
      this.state.post_Describtion !== "" &&
      this.state.image !== null &&
      this.state.user != null
    ) {
      const key = await projectApi.createEntirePost(
        this.state.post_title,
        this.state.post_Describtion,
        this.state.image,
        this.state.curTag,
        this.state.user
      );
      alert("successfully add your post and your post key is " + key);
      this.setState({
        post_title: "",
        post_Describtion: "",
        image: null,
        curTag: ""
        //user: null
      });
      this.forceUpdate();
    } else if (this.state.post_title === "") {
      alert("Please add a title");
    } else if (this.state.post_Describtion === "") {
      alert("Please add some post Describtions");
    } else if (this.state.image === null) {
      alert("Please add  a image");
    }
  }

  async componentWillMount() {
    await this.setState({ user: this.props.currentUser });
  }

  render() {
    let { image } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity
          style={{ width: 100 + "%" }}
          onPress={this.pickFromGallery}
        >
          <View
            style={{
              width: 100 + "%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={[styles.avatar, styles.avatarContainer]}>
              {this.state.image === null ? (
                <Text style={{ fontSize: 30, color: "gray" }}>
                  Select a Photo
                </Text>
              ) : (
                  <Image style={styles.avatar} source={{ uri: image }} />
                )}
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.postTitle}>
          <TextInput
            style={{
              width: 90 + "%",
              fontSize: 20,
              backgroundColor: "white",
              textAlign: "center"
            }}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            clearButtonMode="while-editing"
            onChangeText={post_title =>
              this.setState({ post_title: post_title })
            }
            value={this.state.post_title}
            placeholder=" Pick a title!"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.postDescribtion}>
          <TextInput
            style={{
              width: 90 + "%",
              fontSize: 20,
              backgroundColor: "white",
              textAlign: "left"
            }}
            underlineColorAndroid="transparent"
            multiline={true}
            enablesReturnKeyAutomatically={true}
            returnKeyType="default"
            clearButtonMode="while-editing"
            onChangeText={post_Describtion =>
              this.setState({ post_Describtion: post_Describtion })
            }
            value={this.state.post_Describtion}
            placeholder="Let people know more about your style!"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.tagBar}>
          <View style={styles.addTag}>
            <TextInput
              style={{
                width: 90 + "%",
                height: 100 + "%",
                backgroundColor: "white"
              }}
              underlineColorAndroid="transparent"
              placeholder=" Add a tag.."
              placeholderTextColor="gray"
              clearTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              onChangeText={curTag => this.setState({ curTag })}
              value={this.state.curTag}
              returnKeyType="done"
            />
          </View>

          <View>
            <Button
              color="rgb(255,100,97)"
              onPress={this.createThisPost}
              title="Create"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  pickFromGallery = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    if (status === "granted") {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images"
      }).catch(error => console.log(permissions, { error }));

      this.setState({ image: image.uri });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    height: 550,
    width: 100 + "%",
    marginTop: 10,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  postTitle: {
    height: 50,
    width: 100 + "%",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    alignItems: "center",
    margin: 10
  },
  postDescribtion: {
    height: 100,
    width: 100 + "%",
    justifyContent: "flex-start",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    alignItems: "center",
    margin: 10
  },
  avatarContainer: {
    width: 95 + "%",
    height: 250,
    borderStyle: "dashed",
    borderColor: "rgba(255,100,97, 0.7)",
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  avatar: {
    width: 100 + "%",
    height: 100 + "%",
    borderRadius: 5
  },
  tagBar: {
    width: 100 + "%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    flexWrap: "wrap"
  },
  addTag: {
    width: 150,
    height: 40,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    borderStyle: "dashed",
    borderColor: "rgba(255,100,97, 0.7)",
    borderRadius: 5,
    borderWidth: 2
  }
});
