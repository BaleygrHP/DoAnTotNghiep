import React from 'react';
import { logout } from 'slice/userSlice';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { listNavUser } from 'constants/index';
import './style.css';

function NavUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    const action = logout();
    dispatch(action);
    history.push('/');
    window.location.reload();
  };

  return (
    <div className="web-account-nav-wrap">
      <nav className="web-account-nav account-navigation" aria-label="Tài khoản">
        <ul className="web-account-nav__list">
          {listNavUser.map((data) => (
            <li key={data._id} className={`web-account-nav__item ${data.href.startsWith('/order') ? 'is-history' : ''}`}>
              <NavLink activeClassName="active" className="web-account-nav__link" to={data.href}>
                {data.label}
              </NavLink>
            </li>
          ))}
          <li className="web-account-nav__item">
            <button type="button" className="web-account-nav__action" onClick={handleLogout}>
              Đăng xuất
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavUser;
