import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import Loader from 'components/fullPageLoading';
import RegisterForm from 'components/web/form/RegisterForm';
import { register } from 'slice/userSlice';
import './style.css';

const Register = function () {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleResFormSubmit = async (values) => {
    try {
      setLoading(true);
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Đăng kí thành công', { variant: 'success' });
      history.push('/order');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <Loader showLoader={loading} />
      <main id="main" className="web-user-page web-page web-page--with-header page-content clearfix">
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div id="primary" className="primary-content">
          <div className="registration web-container">
            <div className="page-header">
              <h1>
                <span className="subtitle">Tạo tài khoản</span> <span className="title">Tài khoản</span>
              </h1>
              <p className="text">
                Trở thành người tiên phong biết đến những sản phẩm mới nhất, biết về các bộ sưu tập mới và các sự kiện độc quyền thông qua tài khoản cá nhân của bạn.
              </p>
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-offset-3">
                <RegisterForm onSubmit={handleResFormSubmit} />
              </div>
            </div>
          </div>
        </div>
        <CustomerSp />
      </main>
    </div>
  );
};

export default Register;
