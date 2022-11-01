import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/component/Appbar.module.scss';
import * as Scroll from 'react-scroll';
import { Store } from '@/utils/Store';

function AppbarMenu() {
  let Links = Scroll.Link;
  let Buttons = Scroll.Button;
  let Elements = Scroll.Element;
  let Events = Scroll.Events;
  let scroll = Scroll.animateScroll;
  let scrollSpy = Scroll.scrollSpy;
  const { state, dispatch } = useContext(Store);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLanguage(state.language);

    Events.scrollEvent.register('begin', function (to, element) {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function (to, element) {
      console.log('end', arguments);
    });

    scrollSpy.update();
  }, []);

  const router = useRouter();
  const scrollToBtm = () => {
    scroll.scrollToBottom();
  };

  return (
    <>
      <header
        color="default"
        className={styles.secondNavbar}
        dir={language === 'English' ? 'ltr' : 'rtl'}
      >
        <NextLink href={'/'} passHref>
          <Link
            style={{
              textDecoration: 'none',
            }}
          >
            <div
              className={
                router.pathname === '/' ? styles.activeTab : styles.tab
              }
            >
              <Typography className={styles.menuItemText}>
                {language === 'English' && <span>{'Home'}</span>}
                {language !== 'English' && <span>{'خانه'}</span>}
              </Typography>
            </div>
          </Link>
        </NextLink>
        <NextLink href={'/products'} passHref>
          <Link
            style={{
              textDecoration: 'none',
            }}
          >
            <Box
              className={
                router.pathname === '/products' ? styles.activeTab : styles.tab
              }
            >
              <Typography className={styles.menuItemText}>
                {language === 'English' && <span>{'Products'}</span>}
                {language !== 'English' && <span>{'محصولات'}</span>}
              </Typography>
            </Box>
          </Link>
        </NextLink>
        <NextLink href={'/'} passHref>
          <Link
            style={{
              textDecoration: 'none',
            }}
          >
            <Box
              className={
                router.pathname === '/contact' ? styles.activeTab : styles.tab
              }
            >
              <Typography className={styles.menuItemText}>
                {language === 'English' && (
                  <span onClick={scrollToBtm}>{'Contact'}</span>
                )}
                {language !== 'English' && (
                  <span onClick={scrollToBtm}>{'ارتباط با ما'}</span>
                )}
              </Typography>
            </Box>
          </Link>
        </NextLink>
      </header>
    </>
  );
}

export default AppbarMenu;
