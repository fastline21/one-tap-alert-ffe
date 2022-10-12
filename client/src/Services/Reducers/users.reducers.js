import {
  GET_ALL_USERS,
  USERS_ERROR,
  USERS_LOADING,
} from 'Services/Types/users';

const initialState = {
  users: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.data.users,
        loading: false,
      };
    case USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
