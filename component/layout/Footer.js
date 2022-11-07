import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import styles from '@/styles/component/Footer.module.scss';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import {
  loginUrl,
  productsUrl,
  profileUrl,
  registerUrl,
} from '../../utils/values';

function Footer() {
  const router = useRouter();
  const [language, setLanguage] = useState('');
  const { state } = useContext(Store);
  const [userTruthy, setUserTruthy] = useState(false);

  useEffect(() => {
    setLanguage(state.language);
    state.userInfo ? setUserTruthy(true) : setUserTruthy(false);
  }, []);

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className={styles.footer}>
      <div
        className={'row' + ' ' + styles.mainFooter}
        style={language !== 'English' ? { direction: 'rtl' } : {}}
      >
        <div
          className={'row col-md-4 col-sm-12 col-xs-12' + ' ' + styles.column}
        >
          <div
            className={`'col-md-12 col-sm-12 col-xs-12 ' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            {language === 'English' ? 'Links :' : ' لینک ها :'}
          </div>
          <div
            className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            {router.pathname !== '/' && (
              <Link href={'/'}>
                <a style={{ textDecoration: 'none', color: '#ffff' }}>
                  {language === 'English' ? 'Home' : 'صفحه اصلی'}
                </a>
              </Link>
            )}
            {router.pathname === '/' && (
              <span onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                {language === 'English' ? 'Home' : 'صفحه اصلی'}
              </span>
            )}
          </div>
          <div
            className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            {router.pathname !== `${productsUrl}` && (
              <Link href={`${productsUrl}`}>
                <a style={{ textDecoration: 'none', color: '#ffff' }}>
                  {language === 'English' ? 'Products' : 'محصولات'}
                </a>
              </Link>
            )}
            {router.pathname === `${productsUrl}` && (
              <span onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                {language === 'English' ? 'Products' : 'محصولات'}
              </span>
            )}
          </div>
          {!userTruthy && (
            <div
              className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
                language === 'English'
                  ? styles.columnListItemsContainerEnglish
                  : styles.columnListItemsContainerPersian
              } `}
            >
              <Link href={`${registerUrl}`}>
                <a style={{ textDecoration: 'none', color: '#fff' }}>
                  {language === 'English' ? 'ًRegister' : 'ثبت نام'}
                </a>
              </Link>
              {' - '}
              <Link href={`${loginUrl}`}>
                <a style={{ textDecoration: 'none', color: '#fff' }}>
                  {language === 'English' ? 'Login' : 'ورود به سایت'}
                </a>
              </Link>
            </div>
          )}
          {userTruthy && (
            <div
              className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
                language === 'English'
                  ? styles.columnListItemsContainerEnglish
                  : styles.columnListItemsContainerPersian
              } `}
            >
              {router.pathname !== `${profileUrl}` && (
                <Link href={`${profileUrl}`}>
                  <a style={{ textDecoration: 'none', color: '#fff' }}>
                    {language === 'English' ? 'Profile' : 'پروفایل'}
                  </a>
                </Link>
              )}
              {router.pathname === `${profileUrl}` && (
                <span onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                  {language === 'English' ? 'Profile' : 'پروفایل'}
                </span>
              )}
            </div>
          )}
        </div>
        {/* --- */}
        <div
          className={'row col-md-4 col-sm-12 col-xs-12' + ' ' + styles.column}
        >
          <div
            className={`'col-md-12 col-sm-12 col-xs-12 ' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            {language === 'English' ? 'Contact us :' : 'تماس با ما :'}
          </div>

          <div
            className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            <span>
              {language === 'English'
                ? 'Address: Bandarabbas - Pasdaran blvd - Goharan street'
                : 'آدرس : بندرعباس - بلوار پاسدان - خیابان گوهران '}
            </span>
          </div>
          <div
            className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            <span>
              {language === 'English'
                ? 'Phone: 989308177569'
                : 'شماره تماس : 09308177569'}
            </span>
          </div>
          <br />
          <div
            className={`'col-md-12 col-sm-12 col-xs-12 pr-2' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            <span>
              {language === 'English'
                ? 'Email : shayan.@gmail.com'
                : 'ایمیل : shayan.iker@gmail.com'}
            </span>
          </div>
        </div>
        <div className={'col-md-4 col-sm-12 col-xs-12' + ' ' + styles.column}>
          <div
            className={`'col-md-12 col-sm-12 col-xs-12 ' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            <span></span>
          </div>
          <br />
          <div
            className={`'col-md-12 col-sm-12 col-xs-12' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            <span>
              {language === 'English'
                ? '- Fast Delivery'
                : '- ارسال به سراسر کشور'}
            </span>
          </div>
          <br />

          <div
            className={`'col-md-12 col-sm-12 col-xs-12 ' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            <span>
              {language === 'English'
                ? '- 7 Days guarantee'
                : '- هفت روز ضمانت بازگشت'}
            </span>
          </div>
          <br />
          <div
            c
            className={`'col-md-12 col-sm-12 col-xs-12' ${
              language === 'English'
                ? styles.columnListItemsContainerEnglish
                : styles.columnListItemsContainerPersian
            } `}
          >
            <span>
              {language === 'English'
                ? '- Online support'
                : ' - پشتیبانی آنلاین'}
            </span>
          </div>
        </div>
      </div>
      <div
        className={
          'col-md-12 col-xs-12  center-md center-sm center-xs' +
          ' ' +
          styles.rightContainer
        }
      >
        {language === 'English'
          ? ' All rights reserved. Shayan@ '
          : 'تمام حقوق مادی و معنوی متعلق به فروشگاه شایان می باشد.'}
      </div>
    </footer>
  );
}

export default Footer;
