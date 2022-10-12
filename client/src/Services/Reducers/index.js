import { combineReducers } from 'redux';

// Reducers
import authReducer from './auth';
import userTypesReducer from './user-types';
import emergencyTypesReducer from './emergency-types';
import emergencyStatusesReducer from './emergency-statuses';
import emergencyCategoriesReducer from './emergency-categories';
import barangaysReducer from './barangays';
import emergenciesReducer from './emergencies.reducer';
import usersReducer from './users.reducers';

export default combineReducers({
  authState: authReducer,
  userTypesState: userTypesReducer,
  emergencyTypesState: emergencyTypesReducer,
  emergencyStatusesState: emergencyStatusesReducer,
  emergencyCategoriesState: emergencyCategoriesReducer,
  barangaysState: barangaysReducer,
  emergenciesState: emergenciesReducer,
  usersState: usersReducer,
});
