import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getListCategory } from 'slice/CategorySlice';
import { removeFromCart } from 'slice/CartSlice';
import { getListProductSearch } from 'slice/ProductListSlice';
import { getTopTrending } from 'slice/SearchSlice';
import { cartItemsCountSelector, cartTotalSelector } from 'slice/Selectors';
import { login, logout } from 'slice/userSlice';
import { listNavUser } from 'constants/index';
import Loader from 'components/fullPageLoading';
import Cart from 'components/web/cart/Cart';
import CategoryParent from 'components/web/category/CategoryParent';
import LoginFormHeader from 'components/web/form/LoginFormHeader';
import Modal from 'components/web/modal/modal';
import Search from 'components/web/search/Search';
import './style.css';

const Header = function () {
  const [hovered, setHovered] = useState(false);
  const [hoveredCart, setHoveredCart] = useState(false);
  const [hoverUser, setHoverUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser._id;
  const dataCategoryList = useSelector((state) => state.categoryList.data);
  const dataTrending = useSelector((state) => state.search.data);
  const dataCart = useSelector((state) => state.cart.dataCart);
  const countProduct = useSelector(cartItemsCountSelector);
  const cartTotal = useSelector(cartTotalSelector);

  useEffect(() => {
    (async () => {
      try {
        if (dataCategoryList.length === 0) {
          setLoading(true);
          const action = getListCategory({
            limit: 50,
            status: true,
          });
          const resultAction = await dispatch(action);
          unwrapResult(resultAction);
        }

        setLoading(true);
        const actionSearch = getListProductSearch();
        const resultActionSearch = await dispatch(actionSearch);
        unwrapResult(resultActionSearch);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dataCategoryList.length, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getTopTrending();
        const resultAction = dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  const handleLogout = () => {
    const action = logout();
    dispatch(action);
    history.push('/');
    window.location.reload();
  };

  const actionDeleteCart = (index) => dispatch(removeFromCart(index));

  const handleLoginFormSubmit = async (values) => {
    try {
      setLoading(true);
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
    } catch (error) {
      console.log('Failed to login:', error);
      history.push('/login');
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="web-header-shell">
      <Loader showLoader={loading} />
      <header className="web-header header" id="header">
        <div className="web-header__top">
          <div className="web-container web-header__top-inner">
            <ul className="web-header__meta header-links">
              <li className="web-header__meta-item">
                <a href="/#" className="web-header__meta-link" title="Location : US $ (Select a Country/Region)">
                  Địa điểm<span>:</span>
                  <strong>VN(VNĐ)</strong>
                </a>
              </li>
              <li className="web-header__meta-item">
                <a className="web-header__meta-link" href="/#">
                  Ngôn ngữ
                  <span className="current">(VN)</span>
                </a>
              </li>
              <li className="web-header__meta-item">
                <a className="web-header__meta-link" href="/#">
                  Liên lạc
                </a>
              </li>
            </ul>

            <div className="web-header__logo logo">
              <h1 className="web-header__logo-title logo-title">
                <a href="/" className="web-header__logo-link logo-link">
                  <img src="/image/logo.svg" alt="HomieReal" />
                </a>
              </h1>
            </div>

            <div className="web-header__actions header-right-container">
              {!isLoggedIn && (
                <div className={`web-header__dropdown ${hovered ? 'is-open' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                  <a className="web-header__action-link" href="/login">
                    Đăng nhập
                  </a>
                  <div className="web-header__panel">
                    <div className="web-header__panel-title">Đăng nhập</div>
                    <LoginFormHeader onSubmit={handleLoginFormSubmit} />
                  </div>
                </div>
              )}

              {isLoggedIn && (
                <div className={`web-header__dropdown ${hoverUser ? 'is-open' : ''}`} onMouseEnter={() => setHoverUser(true)} onMouseLeave={() => setHoverUser(false)}>
                  <a className="web-header__action-link web-header__action-link--account" href="/order">
                    Tài khoản<span>:</span>
                    <span className="web-header__account-name">
                      <strong>{loggedInUser.gender === 'Male' ? 'Ông' : 'Bà'}.</strong>
                      <strong>{loggedInUser.fistname + ' ' + loggedInUser.lastname}</strong>
                    </span>
                  </a>
                  <div className="web-header__panel">
                    <div className="web-header__panel-title">Tài khoản</div>
                    <ul className="web-header__menu">
                      {listNavUser.map((data) => (
                        <li key={data._id} className={`web-header__menu-item ${data.href.startsWith('/order') ? 'is-history' : ''}`}>
                          <NavLink activeClassName="active" className="web-header__menu-link" to={data.href}>
                            {data.label}
                          </NavLink>
                        </li>
                      ))}
                      <li className="web-header__menu-item">
                        <button type="button" className="web-header__menu-action" onClick={handleLogout}>
                          Thoát
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="web-header__status mobile-minicart-added" wfd-invisible="true">
                1 item has been added to your cart
              </div>

              <div className={`web-header__cart minicart ${hoveredCart ? 'is-open' : ''}`} onMouseEnter={() => setHoveredCart(true)} onMouseLeave={() => setHoveredCart(false)}>
                <Modal
                  classNameModal={'web-header__icon-button web-header__cart-button'}
                  label={
                    <span className="icon_Bag" title="View Your Cart">
                      ({countProduct})
                    </span>
                  }
                >
                  <Cart actionDeleteCart={actionDeleteCart} cartTotal={cartTotal} countProduct={countProduct} dataCart={dataCart} />
                </Modal>

                {countProduct === 0 && (
                  <div className="web-header__cart-empty">
                    <p>Giỏ hàng đang trống</p>
                  </div>
                )}
              </div>

              <div className="web-header__search" role="search">
                <Modal classNameModal={'web-header__icon-button web-header__search-button icon icon_Search'} label={<span className="sr-only">Tìm kiếm</span>}>
                  <Search data={dataTrending} />
                </Modal>
              </div>
            </div>
          </div>
        </div>

        <div className="web-header__bottom">
          <div className="web-container web-header__bottom-inner">
            <button type="button" className="web-header__burger header-burgerMenu js-header-burgerMenu">
              <span className="icon icon_Menu" />
              <span className="sr-only visually-hidden">Menu</span>
            </button>
            <nav className="web-header__nav navigation">
              <ul className="web-header__nav-list" id="navbar">
                <CategoryParent data={dataCategoryList} />
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
