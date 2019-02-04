import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  RefreshControl,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  PixelRatio,
  DeviceEventEmitter
} from "react-native";
import { ProfilePosts } from "../components/profileComponents/ProfilePosts";
import { ProfileHeader } from "../components/profileComponents/ProfileHeader";
import { ProfileCategory } from "../components/profileComponents/ProfileCategory";
import { PostMain } from "../components/homeScreenComponents/PostMain";
import { TopNavigation } from "../components/homeScreenComponents/TopNavigation";
import { CreatePost } from "../components/createPostComponents/CreatePost";
import LoadMore from "./LoadMore";
import { postModule } from "../controller/postModule/postModule";

const projectApi = require("../controller/ProjectAPI");
const { userModule } = require("../controller/userModule/userModule");

let currentUser = {
  collection: false,
  myLikes: false,
  nikiName: "penny111",
  post: false,
  userId: "pennycheng1211@gmail.com",
  userKey: "-LSbojIZJXbVfM4K0Iga"
};

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
    //header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      user: currentUser,
      isRefreshing: false,
      userPosts: null
    };
  }

  async componentWillMount() {
    // onsole.log("sssss")
    const userPosts = await userModule.getUserPostsById(this.state.user.userId);
    this.setState({ userPosts: userPosts });
  }

  async updatePostList() {
    let userPosts = await userModule.getUserPostsById(this.state.user.userId);
    // console.log(userPosts)
    DeviceEventEmitter.emit("refresh_Profile", userPosts);
  }

  _onRefresh = () => {
    this.setState({
      isRefreshing: true
    });
    setTimeout(() => {
      this.updatePostList();
      this.setState({
        isRefreshing: false
      });
    }, 3000);
  };
  _renderTop() {
    return (
      <View>
        <ProfileHeader user={this.state.user} />
        <ProfileCategory
          user={this.state.user}
          navigation={this.props.navigation}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Posts</Text>
        </View>
      </View>
    );
  }
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    if (this.state.userPosts !== null) {
      return (
        <View style={styles.container}>
          {this._renderTop()}
          <ScrollView style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor="#ff0000"
                title="Loading..."
                titleColor="black"
                colors={["rgb(255,100,97)"]}
                progressBackgroundColor="#ffffff"
              />
            }>
            <ProfilePosts
              navigation={this.props.navigation}
              user={currentUser}
              userPosts={this.state.userPosts}
            />
          </ScrollView>
        </View>
      );
    } else {
      return <View style={styles.container}>{this._renderTop()}</View>;
    }
  }
}

export class AddingPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  static navigationOptions = {
    title: "Add Post"
  };

  async componentWillMount() {
    await this.setState({ user: currentUser });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.kcontainer}>
        <ScrollView keyboardDismissMode="on-drag">
          <CreatePost currentUser={this.state.user} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

//This calss is HomeScreen Container which contains all components for this Container.
export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      user: currentUser,
      allPost: null,
      newPost: [],
      isRefreshing: false,
      loadMore: false
    };
    this.sortPostListByDefualtTag = this.sortPostListByDefualtTag.bind(this);
    this.updatePostList = this.updatePostList.bind(this);
    // this.onScroll = this.onScroll.bind(this);
  }
  async componentWillMount() {
    allPost = await projectApi.readPostData();
    this.setState({ allPost: allPost });
  }

  async sortPostListByDefualtTag(tag) {
    //get data from firebase
    // alert("display filtered posts for " + tag);
    const filteredPost = await postModule.getPostsByTag(tag);
    DeviceEventEmitter.emit("refresh", filteredPost);
    //Here we change state of allPost to the tag we want
  }
  // onStop = e => {
  //   let { x, y } = e.nativeEvent.contentOffset;
  //   if (y < px2dp(50)) {
  //     this._scrollView.scrollTo({ x: 0, y: 0, animated: true });
  //   } else if (y < px2dp(100)) {
  //     this._scrollView.scrollTo({ x: 0, y: px2dp(100), animated: true });
  //   }
  // };
  _onScroll = e => {
    if (this.state.loadMore) {
      return;
    }
    let y = e.nativeEvent.contentOffset.y;
    let height = e.nativeEvent.layoutMeasurement.height;
    let contentHeight = e.nativeEvent.contentSize.height;
    if (y + height >= contentHeight + 40) {
      this.setState({
        loadMore: true
      });
      setTimeout(() => {
        this.setState({
          loadMore: false
        });
      }, 3000);
    }
  };
  // onScroll(e) {
  //   console.log(this.refs._head);
  //   let { x, y } = e.nativeEvent.contentOffset;
  //   // console.log(y);
  //   if (y <= 70) {
  //     this.refs._head.refs._header.setNativeProps({
  //       style: { top: -y }
  //     });
  //     this.refs._scrollscreen.setNativeProps({
  //       style: {
  //         marginTop: 70 - y
  //       }
  //     });
  //   } else {
  //     this.refs._head.refs._header.setNativeProps({
  //       style: {
  //         top: -70
  //       }
  //     });
  //     this.refs._scrollscreen.setNativeProps({
  //       style: {
  //         marginTop: 0
  //       }
  //     });
  //   }
  // }
  async updatePostList() {
    allPost = await projectApi.readPostData();
    DeviceEventEmitter.emit("refresh", allPost);
  }

  _onRefresh = () => {
    this.setState({
      isRefreshing: true
    });
    setTimeout(() => {
      this.updatePostList();
      this.setState({
        isRefreshing: false
      });
    }, 3000);
  };

  // _renderLoadMore = () => {
  //   if (this.state.newPost === []) {
  //     alert("No resently updated posts");
  //     return;
  //   }
  //   return (
  //     <LoadMore
  //       isLoading={this.state.loadMore}
  //       onLoading={() => {
  //         alert("Loading More!!!");
  //       }}
  //     />
  //   );
  // };
  _renderHeader() {
    return (
      <TopNavigation
        sortPostListByDefualtTag={this.sortPostListByDefualtTag}
        // style={{
        //   height: 100,
        //   // position: "absolute",
        //   top: 0,
        //   justifyContent: "center"
        // }}
        ref="_head"
      />
    );
  }
  _renderMain() {
    return (
      <PostMain
        user={this.state.user}
        navigation={this.props.navigation}
        allPost={this.state.allPost}
      />
    );
  }
  _renderLoadMore() {
    return (
      <LoadMore
        style={styles.lm}
        isLoading={this.state.loadMore}
        onLoading={() => {
          // alert("Loading More!!!");
        }}
      />
    );
  }
  _renderBody() {
    return (
      <ScrollView
        style={styles.svstyle}
        scrollEventThrottle={50}
        onScroll={this._onScroll.bind(this)}
        automaticallyAdjustContentInsets={true}
        // stickyHeaderIndices={[0]}
        // overScrollMode={"never"}
        // onScrollEndDrag={this.onStop}
        // ref={component => {
        //   this._scrollView = component;
        // }}
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="black"
            colors={["rgb(255,100,97)"]}
            progressBackgroundColor="#ffffff"
          />
        }
        ref="_scrollscreen"
      >
        {this._renderMain()}
        {this._renderLoadMore()}
      </ScrollView>
    );
  }
  render() {
    return (
      <View style={styles.View}>
        {this._renderHeader()}
        {this._renderBody()}
      </View>
    );
  }
}

