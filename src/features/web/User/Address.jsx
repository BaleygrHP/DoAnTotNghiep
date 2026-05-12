import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import ModiffyAddress from 'components/web/form/ModifyAddress';
import Modal from 'components/web/modal/modal';
import NavUser from 'components/web/NavUserPage/NavUser';
import UpdateAddress from 'components/web/form/UpdateAddress';
import { addAddress, deleteAddress, updateAddress, updateDefaultAddress } from 'slice/userSlice';
import './style.css';

const AccountOverView = function () {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const addresses = useSelector((state) => state.user.current.addresses);
  const [loading, setLoading] = useState(false);

  const handleAddressFormSubmit = async (values) => {
    try {
      setLoading(true);
      const action = addAddress(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
    } catch (error) {
      console.log('Failed to add address:', error);
      enqueueSnackbar('Cập nhật thất bại', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAddressFormSubmit = async (values) => {
    try {
      setLoading(true);
      const action = updateAddress(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
    } catch (error) {
      console.log('Failed to update address:', error);
      enqueueSnackbar('Cập nhật thất bại', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatusFormSubmit = async (values) => {
    try {
      setLoading(true);
      const data = {
        _id: values._id,
        city: values.city,
        district: values.district,
        ward: values.ward,
        gender: values.gender,
        nameCustomer: values.nameCustomer,
        detailAddress: values.detailAddress,
        phoneNumber: values.phoneNumber,
        isdefault: true,
      };
      const action = updateDefaultAddress(data);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
    } catch (error) {
      console.log('Cập nhật thất bại:', error);
      enqueueSnackbar('Cập nhật thất bại', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFormSubmit = async (id) => {
    try {
      setLoading(true);
      const action = deleteAddress(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Xoá thành công', { variant: 'success' });
    } catch (error) {
      console.log('Failed to delete address:', error);
      enqueueSnackbar('Xoá thất bại', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tổng quan tài khoản</title>
      </Helmet>

      <Loader showLoader={loading} />
      <main id="main" className="web-user-page web-page web-page--with-header page-content clearfix">
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div className="web-container">
          <NavUser />
        </div>
        <div className="primary-content">
          <div className="account-page">
            <div className="addresses-area" id="addresses">
              <h1 className="page-header">
                <span className="title">Quản lý địa chỉ</span>
              </h1>

              <ul className="address-list">
                <>
                  {addresses.length === 0 && <>Hiện tại chưa có địa chỉ nào</>}
                  {addresses.map((data) => (
                    <li key={data._id} className="address-tile default">
                      <div className="mini-address-title">
                        {data.detailAddress}
                        {data.default && <h3 className="address-default">(Địa chỉ mặc định)</h3>}
                      </div>
                      <div className="mini-address-name">
                        <>{data.gender === 'Male' && 'Ông'}{data.gender === 'Female' && 'Bà'}.</>
                        {data.nameCustomer}
                      </div>
                      <div className="mini-address-location">
                        <address>
                          {data.detailAddress}
                          <br />
                          {data.district.label}, {data.ward.label}
                          <br />
                          {data.city.label}
                          <br />
                          VN Telephone: {data.phoneNumber}
                          <br />
                        </address>
                      </div>

                      <Modal classNameModal={'anchor'} label={'Thay đổi'}>
                        <div className="address-popin">
                          <h1>Chỉnh sửa</h1>
                          <UpdateAddress onSubmit={handleUpdateAddressFormSubmit} data={data} />
                        </div>
                      </Modal>
                      <Modal classNameModal={'anchor'} label={'Xoá'}>
                        <p>Bạn có chắc muốn xoá địa chỉ?</p>
                        <button type="button" onClick={() => handleDeleteFormSubmit(data._id)}>
                          Xoá
                        </button>
                      </Modal>

                      {!data.default && (
                        <button type="button" className="anchor" onClick={() => handleUpdateStatusFormSubmit(data)}>
                          Chọn địa chỉ mặc định
                        </button>
                      )}
                    </li>
                  ))}
                </>
              </ul>
              <div className="form-row form-row-button">
                <Modal classNameModal={'address-create form-button btn btn-outline-primary'} label={'Tạo địa chỉ mới'}>
                  <div className="address-popin">
                    <h1>Tạo địa chỉ mới</h1>
                    <ModiffyAddress onSubmit={handleAddressFormSubmit} />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <CustomerSp />
        </div>
      </main>
    </>
  );
};

export default AccountOverView;
