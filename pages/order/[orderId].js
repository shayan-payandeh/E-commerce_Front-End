import { useRouter } from 'next/router';
import CheckoutWizard from '@/component/CheckoutWizard';
import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import OrderSummary from '@/component/order/OrderSummary';
import ShippingAddressCard from '@/component/card/ShippingAddressCard';
import PaymentMethodCard from '@/component/card/PaymentMethodCard';
import OrderItemsCard from '@/component/order/OrderItemsCard';
import { Grid } from '@mui/material';
import { loginUrl, ordersUrl } from '@/utils/values';
import OrderCodeCard from '@/component/order/OrderCodeCard';
import { apiCall } from '@/utils/apiCall';

function OrderScreen({ order }) {
  const [language, setLanguage] = useState('');
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const totalItems = order.orderItems.reduce((a, c) => c.quantity + a, 0);
  const totalItemsPrice = order.orderItems.reduce(
    (a, c) => c.quantity * c.price + a,
    0
  );

  useEffect(() => {
    setLanguage(state.language);
    if (!userInfo) {
      router.push(`${loginUrl}`);
    }
  }, []);

  return (
    <>
      <CheckoutWizard activeStep={4} language={language} />
      <Grid
        style={{ marginTop: '35px' }}
        container
        spacing={2}
        direction={language === 'English' ? 'row' : 'row-reverse'}
      >
        <Grid item md={9} xs={12}>
          <OrderCodeCard order={order} language={language} />
          <ShippingAddressCard order={order} language={language} />
          <PaymentMethodCard order={order} language={language} />
          <OrderItemsCard orders={order.orderItems} language={language} />
        </Grid>
        <Grid item md={3} xs={12}>
          <OrderSummary
            language={language}
            totalItems={totalItems}
            totalItemsPrice={totalItemsPrice}
            shippingPrice={order.shippingPrice}
            tax={order.tax}
            totalPrice={order.totalPrice}
            buttonFlag={false}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OrderScreen;

export async function getServerSideProps(context) {
  const token = JSON.parse(context.req.cookies.userInfo).token;
  const { params } = context;
  const { orderId } = params;
  const { data } = await apiCall(`${ordersUrl}/${orderId}`, 'get', null, {
    'x-auth-token': token,
  });
  return { props: { order: data } };
}
