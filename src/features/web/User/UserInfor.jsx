import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
import ChangePassForm from 'components/web/form/ChangePassForm';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import NavUser from 'components/web/NavUserPage/NavUser';
import UpdateInfoForm from 'components/web/form/UpdateInfoForm';
import { ChangePassword, update } from 'slice/userSlice';
import './style.css';

function UserInfor() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const id = useSelector((state) => state.user.current._id);

  const handleResFormSubmit = async (values) => {
    try {
      setLoading(true);
      values.password = 'test';
      const action = update(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Cập nhật thông tin cá nhân thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleResFormSubmitPass = async (values) => {
    try {
      setLoading(true);
      const action = ChangePassword(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Cập nhật thông tin cá nhân thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const action = ChangePassword(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Cập nhật thông tin cá nhân thành công', { variant: 'success' });
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
        <div className="web-container">
          <NavUser />
        </div>
        <div id="primary" className="primary-content">
          <div className="registration web-container">
            <div className="page-header">
              <h1>
                <span className="subtitle">Thay đổi thông tin</span> <span className="title">Thông tin cá nhân</span>
              </h1>
            </div>
            <div className="web-user-page__narrow">
              <UpdateInfoForm onSubmit={handleResFormSubmit} />
              <div className="form-row form-row-button">
                <button type="button" className="delete-account" value="Delete account" name="dwfrm_profile_deleteaccount" onClick={handleDeleteAccount}>
                  Xoá tài khoản
                </button>
              </div>
              <ChangePassForm onSubmit={handleResFormSubmitPass} />
            </div>
          </div>
          <CustomerSp />
        </div>
      </main>
    </>
  );
}

export default UserInfor;
