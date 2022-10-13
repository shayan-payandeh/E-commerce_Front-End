import { combineReducers } from 'redux';
import sliceLanguage from './language';

export default combineReducers({
  language: sliceLanguage,
});
