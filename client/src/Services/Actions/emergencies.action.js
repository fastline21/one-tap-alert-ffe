import axios from 'axios';

import {
  GET_ALL_EMERGENCIES,
  EMERGENCIES_LOADING,
  EMERGENCIES_ERROR,
} from 'Services/Types/emergencies.type';

import { setAuthToken } from 'Services/Utils/authToken';

export const getAllEmergencies = () => async (dispatch) => {
  console.log('yes');
  setLoading()(dispatch);

  try {
    setAuthToken(localStorage.token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/emergencies`,
      config
    );

    dispatch({
      type: GET_ALL_EMERGENCIES,
      payload: res.data.data,
    });
  } catch (error) {
    console.error(JSON.stringify(error));

    const {
      status_code: statusCode,
      data: { message },
    } = error.response.data;

    dispatch({
      type: EMERGENCIES_ERROR,
      payload: {
        statusCode,
        message,
      },
    });
  }
};

const setLoading = () => (dispatch) => {
  dispatch({
    type: EMERGENCIES_LOADING,
  });
};
