import {
  GET_ALL_EMERGENCY_CATEGORIES,
  GET_EMERGENCY_CATEGORY,
  EMERGENCY_CATEGORY_MESSAGE,
  EMERGENCY_CATEGORIES_ERROR,
  EMERGENCY_CATEGORIES_LOADING,
  EMERGENCY_CATEGORIES_RESET,
} from 'Services/Types/emergency-categories';

const initialState = {
  emergencyCategories: null,
  emergencyCategory: null,
  message: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMERGENCY_CATEGORIES:
      return {
        ...state,
        emergencyCategories: action.payload.emergency_categories,
        loading: false,
      };
    case GET_EMERGENCY_CATEGORY:
      return {
        ...state,
        emergencyCategory: action.payload.emergency_category,
        loading: false,
      };
    case EMERGENCY_CATEGORY_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case EMERGENCY_CATEGORIES_RESET:
      return initialState;
    case EMERGENCY_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case EMERGENCY_CATEGORIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
