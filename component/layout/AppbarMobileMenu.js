import { CloseRounded, MenuRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import styles from '@/styles/component/Appbar.module.scss';
import { contactUrl, productsUrl } from '@/utils/values';
import { Store } from '@/utils/Store';

function AppbarMobileMenu() {
  const [expandMenu, setExpandMenu] = useState(false);
  const { state, dispatch } = useContext(Store);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLanguage(state.language);
  }, []);

  const clickHandler = () => {
    setExpandMenu((prev) => !prev);
    setExpandMenu(false);
  };
  return (
    <>
      <header color="default" className={styles.secondeNavbarMobile}>
        <Accordion
          defaultExpanded={false}
          style={{ backgroundColor: styles.primary }}
        >
          <AccordionSummary
            style={
              expandMenu
                ? {
                    backgroundColor: styles.lightPrimary,
                  }
                : { backgroundColor: '#fff' }
            }
            onClick={() => setExpandMenu((prev) => !prev)}
            expandIcon={!expandMenu ? <MenuRounded /> : <CloseRounded />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          ></AccordionSummary>
          <AccordionDetails>
            <List
              style={{
                padding: 0,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <ListItem>
                <NextLink href={'/'} passHref>
                  <Typography
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      color: '#fff',
                    }}
                  >
                    <span>{language === 'English' ? 'Home' : 'خانه'}</span>
                  </Typography>
                </NextLink>
              </ListItem>
              <ListItem>
                <Divider
                  style={{
                    width: '100%',
                    backgroundColor: '#dedede',
                    margin: '0 auto',
                  }}
                />
              </ListItem>
              <ListItem>
                <NextLink href={`${productsUrl}`} passHref>
                  <Typography
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      color: '#fff',
                    }}
                  >
                    <span>
                      {language === 'English' ? 'Products' : 'محصولات'}
                    </span>
                  </Typography>
                </NextLink>
              </ListItem>
              <ListItem>
                <Divider
                  style={{
                    width: '100%',
                    backgroundColor: '#dedede',
                    margin: '0 auto',
                  }}
                />
              </ListItem>
              <ListItem>
                <NextLink href={`${contactUrl}`} passHref>
                  <Typography
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      color: '#fff',
                    }}
                  >
                    <span>
                      {language === 'English' ? 'contact' : 'ارتباط با ما'}
                    </span>
                  </Typography>
                </NextLink>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </header>
    </>
  );
}

export default AppbarMobileMenu;
