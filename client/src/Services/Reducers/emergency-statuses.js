import {
  GET_ALL_EMERGENCY_STATUSES,
  GET_EMERGENCY_STATUS,
  EMERGENCY_STATUS_MESSAGE,
  EMERGENCY_STATUSES_ERROR,
  EMERGENCY_STATUSES_LOADING,
  EMERGENCY_STATUSES_RESET,
} from 'Services/Types/emergency-statuses';

const initialState = {
  emergencyStatuses: null,
  emergencyStatus: null,
  message: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMERGENCY_STATUSES:
      return {
        ...state,
        emergencyStatuses: action.payload.emergency_statuses,
        loading: false,
      };
    case GET_EMERGENCY_STATUS:
      return {
        ...state,
        emergencyStatus: action.payload.emergency_status,
        loading: false,
      };
    case EMERGENCY_STATUS_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case EMERGENCY_STATUSES_RESET:
      return initialState;
    case EMERGENCY_STATUSES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case EMERGENCY_STATUSES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
