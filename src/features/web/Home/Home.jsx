import React from 'react';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
import Slide from 'components/web/slide/Slide';
import './style.css';

const Home = function () {
  return (
    <>
      <Loader showLoader={false} />
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>

      <main id="main" className="web-page web-page--with-header web-home">
        <section aria-roledescription="carousel" className="web-home__hero home-carousel-container content-slot">
          <div className="swiper-container swiper-container-horizontal swiper-container-autoheight swiper-container-fade">
            <div className="swiper-wrapper">
              <Slide imageUrl="/image/Homepage_Carousel_Holiday_ForHer_Desktop.jpg" title="Bag For You" />
            </div>
          </div>
        </section>

        <section className="web-home__section web-container">
          <h2 className="slot-header">Cửa hàng trực tuyến</h2>
          <div className="web-home__spotlight-grid">
            <div className="web-home__spotlight-card">
              <img src="/image/AntigonaPouch_Browse_Men.jpg" alt="" />
              <a className="web-home__spotlight-content promotion-impression" href="/#">
                <div className="web-home__spotlight-copy">
                  <span className="web-home__spotlight-title">Túi xách cho em</span>
                  <div className="cta-container">
                    <p className="form-button look-button">Mua ngay</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="web-home__spotlight-card">
              <img src="/image/AntigonaPouch_Browse_Men.jpg" alt="" />
              <a className="web-home__spotlight-content promotion-impression" href="/#">
                <div className="web-home__spotlight-copy">
                  <span className="web-home__spotlight-title">Túi xách cho anh</span>
                  <div className="cta-container">
                    <p className="form-button look-button">Mua ngay</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="web-home__section web-container">
          <div className="web-home__browse-grid">
            <div className="web-home__browse-card">
              <a className="browse-header" href="/#">
                <h2>Dành cho nữ</h2>
              </a>
              <ul className="web-home__browse-links">
                <li>
                  <a href="/#" className="tag-link">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
            <div className="web-home__browse-card">
              <a className="browse-header" href="/#">
                <h2>Dành cho nam</h2>
              </a>
              <ul className="web-home__browse-links">
                <li>
                  <a href="/#" className="tag-link">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="/#" className="tag-link">
                    Ready-to-wear
                  </a>
                </li>
                <li>
                  <a href="/#" className="tag-link">
                    Bags
                  </a>
                </li>
                <li>
                  <a href="/#" className="tag-link">
                    Shoes
                  </a>
                </li>
                <li>
                  <a href="/#" className="tag-link">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="web-home__section web-container">
          <h2 className="slot-header">Mua ngay</h2>
          <div className="web-home__shop-grid">
            <a className="web-home__shop-card" href="/#men/shoes/boots-derbies/">
              <img src="/image/BH601ZH0NN001-01-01.jpg" alt="Boots & Derbies" />
              <span className="web-home__shop-title">Cửa hàng Boots &amp; Derbies</span>
            </a>
            <a className="web-home__shop-card" href="/#men/ready-to-wear/sweatshirts/">
              <img src="/image/BH601ZH0NN001-01-01.jpg" alt="Sweatshirts" />
              <span className="web-home__shop-title">Cửa hàng Sweatshirts</span>
            </a>
            <a className="web-home__shop-card" href="/#">
              <img src="/image/BH601ZH0NN001-01-01.jpg" alt="Sneakers" />
              <span className="web-home__shop-title">Cửa hàng Sneakers</span>
            </a>
          </div>
        </section>

        <section className="web-home__section">
          <div className="web-home__full-banner">
            <img src="/image/Home-Full-Fall21-Desktop.jpg" alt="" />
            <div className="web-home__full-banner-content">
              <div className="web-home__full-banner-copy">
                <span className="web-home__full-banner-title">Món quà lớn cho em</span>
                <div className="cta-container">
                  <a className="form-button look-button" href="/#">
                    Khám phá ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
