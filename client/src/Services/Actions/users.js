import axios from 'axios';

import {
  GET_ALL_USERS,
  USERS_ERROR,
  USERS_LOADING,
} from 'Services/Types/users';

import { setAuthToken } from 'Services/Utils/authToken';

export const getAllUsers = () => async (dispatch) => {
  try {
    setAuthToken(localStorage.token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/users`,
      config
    );

    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: USERS_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};
