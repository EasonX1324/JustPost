import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export class ProfileHeader extends Component {
  _renderInfo() {
    return (
    <View style={{flex: 1, marginLeft: 10, paddingLeft: 10}}>
      <Text style={styles.nikiText}>
        {this.props.user.nikiName}
      </Text>
      <Text style={{fontSize: 20}}>
        {this.props.user.userId}
      </Text>
    </View>)
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={require("../../assets/images/motion.jpg")}
        />
        {this._renderInfo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    // flex: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    // padding: 4,
    margin: 10
  },
  nameContainer: {

  },
  container: {
    // width: 65 + "%",
    height: 120,
    top: 0,
    // marginLeft: 10,
    // marginTop: 15,
    // flex: 1,
    //backgroundColor: "red",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nikiText: {
    marginTop: 10,
    fontSize: 30,
    //backgroundColor: "white",
    color: "black",
    fontWeight: "bold"
  }
})
