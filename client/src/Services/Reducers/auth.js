import {
  LOGIN_USER,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_USER_LOADING,
  AUTH_LOGOUT_USER,
} from 'Services/Types/auth';

const initialState = {
  user: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload.data.user_id,
        loading: false,
      };
    case LOGIN_USER:
      localStorage.setItem('token', action.payload.data.token);

      return state;
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AUTH_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGOUT_USER:
      localStorage.removeItem('token');

      return {
        ...state,
        loading: false,
        error: null,
        user: null,
      };
    default:
      return state;
  }
};
