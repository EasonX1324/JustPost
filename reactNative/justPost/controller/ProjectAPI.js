import * as firebase from "firebase";

//read post from database
const readPostData = async function() {
  let post = [];
  let promise = new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("Posts/")
      .once("value", function(snapshot) {
        snapshot.forEach(function(data) {
          resolve(post.push(data.val()));
        });
      });
  });
  await promise;
  return post;
};

//create a new post and send to the database
const createEntirePost = async (
  post_title,
  post_Describtion,
  image,
  curTag,
  currentUser
) => {
  const imageKey = await createPost(post_title, post_Describtion);
  let result = null;
  let promise = new Promise((resolve, reject) => {
    uploadImage(image, imageKey)
      .then(() => {
        const reff = firebase.storage().ref("image/" + imageKey);
        firebase
          .database()
          .ref("Posts/" + imageKey)
          .child("authorInfo")
          .update({
            userNName: currentUser.nikiName,
            userId: currentUser.userKey
          });
        reff.getDownloadURL().then(url => {
          firebase
            .database()
            .ref("Posts/" + imageKey)
            .update({ image: url, postId: imageKey });
          resolve((result = imageKey));
        });
        firebase
          .database()
          .ref("Users/" + currentUser.userKey + "/post")
          .update({ [imageKey]: imageKey });
      })
      .then(() => {
        if (!(curTag === "")) {
          addTag(imageKey, curTag);
        }
      })
      .catch(error => {
        alert(error);
      });
  });
  await promise;
  return result;
};

//helper for create post info in database
const createPost = async function(post_title, post_Describtion) {
  let likes = 0;
  let view = 0;
  let comments = false;
  let image = false;
  let postId = false;
  let tags = false;
  let authorInfo = false;
  let key = "";
  await firebase
    .database()
    .ref("Posts/")
    .push({
      authorInfo,
      postId,
      post_title,
      post_Describtion,
      image,
      likes,
      view,
      tags,
      comments
    })
    .then(data => {
      //success callback
      key = key + data.key;
    })
    .catch(error => {
      //error callback
      console.log("error ", error);
    });
  return key;
};

//helper for uploading pics
const uploadImage = async (uri, key) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase
    .storage()
    .ref()
    .child("image/" + key);
  return ref.put(blob);
};

//signUp method for the user userName must be unique
const signUp = async function(userId, userPassword, nikiName) {
  let b;
  let promise = new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userId, userPassword)
      .then(function(args) {
        resolve((b = true));
        const collection = false;
        const post = false;
        const userKey = false;
        let myLikes = false;
        firebase
          .database()
          .ref("Users/")
          .push({
            userKey,
            userId,
            nikiName,
            collection,
            myLikes,
            post
          })
          .then(data => {
            firebase
              .database()
              .ref("Users/" + data.key)
              .update({ userKey: data.key });
          });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          alert("The password is too easy.");
          resolve((b = false));
        } else {
          alert(errorMessage);
          resolve((b = false));
        }
      });
  });
  await promise;
  return b;
};

//Signin method return ture if the user is successfully logged in
const signIn = async function(userId, userPassword) {
  let b;
  let promise = new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userId, userPassword)
      .then(function(args) {
        resolve((b = true));
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Password is incorrect");
          resolve((b = false));
        } else {
          alert(errorMessage);
          resolve((b = false));
        }
      });
  });
  await promise;
  return b;
};

//like method to like one certain post and make its like attribute plus one
const like = function(postId) {
  var postRef = firebase.database().ref("Posts/" + postId);
  postRef.child("likes").once("value", function(snapshot) {
    var currentLikes = snapshot.val() ? snapshot.val() : 0;
    postRef.update(
      {
        likes: currentLikes + 1
      },
      function(error) {
        console.log(error);
      }
    );
  });
};

//Comment method to leave the comment on certain post and who leaves comments
const reviews = function(postId, commenter, commentText) {
  var postRef = firebase.database().ref("Posts/" + postId);
  postRef.child("comments").once("value", function(snapshot) {
    var currentcomment = snapshot.val() ? snapshot.val() : 0;
    var c = currentcomment.commenter ? currentcomment.commenter : {};
    postRef.update(
      {
        comments: commentText
      },
      function(error) {
        console.log(error);
      }
    );
  });
};

