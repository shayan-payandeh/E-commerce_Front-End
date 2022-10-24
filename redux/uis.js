import { combineReducers } from 'redux';
import sliceLanguage from './language/sliceLanguage';

export default combineReducers({
  language: sliceLanguage,
});
