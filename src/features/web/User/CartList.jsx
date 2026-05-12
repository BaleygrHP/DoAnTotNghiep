import React from 'react';
import { Helmet } from 'react-helmet';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import NavUser from 'components/web/NavUserPage/NavUser';
import './style.css';

const Cartlist = function () {
  return (
    <>
      <Helmet>
        <title>Quản lý địa chỉ</title>
      </Helmet>
      <main id="main" className="web-user-page web-page web-page--with-header page-content clearfix">
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div className="web-container">
          <NavUser />
        </div>
        <div className="primary-content">
          <div className="account-overview">
            <div className="page-header">
              <h1>
                <span className="subtitle">My account</span> <span className="title">Overview</span>
              </h1>
            </div>
            <div className="web-container account-overview-infos">
              <div className="web-user-page__overview-card wishlist-overview grid-tile tiles-container">
                <div className="area-title">Mục yêu thích</div>
                Mục yêu thích trống
                <div className="form-row form-row-button">
                  <a className="form-button" href="/us/en-US/wishlist">
                    Xem mục yêu thích
                  </a>
                </div>
              </div>
            </div>
          </div>
          <CustomerSp />
        </div>
      </main>
    </>
  );
};

export default Cartlist;
