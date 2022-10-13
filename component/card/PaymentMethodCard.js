import { Card, List, ListItem, Typography } from '@mui/material';
import styles from '@/styles/component/PaymentMethodCard.module.scss';

function PaymentMethodCard({ order, language }) {
  return (
    <>
      <Card
        className={styles.section}
        dir={language === 'English' ? 'ltr' : 'rtl'}
      >
        <List>
          <ListItem>
            <Typography>
              <strong>
                {language === 'English' ? 'Payment Method ' : 'روش پرداخت'}
              </strong>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>{order.paymentMethod}</Typography>
          </ListItem>
          <ListItem>
            {language === 'English' && (
              <Typography>
                <span> Status: {order.isPaid ? 'paid' : 'not paid'}</span>
              </Typography>
            )}
            {language !== 'English' && (
              <Typography>
                <span style={{ fontSize: '14px' }}>{'   وضعیت پرداخت:'}</span>
                <span style={{ fontSize: '14px' }}>
                  &nbsp;
                  {order.isPaid ? 'پرداخت شده' : 'پرداخت نشده'}
                </span>
              </Typography>
            )}
          </ListItem>
        </List>
      </Card>
    </>
  );
}

export default PaymentMethodCard;
