import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
const projectApi = require("../controller/ProjectAPI");

export class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: ""
    };
    this.signup = this.signup.bind(this);
  }

  async signup() {
    if (!this.state.username) {
      alert("USERNAME EMPTY!");
      return 1;
    } else if (!this.state.email) {
      alert("EMAIL EMPTY!");
      return 1;
    } else if (!this.state.password1) {
      alert("PASSWORD EMPTY!");
      return 1;
    } else if (!this.state.password2) {
      alert("PLEASE REENTER YOUR PASSWORD!");
      return 1;
    } else if (this.state.password1 !== this.state.password2) {
      alert("PASSWORDS NOT CONSISTENT!");
      return 1;
    }

    var bool = await projectApi.signUp(
      this.state.email,
      this.state.password1,
      this.state.username
    );

    if (bool) {
      alert("Welcome to JustPost");
      this.props.navigation.navigate("SignIn");
    }
  }

  checker() {
    return (
      this.state.username &&
      this.state.email &&
      this.state.password1 &&
      this.state.password2 &&
      this.state.password1 === this.state.password2
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.outerContainer}>
        <View>
          <Text style={styles.text}>USER NAME:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Your user name"
            style={styles.inputBox}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </View>
        <View>
          <Text style={styles.text}>EMAIL ADDRESS:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Your email"
            style={styles.inputBox}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View>
          <Text style={styles.text}>PASSWORD:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Your password"
            style={styles.inputBox}
            onChangeText={password1 => this.setState({ password1 })}
            secureTextEntry
            value={this.state.password1}
          />
        </View>
        <View>
          <Text style={styles.text}>COMFIRM YOUR PASSWORD:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Re-enter password"
            style={styles.inputBox}
            onChangeText={password2 => this.setState({ password2 })}
            secureTextEntry
            value={this.state.password2}
          />
        </View>
        <TouchableOpacity
          onPress={this.signup}
          style={styles.signupButton}
          activeOpacity={0.5}
          disabled={false}
        >
          <Text style={{ color: "white" }}>Sign Up</Text>
        </TouchableOpacity>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  signupButton: {
    marginTop: 30,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#fff"
  }
});
