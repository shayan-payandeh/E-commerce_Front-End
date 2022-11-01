import routerPush from '@/utils/routerPush';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import styles from '@/styles/component/FilterSection.module.scss';
import { Store } from '@/utils/Store';

function valuetext(value) {
  return `${value}K`;
}

const SliderFilterSectionMobile = () => {
  const router = useRouter();
  const [price, setPrice] = useState([10, 99]);
  const minPriceDistance = 10;
  const { state } = useContext(Store);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const minPrice = [
      Math.min(newValue[0], price[1] - minPriceDistance),
      price[1],
    ];
    const maxPrice = [
      price[0],
      Math.max(newValue[1], price[0] + minPriceDistance),
    ];

    if (activeThumb === 0) {
      setPrice(minPrice);
      const x = minPrice.map((item) => item * 1000);
      router.query.price = x.join('-');
      routerPush(router);
    } else {
      setPrice(maxPrice);
      const x = maxPrice.map((item) => item * 1000);
      router.query.price = x.join('-');
      routerPush(router);
    }
  };
  return (
    <>
      <Box className={styles.silderFilterSectionMobile}>
        <Accordion
          defaultExpanded={false}
          dir={language === 'English' ? 'ltr' : 'rtl'}
        >
          <AccordionSummary
            style={{
              backgroundColor: '#f5f5f5',
              width: '100%',
              padding: '4px 10px',
            }}
            id="panel1a-header"
            expandIcon={<ExpandMore />}
          >
            <Typography>
              <span>{language === 'English' ? 'Price' : 'قیمت'}</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={language === 'English' ? {} : { padding: '30px 25px' }}
          >
            <Slider
              getAriaLabel={() => 'Minimum distance'}
              min={10}
              value={price}
              onChange={handleChange1}
              valueLabelDisplay="on"
              valueLabelFormat={valuetext}
              disableSwap
              sx={{
                fontSize: '12px',
                color: '#37474F',
                '& .MuiSlider-thumb': {
                  height: 20,
                  width: 20,
                  backgroundColor: '#37474F',
                  border: '7px solid currentColor',
                  '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: 'inherit',
                  },
                  '&:before': {
                    display: 'none',
                  },
                },
              }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SliderFilterSectionMobile;
