import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NextLink from 'next/link';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { productsUrl } from '@/utils/values';
import styles from '@/styles/component/CardSlider.module.scss';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function CardSlider({ products, title }) {
  return (
    <>
      {products && (
        <div className={styles.carouselContainer}>
          <div className={styles.titleContainer}>
            <span>{title}</span>
          </div>
          <Carousel
            arrows={true}
            removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
            showDots={false}
            responsive={responsive}
            className={styles.carousel}
            autoPlay={true}
            infinite={true}
          >
            {products.map((product) => (
              <NextLink
                key={product._id}
                href={`${productsUrl}/${product.slug}`}
                passHref
              >
                <Card className={styles.carouselCard}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      style={{
                        height: '250px',
                        width: '100%',
                        objectFit: 'fill',
                      }}
                      image={product.image}
                    />
                    <CardContent>
                      <Typography>
                        <strong>{product.name}</strong>
                      </Typography>
                      <br />
                      <Typography color="textSecondary">
                        <em>{product.description}</em>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </NextLink>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
}

export default CardSlider;
