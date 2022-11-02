import { Box, Grid } from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';
import pantsModel2 from '@/public/images/pantsModel2.jpg';
import shirtModel1 from '@/public/images/shirtModel1.jpg';
import zaraBrand from '@/public/images/zaraBrand.jpg';
import raymondBrand from '@/public/images/raymondBrand.jpg';
import Slideshow from '@/component/slideShow';
import CardSlider from '@/component/card/CardSlider';
import styles from '@/styles/Home.module.scss';
import { api, productsUrl } from '@/utils/values';
import { useContext, useEffect, useState } from 'react';
import { newestProducts } from '@/utils/limitedProducts';
import { apiCall } from '@/utils/apiCall';
import { Store } from '@/utils/Store';

function Home({ allProducts, bestSelling }) {
  const [newProducts, setNewProducts] = useState();
  const [language, setLanguage] = useState('');
  const { state } = useContext(Store);

  useEffect(() => {
    setLanguage(state.language);
    const products = newestProducts(allProducts);
    setNewProducts(products);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item container md={4} xs={12} spacing={1}>
          <Grid item md={12} xs={12}>
            <NextLink href={`${productsUrl}?slug=Shirts`} passHref>
              <Box
                className={styles.categoryContainer}
                style={{ marginTop: `40px` }}
              >
                <Image
                  className={styles.categoryImage}
                  src={shirtModel1}
                  layout="responsive"
                  alt="shirts"
                  width={610}
                  height={330}
                />
              </Box>
            </NextLink>
          </Grid>
          <Grid item md={12} xs={12}>
            <NextLink href={`${productsUrl}?slug=Pants`} passHref>
              <Box className={styles.categoryContainer}>
                <Image
                  className={styles.categoryImage}
                  src={pantsModel2}
                  alt="pants"
                  layout="responsive"
                  width={610}
                  height={330}
                />
              </Box>
            </NextLink>
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          <Slideshow />
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: '50px' }}>
        <Grid item md={6} xs={12}>
          <NextLink href={`${productsUrl}?brand=Raymond`} passHref>
            <Box className={styles.categoryContainer}>
              <Image
                className={styles.categoryImage}
                src={raymondBrand}
                layout="responsive"
                alt="shirts"
                width={610}
                height={284}
              />
            </Box>
          </NextLink>
        </Grid>
        <Grid item md={6} xs={12}>
          <NextLink href={`${productsUrl}?brand=Zara`} passHref>
            <Box className={styles.categoryContainer}>
              <Image
                className={styles.categoryImage}
                src={zaraBrand}
                alt="pants"
                layout="responsive"
                width={610}
                height={284}
              />
            </Box>
          </NextLink>
        </Grid>
      </Grid>
      <CardSlider
        products={newProducts}
        title={language === 'English' ? 'Newest' : 'جدیدترین ها'}
      />
      <CardSlider
        products={bestSelling}
        title={language === 'English' ? 'BestSelling' : 'پرفروش ترین ها'}
      />
    </>
  );
}

export default Home;

export async function getStaticProps() {
  const productsResult = await apiCall(`${productsUrl}`, 'get');
  const products = productsResult.data ? productsResult.data.data.docs : [];
  const bestSellingResult = await apiCall(
    `${api}${productsUrl}/bestselling`,
    'get'
  );
  const bestSelling = bestSellingResult.data ? bestSellingResult.data : [];
  return {
    props: {
      allProducts: products,
      bestSelling: bestSelling,
    },
  };
}
