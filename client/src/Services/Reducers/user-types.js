import {
  GET_ALL_USER_TYPES,
  GET_USER_TYPE,
  USER_TYPE_MESSAGE,
  USER_TYPES_ERROR,
  USER_TYPES_LOADING,
  USER_TYPES_RESET,
} from 'Services/Types/user-types';

const initialState = {
  userTypes: null,
  userType: null,
  message: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_TYPES:
      return {
        ...state,
        userTypes: action.payload.user_types,
        loading: false,
      };
    case GET_USER_TYPE:
      return {
        ...state,
        userType: action.payload.user_type,
        loading: false,
      };
    case USER_TYPE_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case USER_TYPES_RESET:
      return initialState;
    case USER_TYPES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USER_TYPES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
