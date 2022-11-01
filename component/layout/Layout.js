import Head from 'next/head';
import { Container } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import styles from '@/styles/Layout.module.scss';
import MainAppBar from './MainAppBar';
import AppbarMenu from './AppbarMenu';
import AppbarMobileMenu from './AppbarMobileMenu';
import Footer from './Footer';

function Layout({ children }) {
  const [language, setLanguage] = useState('');
  const { state } = useContext(Store);

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);

  return (
    <div
      className={styles.layoutContainer}
      // dir={language === 'English' ? 'ltr' : 'rtl'}
    >
      <Head>
        <title>
          {language === 'English' ? 'Shayan E-Commerce' : 'فروشگاه شایان'}
        </title>
        <meta name="description" content="nextjs e-commerce application" />
      </Head>
      <MainAppBar />
      <AppbarMenu />
      <AppbarMobileMenu />
      <Container className={styles.main}>{children}</Container>
      <Footer />
    </div>
  );
}

export default Layout;
