import { GET_PAGE, PAGE_ERROR } from '../actions/types';

const initialState = {
  page: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PAGE:
      return { ...state, ...payload, loading: false };

    case PAGE_ERROR:
      return {
        ...state,
        page: null,
        loading: false,
      };

    default:
      return state;
  }
}
