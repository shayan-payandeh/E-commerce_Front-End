import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import {
  Box,
  Grid,
  List,
  ListItem,
  Pagination,
  PaginationItem,
} from '@mui/material';
import UserProfileAndOrderCard from '@/component/card/userProfileAndOrderCard';
import OrderHistoryTable from '@/component/order/OrderHistoryTable';
import { loginUrl, orderHistoryUrl, ordersUrl } from '@/utils/values';
import styles from '@/styles/OrderHistory.module.scss';
import { apiCall } from '@/utils/apiCall';
import queryString from 'query-string';
import routerPush from '@/utils/routerPush';
import pageNumberLabel from '@/utils/pageNumberLabel';

function OrderHistory({ userOrders }) {
  const theOrders = userOrders.docs;
  const [language, setLanguage] = useState('');
  const [orders, setOrders] = useState(theOrders);
  const [totalPriceFlag, setTotalPriceFlag] = useState('asc');
  const [dateFlag, setDateFlag] = useState('asc');
  const { state } = useContext(Store);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);

  useEffect(() => {
    setOrders(theOrders);
  }, [theOrders]);

  const dateSortHandler = () => {
    const sortValue = router.query.sort;
    window.scrollTo(0, 0);
    router.query.sort = sortValue === 'newest' ? 'oldest' : 'newest';
    sortValue === 'newest' ? setDateFlag('asc') : setDateFlag('dec');
    routerPush(router);
  };

  const totalPriceSortHandler = () => {
    const sortValue = router.query.sort;
    window.scrollTo(0, 0);
    router.query.sort = sortValue === 'cheaper' ? 'expensive' : 'cheaper';
    sortValue === 'expensive'
      ? setTotalPriceFlag('asc')
      : setTotalPriceFlag('dec');
    routerPush(router);
  };

  const pageHandler = (e, value) => {
    window.scrollTo(0, 0);
    router.query.page = value;
    routerPush(router);
  };

  const pageNumberLabelHandle = (item) => {
    const pageNumber = pageNumberLabel(item, language);
    return pageNumber;
  };
  return (
    <>
      <Grid
        container
        spacing={1}
        direction={language === 'English' ? 'row' : 'row-reverse'}
      >
        <Grid item md={3} xs={12}>
          <UserProfileAndOrderCard pathname={pathname} />
        </Grid>
        <Grid item md={9} xs={12}>
          <Box className={styles.historyContainer}>
            <List>
              <ListItem>
                <span
                  className={
                    language === 'English'
                      ? styles.englishTitle
                      : styles.persianTitle
                  }
                >
                  {language === 'English' ? 'Order History' : 'لیست سفارشات '}
                </span>
              </ListItem>
              <ListItem>
                <OrderHistoryTable
                  language={language}
                  orders={orders}
                  dateSortHandler={dateSortHandler}
                  totalPriceSortHandler={totalPriceSortHandler}
                  dateFlag={dateFlag}
                  totalPriceFlag={totalPriceFlag}
                />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
      <Pagination
        page={userOrders.page}
        size="large"
        className={styles.pagination}
        count={userOrders.totalPages}
        variant="outlined"
        // sx={{
        //   '& .Mui-selected': {
        //     borderColor: styles.primary,
        //     backgroundColor: styles.lightPrimary,
        //   },
        // }}
        onChange={pageHandler}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem {...item} page={pageNumberLabelHandle(item)} />
        )}
      />
    </>
  );
}

export default OrderHistory;

export async function getServerSideProps(context) {
  let result;
  if (context.req.cookies.userInfo) {
    const token = JSON.parse(context.req.cookies.userInfo).token;

    const data = await apiCall(
      `${ordersUrl}/mine?${queryString.stringify(context.query)}`,
      'get',
      {},
      {
        'x-auth-token': token,
      }
    );
    result = data.data;
  }
  if (!context.req.cookies.userInfo) {
    return {
      redirect: {
        destination: `${loginUrl}?redirect=${orderHistoryUrl}`,
        permanent: false,
      },
    };
  }

  return {
    props: { userOrders: result },
  };
}
