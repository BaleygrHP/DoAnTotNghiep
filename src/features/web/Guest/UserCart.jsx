import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import UserDetailCart from 'components/web/cart/UserDetailCart';
import { removeFromCart, updateCartProduct } from 'slice/CartSlice';
import { cartItemsCountSelector } from 'slice/Selectors';
import '../User/style.css';

function UserCart() {
  const countProduct = useSelector(cartItemsCountSelector);
  const dispatch = useDispatch();
  const actionDeleteCart = (index) => dispatch(removeFromCart(index));
  const actionUpdateCartProduct = (dataCart) => dispatch(updateCartProduct(dataCart));

  return (
    <>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <main id="main" role="main" className="web-user-page web-page web-page--with-header full-width clearfix">
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div className="primary-content">
          <div className="web-container">
            {countProduct === 0 && (
              <div className="page-header">
                <h1>
                  <span className="title">Giỏ hàng</span>
                </h1>
                <p className="text">Giỏ hàng hiện tại đang trống</p>
                <div className="form-row">
                  <a href="/" className="button-text" type="submit">
                    Tiếp tục mua sắm
                  </a>
                </div>
              </div>
            )}

            {countProduct !== 0 && (
              <div className="web-user-page__content">
                <div className="page-header">
                  <h1>
                    <span className="title">Giỏ hàng</span>
                  </h1>
                  <p className="text">
                    Các mặt hàng trong giỏ hàng của bạn chưa được đặt trước. Vui lòng tiến hành mua hàng của bạn để đảm bảo các mặt hàng của bạn. Giao hàng tiêu chuẩn và miễn phí
                    trả lại.
                  </p>
                </div>
                <UserDetailCart actionUpdateCartProduct={actionUpdateCartProduct} actionDeleteCart={actionDeleteCart} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default UserCart;
