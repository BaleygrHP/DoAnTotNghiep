import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Products from './Products';

ProductsList.propTypes = {
  data: PropTypes.array,
};

ProductsList.defaultProps = {
  data: [],
};

function ProductsList({ data }) {
  const [hovered, setHovered] = useState(-1);

  return (
    <>
      {data.map((productList) => (
        <li key={productList._id} className="web-product-grid__item grid-tile">
          <div
            className={`web-product-card product-tile ${hovered === productList._id ? 'is-hovered hover' : ''}`}
            onMouseEnter={() => setHovered(productList._id)}
            onMouseLeave={() => setHovered(-1)}
          >
            <Products product={productList} />
          </div>
        </li>
      ))}
    </>
  );
}

export default ProductsList;
