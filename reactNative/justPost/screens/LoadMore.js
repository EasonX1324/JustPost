import React, { Component, PropTypes } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
export default class LoadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.view}>
          <ActivityIndicator
            size={"small"}
            color={"rgb(255,100,97)"}
            animating={true}
            style={{
              top: 5,
              width: 30,
              height: 30
            }}
          />
          <Text
            style={{
              color: "black",
              marginLeft: 4,
              top: 5
            }}
          >
            Loading more...
          </Text>
        </View>
      );
    } else if (this.props.onLoading) {
      return (
        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            this.setState({
              isLoading: true
            });
            setTimeout(() => {
              alert("Finished");
              this.setState({
                isLoading: false
              });
            }, 3000);
            this.props.onLoading();
            // this.props.onLoading && this.props.onLoading();
          }}
        >
          <Text
            style={{
              color: "black",
              alignSelf: "center",
              top: 5,
              padding: 4
            }}
          >
            Load more
          </Text>
        </TouchableOpacity>
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: nextProps.isLoading
    });
  }
}

const styles = StyleSheet.create({
  touch: {
    // flexDirection: "row",
    height: 50,
    //width: 100,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(227, 246, 249)"
  },
  view: {
    // flex: 1,
    // flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    padding: 4,
    height: 40
  }
});
