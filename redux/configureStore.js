import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import masterReducer from './masterReducer';

// const bindMiddleware = (middleware) => {
//     if (process.env.NODE_ENV !== 'production') {
//       const { composeWithDevTools } = require('redux-devtools-extension');
//       return composeWithDevTools(applyMiddleware(...middleware));
//     } else return applyMiddleware(...middleware);
//   };

const mainReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return masterReducer(state, action);
  }
};

const initStore = () => {
  return configureStore({
    reducer: mainReducer,
    // middleware: bindMiddleware([thunkMiddleware]),
  });
};

export const reduxWrapper = createWrapper(initStore);
