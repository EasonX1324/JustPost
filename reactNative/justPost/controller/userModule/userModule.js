//user module
import {
  getUserById,
  getUserCollectionsById,
  getUserLikedPostById,
  getUserPostsById
} from "./userAPI";

export const userModule = {
  async getUserById(email) {
    try {
      const res = await getUserById(email);
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  async getUserCollectionsById(email) {
    try {
      const res = await getUserCollectionsById(email);
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  async getUserLikedPostById(email) {
    try {
      const res = await getUserLikedPostById(email);
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  async getUserPostsById(email) {
    try {
      const res = await getUserPostsById(email);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
};
