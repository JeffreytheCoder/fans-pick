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
  CLEANUP,
} from '../actions/types';

const initialState = {
  // page
  page: null,
  posts: [],
  pageLoading: true,
  postsLoading: true,

  // post page
  subPostsLoading: true,
  subSubPostsLoading: true,
  subPosts: [],
  subSubPosts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PAGE:
      return {
        ...state,
        ...payload,
        pageLoading: false,
      };

    case GET_POST:
      return {
        ...state,
        posts: [...state.posts, payload.post],
      };

    case GET_PAGE_POSTS:
      state.posts = [];
      return {
        ...state,
        posts: payload.posts,
        postsLoading: false,
      };

    case GET_SUBPOST:
      return {
        ...state,
        subPosts: payload,
        subPostsLoading: false,
      };

    case GET_SUBSUBPOST:
      return {
        ...state,
        subSubPosts: [...state.subSubPosts, payload],
        subSubPostsLoading: false,
      };

    case PAGE_ERROR:
      return {
        ...state,
        page: null,
        pageLoading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        posts: [],
      };

    case PAGE_POSTS_ERROR:
      return {
        ...state,
        posts: [],
        postsLoading: false,
      };

    case CLEANUP:
      return {
        ...state,
        page: null,
        posts: [],
        pageLoading: true,
        postsLoading: true,
        subPosts: [],
        subSubPosts: [],
        subPostsLoading: true,
        subSubPostsLoading: true,
      };

    default:
      return state;
  }
}
