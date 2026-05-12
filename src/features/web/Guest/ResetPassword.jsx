import { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import ChangePassForm from 'components/web/form/ChangePassForm';
import { confirmResetPassword } from 'slice/userSlice';
import '../User/style.css';

function ResetPassword() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = location.pathname.substring(16);

  const handleResFormSubmitPass = async (values) => {
    try {
      setLoading(true);
      values.token = token;
      const action = confirmResetPassword(values);
      const resultAction = dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Kiểm tra mail của bạn', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader showLoader={loading} />
      <Helmet>
        <title>Quản lý thông tin cá nhân</title>
      </Helmet>
      <main id="main" className="web-user-page web-page web-page--with-header page-content clearfix">
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div id="primary" className="primary-content">
          <div className="registration web-container">
            <div className="page-header">
              <h1>
                <span className="subtitle">Thay đổi thông tin</span> <span className="title">Thông tin cá nhân</span>
              </h1>
            </div>
            <div className="web-user-page__narrow">
              <ChangePassForm onSubmit={handleResFormSubmitPass} reset={true} />
            </div>
          </div>
          <CustomerSp />
        </div>
      </main>
    </>
  );
}

export default ResetPassword;
