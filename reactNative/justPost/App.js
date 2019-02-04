import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyC7utvEPinno3msTPfR3jij9nBZ-Vmt0bc",
  authDomain: "just-post-baffd.firebaseapp.com",
  databaseURL: "https://just-post-baffd.firebaseio.com",
  projectId: "just-post-baffd",
  storageBucket: "just-post-baffd.appspot.com",
  messagingSenderId: "126330057166"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.setUser = this.setUser.bind(this)
  // }

  state = {
    isLoadingComplete: false,
    user: null
  };

  // setUser(cur_user) {
  //   this.setState({ user: cur_user })
  //   //console.log(cur_user)
  // }

  render() {
    //console.log(this)
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
