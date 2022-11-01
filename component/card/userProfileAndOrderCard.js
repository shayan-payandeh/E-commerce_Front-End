import { Card, List, ListItem, ListItemText } from '@mui/material';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import styles from '@/styles/component/ProfileAndOrderCard.module.scss';
import { orderHistoryUrl, profileUrl } from '@/utils/values';

function UserProfileAndOrderCard({ pathname }) {
  const [language, setLanguage] = useState('');
  const { state } = useContext(Store);

  useEffect(() => {
    setLanguage(state.language);
  }, [state.language]);

  return (
    <>
      <Card
        className={`${styles.section} ${
          language === 'English'
            ? styles.sectionExtraEnglish
            : styles.sectionExtraPersian
        }`}
      >
        <List style={{ padding: 0 }}>
          <NextLink href={`${profileUrl}`} passHref>
            <ListItem
              style={{ paddingTop: '20px', paddingBottom: '20px' }}
              selected={pathname === `${profileUrl}` ? true : false}
              className={
                pathname === `${profileUrl}` ? styles.activeItem : styles.item
              }
              button
              component="a"
            >
              {language === 'English' && (
                <ListItemText primary="User Profile" />
              )}
              {language !== 'English' && (
                <span
                  style={{
                    marginRight: 0,
                    marginLeft: 'auto',
                    fontSize: '14px',
                  }}
                >
                  {'پروفایل'}
                </span>
              )}
            </ListItem>
          </NextLink>
          <NextLink href={`${orderHistoryUrl}`} passHref>
            <ListItem
              style={{ paddingTop: '20px', paddingBottom: '20px' }}
              selected={pathname === `${orderHistoryUrl}` ? true : false}
              className={
                pathname === `${orderHistoryUrl}`
                  ? styles.activeItem
                  : styles.item
              }
              button
              component="a"
            >
              {language === 'English' && (
                <ListItemText primary="Order History" />
              )}
              {language !== 'English' && (
                <span
                  style={{
                    marginRight: 0,
                    marginLeft: 'auto',
                    fontSize: '14px',
                  }}
                >
                  {'تاریخچه خرید '}
                </span>
              )}
            </ListItem>
          </NextLink>
        </List>
      </Card>
    </>
  );
}

export default UserProfileAndOrderCard;
