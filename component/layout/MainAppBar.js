import {
  AddShoppingCart,
  ArrowDropDown,
  PersonOutline,
  ShoppingCart,
} from '@mui/icons-material';
import {
  Badge,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import logo from '@/public/images/eCommerceLogo.png';
import styles from '@/styles/component/Appbar.module.scss';
import persianJs from 'persianjs';
import { orderHistoryUrl, profileUrl } from '@/utils/values';
import dynamic from 'next/dynamic';

function MainAppBar() {
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  const languageHandler = (language) => {
    router.reload();
    dispatch({ type: 'LANGUAGE_CHANGE', payload: language });
  };

  const routerHandler = (destination) => {
    setAnchorEl(null);
    setAnchorEl2(null);
    router.push(destination);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    router.push('/');
  };

  return (
    <>
      <header
        className={styles.mainNavbar}
        dir={language === 'English' ? 'ltr' : 'rtl'}
      >
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Image src={logo} alt={'Shayan'} height={40} width={95} />
            </Link>
          </NextLink>

          {/* by having flexGlow = 1 this div occupied the whole width and the next div stick to right */}
          <div className={styles.grow}></div>

          {language === 'English' && (
            <Button onClick={() => languageHandler('Farsi')}>
              <Typography className={styles.languageText}>
                <span>Fa</span>
              </Typography>
            </Button>
          )}
          {language !== 'English' && (
            <Button onClick={() => languageHandler('English')}>
              <Typography className={styles.languageText}>
                <span>En</span>
              </Typography>
            </Button>
          )}

          <div>
            {userInfo ? (
              <>
                <Button
                  dir={language === 'English' ? 'ltr' : 'rtl'}
                  className={styles.navbarButton}
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  style={{ minWidth: '120px' }}
                  startIcon={
                    <PersonOutline
                      style={
                        language === 'English'
                          ? {}
                          : { marginRight: 0, marginLeft: '12px' }
                      }
                    />
                  }
                  endIcon={
                    <ArrowDropDown
                      style={
                        language === 'English'
                          ? {}
                          : { marginLeft: 0, marginRight: '12px' }
                      }
                    />
                  }
                >
                  {userInfo.name}
                </Button>
                <Menu
                  dir={language === 'English' ? 'ltr' : 'rtl'}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    style: {
                      padding: 0,
                      width: '140px',
                      '@media(max-width: 768px)': {
                        width: '100px',
                      },
                    },
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    style={{
                      fontSize: '15px',
                      paddingTop: '14px ',
                      paddingBottom: '14px ',
                      display: 'flex',
                      justifyContent: 'center',
                      borderBottom: '1px grey solid',
                      '@media(max-width: 768px)': {
                        fontSize: '13px',
                        padding: '2px',
                      },
                    }}
                    onClick={() => routerHandler(`${profileUrl}`)}
                  >
                    <span>
                      {language === 'English' ? 'Profile' : 'پروفایل'}
                    </span>
                  </MenuItem>
                  <MenuItem
                    style={{
                      fontSize: '15px',
                      padding: '14px 45px',
                      display: 'flex',
                      justifyContent: 'center',
                      borderBottom: '1px grey solid',
                      '@media(max-width: 768px)': {
                        fontSize: '13px',
                        padding: '2px',
                      },
                    }}
                    onClick={() => routerHandler(`${orderHistoryUrl}`)}
                  >
                    <span>
                      {language === 'English' ? 'My Order' : 'سفارشات'}
                    </span>
                  </MenuItem>
                  {/* <Divider /> */}
                  <MenuItem
                    style={{
                      fontSize: '15px',
                      padding: '14px 45px',
                      display: 'flex',
                      justifyContent: 'center',
                      borderBottom: '1px grey solid',
                      '@media(maxWidth: 768px)': {
                        fontSize: '13px',
                        padding: '2px',
                      },
                    }}
                    onClick={logoutClickHandler}
                  >
                    <span>{language === 'English' ? 'Logout' : 'خروج'}</span>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <NextLink href="/login" passHref>
                <Link>
                  {language === 'English' && (
                    <span style={{ marginRight: '13px' }}>{'Login'}</span>
                  )}
                  {language !== 'English' && (
                    <span style={{ marginLeft: '13px', fontSize: '13px' }}>
                      {'ثبت نام / ورود'}
                    </span>
                  )}
                </Link>
              </NextLink>
            )}
            <NextLink href="/cart" passHref>
              <Link>
                {cart.cartItems.length > 0 ? (
                  <IconButton aria-label="cart" style={{ color: 'white' }}>
                    <Badge
                      badgeContent={
                        language === 'English'
                          ? cart.cartItems.length
                          : persianJs(cart.cartItems.length).englishNumber()
                              ._str
                      }
                      color="error"
                    >
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                ) : (
                  <IconButton
                    style={{ color: 'white' }}
                    aria-label="add to shopping cart"
                  >
                    <AddShoppingCart />
                  </IconButton>
                )}
              </Link>
            </NextLink>
          </div>
        </Toolbar>
      </header>
    </>
  );
}

export default dynamic(() => Promise.resolve(MainAppBar), { ssr: false });
