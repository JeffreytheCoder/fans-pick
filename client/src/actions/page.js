import axios from 'axios';

import { GET_PAGE, PAGE_ERROR } from './types';

export const getPageById = (pageId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/pages/${pageId}`);

    dispatch({
      type: GET_PAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// export const getUserPages = (userId) => async dispatch => {
//   try {
//     const res = axios.get(`api/users/${userId}/pages`);

//     dispatch({
//       type: GET_USER_PAGES,
//       payload: res.data.pages
//     })
//   } catch (err) {
//     dispatch({
//       type: PAGE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// }
