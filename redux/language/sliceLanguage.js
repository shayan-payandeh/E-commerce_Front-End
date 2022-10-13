import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const slice = createSlice({
  name: 'language',
  initialState: {
    language: Cookies.get('language') ? Cookies.get('language') : 'English',
  },
  reducers: {
    languageChange: (language, action) => {
      language = action.payload;
      Cookies.set('language', action.payload);
    },
  },
});

export const { languageChange } = slice.actions;
export default slice.reducer;
