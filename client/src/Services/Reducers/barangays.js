import {
  GET_ALL_BARANGAYS,
  GET_BARANGAY,
  BARANGAY_MESSAGE,
  BARANGAYS_ERROR,
  BARANGAYS_LOADING,
  BARANGAYS_RESET,
} from 'Services/Types/barangays';

const initialState = {
  barangays: null,
  barangay: null,
  message: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BARANGAYS:
      return {
        ...state,
        barangays: action.payload.barangays,
        loading: false,
      };
    case GET_BARANGAY:
      return {
        ...state,
        barangay: action.payload.barangay,
        loading: false,
      };
    case BARANGAY_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case BARANGAYS_RESET:
      return initialState;
    case BARANGAYS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case BARANGAYS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
