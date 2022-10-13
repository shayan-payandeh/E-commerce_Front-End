import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useContext, useState } from 'react';
import { getError } from '@/utils/getError';
import { Store } from '@/utils/Store';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import UserProfileAndOrderCard from '@/component/card/userProfileAndOrderCard';
import { Button, Grid, List, ListItem, TextField } from '@mui/material';
import styles from '@/styles/Profile.module.scss';
import { Box } from '@mui/system';
import { apiCall } from '@/utils/apiCall';
import { loginUrl, profileUrl, userUrl } from '@/utils/values';

function Profile() {
  const { state, dispatch } = useContext(Store);
  const [language, setLanguage] = useState('');
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { pathname } = router;
  const { userInfo } = state;

  useEffect(() => {
    setLanguage(state.language);
    if (!userInfo) {
      router.push(`${loginUrl}?redirect=${profileUrl}`);
      return;
    }
    setValue('name', userInfo.name);
    setValue('email', userInfo.email);
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    const message =
      language === 'English'
        ? 'User updated successfully'
        : 'اطلاعات کاربر با موفقیت بروزرسانی شد';
    const passwordMessage =
      language === 'English'
        ? "Passwords don't match"
        : 'رمز عبورها باید یکسان باشد';
    closeSnackbar();

    if (password !== confirmPassword) {
      enqueueSnackbar(passwordMessage, { variant: 'error' });
      return;
    }
    const response = await apiCall(
      `${userUrl}`,
      'put',
      { name, email, password },
      { 'x-auth-token': userInfo.token }
    );
    if (response && response.data) {
      dispatch({ type: 'USER_LOGIN', payload: response.data });
      enqueueSnackbar(message, {
        variant: 'success',
      });
    } else enqueueSnackbar(getError(response, language), { variant: 'error' });
  };
  return (
    <>
      <Grid
        container
        spacing={1}
        direction={language === 'English' ? 'row' : 'row-reverse'}
      >
        <Grid item md={3} xs={12}>
          <UserProfileAndOrderCard pathname={pathname} />
        </Grid>
        <Grid item md={9} xs={12}>
          <Box className={styles.profileContainer}>
            <List>
              <ListItem>
                <span
                  className={
                    language === 'English'
                      ? styles.englishTitle
                      : styles.persianTitle
                  }
                >
                  {language === 'English' ? 'Profile' : ' اطلاعات کاربر'}
                </span>
              </ListItem>
              <ListItem dir={language === 'English' ? 'ltr' : 'rtl'}>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className={styles.form}
                >
                  <List>
                    <ListItem>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 2,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            placeholder={
                              language === 'English' ? 'Name' : 'نام'
                            }
                            inputProps={{
                              type: 'text',
                              style: {
                                padding: '14px',
                                fontSize: '14px',
                              },
                            }}
                            error={Boolean(errors.name)}
                            helperText={
                              language === 'English'
                                ? errors.name
                                  ? errors.name.type === 'minLength'
                                    ? 'Name length is more than 1'
                                    : 'Name is required'
                                  : ''
                                : errors.name
                                ? errors.name.type === 'minLength'
                                  ? 'نام باید حداقل دو کاراکتر باشد'
                                  : 'نام الزامی است'
                                : ''
                            }
                            FormHelperTextProps={{
                              style: {
                                textAlign: 'start',
                              },
                            }}
                            {...field}
                          />
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            placeholder={
                              language === 'English' ? 'Email' : 'ایمیل'
                            }
                            inputProps={{
                              type: 'email',
                              style: {
                                padding: '14px',
                                fontSize: '14px',
                              },
                            }}
                            error={Boolean(errors.email)}
                            helperText={
                              language === 'English'
                                ? errors.email
                                  ? errors.email.type === 'pattern'
                                    ? 'Email is not valid'
                                    : 'Email is required'
                                  : ''
                                : errors.email
                                ? errors.email.type === 'pattern'
                                  ? 'ایمیل معتبر نیست'
                                  : 'ایمیل الزامی است'
                                : ''
                            }
                            FormHelperTextProps={{
                              style: {
                                style: {
                                  padding: '14px',
                                  fontSize: '14px',
                                },
                              },
                            }}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === '' ||
                            value.length > 5 ||
                            'Password length is more than 5',
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="password"
                            placeholder={
                              language === 'English' ? 'Password' : 'رمز عبور'
                            }
                            inputProps={{
                              type: 'password',
                              style: {
                                padding: '14px',
                                fontSize: '14px',
                              },
                            }}
                            error={Boolean(errors.password)}
                            helperText={
                              language === 'English'
                                ? errors.password
                                  ? 'Password length is more than 5'
                                  : ''
                                : errors.password
                                ? 'رمز عبور باید حداقل 6 کاراکتر باشد'
                                : ''
                            }
                            FormHelperTextProps={{
                              style: {
                                textAlign: 'start',
                              },
                            }}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === '' ||
                            value.length > 5 ||
                            'Confirm Password length is more than 5',
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="confirmPassword"
                            placeholder={
                              language === 'English'
                                ? 'Confirm Password'
                                : 'تایید رمز عبور'
                            }
                            inputProps={{
                              type: 'password',
                              style: {
                                padding: '14px',
                                fontSize: '14px',
                              },
                            }}
                            error={Boolean(errors.confirmPassword)}
                            helperText={
                              language === 'English'
                                ? errors.password
                                  ? 'Confirm Password length is more than 5'
                                  : ''
                                : errors.password
                                ? 'تایید رمز عبور باید حداقل 6 کاراکتر باشد'
                                : ''
                            }
                            FormHelperTextProps={{
                              style: {
                                textAlign: 'start',
                              },
                            }}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        size="large"
                        className={styles.updateButton}
                      >
                        <span>
                          {language === 'English' ? 'Update' : 'بروز رسانی'}
                        </span>
                      </Button>
                    </ListItem>
                  </List>
                </form>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
