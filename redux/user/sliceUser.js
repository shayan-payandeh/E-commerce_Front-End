import { apiCall } from '@/utils/apiCall';
import { api, loginUrl, userUrl } from '@/utils/values';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import Router from 'next/router';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
    error: null,
  },
  reducers: {
    signinUserRequest: (user, action) => {
      user.loading = true;
    },

    signinUserSuccess: (user, action) => {
      user.loading = false;
      user.user = action.payload;
      Cookies.set('userinfo', JSON.stringify(action.payload));
    },
    signinUserFailure: (user, action) => {
      user.loading = false;
      user.error = action.payload;
    },

    signupUserRequest: (user, action) => {
      user.loading = true;
    },

    signupUserSuccess: (user, action) => {
      user.loading = false;
      user.user = action.payload;
      Cookies.set('userinfo', JSON.stringify(action.payload));
    },
    signupUserFailure: (user, action) => {
      user.loading = false;
      user.error = action.payload;
    },

    signoutUser: (user, action) => {
      Cookies.remove('userInfo');
      user.user = null;
    },
  },
});

const {
  signinUserRequest,
  signinUserSuccess,
  signinUserFailure,
  signoutUser,
  signupUserFailure,
  signupUserRequest,
  signupUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;

export const userSignin = (data) => {
  return (dispatch) => {
    dispatch(signinUserRequest());
    apiCall(`${api}${userUrl}${loginUrl}`, 'post', data)
      .then((res) => {
        Router.push('/');
        dispatch(signinUserSuccess(res.data));
      })
      .catch((error) => {
        const errorMsg =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        // toast.error(errorMsg);
        dispatch(signinUserFailure(errorMsg));
      });
  };
};

export const userSignup = (data) => {
  return (dispatch) => {
    dispatch(signupUserRequest());
    http
      .post(`/user/signup`, data)
      .then(({ data }) => {
        Router.push('/');
        //   toast.success(`${data.name}  خوش آمدی `);
        dispatch(signupUserSuccess(data));
        dispatch(signinUserSuccess(data));
      })
      .catch((error) => {
        const errorMsg =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        //   toast.error(errorMsg);
        dispatch(signupUserFailure(errorMsg));
      });
  };
};

export const userSignout = () => (dispatch) => {
  dispatch(signoutUser());
  http
    .get('/user/logout', { withCredentials: true })
    .then((res) => {
      window.location.href = '/';
    })
    .catch((error) => {
      const errorMsg =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(errorMsg);
    });
};
