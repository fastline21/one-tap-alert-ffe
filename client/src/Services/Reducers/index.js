import { combineReducers } from 'redux';
import authReducer from './auth';
import userTypesReducer from './user-types';
import emergencyTypesReducer from './emergency-types';
import emergencyStatusesReducer from './emergency-statuses';
import emergencyCategoriesReducer from './emergency-categories';
import barangaysReducer from './barangays';

export default combineReducers({
  authState: authReducer,
  userTypesState: userTypesReducer,
  emergencyTypesState: emergencyTypesReducer,
  emergencyStatusesState: emergencyStatusesReducer,
  emergencyCategoriesState: emergencyCategoriesReducer,
  barangaysState: barangaysReducer,
});
