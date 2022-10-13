import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import styles from '@/styles/component/Card.module.scss';
import priceConvertor from '@/utils/priceConvertor';
import { priceUnit, productsUrl } from '@/utils/values';

function ProductCard({ product, language, addToCartHandler }) {
  return (
    <Card className={styles.card}>
      <NextLink href={`${productsUrl}/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          />
          <CardContent>
            <Grid
              container
              direction={language === 'English' ? 'row' : 'row-reverse'}
            >
              <Grid item md={6} xs={6}>
                <Typography align={language === 'English' ? 'left' : 'right'}>
                  <span>{product.name}</span>
                </Typography>
              </Grid>
              {language !== 'English' && (
                <Grid item container md={6} xs={6}>
                  <Grid item md={6} xs={6}>
                    <span
                      style={{
                        fontSize: '13px',
                        margin: '0',
                      }}
                    >
                      {priceUnit}
                    </span>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <span>{priceConvertor(product.price)}</span>
                  </Grid>
                </Grid>
              )}
              {language === 'English' && (
                <Grid item md={6} xs={6}>
                  <Typography align="right">
                    {'$'}
                    {product.price}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions style={{ padding: 0 }}>
        <Button
          onClick={() => addToCartHandler(product)}
          fullWidth
          variant="contained"
          className={styles.addButton}
        >
          <span style={{ fontSize: '13px' }}>
            {language === 'English' ? 'Add To Cart' : 'افزودن به سبد خرید'}
          </span>
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
