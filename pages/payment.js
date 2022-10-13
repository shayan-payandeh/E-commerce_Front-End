import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '@/component/CheckoutWizard';
import { Store } from '@/utils/Store';
import styles from '@/styles/Payment.module.scss';
import { KeyboardReturn } from '@mui/icons-material';
import { placeOrderUrl } from '@/utils/values';

function Payment() {
  const [language, setLanguage] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    setLanguage(state.language);
    setPaymentMethod(state.cart.paymentMethod);
  }, [state.language, state.cart.paymentMethod]);

  const submitHandler = (e) => {
    e.preventDefault();
    closeSnackbar();
    if (!paymentMethod) {
      enqueueSnackbar('Payment Method required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      router.push(`${placeOrderUrl}`);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        <Typography className={styles.mainTitle}>
          <span>{language === 'English' ? ' Payment ' : ' پرداخت'}</span>
        </Typography>
        <CheckoutWizard activeStep={2} language={language} />
        <Typography
          className={styles.paymentTitle}
          align={language === 'English' ? 'left' : 'right'}
        >
          <strong>
            {language === 'English' ? ' Payment method' : ' : روش پرداخت'}
          </strong>
        </Typography>
        <List dir={language === 'English' ? 'ltr' : 'rtl'}>
          <ListItem>
            <FormControl>
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={
                  language === 'English'
                    ? { marginLeft: '10px' }
                    : { direction: 'rtl', marginRight: '0px' }
                }
              >
                <FormControlLabel
                  label={language === 'English' ? 'Paypal' : 'بانکی'}
                  value={'online'}
                  control={<Radio />}
                ></FormControlLabel>

                <FormControlLabel
                  label={language === 'English' ? 'Cash' : 'نقدی'}
                  value={'Cash'}
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <br />
          <br />
          <br />
          <br />
          <ListItem>
            <Button
              type="button"
              className={
                language === 'English'
                  ? styles.englishReturnButton
                  : styles.persianReturnButton
              }
              onClick={() => router.back()}
            >
              {language === 'English' && <KeyboardReturn />}
              {language !== 'English' && <span>{'بازگشت'}</span>}
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={
                language === 'English'
                  ? styles.englishNextButton
                  : styles.persianNextButton
              }
            >
              <span>{language === 'English' ? 'Next' : 'مرحله بعد'}</span>
            </Button>
          </ListItem>
        </List>
      </form>
    </>
  );
}

export default Payment;
