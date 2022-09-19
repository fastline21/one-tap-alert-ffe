import {
  GET_ALL_EMERGENCY_TYPES,
  GET_EMERGENCY_TYPE,
  EMERGENCY_TYPE_MESSAGE,
  EMERGENCY_TYPES_ERROR,
  EMERGENCY_TYPES_LOADING,
  EMERGENCY_TYPES_RESET,
} from 'Services/Types/emergency-types';

const initialState = {
  emergencyTypes: null,
  emergencyType: null,
  message: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMERGENCY_TYPES:
      return {
        ...state,
        emergencyTypes: action.payload.emergency_types,
        loading: false,
      };
    case GET_EMERGENCY_TYPE:
      return {
        ...state,
        emergencyType: action.payload.emergency_type,
        loading: false,
      };
    case EMERGENCY_TYPE_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case EMERGENCY_TYPES_RESET:
      return initialState;
    case EMERGENCY_TYPES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case EMERGENCY_TYPES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
