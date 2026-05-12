import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loader from 'components/fullPageLoading';
import { cartTotalSelector } from 'slice/Selectors';
import { emptyCart } from 'slice/CartSlice';
import { addOrderUser } from 'slice/OrderSlice';
import { isMockMode } from 'mocks';

function loadPaypalScript() {
  if (window.paypal) {
    return Promise.resolve(window.paypal);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=ARKSwdxd5hEkUfqEz02FG3CbehuJRyqXsZhnxnyGzMpo9cpItWoujchTv9FBPUQPZ6QpekV3m2DjmxtG&currency=USD';
    script.async = true;
    script.onload = () => resolve(window.paypal);
    script.onerror = () => reject(new Error('Khong the tai PayPal SDK'));
    document.body.appendChild(script);
  });
}

function buildMockPaypalPayload({ cartTotal, currentUser, dataCart, userId }) {
  const defaultAddress = currentUser.addresses?.find((address) => address.default) || currentUser.addresses?.[0];

  const items = dataCart.map((cartItem) => {
    const salePercent = cartItem.product.saleId?.percentSale || 0;
    const salePrice = cartItem.product.price - (cartItem.product.price * salePercent) / 100;
    const usdPrice = salePrice / 20000;

    return {
      productId: cartItem.product._id,
      quantity: cartItem.quantity,
      totalPrice: Number((cartItem.quantity * usdPrice).toFixed(2)),
      colorName: cartItem.color,
      saleId: cartItem.product.saleId?._id || null,
      sizeId: cartItem.sizeId,
      sizeName: cartItem.size,
    };
  });

  return {
    addressrecevie: {
      name: `${currentUser.lastname || ''} ${currentUser.fistname || ''}`.trim() || currentUser.email,
      phonenumber: defaultAddress?.phoneNumber || currentUser.phonenumber || '0900000000',
      address: defaultAddress
        ? `${defaultAddress.detailAddress}, ${defaultAddress.district.label}, ${defaultAddress.city.label}`
        : 'Mock PayPal address',
    },
    priceDiscount: 0,
    userId,
    items,
    totalPrice: cartTotal,
    paymentId: `MOCK-PAYPAL-${Date.now()}`,
    isPaypal: true,
  };
}

export default function Paypal() {
  const cartTotal = useSelector(cartTotalSelector);
  const dataCart = useSelector((state) => state.cart.dataCart);
  const currentUser = useSelector((state) => state.user.current);
  const userId = currentUser._id;
  const paypal = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleOrderSuccess = useCallback(async (payload) => {
    try {
      setLoading(true);
      const action = addOrderUser(payload);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      dispatch(emptyCart());
      history.push('/order');
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, history]);

  const handleMockPaypalCheckout = async () => {
    const payload = buildMockPaypalPayload({
      cartTotal,
      currentUser,
      dataCart,
      userId,
    });
    await handleOrderSuccess(payload);
  };

  useEffect(() => {
    if (isMockMode || !paypal.current) {
      return undefined;
    }

    let isMounted = true;

    (async () => {
      try {
        const paypalSdk = await loadPaypalScript();
        if (!isMounted || !paypalSdk) {
          return;
        }

        paypalSdk
          .Buttons({
            style: {
              layout: 'vertical',
              color: 'silver',
              shape: 'rect',
              label: 'paypal',
            },
            createOrder: (data, actions) =>
              actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                  {
                    description: 'HomieReal order',
                    amount: {
                      value: (cartTotal / 20000).toFixed(2),
                      currency_code: 'USD',
                    },
                  },
                ],
              }),
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              await handleOrderSuccess({
                ...buildMockPaypalPayload({
                  cartTotal,
                  currentUser,
                  dataCart,
                  userId,
                }),
                paymentId: order.id,
                addressrecevie: {
                  name: order.payer.name?.given_name || currentUser.email,
                  phonenumber: currentUser.phonenumber || '0900000000',
                  address: order.payer.address?.country_code || 'VN',
                },
              });
            },
            onError: (error) => {
              console.log(error);
            },
          })
          .render(paypal.current);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [cartTotal, currentUser, dataCart, handleOrderSuccess, userId]);

  return (
    <>
      <Loader showLoader={loading} />
      <Helmet>
        <title>Thanh toan paypal</title>
      </Helmet>
      <main id="main">
        {isMockMode ? (
          <div className="centered paypal-button-container">
            <button type="button" className="form-button checkout-start" onClick={handleMockPaypalCheckout} disabled={dataCart.length === 0}>
              Xac nhan thanh toan PayPal mock
            </button>
          </div>
        ) : (
          <div className="centered paypal-button-container" ref={paypal}></div>
        )}
      </main>
    </>
  );
}
