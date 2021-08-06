import axios from 'axios';

import {
  GET_PAGE,
  PAGE_ERROR,
  GET_POST,
  POST_ERROR,
  GET_PAGE_POSTS,
  PAGE_POSTS_ERROR,
  GET_SUBPOST,
  SUBPOST_ERROR,
} from './types';

export const getPageById = (pageId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/pages/${pageId}`);

    dispatch({
      type: GET_PAGE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: PAGE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

export const getPostById = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getSubPosts = (subPostIds) => async (dispatch) => {
  try {
    subPostIds.forEach(async (subPostId) => {
      const res = await axios.get(`/api/posts/${subPostId._id}`);
      console.log(res.data);
      dispatch({
        type: GET_SUBPOST,
        payload: res.data,
      });
    });
  } catch (err) {
    console.error(err);
    // dispatch({
    //   type: POST_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

export const getPostByPageId =
  (pageId, section, sorting, order) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/pages/${pageId}/posts`, {
        params: { section, sorting, order },
      });

      dispatch({
        type: GET_PAGE_POSTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      // dispatch({
      //   type: PAGE_POSTS_ERROR,
      //   payload: { msg: err.response.statusText, status: err.response.status },
      // });
    }
  };
