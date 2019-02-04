import * as firebase from "firebase";

//return user by its email id from firebase database
const getUserById = async email => {
  let result = null;
  await firebase
    .database()
    .ref("Users")
    .once("value", function(snapshot) {
      for (let i in snapshot.val()) {
        if (snapshot.val()[i].userId === email) {
          result = snapshot.val()[i];
        }
      }
    });

  return result;
};

//return user's own posts by its email id from firebase database
const getUserPostsById =  async email => {
  let result = null;
  let allUserPost = [];
  const promise = new Promise((resolve, reject)  => {
    firebase
    .database()
    .ref("Users")
    .once("value", function(snapshot) {
      for (let i in snapshot.val()) {
        if (snapshot.val()[i].userId === email) {
          result = snapshot.val()[i].post;
        }
      }
    }).then((data) => {
      firebase.database().ref("Posts").once("value", (snapshot) => {
        for (let i in snapshot.val()){
          Object.keys(result).forEach(key => {
            if (key === i){
              resolve(allUserPost.push(snapshot.val()[i]))
            }
          });
        }
      })
    })
  })
  await promise
  // await firebase.database
  return allUserPost
}

//return users' collected posts by its email id from firebase database
const getUserCollectionsById = async email => {
  let result = null;
  let allUserPost = [];
  const promise = new Promise((resolve, reject)  => {
    firebase
    .database()
    .ref("Users")
    .once("value", function(snapshot) {
      for (let i in snapshot.val()) {
        if (snapshot.val()[i].userId === email) {
          result = snapshot.val()[i].collection;
        }
      }
    }).then((data) => {
      firebase.database().ref("Posts").once("value", (snapshot) => {
        for (let i in snapshot.val()){
          Object.keys(result).forEach(key => {
            if (key === i){
              resolve(allUserPost.push(snapshot.val()[i]))
            }
          });
        }
      })
    })
  })
  await promise
  // await firebase.database
  return allUserPost
};

//return users' liked posts by its email id from firebase database
const getUserLikedPostById = async email => {
  let result = null;
  let allUserPost = [];
  const promise = new Promise((resolve, reject)  => {
    firebase
    .database()
    .ref("Users")
    .once("value", function(snapshot) {
      for (let i in snapshot.val()) {
        if (snapshot.val()[i].userId === email) {
          result = snapshot.val()[i].myLikes;
        }
      }
    }).then((data) => {
      firebase.database().ref("Posts").once("value", (snapshot) => {
        for (let i in snapshot.val()){
          Object.keys(result).forEach(key => {
            if (key === i){
              resolve(allUserPost.push(snapshot.val()[i]))
            }
          });
        }
      })
    })
  })
  await promise
  // await firebase.database
  return allUserPost
};

module.exports = {
  getUserById,
  getUserCollectionsById,
  getUserLikedPostById,
  getUserPostsById
};