export class SigninPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.logIn = this.logIn.bind(this);
    this.sign_up = this.sign_up.bind(this);
    // this._navigate = this._navigate.bind(this);
  }

  async logIn() {
    var bool = await projectApi.signIn(this.state.email, this.state.password);
    // console.log(bool);
    if (!this.state.email) {
      alert("Please enter your email");
      return 1;
    } else if (!this.state.password) {
      alert("Please enter your password");
      return 1;
    }
    if (bool == true) {
      //call user api to get user object and pass user object to screen
      const cur_user = await userModule.getUserById(this.state.email);
      // userModule.updateLatestUser(cur_user);
      currentUser = cur_user;
      this.props.navigation.navigate("Main");
    }
  }

  sign_up() {
    // alert("Welcom to JustPost!");
    this.props.navigation.navigate("SignUp");
  }
  render() {
    return (
      <SafeAreaView style={styles.outerContainer}>
        <View>
          <Text style={styles.text}>EMAIL ADDRESS:</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType={"email-address"}
            style={styles.inputBox}
            onChangeText={email => this.setState({ email })}
            placeholder="Your e-mail"
            value={this.state.email}
          />
        </View>
        <View>
          <Text style={styles.text}>PASSWORD:</Text>
          <TextInput
            style={styles.inputBox}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            secureTextEntry
            value={this.state.password}
          />
        </View>
        <TouchableOpacity
          onPress={this.logIn}
          style={styles.signinButton}
          activeOpacity={0.5}
          disabled={!(this.state.email && this.state.password)}
        >
          <Text style={{ color: "white" }}>Sign In</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 5 }}>
          <TouchableOpacity
            onPress={this.sign_up}
            style={styles.createButton}
            activeOpacity={0.5}
          >
            <Text style={{ color: "red" }}>DON'T HAVE AN ACCOUNT?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Image
            style={{ width: 100 + "%", height: 425 }}
            source={{
              uri:
                "https://raw.githubusercontent.com/csc301-fall-2018/project-team-18/master/reactNative/justPost/assets/images/splash.png?token=ApV1Gt9zm2uJmV734UZOQjNmIz4mXWwGks5b5OLIwA%3D%3D"
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    //flexDirection: "column",
    backgroundColor: "rgb(227, 246, 249)"
  },
  lm: {
    flex: 1,
    height: 150,
    width: 100 + "%",
    backgroundColor: "red"
  },
  svstyle: {
    flex: 1,
    // position: "absolute",
    // top: 280,
    // height: 600,
    // bottom: 0,
    backgroundColor: "rgb(227, 246, 249)"
  },
  kcontainer: {
    flex: 1,
    backgroundColor: "rgb(227, 246, 249)"
  },
  headerContainer: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(195, 255, 168)",
    borderRadius: 50
  },
  header: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black"
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "rgb(227, 246, 249)"
  },
  inputBox: {
    height: 40,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10
  },
  text: {
    marginTop: 15,
    color: "black",
    fontWeight: "bold"
  },
  signinButton: {
    marginTop: 25,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#fff"
  },
  createButton: {
    marginTop: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#fff"
  }
});
