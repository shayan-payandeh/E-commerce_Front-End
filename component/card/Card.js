import {
  Box,
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
        <CardActionArea className={styles.cardAction}>
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
                <Typography
                  className={styles.productName}
                  align={language === 'English' ? 'left' : 'right'}
                >
                  <span>{product.name}</span>
                </Typography>
              </Grid>
              {language !== 'English' && (
                <Grid item container md={6} xs={6}>
                  <div className={styles.priceContainer}>
                    <div>{priceUnit}</div>
                    &nbsp;
                    <div>{priceConvertor(product.price)}</div>
                  </div>
                </Grid>
              )}
              {language === 'English' && (
                <Grid item md={6} xs={6}>
                  <Typography align="right">
                    <span>{`$${product.price}`}</span>
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
            <span>
              {language === 'English' ? 'Add To Cart' : 'افزودن به سبد خرید'}
            </span>
          </Button>
        )}
        {!cartFlag && theItem && (
          <Box className={styles.updateButtonContainer}>
            <Button
              className={styles.updateButton}
              onClick={() => addToCartHandler(product, -1)}
            >
              -
            </Button>
            <Box className={styles.textFieldContainer}>
              <TextField
                inputProps={{ className: styles.theTextField }}
                value={theItem.quantity}
              />
            </Box>
            <Button
              className={styles.updateButton}
              onClick={() => addToCartHandler(product, 1)}
            >
              +
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
