import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../actions/types';
import { setAlert } from './alert';

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/api/users/create', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert('Registered successfully!', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'danger'));
        });
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/api/users/login', body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert('Login successfully!', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'danger'));
        });
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
