import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import OrderSummary from '@/component/order/OrderSummary';
import CartTable from '@/component/CartTable';
import { Grid, Link, Typography } from '@mui/material';
import { productsUrl, shippingUrl } from '@/utils/values';

function Cart() {
  const [language, setLanguage] = useState('');
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);

  const updateCartHandler = (item, number) => {
    const quantity = item.quantity + number;
    if (quantity > 0 && quantity <= item.countInStock) {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });
    }
  };

  const totalItems = cartItems.reduce((a, c) => c.quantity + a, 0);
  const initialTotalItemsPrice = cartItems.reduce(
    (a, c) => c.quantity * c.price + a,
    0
  );
  const totalItemsPrice = initialTotalItemsPrice;
  const tax = Math.round(Math.ceil(totalItemsPrice * 0.05) / 1000) * 1000;
  const shippingPrice = totalItemsPrice > 200000 ? 0 : 15000;
  const totalPrice = totalItemsPrice + tax + shippingPrice;

  const removeCartHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkOutHandler = () => {
    router.push(`${shippingUrl}`);
  };
  return (
    <>
      <Typography
        style={
          language === 'English'
            ? { marginTop: '20px', marginBottom: '20px' }
            : { marginTop: '20px', marginBottom: '20px', textAlign: 'end' }
        }
        variant="h6"
        component="h1"
      >
        <span>{language === 'English' ? 'Shopping Cart' : 'سبد خرید'}</span>
      </Typography>
      {cartItems.length === 0 ? (
        <div
          style={
            language === 'English'
              ? { textAlign: 'start' }
              : { textAlign: 'end' }
          }
        >
          {language === 'English'
            ? 'Cart is empty'
            : 'سبد خرید شما خالی می باشد'}
          <NextLink href={`${productsUrl}`} passHref>
            <Link>
              <span
                style={
                  language === 'English'
                    ? { marginLeft: '10px' }
                    : { marginRight: '10px' }
                }
              >
                {language === 'English' ? ' Go Shopping' : 'شروع خرید'}
              </span>
            </Link>
          </NextLink>
        </div>
      ) : (
        <Grid
          container
          spacing={4}
          direction={language === 'English' ? 'row' : 'row-reverse'}
        >
          <Grid item md={9} xs={11} style={{ margin: '0 auto' }}>
            <CartTable
              language={language}
              cartItems={cartItems}
              updateCartHandler={updateCartHandler}
              removeCartHandler={removeCartHandler}
            />
          </Grid>
          <Grid item md={3} xs={11} style={{ margin: '0 auto' }}>
            <OrderSummary
              totalItems={totalItems}
              totalItemsPrice={totalItemsPrice}
              shippingPrice={shippingPrice}
              tax={tax}
              totalPrice={totalPrice}
              buttonFlag={true}
              checkOutHandler={checkOutHandler}
              language={language}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
