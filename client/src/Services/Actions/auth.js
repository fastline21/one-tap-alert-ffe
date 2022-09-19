import axios from 'axios';

import {
  LOGIN_USER,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_USER_LOADING,
  AUTH_LOGOUT_USER,
} from 'Services/Types/auth';

import { setAuthToken } from 'Services/Utils/authToken';

export const loginUser = (data) => async (dispatch) => {
  isLoading()(dispatch);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/auth`,
      data,
      config
    );

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });

    loadUser()(dispatch);
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: AUTH_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: AUTH_LOGOUT_USER,
  });
};

export const loadUser = () => async (dispatch) => {
  isLoading()(dispatch);

  try {
    setAuthToken(localStorage.token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/auth`,
      config
    );

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: AUTH_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

const isLoading = () => (dispatch) => {
  dispatch({
    type: AUTH_USER_LOADING,
  });
};
