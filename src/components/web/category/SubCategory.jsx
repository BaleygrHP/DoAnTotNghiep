import React from 'react';

function Subcategory() {
  return (
    <div className="web-category-nav__submenu">
      <div className="web-category-nav__submenu-card">
        <div className="web-category-nav__promo">
          <img alt="Antigona Soft" src="/image/Winter20_FlyOut_Women2.jpg" />
        </div>
        <div className="web-category-nav__submenu-columns">
          <div className="web-category-nav__submenu-column">
            <a className="web-category-nav__submenu-title" href="/#">
              Shoes
            </a>
            <ul className="web-category-nav__submenu-links">
              <li>
                <a href="/#">Sneakers</a>
              </li>
              <li>
                <a href="/#">Flats</a>
              </li>
              <li>
                <a href="/#">Boots &amp; Booties</a>
              </li>
              <li>
                <a href="/#">High Heels</a>
              </li>
            </ul>
          </div>
          <div className="web-category-nav__submenu-column">
            <a className="web-category-nav__submenu-title" href="/#">
              Icons
            </a>
            <ul className="web-category-nav__submenu-links">
              <li>
                <a href="/#">Antigona</a>
              </li>
              <li>
                <a href="/#">Bond</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subcategory;
