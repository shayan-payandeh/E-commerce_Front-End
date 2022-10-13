import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from '@mui/material';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from '@/utils/Store';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import styles from '@/styles/Login.module.scss';
import { AccountCircleOutlined } from '@mui/icons-material';
import { userUrl, loginUrl, registerUrl, api } from '@/utils/values';
import { getError } from '@/utils/getError';
import { apiCall } from '@/utils/apiCall';

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [progressFlag, setProgressFlag] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLanguage(state.language);
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ email, password }) => {
    const message =
      language === 'English' ? 'Success Login' : 'به فروشگاه ما خوش آمدید';
    closeSnackbar();
    setProgressFlag(true);

    const response = await apiCall(`${api}${userUrl}${loginUrl}`, 'post', {
      email,
      password,
    });
    if (response && response.data) {
      enqueueSnackbar(message, { variant: 'success' });
      dispatch({ type: 'USER_LOGIN', payload: response.data });
      router.push(redirect || '/');
      setProgressFlag(false);
    } else {
      setProgressFlag(false);
      enqueueSnackbar(getError(response, language), { variant: 'error' });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={styles.loginForm}
        dir={language === 'English' ? 'ltr' : 'rtl'}
      >
        <List>
          <ListItem>
            <AccountCircleOutlined className={styles.icon} />
          </ListItem>
          <ListItem>
            <Typography className={styles.title}>
              <span>{language === 'English' ? 'Sign in' : 'ورود به سایت'}</span>
            </Typography>
          </ListItem>
          <br />
          <ListItem>
            <Controller
              name="email"
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  placeholder={language === 'English' ? 'Email *' : 'ایمیل'}
                  inputProps={{
                    type: 'email',
                    style: { fontSize: '13px' },
                  }}
                  // onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={
                    language === 'English'
                      ? errors.email
                        ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is Required'
                        : ''
                      : errors.email
                      ? errors.email.type === 'pattern'
                        ? 'ایمیل معتبر نیست'
                        : 'ایمیل الزامی است'
                      : ''
                  }
                  FormHelperTextProps={{
                    style: { textAlign: 'start' },
                  }}
                  {...field}
                ></TextField>
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              rules={{ required: true, minLength: 6 }}
              control={control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  placeholder={
                    language === 'English' ? 'Password *' : 'رمز عبور'
                  }
                  inputProps={{
                    type: 'password',
                    style: { fontSize: '13px' },
                  }}
                  error={Boolean(errors.password)}
                  helperText={
                    language === 'English'
                      ? errors.password
                        ? errors.password.type === 'minLength'
                          ? 'Password minLength more than 5'
                          : 'Password is required'
                        : ''
                      : errors.password
                      ? errors.password.type === 'minLength'
                        ? 'رمز عبور کوتاه است'
                        : 'رمز عبور الزامی است'
                      : ''
                  }
                  FormHelperTextProps={{
                    style: { textAlign: 'start' },
                  }}
                  {...field}
                ></TextField>
              )}
            />
          </ListItem>
          <br />
          <br />
          <ListItem>
            <Button
              className={styles.loginButton}
              variant="contained"
              type="submit"
              fullWidth
            >
              <span>{language === 'English' ? 'Login' : 'ورود'}</span>
              {progressFlag && (
                <CircularProgress
                  size={30}
                  style={{
                    color: '#038abb',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Button>
          </ListItem>
          <ListItem dir={language === 'English' ? 'ltr' : 'rtl'}>
            <span>
              {language === 'English'
                ? " Don't have an account?"
                : 'حساب کاربری ندارید ؟'}
            </span>
            &nbsp;
            <NextLink
              href={
                redirect
                  ? `${registerUrl}?redirect=${redirect}`
                  : `${registerUrl}`
              }
              passHref
            >
              <Link style={{ color: '#0667a9' }}>
                <span>{language === 'English' ? 'Register' : 'ثبت نام'}</span>
              </Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </>
  );
}

export default Login;

// Login.noLayout = true;
Login.getLayout = function (page) {
  return <>{page}</>;
};
