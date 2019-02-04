import React from "react";
import { PostDetail } from "../components/postDetailComponents/PostDetail";
import { PostMain } from "../components/homeScreenComponents/PostMain";
import { createStackNavigator } from "react-navigation";
import { SigninPage } from "../screens/ProfileScreen";
import { ProfileCategory } from "../components/profileComponents/ProfileCategory";
import MainTabNavigator from "./MainTabNavigator";
import { SignupPage } from "../components/SignupPage";
import { MyCollection } from "../components/profileComponents/MyCollection";
import { MyLikes } from "../components/profileComponents/MyLikes";
import { ProfilePosts } from "../components/profileComponents/ProfilePosts";

const HomeStack = createStackNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: {
      screen: MainTabNavigator,
      navigationOptions: { header: null, gesturesEnabled: false }
    },
    PostMain: PostMain,
    ProfilePosts: ProfilePosts,
    PostDetail: PostDetail,
    // Home: HomeStack,
    SignIn: SigninPage,
    SignUp: SignupPage,
    ProfileCategory: ProfileCategory,
    MyCollection: MyCollection,
    MyLikes: MyLikes
  },
  {
    initialRouteName: "SignIn"
  }
  // (navigationOptions = {
  //   header: null
  // })
);
// const HomeStack = createStackNavigator(
//   {
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Main: {
//       screen: mainStack,
//     },

//     PostMain: PostMain,
//     PostDetail: PostDetail,
//     // Home: HomeStack,
//     SignIn: SigninPage,
//     SignUp: SignupPage,

//   },
//   StackNavigatorConfig{
//     initialRouteName: "mainStack"
//   }
// );

// const mainStack = StackNavigator({
//     signIn: {
//       screen
//     }
// })

console.log(this);
export default HomeStack;
