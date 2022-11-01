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
                  <span style={{ fontSize: '2.2vh' }}>{product.name}</span>
                </Typography>
              </Grid>
              {language !== 'English' && (
                <Grid item container md={6} xs={6}>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      fontSize: '2.2vh',
                    }}
                  >
                    <div>{priceUnit}</div>
                    &nbsp;
                    <div>{priceConvertor(product.price)}</div>
                  </div>
                </Grid>
              )}
              {language === 'English' && (
                <Grid item md={6} xs={6}>
                  <Typography align="right">
                    <span style={{ fontSize: '2.3vh' }}>
                      {'$'}
                      {product.price}
                    </span>
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
              justifyContent: 'space-between',
            }}
          >
            <Button
              onClick={() => addToCartHandler(product, -1)}
              style={{
                backgroundColor: styles.primary,
                color: 'white',
                fontSize: '16px',
                width: '23%',
              }}
            >
              -
            </Button>
            <div style={{ width: '54%', backgroundColor: 'pink' }}>
              <TextField
                style={{ width: '100%' }}
                inputProps={{
                  style: {
                    border: `solid 1px ${styles.primary}`,
                    padding: '9px 0',
                    backgroundColor: '#f8f8f8',
                    textAlign: 'center',
                  },
                }}
                value={theItem.quantity}
              />
            </div>
            <Button
              onClick={() => addToCartHandler(product, 1)}
              style={{
                backgroundColor: styles.primary,
                color: 'white',
                fontSize: '16px',
                width: '23%',
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
