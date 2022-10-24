import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import styles from '@/styles/component/Card.module.scss';
import priceConvertor from '@/utils/priceConvertor';
import { priceUnit, productsUrl } from '@/utils/values';
import { useEffect, useState } from 'react';

function ProductCard({ product, language, addToCartHandler, cartItems }) {
  const [cartFlag, setCartFlag] = useState(true);
  const theItem = cartItems.find((item) => item.slug === product.slug);

  useEffect(() => {
    if (theItem) {
      setCartFlag(false);
    } else setCartFlag(true);
  }, [cartItems]);
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
        {cartFlag && (
          <Button
            onClick={() => addToCartHandler(product, 1)}
            fullWidth
            variant="contained"
            className={styles.addButton}
          >
            <span style={{ fontSize: '13px' }}>
              {language === 'English' ? 'Add To Cart' : 'افزودن به سبد خرید'}
            </span>
          </Button>
        )}
        {!cartFlag && theItem && (
          <div
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            <Button
              onClick={() => addToCartHandler(product, -1)}
              style={{
                backgroundColor: styles.primary,
                color: 'white',
                fontSize: '16px',
              }}
            >
              -
            </Button>
            <TextField
              inputProps={{ style: { textAlign: 'center', padding: '9px' } }}
              value={theItem.quantity}
            />
            <Button
              onClick={() => addToCartHandler(product, 1)}
              style={{
                backgroundColor: styles.primary,
                color: 'white',
                fontSize: '16px',
              }}
            >
              +
            </Button>
          </div>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
