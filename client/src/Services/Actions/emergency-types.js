import axios from 'axios';

import {
  GET_ALL_EMERGENCY_TYPES,
  GET_EMERGENCY_TYPE,
  EMERGENCY_TYPE_MESSAGE,
  EMERGENCY_TYPES_RESET,
  EMERGENCY_TYPES_ERROR,
  EMERGENCY_TYPES_LOADING,
} from 'Services/Types/emergency-types';

import { setAuthToken } from 'Services/Utils/authToken';

// Get all emergency types
export const getAllEmergencyTypes = () => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-types`,
      config
    );

    dispatch({
      type: GET_ALL_EMERGENCY_TYPES,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_TYPES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Get emergency type
export const getEmergencyType = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-types/${data}`,
      config
    );

    dispatch({
      type: GET_EMERGENCY_TYPE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_TYPES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Create emergency type
export const createEmergencyType = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-types`,
      data,
      config
    );

    dispatch({
      type: EMERGENCY_TYPE_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;
    dispatch({
      type: EMERGENCY_TYPES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Update emergency type
export const updateEmergencyType = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-types/${id}`,
      rest,
      config
    );

    dispatch({
      type: EMERGENCY_TYPE_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_TYPES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Delete emergency type
export const deleteEmergencyType = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-types/${id}`,
      config
    );

    dispatch({
      type: EMERGENCY_TYPE_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_TYPES_ERROR,
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
    type: EMERGENCY_TYPES_LOADING,
  });
};

// Clear message
export const emergencyTypesReset = () => (dispatch) => {
  dispatch({
    type: EMERGENCY_TYPES_RESET,
  });
};
