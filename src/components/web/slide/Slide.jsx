import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

Slide.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string
};

function Slide(props) {
  const { imageUrl, title } = props;

  return (
    <div aria-roledescription="slide" className="web-slide swiper-slide">
      <div className="web-slide__frame image-content">
        <div className="web-slide__media background">
          <img src={imageUrl} alt="Homie slide" />
        </div>
        <a className="web-slide__content content" href="/#">
          <div className="web-slide__inner primary">
            <div className="web-slide__title">{title}</div>
            <div className="cta-container">
              <p className="web-slide__cta form-button look-button">Mua ngay</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Slide;
