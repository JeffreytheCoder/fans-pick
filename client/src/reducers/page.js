import { GET_PAGE, PAGE_ERROR, GET_POST, POST_ERROR } from '../actions/types';

const initialState = {
  page: null,
  posts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PAGE:
      return {
        ...state,
        ...payload,
      };

    case GET_POST:
      return {
        ...state,
        posts: [...state.posts, payload.post],
      };

    case PAGE_ERROR:
      return {
        ...state,
        page: null,
      };

    case POST_ERROR:
      return {
        ...state,
        posts: [],
      };

    default:
      return state;
  }
}
