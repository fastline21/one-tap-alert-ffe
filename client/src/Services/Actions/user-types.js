import axios from 'axios';

import {
  GET_ALL_USER_TYPES,
  GET_USER_TYPE,
  USER_TYPE_MESSAGE,
  USER_TYPES_RESET,
  USER_TYPES_ERROR,
  USER_TYPES_LOADING,
} from 'Services/Types/user-types';

import { setAuthToken } from 'Services/Utils/authToken';

// Get all user types
export const getAllUserTypes = () => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/user-types`,
      config
    );

    dispatch({
      type: GET_ALL_USER_TYPES,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: USER_TYPES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Get user type
export const getUserType = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/user-types/${data}`,
      config
    );

    dispatch({
      type: GET_USER_TYPE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: USER_TYPES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Create user type
export const createUserType = (data) => async (dispatch) => {
  isLoading()(dispatch);

  try {
    setAuthToken(localStorage.token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/user-types`,
      data,
      config
    );

    dispatch({
      type: USER_TYPE_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;
    dispatch({
      type: USER_TYPES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Update user type
export const updateUserType = (data) => async (dispatch) => {
  isLoading()(dispatch);

  try {
    const { id, ...rest } = data;

    setAuthToken(localStorage.token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.patch(
      `${process.env.REACT_APP_SERVER_API}/user-types/${id}`,
      rest,
      config
    );

    dispatch({
      type: USER_TYPE_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: USER_TYPES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Delete user type
export const deleteUserType = (data) => async (dispatch) => {
  isLoading()(dispatch);

  try {
    const { id } = data;

    setAuthToken(localStorage.token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_API}/user-types/${id}`,
      config
    );

    dispatch({
      type: USER_TYPE_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: USER_TYPES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Loading
const isLoading = () => (dispatch) => {
  dispatch({
    type: USER_TYPES_LOADING,
  });
};

// Clear message
export const userTypesReset = () => (dispatch) => {
  dispatch({
    type: USER_TYPES_RESET,
  });
};
