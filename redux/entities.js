import { combineReducers } from 'redux';
import sliceUser from './user/sliceUser';

export default combineReducers({
  userSign: sliceUser,
});
