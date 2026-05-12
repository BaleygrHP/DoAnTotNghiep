import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { THUMNAIL_URL_PRODUCTLIST } from 'constants/index';
import { formatPrice } from 'utils/common';
import './style.css';

Products.propTypes = {
  product: PropTypes.object,
};

Products.defaultProps = {
  product: [],
};

function Products({ product }) {
  const thumnailUrl = product.imageMain ? product.imageMain : THUMNAIL_URL_PRODUCTLIST;

  return (
    <figure className="web-product-card__figure product-image">
      <Link className="web-product-card__link thumb-link" to={`/productinf/${product._id}`}>
        <picture className="web-product-card__media thumb-img">
          <img className="web-product-card__image img-product" src={thumnailUrl} alt="Lỗi ảnh" />
        </picture>
        <span className="web-product-card__badge flag">{product.content}</span>
        <figcaption className="web-product-card__body thumb-caption">
          <div className="web-product-card__info product-infos">
            <div className="web-product-card__name product-name">{product.name}</div>
            <div className="web-product-card__pricing product-pricing">
              <div className="product-price">
                <span className="price-sales">{formatPrice(product.price)}</span>
              </div>
            </div>
            <div className="web-product-card__promo product-promo" />
          </div>
        </figcaption>
      </Link>
    </figure>
  );
}

export default Products;
