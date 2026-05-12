import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { THUMNAIL_URL_CATEGORYCHILD } from 'constants/index';
import './style.css';

CateC.propTypes = {
  data: PropTypes.array,
};

CateC.defaultProps = {
  data: [],
};

function CateC(props) {
  const { data } = props;

  return (
    <div className="web-category-grid">
      {data.map((categoryCList) => (
        <div className="web-category-card subcategory-container" key={categoryCList._id}>
          <Link className="web-category-card__link merchandised-level-2" to={`/showproduct/${categoryCList._id}`}>
            <img className="web-category-card__image img-categorychild" alt="Lỗi ảnh" src={categoryCList.icon ? categoryCList.icon : THUMNAIL_URL_CATEGORYCHILD} />
            <div className="web-category-card__name text">{categoryCList.namesubCategory}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CateC;
