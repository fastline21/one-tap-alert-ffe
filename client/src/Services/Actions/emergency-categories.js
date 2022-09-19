import axios from 'axios';

import {
  GET_ALL_EMERGENCY_CATEGORIES,
  GET_EMERGENCY_CATEGORY,
  EMERGENCY_CATEGORY_MESSAGE,
  EMERGENCY_CATEGORIES_RESET,
  EMERGENCY_CATEGORIES_ERROR,
  EMERGENCY_CATEGORIES_LOADING,
} from 'Services/Types/emergency-categories';

import { setAuthToken } from 'Services/Utils/authToken';

// Get all emergency categories
export const getAllEmergencyCategories = () => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-categories`,
      config
    );

    dispatch({
      type: GET_ALL_EMERGENCY_CATEGORIES,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_CATEGORIES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Get emergency category
export const getEmergencyCategory = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-categories/${data}`,
      config
    );

    dispatch({
      type: GET_EMERGENCY_CATEGORY,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_CATEGORIES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Create emergency category
export const createEmergencyCategory = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-categories`,
      data,
      config
    );

    dispatch({
      type: EMERGENCY_CATEGORY_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;
    dispatch({
      type: EMERGENCY_CATEGORIES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Update emergency category
export const updateEmergencyCategory = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-categories/${id}`,
      rest,
      config
    );

    dispatch({
      type: EMERGENCY_CATEGORY_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_CATEGORIES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Delete emergency category
export const deleteEmergencyCategory = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-categories/${id}`,
      config
    );

    dispatch({
      type: EMERGENCY_CATEGORY_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_CATEGORIES_ERROR,
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
    type: EMERGENCY_CATEGORIES_LOADING,
  });
};

// Clear message
export const emergencyCategoriesReset = () => (dispatch) => {
  dispatch({
    type: EMERGENCY_CATEGORIES_RESET,
  });
};
