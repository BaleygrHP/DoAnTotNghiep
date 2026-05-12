/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import AddToCart from 'components/web/cart/AddToCart';
import Colorproduct from 'components/web/colorProduct';
import Detailproduct from 'components/web/detailProduct';
import Loader from 'components/fullPageLoading';
import Modal from 'components/web/modal/modal';
import SizeProduct from 'components/web/sizeProduct';
import Suggestions from 'components/web/suggestions';
import { THUMNAIL_URL_PRODUCTINFO } from 'constants/index';
import { addToCart } from 'slice/CartSlice';
import { getListSize } from 'slice/ProductListSlice';
import { getProductDetail, getRecommand } from 'slice/ProductSlice';
import { formatPrice } from 'utils/common';
import './style.css';

function ProductInfo() {
  const dispatch = useDispatch();
  const actionAddToCart = (cart) => dispatch(addToCart(cart));
  const {
    params: { productId },
  } = useRouteMatch();
  const { enqueueSnackbar } = useSnackbar();

  const product = useSelector((state) => state.product.product);
  const recommend = useSelector((state) => state.product.recommend);
  const userGender = useSelector((state) => state.user.current.gender);
  const size = useSelector((state) => state.productList.size);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('Chọn màu');
  const [sizes, setSize] = useState('');
  const [totalProductState, setTotalProductState] = useState();
  const [up, setUp] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getProductDetail(productId);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        const getListSizeAPI = getListSize(productId);
        const resultActiongetListSizeAPI = await dispatch(getListSizeAPI);
        unwrapResult(resultActiongetListSizeAPI);
      } catch (error) {
        console.log('Failed to fetch product', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, productId]);

  useEffect(() => {
    (async () => {
      const values = {
        age: 18 + Math.floor(Math.random() * (65 - 18)),
        gender: userGender ? userGender : 'Female',
        previousProduct: parseInt(productId),
        price: product.price ? product.price : 100,
        sale: product.saleId ? 'Yes' : 'No',
      };
      try {
        setLoading(true);
        const action = getRecommand(values);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log('Failed to fetch product', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, productId]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let allProduct = 0;
        if (color === 'Chọn màu' && sizes.value === undefined) {
          setUp(true);
          for (let index = 0; index < size.length; index++) {
            const element = size[index];
            for (let secondIndex = 0; secondIndex < element.colors.length; secondIndex++) {
              const element2 = element.colors[secondIndex];
              allProduct += element2.quantity;
            }
          }
          setTotalProductState(allProduct);
        } else if (color !== 'Chọn màu' && sizes.value !== undefined) {
          setUp(false);
          size.forEach((item) => {
            if (sizes.value === item.nameSize) {
              item.colors.forEach((colorItem) => {
                if (color === colorItem.colorName) {
                  allProduct = colorItem.quantity;
                }
              });
            }
          });
          setTotalProductState(allProduct);
        }
      } catch (error) {
        console.log('Failed to fetch product', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [size, color, sizes.value]);

  const thumnailUrl = product.imageMain ? product.imageMain : THUMNAIL_URL_PRODUCTINFO;
  let priceProductTotal = 0;

  const priceTotal = () => {
    if (product.saleId) {
      priceProductTotal = product.price - (product.price * product.saleId.percentSale) / 100;
    } else {
      priceProductTotal = product.price;
    }
    return priceProductTotal;
  };

  const handleAddToCartSubmit = (values) => {
    try {
      setLoading(true);
      if (values) {
        const dataCart = {
          color,
          size: sizes.value,
          sizeId: sizes._id,
          product,
          price: priceTotal(),
          quantity: 1,
        };
        actionAddToCart(dataCart);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="web-guest-page web-page web-page--with-header web-product-detail-page">
      <Loader showLoader={loading} />
      <Helmet>
        <title>Thông tin sản phẩm</title>
      </Helmet>
      <div id="wrapper" className="pt_product-details">
        <main id="main" role="main" className="web-guest-page__content full-width clearfix">
          <div className="primary-content">
            <div className="web-container" id="product-container">
              <div className="web-product-detail-page__layout">
                <section className="web-product-detail-page__gallery product-col-image col-sm-6">
                  <div className="product-image-container" aria-roledescription="carousel">
                    <img className="img-productinfo" src={thumnailUrl} alt="Homie product" />
                  </div>
                </section>
                <section className="web-product-detail-page__info product-col-details col-md-4 col-md-offset-1 col-sm-6">
                  <div className="product-detail">
                    <div className="web-product-detail-page__label product-label">{product.saleId ? 'Sale' : product.content}</div>
                    <div>
                      <h1 className="product-name">{product.name}</h1>
                      <div className="product-price">
                        {product.saleId ? (
                          <>
                            <span className="price-standard">{formatPrice(product.price)}</span>
                            <span className="money-saved">({product.saleId.percentSale}%)</span>
                            <span className="price-sales">{formatPrice(priceTotal())}</span>
                          </>
                        ) : (
                          <span className="price-sales">{formatPrice(priceTotal())}</span>
                        )}
                      </div>

                      <div className="product-description">
                        <div className="web-product-detail-page__actions double-form-button">
                          <div className="left">
                            <Modal classNameModal={'form-button secondary'} label={'Thông tin món hàng'}>
                              <Detailproduct product={product} color={size} />
                            </Modal>
                          </div>
                          <div className="web-product-detail-page__stock right">
                            <div className="form-button secondary addtowhishlist-btn">
                              <a href="/#">
                                <span>{totalProductState} sản phẩm</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Colorproduct color={size} onSubmit={(data) => setColor(data)} />
                      <SizeProduct size={size} onSubmit={(data) => setSize(data)} color={color} />
                      <div className="product-add-to-cart">
                        <AddToCart onSubmit={handleAddToCartSubmit} soldOut={totalProductState === 0 || up} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="web-product-detail-page__extras product-block-images container">
                {product.images?.map((productList, index) => (
                  <a key={index} href="/#" className="fullscreen full-mobile">
                    <img className="img-productinfo" src={productList} alt="Lỗi ảnh" />
                  </a>
                ))}
              </div>
              <Suggestions currentTableData={recommend.prediction} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductInfo;
