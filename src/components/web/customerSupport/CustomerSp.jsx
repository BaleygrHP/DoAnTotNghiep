import React from 'react';
import './style.css';

function CustomerSp() {
  return (
    <div className="web-support customer-support">
      <div className="web-support__card content-asset">
        <div className="web-support__title title">Cần giúp đỡ?</div>
        <div className="web-container">
          <div className="web-support__body text">
            <p className="web-support__eyebrow subtitle">Tổng đài dịch vụ</p>
            Đội ngũ hỗ trợ sẵn sàng từ thứ 2 đến thứ 7 từ 10:00 sáng đến 7:00 tối để trả lời tất cả các thắc mắc của khách hàng.
          </div>
          <div className="web-support__links links">
            <a href="/#" className="web-support__link contact-popin">
              <i className="icon_Email" />
              Email
            </a>
            <a href="tel:0929363511" className="web-support__link call-to-button">
              <i className="icon_Call" />
              Điện thoại
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSp;
