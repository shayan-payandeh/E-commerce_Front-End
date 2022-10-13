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
  const { state } = useContext(Store);
  const [userTruthy, setUserTruthy] = useState(false);

  useEffect(() => {
    state.userInfo ? setUserTruthy(true) : setUserTruthy(false);
  }, []);

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className={styles.footer}>
      <div className={'row' + ' ' + styles.mainFooter}>
        <div
          className={'row col-md-4 col-sm-12 col-xs-12' + ' ' + styles.column}
        >
          <div
            className={
              'col-md-12 col-sm-12 col-xs-12' +
              ' ' +
              styles.columnTitleContainer
            }
          >
            لینک ها :
          </div>
          <div
            className={
              'col-md-12 col-sm-12 col-xs-12 pr-2' +
              ' ' +
              styles.columnListItemsContainer
            }
          >
            {router.pathname !== '/' && (
              <Link href={'/'}>
                <a style={{ textDecoration: 'none', color: '#ffff' }}>
                  صفحه اصلی
                </a>
              </Link>
            )}
            {router.pathname === '/' && (
              <span onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                {' '}
                صفحه اصلی
              </span>
            )}
          </div>
          <div
            className={
              'col-md-12 col-sm-12 col-xs-12 pr-2' +
              ' ' +
              styles.columnListItemsContainer
            }
          >
            {router.pathname !== `${productsUrl}` && (
              <Link href={`${productsUrl}`}>
                <a style={{ textDecoration: 'none', color: '#ffff' }}>
                  محصولات
                </a>
              </Link>
            )}
            {router.pathname === `${productsUrl}` && (
              <span onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                {' '}
                محصولات
              </span>
            )}
          </div>
          {!userTruthy && (
            <div
              className={
                'col-md-12 col-sm-12 col-xs-12 pr-2' +
                ' ' +
                styles.columnListItemsContainer
              }
            >
              <Link href={`${registerUrl}`}>
                <a style={{ textDecoration: 'none', color: '#ffff' }}>
                  {' '}
                  ثبت نام{' '}
                </a>
              </Link>
              {' - '}
              <Link href={`${loginUrl}`}>
                <a style={{ textDecoration: 'none', color: '#ffff' }}>
                  ورود به سایت
                </a>
              </Link>
            </div>
          )}
          {userTruthy && (
            <div
              className={
                'col-md-12 col-sm-12 col-xs-12 pr-2' +
                ' ' +
                styles.columnListItemsContainer
              }
            >
              {router.pathname !== `${profileUrl}` && (
                <Link href={`${profileUrl}`}>
                  <a style={{ textDecoration: 'none', color: '#ffff' }}>
                    پروفایل
                  </a>
                </Link>
              )}
              {router.pathname === `${profileUrl}` && (
                <span onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                  {' '}
                  پروفایل
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
            className={
              'col-md-12 col-sm-12 col-xs-12' +
              ' ' +
              styles.columnTitleContainer
            }
          >
            تماس با ما :
          </div>

          <div
            className={
              'col-md-12 col-sm-12 col-xs-12 pr-2' +
              ' ' +
              styles.columnListItemsContainer
            }
          >
            <span>آدرس : بندرعباس - بلوار پاسدان - خیابان گوهران - پلاک 3</span>
          </div>
          <div
            className={
              'col-md-12 col-sm-12 col-xs-12 pr-2' +
              ' ' +
              styles.columnListItemsContainer
            }
          >
            <span> شماره تماس : 09308177569</span>
          </div>
          <br />
          <div
            className={
              'col-md-12 col-sm-12 col-xs-12 pr-2' +
              ' ' +
              styles.columnListItemsContainer
            }
          >
            <span> ایمیل : shayan.iker@gmail.com</span>
          </div>
        </div>
        <div className={'col-md-4 col-sm-12 col-xs-12' + ' ' + styles.column}>
          <div
            className={
              'col-md-12 col-sm-12 col-xs-12' +
              ' ' +
              styles.columnListItemsContainer
            }
          >
            <span></span>
          </div>
          <br />
          <div
            className={
              'col-md-12 col-sm-12 col-xs-12' +
              ' ' +
              styles.columnListItemsContainer
            }
          >
            <span>- ارسال به سراسر کشور</span>
          </div>
          <br />

          <div
            className={
              'col-md-12 col-sm-12 col-xs-12' +
              ' ' +
              styles.columnListItemsContainer
            }
          >
            <span>- هفت روز ضمانت بازگشت</span>
          </div>
          <br />
          <div
            className={
              'col-md-12 col-sm-12 col-xs-12' +
              ' ' +
              styles.columnListItemsContainer
            }
          >
            <span>- پشتیبانی آنلاین</span>
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
        {/* All rights reserved. Shayan@ */}
        تمام حقوق مادی و معنوی متعلق به فروشگاه شایان می باشد.
      </div>
    </footer>
  );
}

export default Footer;
