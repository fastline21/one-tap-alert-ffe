import {
  GET_ALL_EMERGENCIES,
  EMERGENCIES_LOADING,
  EMERGENCIES_ERROR,
} from 'Services/Types/emergencies.type';

const initialState = {
  emergencies: null,
  emergency: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMERGENCIES:
      return {
        ...state,
        emergencies: action.payload.emergencies,
        loading: false,
      };
    case EMERGENCIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case EMERGENCIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
