import React from 'react';
import './style.css';

const Footer = function () {
  return (
    <>
      <footer className="web-footer footer">
        <div className="web-footer__hero footer-slot-duo">
          <div className="web-container">
            <div className="web-footer__hero-grid row">
              <section className="web-footer__advantage col-xs-6 col-sm-6 col-lg-6 advantage-part">
                <div>
                  <h2>Lợi ích của E-boutique</h2>
                </div>
                <div className="content-asset">
                  <div className="web-footer__advantage-list row">
                    <p className="web-footer__advantage-item col-xs-2 col-sm-4 col-lg-4">
                      <i className="icon_freeDelivery" />
                      Miễn phí
                      <br />
                      vận chuyển
                    </p>
                    <p className="web-footer__advantage-item col-xs-2 col-sm-4 col-lg-4">
                      <i className="icon_collect-in-store" />
                      Mua
                      <br />
                      tại cửa hàng
                    </p>
                    <p className="web-footer__advantage-item col-xs-2 col-sm-4 col-lg-4">
                      <i className="icon_complimentaryGiftWrapping" />
                      hỗ trợ
                      <br />
                      gói quà
                    </p>
                  </div>
                </div>
              </section>

              <section className="web-footer__newsletter col-xs-6 col-sm-6 col-lg-6 newsletter-part">
                <form action="/#Newsletter-Edit" method="POST" className="newsletter-form">
                  <div className="web-footer__newsletter-copy">
                    <h2>Đăng kí để nhận những tin tức mới nhất và kết nối đến cộng đồng H</h2>
                    <p>Trở thành người đầu tiên biết đến những bộ collections và event mới nhất.</p>
                  </div>
                  <div>
                    <div className="content-asset">
                      <p className="terms-conditions">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="/#">Privacy Policy</a> Lorem ipsum dolor sit amet, consectetur adip
                      </p>
                    </div>
                  </div>
                  <div className="web-footer__newsletter-form row">
                    <div className="col-xs-4 col-sm-8 col-lg-8 input-container">
                      <div className="form-row required focus" data-requiredtext data-regexinvalidmessage>
                        <div className="form-field-wrapper">
                          <label className="form-label" htmlFor="dwfrm_newsletter_email">
                            Địa chỉ E-mail *
                          </label>
                          <div className="form-field">
                            <input
                              className="form-input email form-field required"
                              type="text"
                              id="dwfrm_newsletter_email"
                              name="dwfrm_newsletter_email"
                              defaultValue=""
                              data-dwname="email"
                              autoComplete="email"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-2 col-sm-4 col-lg-4 input-container">
                      <div className="form-row submit">
                        <button type="submit" value="Subscribe" name="dwfrm_newsletter_subscribe">
                          Đăng kí
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>

        <div className="web-footer__links services">
          <div className="web-container">
            <div className="web-footer__links-grid row">
              <div className="web-footer__column col col-md-2 col-sm-6">
                <span className="footer-title">Dịch vụ khách hàng</span>
                <ul>
                  <li>
                    <a href="/#">FAQ</a>
                  </li>
                  <li>
                    <a href="/#">FAQ COVID </a>
                  </li>
                </ul>
              </div>
              <div className="web-footer__column col col-md-2 col-sm-6">
                <span className="footer-title">Về chúng tôi</span>
                <ul>
                  <li>
                    <a href="/#">Careers</a>
                  </li>
                  <li>
                    <a href="/#">Press</a>
                  </li>
                </ul>
              </div>
              <div className="web-footer__column col col-md-5 col-sm-6">
                <span className="footer-title">Pháp lý</span>
                <ul>
                  <li>
                    <a href="/#">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="/#">Chính sách Cookie</a>
                  </li>
                </ul>
              </div>
              <div className="web-footer__promo col col-md-3 col-sm-3">
                <a className="web-footer__promo-link HomieBeauty promotion-impression" data-promotion-creative="footer" href="/#" target="_blank" rel="noreferrer">
                  <img alt="" src="/image/Parfum_Linterdit.jpg" />
                  <span className="web-footer__promo-badge">H</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
