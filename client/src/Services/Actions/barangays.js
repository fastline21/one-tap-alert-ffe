import axios from 'axios';

import {
  GET_ALL_BARANGAYS,
  GET_BARANGAY,
  BARANGAY_MESSAGE,
  BARANGAYS_RESET,
  BARANGAYS_ERROR,
  BARANGAYS_LOADING,
} from 'Services/Types/barangays';

import { setAuthToken } from 'Services/Utils/authToken';

// Get all barangays
export const getAllBarangays = () => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/barangays`,
      config
    );

    dispatch({
      type: GET_ALL_BARANGAYS,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: BARANGAYS_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Get barangay
export const getBarangay = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/barangays/${data}`,
      config
    );

    dispatch({
      type: GET_BARANGAY,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: BARANGAYS_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Create barangay
export const createBarangay = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/barangays`,
      data,
      config
    );

    dispatch({
      type: BARANGAY_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;
    dispatch({
      type: BARANGAYS_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Update barangay
export const updateBarangay = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/barangays/${id}`,
      rest,
      config
    );

    dispatch({
      type: BARANGAY_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: BARANGAYS_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Delete barangay
export const deleteBarangay = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/barangays/${id}`,
      config
    );

    dispatch({
      type: BARANGAY_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: BARANGAYS_ERROR,
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
    type: BARANGAYS_LOADING,
  });
};

// Clear message
export const barangaysReset = () => (dispatch) => {
  dispatch({
    type: BARANGAYS_RESET,
  });
};
