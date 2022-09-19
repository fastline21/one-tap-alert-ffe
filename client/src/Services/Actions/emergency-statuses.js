import axios from 'axios';

import {
  GET_ALL_EMERGENCY_STATUSES,
  GET_EMERGENCY_STATUS,
  EMERGENCY_STATUS_MESSAGE,
  EMERGENCY_STATUSES_RESET,
  EMERGENCY_STATUSES_ERROR,
  EMERGENCY_STATUSES_LOADING,
} from 'Services/Types/emergency-statuses';

import { setAuthToken } from 'Services/Utils/authToken';

// Get all emergency statuses
export const getAllEmergencyStatuses = () => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-statuses`,
      config
    );

    dispatch({
      type: GET_ALL_EMERGENCY_STATUSES,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_STATUSES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Get emergency status
export const getEmergencyStatus = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-statuses/${data}`,
      config
    );

    dispatch({
      type: GET_EMERGENCY_STATUS,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_STATUSES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Create emergency status
export const createEmergencyStatus = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-statuses`,
      data,
      config
    );

    dispatch({
      type: EMERGENCY_STATUS_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;
    dispatch({
      type: EMERGENCY_STATUSES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Update emergency status
export const updateEmergencyStatus = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-statuses/${id}`,
      rest,
      config
    );

    dispatch({
      type: EMERGENCY_STATUS_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_STATUSES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

// Delete emergency status
export const deleteEmergencyStatus = (data) => async (dispatch) => {
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
      `${process.env.REACT_APP_SERVER_API}/emergency-statuses/${id}`,
      config
    );

    dispatch({
      type: EMERGENCY_STATUS_MESSAGE,
      payload: res.data.data,
    });
  } catch (error) {
    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCY_STATUSES_ERROR,
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
    type: EMERGENCY_STATUSES_LOADING,
  });
};

// Clear message
export const emergencyStatusesReset = () => (dispatch) => {
  dispatch({
    type: EMERGENCY_STATUSES_RESET,
  });
};
