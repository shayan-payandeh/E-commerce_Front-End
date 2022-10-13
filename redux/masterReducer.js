import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import uisReducer from './uis';

export default combineReducers({
  entities: entitiesReducer,
  uis: uisReducer,
});
