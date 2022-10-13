import styles from '@/styles/component/ShippingAddressCard.module.scss';
import { Card, List, ListItem, Typography } from '@mui/material';
import persianJs from 'persianjs';

function ShippingAddressCard({ order, language }) {
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
                {language === 'English' ? 'Shipping Address' : ' آدرس پستی'}
              </strong>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              {order.shippingAddress.city}
              {' - '}
              {order.shippingAddress.address}
              {' - '}
              {language === 'English'
                ? order.shippingAddress.postalCode
                : persianJs(order.shippingAddress.postalCode).englishNumber()
                    ._str}
            </Typography>
          </ListItem>

          <ListItem>
            {language === 'English' && (
              <Typography>
                Status: {order.isDeleivered ? 'delivered' : 'not delivered'}
              </Typography>
            )}
            {language !== 'English' && (
              <Typography>
                <span style={{ fontSize: '14px' }}>{'   وضعیت سفارش:'}</span>
                <span style={{ fontSize: '14px' }}>
                  &nbsp;
                  {order.isDeleivered ? 'تحویل داده شده' : 'در حال بررسی'}
                </span>
              </Typography>
            )}
          </ListItem>
        </List>
      </Card>
    </>
  );
}

export default ShippingAddressCard;
