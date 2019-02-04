//user module
import {
  getPostsByTag,
  commentThisPost,
  getAllCommentsByPostId,
  cancelLikes,
  cancelCollection
} from "./postAPI";

export const postModule = {
  async getPostsByTag(tag) {
    try {
      const res = await getPostsByTag(tag);
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  async commentThisPost(authorId, postId, comment) {
    try {
      const res = await commentThisPost(authorId, postId, comment);
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  async getAllCommentsByPostId(postId) {
    try {
      const res = await getAllCommentsByPostId(postId);
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  async cancelLikes(postId, userId) {
    try {
      const res = await cancelLikes(postId, userId);
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  async cancelCollection(postId, userId) {
    try {
      const res = await cancelCollection(postId, userId);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
};