//Adding Tag method to add Tag for one certain post
const addTag = function(postId, tag) {
  var ref = firebase.database().ref("Posts/" + postId);
  ref.child("tags").once("value", function(snapshot) {
    var bool = snapshot.hasChild(tag);
    if (!bool) {
      ref.child("tags").update(
        {
          [tag]: tag
        },
        function(error) {
          console.log(error);
        }
      );
      firebase
        .database()
        .ref("Tags/" + tag)
        .update(
          {
            [postId]: postId
          },
          function(error) {
            console.log(error);
          }
        );
    }
  });
};

//get all posts that contain the given tag
const getTagPost = function(tag) {
  var currentpostId;
  firebase
    .database()
    .ref("Tags/" + tag)
    .once("value", function(snapshot) {
      currentpostId = Object.keys(snapshot.val());
    });
  return postHelper(currentpostId);
};

//a helper function that return all posts data by given list of post id
const postHelper = function(postIdLst) {
  var result = [];
  for (let i = 0; i < postIdLst.length; i++) {
    firebase
      .database()
      .ref("Posts/" + postIdLst[i])
      .once("value", function(snapshot) {
        result.push(snapshot.val());
      });
  }
  return result;
};

//addCollection method for user to collect this post
// const addCollection = function(postId, userId) {
//   var ref = firebase.database().ref();
//   ref
//     .child("Users/")
//     .orderByChild("userId")
//     .equalTo(userId)
//     .on("value", function(snapshot) {
//       firebase
//         .database()
//         .ref("Users/" + Object.keys(snapshot.val())[0])
//         .child("collection")
//         .update(
//           {
//             [postId]: true
//           },
//           function(error) {
//             console.log(error);
//           }
//         );
//     });
// };
const addCollection = function(postId, userId) {
  firebase
    .database()
    .ref("Users/" + userId)
    .child("collection")
    .update(
      {
        [postId]: postId
      },
      function(error) {
        console.log(error);
      }
    );
};

//addLikes method for user to like this post
// const addLikes = function(postId, userId) {
//   var ref = firebase.database().ref();
//   ref
//     .child("Users/")
//     .orderByChild("userId")
//     .equalTo(userId)
//     .on("value", function(snapshot) {
//       firebase
//         .database()
//         .ref("Users/" + Object.keys(snapshot.val())[0])
//         .child("myLikes")
//         .update(
//           {
//             [postId]: postId
//           },
//           function(error) {
//             console.log(error);
//           }
//         );
//     });
// };
const addLikes = function(postId, userId) {
  this.like(postId);
  firebase
    .database()
    .ref("Users/" + userId)
    .child("myLikes")
    .update(
      {
        [postId]: postId
      },
      function(error) {
        console.log(error);
      }
    );
};

//return all collected posts by given user
const getCollection = function(userId) {
  let ref = firebase.database().ref("Users/");
  let currentColl;
  ref
    .child("Users/")
    .orderByChild("userId")
    .equalTo(userId)
    .on("value", function(snapshot) {
      currentColl = Object.keys(snapshot.val().collection);
    });
  return postHelper(currentColl);
};

// return all liked posts by given user
const getLikes = function(userId) {
  let ref = firebase.database().ref("Users/");
  let currentLikes;
  ref
    .child("Users/")
    .orderByChild("userId")
    .equalTo(userId)
    .on("value", function(snapshot) {
      currentLikes = Object.keys(snapshot.val().myLikes);
    });
  return postHelper(currentLikes);
};

//incviews method for post to increase this post views.
const incviews = function(postId) {
  // alert("view")
  let postRef = firebase.database().ref("Posts/" + postId);
  postRef.child("view").once("value", function(snapshot) {
    let currentviews = snapshot.val() ? snapshot.val() : 0;
    //alert(currentviews)
    postRef.update(
      {
        view: currentviews + 1
      },
      function(error) {
        console.log(error);
      }
    );
  });
};
module.exports = {
  readPostData: readPostData,
  createEntirePost: createEntirePost,
  signUp: signUp,
  signIn: signIn,
  incviews: incviews,
  like: like,
  // dislike: dislike,
  reviews: reviews,
  addTag: addTag,
  getTagPost: getTagPost,
  addCollection: addCollection,
  getCollection: getCollection,
  getLikes: getLikes,
  addLikes: addLikes,
  getPostsbyId: postHelper
  //cancelLikes: cancelLikes
};
