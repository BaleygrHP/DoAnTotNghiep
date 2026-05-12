import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
import CheckOutForm from 'components/web/form/CheckOutForm';
import { THUMNAIL_URL_PRODUCTLIST } from 'constants/index';
import { emptyCart } from 'slice/CartSlice';
import { addOrderUser, checkout } from 'slice/OrderSlice';
import { cartTotalSelector } from 'slice/Selectors';
import { formatPrice } from 'utils';
import './style.css';

const CheckOut = function () {
  const history = useHistory();
  const priceFinal = useSelector((state) => state.voucher.data);
  const dataUser = useSelector((state) => state.user.current);
  const dataCart = useSelector((state) => state.cart.dataCart);
  const cartTotal = useSelector(cartTotalSelector);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleCheckOutFormSubmit = async (values) => {
    try {
      setLoading(true);
      values.addressrecevie = {
        name: values.FName,
        phonenumber: values.Phone,
        address: values.Address,
      };

      let item = {
        productId: 1,
        quantity: 2,
        totalPrice: 200,
        saleId: 20,
        sizeId: 20,
        colorName: 'Black',
        sizeName: 'Black',
      };
      const items = [];

      for (let i = 0; i < dataCart.length; i++) {
        item.productId = dataCart[i].product._id;
        item.quantity = dataCart[i].quantity;
        item.totalPrice = dataCart[i].quantity * dataCart[i].product.price;
        item.saleId = dataCart[i].product.saleId ? dataCart[i].product.saleId._id : null;
        item.colorName = dataCart[i].color;
        item.sizeName = dataCart[i].size;
        item.sizeId = dataCart[i].sizeId;
        items.unshift(item);
        item = {
          productId: 1,
          quantity: 2,
          totalPrice: 200,
        };
      }

      values.userId = dataUser._id;
      values.items = items;
      values.priceDiscount = priceFinal.DiscountPriceL;
      values.totalPrice = priceFinal.Total ? priceFinal.Total : cartTotal;
      values.isPaypal = false;

      const action = addOrderUser(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      dispatch(checkout());
      dispatch(emptyCart());
      enqueueSnackbar('Đặt hàng thành công', { variant: 'success' });
      history.push('/order');
      window.location.reload();
    } catch (error) {
      console.log('Failed to checkout:', error);
      enqueueSnackbar('Đặt hàng thất bại', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <Loader showLoader={loading} />
      <main id="main" role="main" className="web-user-page web-page web-page--with-header primary-focus clearfix">
        <div className="primary-content">
          <div className="web-container">
            <div className="primary-content">
              <div className="web-checkout-page__layout">
                <div className="shipping">
                  <div className="page-header">
                    <h1>
                      <span className="title">Đơn hàng của bạn</span>
                    </h1>
                  </div>
                  <div className="checkout-area">
                    <h2 className="no-mobile">Tiến hành đặt hàng</h2>
                    <div className="step-area shipping">
                      <div className="step-title">
                        <div className="step">1</div>
                        <h3>Vận chuyển</h3>
                      </div>
                      <div className="forms-container step-content">
                        <div className="response-container">
                          <CheckOutForm onSubmit={handleCheckOutFormSubmit} />
                          <div className="form-row big-margin-bottom">
                            <div className="content-asset">
                              <p className="terms-conditions">lorem ipsum dolor sit amet, consectetur adip</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <aside id="checkout-summary-fixed" className="web-checkout-page__summary">
                  <div className="summary">
                    <h2>Tổng kết</h2>
                    <div className="checkout-mini-cart">
                      {dataCart.map((card) => (
                        <div key={card.id} className="line-item">
                          <div className="product-image">
                            <img src={card.product.imageMain ? card.product.imageMain : THUMNAIL_URL_PRODUCTLIST} alt="ProductImage" />
                          </div>
                          <ul className="product-infos datacart-ul">
                            <li className="item-name">
                              <h3>
                                <a href="/#" title={card.product.name}>
                                  {card.product.name}
                                </a>
                              </h3>
                            </li>
                            <li className="product-infos-table">
                              <div className="info-table-row">
                                <span className="label">Giá:</span>
                                <span className="value product-price">{formatPrice(card.product.price)}</span>
                              </div>
                              <div className="info-table-row">
                                <span className="label">Mã sản phẩm:</span>
                                <span className="value">{card.product._id}</span>
                              </div>
                              <div className="info-table-row">
                                <span className="label">Màu:</span>
                                <span className="value">{card.color}</span>
                              </div>
                              <div className="info-table-row">
                                <span className="label">Size:</span>
                                <span className="value">{card.size}</span>
                              </div>
                              <div className="info-table-row lineitem-qty">
                                <span className="label">Số lượng:</span>
                                <span className="qty-value">{card.quantity}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="cart-order-totals">
                      <table className="order-totals-table">
                        <tbody>
                          <tr className="order-subtotal">
                            <th scope="row">Tạm tính</th>
                            <td>{formatPrice(cartTotal)}</td>
                          </tr>
                          <tr className="order-estimate-tax">
                            <th scope="row">Giảm giá:</th>
                            <td>{priceFinal.Percent ? priceFinal.Percent : 0}%</td>
                          </tr>
                          <tr className="order-country-zone">
                            <th scope="row">Phí vận chuyển:</th>
                            <td>0đ</td>
                          </tr>
                          <tr className="order-country-zone">
                            <th scope="row">Giảm giá</th>
                            <td>{formatPrice(priceFinal.DiscountPriceL ? priceFinal.DiscountPriceL : 0)}</td>
                          </tr>
                          <tr className="order-total">
                            <th scope="row">Tổng cộng</th>
                            <td className="order-value">{formatPrice(priceFinal.Total ? priceFinal.Total : cartTotal)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CheckOut;
