import * as firebase from "firebase";

//return all posts by its tags id from firebase database
const getPostsByTag = async tag => {
  let result = null;
  let filteredPosts = [];
  const promise = new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("Tags")
      .once("value", function(snapshot) {
        for (let i in snapshot.val()) {
          if (i === tag) {
            result = snapshot.val()[i];
          }
        }
      })
      .then(data => {
        if (result !== null) {
          firebase
            .database()
            .ref("Posts")
            .once("value", snapshot => {
              for (let i in snapshot.val()) {
                Object.keys(result).forEach(key => {
                  if (key === i) {
                    resolve(filteredPosts.push(snapshot.val()[i]));
                  }
                });
              }
            });
        } else {
          resolve((filteredPosts = []));
        }
      });
  });
  await promise;
  return filteredPosts;
};

const commentThisPost = async (authorId, postId, comment) => {
  if (comment !== "") {
    await firebase
      .database()
      .ref("Posts/" + postId)
      .child("comments")
      .push(
        {
          [authorId]: comment
        },
        function(error) {
          console.log(error);
        }
      );
  }
};

const getAllCommentsByPostId = async postId => {
  let result = null;
  let allComment = [];
  const promise = new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("Posts")
      .once("value", function(snapshot) {
        for (let i in snapshot.val()) {
          if (i === postId) {
            result = snapshot.val()[i];
            Object.keys(result.comments).forEach(key => {
              resolve(allComment.push(result.comments[key]));
            });
          }
        }
      });
  });
  await promise;
  // await firebase.database
  return allComment;
};

//dislike method to cancel like one certain post and make its like attribute minus one
// const dislike = function(postId) {
  
// };

const cancelLikes = async (postId, userId) => {
  // let temp = this.dislike(postId)
  let likedPost = null;
  () => {
    var postRef = firebase.database().ref("Posts/" + postId);
    postRef.child("likes").once("value", function(snapshot) {
    var currentLikes = snapshot.val() ? snapshot.val() : 0;
    postRef.update(
      {
        likes: currentLikes - 1
      },
      function(error) {
        console.log(error);
      }
    );
    });
  }
  await firebase
    .database()
    .ref("Users/" + userId)
    .child("myLikes")
    .once("value", snapshot => {
      likedPost = snapshot.val();
      delete likedPost[postId];
    })
    .then(() => {
      if (Object.keys(likedPost).length !== 0) {
        firebase
          .database()
          .ref("Users/" + userId)
          .update({ ["myLikes"]: likedPost });
      } else {
        firebase
          .database()
          .ref("Users/" + userId)
          .update({ ["myLikes"]: false });
      }
    });
};

const cancelCollection = async (postId, userId) => {
  let collectionPost = null;
  await firebase
    .database()
    .ref("Users/" + userId)
    .child("collection")
    .once("value", snapshot => {
      // for (let i in snapshot.val()) {
      //   console.log(i)
      //   }
      collectionPost = snapshot.val();
      delete collectionPost[postId];
    })
    .then(() => {
      if (Object.keys(collectionPost).length !== 0) {
        firebase
          .database()
          .ref("Users/" + userId)
          .update({ ["collection"]: collectionPost });
      } else {
        firebase
          .database()
          .ref("Users/" + userId)
          .update({ ["collection"]: false });
      }
    });
};

module.exports = {
  getPostsByTag,
  commentThisPost,
  getAllCommentsByPostId,
  cancelLikes,
  cancelCollection
};
