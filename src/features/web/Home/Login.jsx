import React, { useState } from 'react';
import { Fab } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import Loader from 'components/fullPageLoading';
import LoginForm from 'components/web/form/LoginForm';
import Google from 'icons/Google';
import { isMockMode } from 'mocks';
import { login, loginGoogle } from 'slice/userSlice';
import './style.css';

const Login = function () {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleLoginFormSubmit = async (values) => {
    try {
      setLoading(true);
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Dang nhap thanh cong', { variant: 'success' });
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar('Mat khau hoac tai khoan khong chinh xac', { variant: 'error' });
      history.push('/login');
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const responseGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      const data = { tokenId: response.tokenId };
      const action = loginGoogle(data);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Dang nhap Google mock thanh cong', { variant: 'success' });
      history.push('/');
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Tai khoan da bi vo hieu hoa', { variant: 'error' });
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const responseGoogleFailure = (response) => {
    setLoading(true);
    enqueueSnackbar(response.error || 'Dang nhap Google that bai', { variant: 'error' });
    setLoading(false);
  };

  const renderGoogleAction = () => {
    if (isMockMode) {
      return (
        <Fab className="mgr-10" color="primary" aria-label="google-login" onClick={() => responseGoogleSuccess({ tokenId: 'mock-google-token' })}>
          <Google />
        </Fab>
      );
    }

    return (
      <GoogleLogin
        clientId="907790633444-0fnqh5mpf12k1jfes1pal08gv51vhnsh.apps.googleusercontent.com"
        buttonText="Login"
        render={(renderProps) => (
          <Fab className="mgr-10" color="primary" aria-label="edit" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <Google />
          </Fab>
        )}
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFailure}
        cookiePolicy="single_host_origin"
      />
    );
  };

  return (
    <div>
      <Helmet>
        <title>Dang nhap</title>
      </Helmet>
      <Loader showLoader={loading} />
      <div className="pt_storefront" id="wrapper">
        <main id="main" className="web-user-page web-page web-page--with-header page-content clearfix">
          <div id="primary" className="primary-content">
            <div className="login-page web-container">
              <div className="page-header">
                <h1>
                  <span className="subtitle">Tai khoan</span> <span className="title">Dang nhap</span>
                </h1>
              </div>
              <div className="row">
                <div className="col-xs-6">
                  <div className="login-box">
                    <h2>Thanh vien cua H</h2>
                    {renderGoogleAction()}
                    <p className="intro">Neu ban la mot thanh vien cua H, hay dang nhap voi thong tin cua ban.</p>
                    <LoginForm onSubmit={handleLoginFormSubmit} />
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="register-box">
                    <h2>Thanh vien moi</h2>
                    <p className="intro">Tao mot tai khoan cho rieng minh de tham gia cung H.</p>
                    <a href="/register" className="form-row">
                      <button type="button" value="Create an account" name="dwfrm_login_register">
                        Tao tai khoan moi
                      </button>
                    </a>
                    <div className="create-account-benefits">
                      <h3>Loi ich</h3>
                      <div className="content-asset">
                        <p className="title">Gio hang</p>
                        <p className="text">Them vao nhung san pham yeu thich cua rieng minh</p>
                        <p className="title">Ca nhan hoa</p>
                        <p className="text">So huu bo suu tap cho rieng minh</p>
                        <p className="title">Yeu thich</p>
                        <p className="text">Quan ly nhung tin tuc moi nhat ma minh yeu thich</p>
                        <p className="title">Thong tin ca nhan</p>
                        <p className="text">Cap nhat thong tin ca nhan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CustomerSp />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
