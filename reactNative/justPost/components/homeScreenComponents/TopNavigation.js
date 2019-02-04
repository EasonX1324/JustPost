import React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

export class TopNavigation extends React.Component {
  constructor() {
    super();
    this.state = { text: "" };
  }

  filterPost(s) {
    this.props.sortPostListByDefualtTag(s);
  }
  render() {
    return (
      <SafeAreaView
        style={{
          // position: "absolute",
          // flex: 1,
          width: 100 + "%",
          // flexDirection: "row",
          // height: 160,
          // paddingBottom: 10,
          backgroundColor: "rgb(227, 246, 249)"
        }}
        ref="_header"
      >
        <SafeAreaView style={styles.topNav} ref="_title">
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold"
            }}
          >
            Just Post
          </Text>
        </SafeAreaView>

        <View style={styles.userBar}>
          <TouchableOpacity
            style={{ width: 20 + "%", height: 100 + "%" }}
            activeOpacity={0.5}
            onPress={() => {
              this.filterPost("Pants");
            }}
          >
            <View style={styles.category}>
              <Text style={styles.catagoryText}>Pants</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: 20 + "%", height: 100 + "%" }}
            activeOpacity={0.5}
            onPress={() => {
              this.filterPost("Shoes");
            }}
          >
            <View style={styles.category}>
              <Text style={styles.catagoryText}>Shoes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: 20 + "%", height: 100 + "%" }}
            activeOpacity={0.5}
            onPress={() => {
              this.filterPost("Jeans");
            }}
          >
            <View style={styles.category}>
              <Text style={styles.catagoryText}>Jeans</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: 20 + "%", height: 100 + "%" }}
            activeOpacity={0.5}
            onPress={() => {
              this.filterPost("Tops");
            }}
          >
            <View style={styles.category}>
              <Text style={styles.catagoryText}>Tops</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: 20 + "%", height: 100 + "%" }}
            activeOpacity={0.5}
            onPress={() => {
              this.filterPost("Shirts");
            }}
          >
            <View style={styles.category}>
              <Text style={styles.catagoryText}>Shirts</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            style={{
              height: 40,
              width: 85 + "%",
              fontSize: 20,
              backgroundColor: "gray",
              textAlign: "center",
              justifyContent: "center",
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "white"
            }}
            onChangeText={text => this.setState({ text })}
            placeholder="You may like..."
            placeholderTextColor="white"
            textColor="white"
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.searchIcon}
            activeOpacity={0.5}
            onPress={() => {
              this.filterPost(this.state.text);
            }}
          >
            <Image
              style={styles.searchIcon}
              source={require("../../assets/icons/search.png")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topNav: {
    width: 100 + "%",
    height: 70,
    // position: "absolute",
    // top: 0,
    //flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  searchBar: {
    width: 100 + "%",
    height: 50,
    flexDirection: "row"
  },
  userBar: {
    width: 100 + "%",
    height: 40,
    justifyContent: "space-around",
    backgroundColor: "rgb(255,100,97)",
    flexDirection: "row"
  },
  category: {
    width: 100 + "%",
    height: 100 + "%"
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
