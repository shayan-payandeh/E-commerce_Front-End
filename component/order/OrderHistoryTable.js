import ModalButton from '../ModalButton';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import priceConvetor from '@/utils/priceConvertor';
import { ordersUrl, priceUnit } from '@/utils/values';
import styles from '@/styles/component/OrderHistoryTable.module.scss';

function OrderHistoryTable({
  language,
  orders,
  dateSortHandler,
  totalPriceSortHandler,
  dateFlag,
  totalPriceFlag,
}) {
  return (
    <>
      <TableContainer>
        <Table
          className={styles.table}
          dir={language === 'English' ? 'ltr' : 'rtl'}
        >
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>{language === 'English' ? 'ID' : 'شناسه'}</strong>
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>{language === 'English' ? 'DATE' : 'تاریخ'}</strong>
                <TableSortLabel
                  active
                  direction={dateFlag}
                  onClick={() => dateSortHandler()}
                ></TableSortLabel>
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>{language === 'English' ? 'TOTAL' : 'مبلغ'}</strong>
                <TableSortLabel
                  active
                  direction={totalPriceFlag}
                  onClick={() => totalPriceSortHandler()}
                />
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                <strong>
                  {language === 'English' ? 'PAID' : 'وضعیت پرداخت'}
                </strong>
              </TableCell>
              <TableCell
                className={styles.tableHeaderCell}
                align="center"
              ></TableCell>
              <TableCell
                className={styles.tableHeaderCell}
                align="center"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className={styles.tableBodyCell} align="center">
                  {order._id.substring(20, 24)}
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <span>
                    {language === 'English'
                      ? order.createdAt
                      : order.persianCreatedAt}
                  </span>
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <span>
                    {language === 'English'
                      ? `$${order.totalPrice}`
                      : `${priceConvetor(order.totalPrice)}${priceUnit}`}
                  </span>
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center">
                  <span>
                    {language === 'English'
                      ? order.isPaid
                        ? `paid at`
                        : 'not paid'
                      : order.isPaid
                      ? `پرداخت شده`
                      : 'عدم پرداخت'}
                  </span>
                </TableCell>

                <TableCell className={styles.tableBodyCell} align="center">
                  <NextLink href={`${ordersUrl}/${order._id}`} passHref>
                    <Button className={styles.detailButton} variant="contained">
                      <span>
                        {language === 'English' ? 'Details' : 'جزئیات'}
                      </span>
                    </Button>
                  </NextLink>
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  <ModalButton order={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

// export default OrderHistoryTable;
export default dynamic(() => Promise.resolve(OrderHistoryTable), {
  ssr: false,
});
