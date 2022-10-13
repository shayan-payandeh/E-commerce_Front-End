import { useRouter } from 'next/router';
import AppBreadcrumb from '@/component/AppBreadcrumb';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Rating,
  Typography,
} from '@mui/material';
import { api, cartUrl, priceUnit, productsUrl } from '@/utils/values';
import priceConvetor from '@/utils/priceConvertor';
import fakePrice from '@/utils/fakePrice';
import styles from '@/styles/ProductSlug.module.scss';
import { apiCall } from '@/utils/apiCall';

function ProductScreen({ product }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const array = [{ name: 'products', link: '/products' }];
  const persianArray = [{ name: 'محصولات', link: '/products' }];
  const currentPage = router.query.slug;
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;
  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  const addToCartHandler = () => {
    closeSnackbar();
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (quantity > product.countInStock) {
      closeSnackbar();
      const errorMessage =
        language === 'English'
          ? 'Sorry. Product is out of stock'
          : 'محصول مورد نظر با این تعداد موجود نیست';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push(`${cartUrl}`);
  };

  if (router.isFallback) return <div>loading ...</div>;

  return (
    <>
      <AppBreadcrumb
        array={language === 'English' ? array : persianArray}
        currentPage={currentPage}
      />
      <Grid
        container
        spacing={2}
        direction={language === 'English' ? 'row' : 'row-reverse'}
        className={styles.container}
      >
        <Grid item md={6} xs={12}>
          <Box className={styles.imageBox}>
            <Image
              src={product.image}
              width={470}
              height={470}
              alt={product.name}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            className={styles.infoBox}
            dir={language === 'English' ? 'ltr' : 'rtl'}
          >
            <List>
              <ListItem className={styles.listItem}>
                <Typography className={styles.text}>
                  <strong>{product.name}</strong>
                </Typography>
              </ListItem>
              <ListItem className={styles.listItemFirst}>
                <Typography className={styles.text}>
                  <em>{product.description}</em>
                </Typography>
              </ListItem>
              <ListItem className={styles.listItemSecond}>
                <Rating value={3} name="rating" />
              </ListItem>
              <ListItem className={styles.listItemThird}>
                <Typography
                  className={
                    language === 'English'
                      ? styles.englishText
                      : styles.persianText
                  }
                >
                  <span>
                    {language === 'English'
                      ? `$${product.price / 1000}.00`
                      : `${priceConvetor(product.price)}${priceUnit}`}
                  </span>
                </Typography>
                &nbsp; &nbsp;
                <Typography className={styles.textThrough}>
                  <span>
                    {language === 'English'
                      ? `$${
                          parseInt(product.price / 1000) +
                          Math.ceil(parseInt(product.price / 1000) / 3)
                        }.00`
                      : ` ${priceConvetor(
                          fakePrice(product.price)
                        )} ${priceUnit}`}
                  </span>
                </Typography>
              </ListItem>
              <ListItem className={styles.listItemForth}>
                <Typography className={styles.text}>
                  {language === 'English' ? 'Brand :' : 'برند :'} &nbsp;
                </Typography>
                <Typography>{product.brand.name}</Typography>
              </ListItem>
              <ListItem className={styles.listItemFifth}>
                <Typography className={styles.text}>
                  {language === 'English' ? 'Category :' : 'دسته :'} &nbsp;
                </Typography>
                <Typography>{product.category.name}</Typography>
              </ListItem>
              <ListItem className={styles.listItemFifth}>
                <Typography className={styles.text}>
                  {language === 'English' ? 'Availablity :' : 'وضعیت :'} &nbsp;
                </Typography>
                <Typography>
                  {language === 'English'
                    ? product.countInStock > 0
                      ? 'In Stock'
                      : 'Out of Stock'
                    : product.countInStock > 0
                    ? 'موجود'
                    : 'ناموجود'}
                </Typography>
              </ListItem>
              <ListItem className={styles.listItemSixth}>
                <Button onClick={addToCartHandler} className={styles.addButton}>
                  {language === 'English'
                    ? 'Add To Cart'
                    : 'افزودن به سبد خرید '}
                </Button>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductScreen;

export async function getStaticPaths() {
  const allProducts = await apiCall(productsUrl, 'get');
  const paths = allProducts.data.data.docs.map((product) => ({
    params: { slug: product.slug },
  }));
  // const paths = [
  //   { params: { slug: 'fit-shirt' } },
  //   { params: { slug: 'slim-shirt' } },
  //   { params: { slug: 'golf-pants' } },
  // ];
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const { data } = await apiCall(`${api}${productsUrl}/${slug}`);
  return { props: { product: data } };
}
