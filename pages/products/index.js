import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import FilterSection from '@/component/filter/FilterSection';
import ProductCard from '@/component/card/Card';
import { Grid, Pagination, PaginationItem } from '@mui/material';
import FilterSectionMobile from '@/component/filter/FilterSectionMobile';
import styles from '@/styles/component/Products.module.scss';
import {
  api,
  brandsUrl,
  cartUrl,
  categoriesUrl,
  productsUrl,
} from '@/utils/values';
import { apiCall } from '@/utils/apiCall';
import queryString from 'query-string';
import routerPush from '@/utils/routerPush';
import pageNumberLabel from '@/utils/pageNumberLabel';
import { motion } from 'framer-motion';

function Products({ productsInit, categories, brands }) {
  const products = productsInit.docs;
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [language, setLanguage] = useState('');
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;
  const productCategories = categories.map((category) => category.name);
  const productBrands = brands.map((brand) => brand.name);

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const categoryFilterHandler = (value, checked) => {
    if (checked) {
      router.query.slug = value;
      routerPush(router);
    } else {
      delete router.query.slug;
      routerPush(router);
    }
  };

  const brandFilterHandler = (value, checked) => {
    if (checked) {
      router.query.brand = value;
      routerPush(router);
    } else {
      delete router.query.brand;
      routerPush(router);
    }
  };

  const pageHandler = (e, value) => {
    window.scrollTo(0, 0);
    router.query.page = value;
    routerPush(router);
  };

  const addToCartHandler = (product) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
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

  const pageNumberLabelHandle = (item) => {
    const pageNumber = pageNumberLabel(item, language);
    return pageNumber;
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        direction={language === 'English' ? 'row' : 'row-reverse'}
        style={{ padding: '0px', marginTop: '20px' }}
      >
        <Grid item xs={12} md={3}>
          <FilterSection
            productTypes={productCategories}
            checkBoxHandler={categoryFilterHandler}
            label={language === 'English' ? 'Category' : 'نوع'}
          />
          <FilterSection
            productTypes={productBrands}
            checkBoxHandler={brandFilterHandler}
            label={language === 'English' ? 'Brand' : 'برند'}
          />
          <FilterSectionMobile
            productTypes={productCategories}
            checkBoxHandler={categoryFilterHandler}
            label={language === 'English' ? 'Category' : 'نوع'}
          />
          <FilterSectionMobile
            productTypes={productBrands}
            checkBoxHandler={brandFilterHandler}
            label={language === 'English' ? 'Brand' : 'برند'}
          />
        </Grid>

        <Grid
          item
          container
          xs={12}
          md={9}
          spacing={2}
          direction={language === 'English' ? 'row-reverse' : 'row'}
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <Grid
              item
              md={4}
              xs={12}
              key={product.name}
              component={motion.div}
              variants={item}
              whileHover={{ scale: 1.02, transition: 'spring' }}
            >
              <ProductCard
                product={product}
                language={language}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <br />
      <br />
      <Pagination
        page={productsInit.page}
        size="large"
        className={styles.pagination}
        count={productsInit.totalPages}
        variant="outlined"
        sx={{
          '& .Mui-selected': {
            borderColor: styles.primary,
            backgroundColor: styles.lightPrimary,
          },
        }}
        onChange={pageHandler}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem {...item} page={pageNumberLabelHandle(item)} />
        )}
      />
    </>
  );
}
export default Products;

export async function getServerSideProps(context) {
  const productsResult = await apiCall(
    `${api}${productsUrl}?${queryString.stringify(context.query)}`,
    'get'
  );
  const categoriesResult = await apiCall(`${api}${categoriesUrl}`, 'get');
  const brandsResult = await apiCall(`${api}${brandsUrl}`, 'get');
  return {
    props: {
      productsInit: productsResult.data.data,
      categories: categoriesResult.data.result,
      brands: brandsResult.data.result,
    },
  };
}
