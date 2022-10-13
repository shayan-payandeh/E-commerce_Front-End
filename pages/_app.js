import Layout from '@/component/layout/Layout';
import '@/styles/globals.scss';
import { StoreProvider } from '@/utils/Store';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import { reduxWrapper } from 'redux/configureStore';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SnackbarProvider>
    );
  }

  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default MyApp;

// export default dynamic(() => Promise.resolve(reduxWrapper.withRedux(MyApp)), {
//   ssr: false,
// });
