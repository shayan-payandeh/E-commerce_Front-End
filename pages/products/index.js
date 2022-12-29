import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import FilterSection from '@/component/filter/FilterSection';
import ProductCard from '@/component/card/Card';
import { Grid, Pagination, PaginationItem } from '@mui/material';
import FilterSectionMobile from '@/component/filter/FilterSectionMobile';
import styles from '@/styles/component/Products.module.scss';
import { api, brandsUrl, categoriesUrl, productsUrl } from '@/utils/values';
import { apiCall } from '@/utils/apiCall';
import queryString from 'query-string';
import routerPush from '@/utils/routerPush';
import pageNumberLabel from '@/utils/pageNumberLabel';
import { motion } from 'framer-motion';
import SliderFilterSection from '@/component/filter/SliderFilterSection';
import SliderFilterSectionMobile from '@/component/filter/SliderFilterSectionMobile';

function Products({ productsInit, categories, brands }) {
  const products = productsInit.docs.length > 0 ? productsInit.docs : [];
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [language, setLanguage] = useState('');
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;
  const productCategories = {
    slug: categories.map((category) => category.name),
  };
  const productBrands = { brand: brands.map((brand) => brand.name) };

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

  const filterHandler = (value, checked, typeName) => {
    if (checked) {
      router.query[typeName] =
        router.query[typeName] && typeName !== 'price'
          ? router.query[typeName].concat(',', value)
          : value;
      routerPush(router);
    } else {
      const string = router.query[typeName];
      const array = string.split(',');
      for (const i = 0; i < array.length; i++) {
        if (array[i] === value) {
          array.splice(i, 1);
        }
      }
      const x = array.join();
      if (x.length > 0) {
        router.query[typeName] = x;
      } else delete router.query[typeName];
      routerPush(router);
    }
  };

  const pageHandler = (e, value) => {
    window.scrollTo(0, 0);
    router.query.page = value;
    routerPush(router);
  };

  const addToCartHandler = (product, number) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + number : 1;
    if (product.countInStock < quantity && quantity > 0) {
      closeSnackbar();
      const errorMessage =
        language === 'English'
          ? 'Sorry. Product is out of stock'
          : 'محصول مورد نظر با این تعداد موجود نیست';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return;
    } else if (quantity === 0) {
      return dispatch({ type: 'CART_REMOVE_ITEM', payload: product });
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
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
            checkBoxHandler={filterHandler}
            label={language === 'English' ? 'Category' : 'نوع'}
          />
          <FilterSection
            productTypes={productBrands}
            checkBoxHandler={filterHandler}
            label={language === 'English' ? 'Brand' : 'برند'}
          />
          {/* <SliderFilterSection /> */}
          <FilterSectionMobile
            productTypes={productCategories}
            checkBoxHandler={filterHandler}
            label={language === 'English' ? 'Category' : 'نوع'}
          />
          <FilterSectionMobile
            productTypes={productBrands}
            checkBoxHandler={filterHandler}
            label={language === 'English' ? 'Brand' : 'برند'}
          />
          {/* <SliderFilterSectionMobile /> */}
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
              sm={6}
              xs={12}
              key={product.name}
              component={motion.div}
              variants={item}
              whileHover={{ scale: 1.01, transition: 'spring' }}
            >
              <ProductCard
                product={product}
                language={language}
                addToCartHandler={addToCartHandler}
                cartItems={cartItems}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <br /> <br />
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
      productsInit: productsResult.data ? productsResult.data.data : [],
      categories: categoriesResult.data ? categoriesResult.data.data.docs : [],
      brands: brandsResult.data ? brandsResult.data.data.docs : [],
    },
  };
}
