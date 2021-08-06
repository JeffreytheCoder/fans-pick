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
  GET_SUBSUBPOST,
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
    let subPosts = [];

    await Promise.all(
      subPostIds.map(async (subPostId) => {
        const res = await axios.get(`/api/posts/${subPostId._id}`);
        subPosts.push(res.data.post);
      })
    );

    dispatch({
      type: GET_SUBPOST,
      payload: subPosts,
    });
  } catch (err) {
    console.error(err);
    // dispatch({
    //   type: POST_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

export const getSubSubPosts = (subPosts) => async (dispatch) => {
  try {
    await Promise.all(
      subPosts.map(async (subPost) => {
        let subSubPosts = [];

        // append each subsubspost into subpost's array
        await Promise.all(
          subPost.subPosts.map(async (subSubPostId) => {
            const res = await axios.get(`/api/posts/${subSubPostId._id}`);
            subSubPosts.push(res.data.post);
          })
        );

        dispatch({
          type: GET_SUBSUBPOST,
          payload: subSubPosts,
        });
      })
    );
  } catch (err) {
    console.log(err);
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
