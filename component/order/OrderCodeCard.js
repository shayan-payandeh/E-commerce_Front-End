import styles from '@/styles/component/ShippingAddressCard.module.scss';
import { Card, List, ListItem, Typography } from '@mui/material';

function OrderCodeCard({ order, language }) {
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
                {language === 'English' ? 'Order ID' : 'کد پیگیری سفارش'}
              </strong>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <span> {order._id}</span> &nbsp;
            </Typography>
          </ListItem>
        </List>
      </Card>
    </>
  );
}

export default OrderCodeCard;
