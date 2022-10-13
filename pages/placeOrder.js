import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import CheckoutWizard from '@/component/CheckoutWizard';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import OrderSummary from '@/component/order/OrderSummary';
import OrderItemsCard from '@/component/order/OrderItemsCard';
import PaymentMethodCard from '@/component/card/PaymentMethodCard';
import ShippingAddressCard from '@/component/card/ShippingAddressCard';
import { Grid } from '@mui/material';
import { api, cartUrl, ordersUrl, paymentUrl } from '@/utils/values';
import styles from '@/styles/PlaceOrder.module.scss';
import { getError } from '@/utils/getError';
import { apiCall } from '@/utils/apiCall';
import dynamic from 'next/dynamic';

function PlaceOrder() {
  const [language, setLanguage] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { shippingAddress, paymentMethod, cartItems } = state.cart;
  const totalItems = cartItems.reduce((a, c) => c.quantity + a, 0);
  const initialTotalItemsPrice = cartItems.reduce(
    (a, c) => c.quantity * c.price + a,
    0
  );
  const totalItemsPrice = initialTotalItemsPrice;
  const tax =
    Math.round(parseInt(Math.ceil(totalItemsPrice * 0.05)) / 1000) * 1000;
  const shippingPrice = totalItemsPrice > 200000 ? 0 : 15000;
  const totalPrice = totalItemsPrice + tax + shippingPrice;

  useEffect(() => {
    setLanguage(state.language);
    if (!paymentMethod) {
      router.push(`${paymentUrl}`);
    }
    if (cartItems.length === 0) {
      router.push(`${cartUrl}`);
    }
  }, []);

  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await apiCall(
        `${ordersUrl}`,
        'post',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          totalItemsPrice,
          shippingPrice,
          tax,
          totalPrice,
        },

        {
          'x-auth-token': userInfo.token,
        }
      );
      router.push(`${ordersUrl}/${data._id}`);
      dispatch({ type: 'CART_CLEAR' });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(getError(error, language), { variant: 'error' });
    }
  };
  return (
    <>
      <CheckoutWizard activeStep={3} language={language} />
      <span
        className={
          language === 'English' ? styles.englishTitle : styles.persianTitle
        }
      >
        {language === 'English' ? 'Place Order' : 'ثبت سفارش'}
      </span>

      {cartItems.length > 0 && (
        <Grid
          style={{ marginTop: '20px' }}
          container
          spacing={2}
          direction={language === 'English' ? 'row' : 'row-reverse'}
        >
          <Grid item md={9} xs={12}>
            <ShippingAddressCard language={language} order={state.cart} />
            <PaymentMethodCard order={state.cart} language={language} />
            <OrderItemsCard orders={cartItems} language={language} />
          </Grid>

          <Grid item md={3} xs={12}>
            <OrderSummary
              language={language}
              totalItems={totalItems}
              totalItemsPrice={totalItemsPrice}
              shippingPrice={shippingPrice}
              tax={tax}
              totalPrice={totalPrice}
              buttonFlag={false}
              button={true}
              loading={loading}
              placeOrderHandler={placeOrderHandler}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
