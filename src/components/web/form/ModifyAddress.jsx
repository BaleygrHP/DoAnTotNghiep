import React from 'react';
import { useForm } from 'react-hook-form';
import InputCombobox from './inputCommon/inputCombobox';
import Input from './inputCommon/inputText';
import useLocationForm from './address/useLocationForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
function ModifyAddress(props) {
  const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);
  const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;
  const schema = yup.object().shape({
    nameCustomer: yup.string().required('Tên không hợp lệ'),
    detailAddress: yup.string().required('Địa chỉ không hợp lệ'),
    phoneNumber: yup.string().required('Số điện thoại không hợp lệ'),
  });
  const addressform = useForm({
    defaultValues: {
      gender: '',
      city: '',
      district: '',
      ward: '',
      nameCustomer: '',
      detailAddress: '',
      phoneNumber: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    values.city = selectedCity;
    values.district = selectedDistrict;
    values.ward = selectedWard;
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const handleOnChangeCity = (e) => {
    let index = e.target.selectedIndex;
    let label = e.target[index].text;
    let value = e.target.value;
    onCitySelect({ value: value, label: label });
  };
  const handleOnChangeDistrict = (e) => {
    let index = e.target.selectedIndex;
    let label = e.target[index].text;
    let value = e.target.value;

    onDistrictSelect({ value: value, label: label });
  };
  const handleOnChangeWard = (e) => {
    let index = e.target.selectedIndex;
    let label = e.target[index].text;
    let value = e.target.value;

    onWardSelect({ value: value, label: label });
  };
  const categoryOptions = [
    { label: 'Ông', value: 'Male' },
    { label: 'Bà', value: 'Female' },
  ];
  return (
    <form className="form-horizontal" onSubmit={addressform.handleSubmit(handleSubmit)}>
      <fieldset>
        <InputCombobox name="gender" form={addressform} label="Ông/Bà" dataForm={categoryOptions}/>
        <Input name="nameCustomer" form={addressform} placeholder="Họ và Tên *" />
        <Input name="phoneNumber" form={addressform} placeholder="Số điện thoại *" />
        <div className={`form-row  required form-row-select`}>
          <div className="form-field-wrapper">
            <label className="form-label">Tỉnh/Thành phố</label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <select
                  className="form-select  form-field required"
                  name="cityId"
                  key={`cityId_${selectedCity?.value}`}
                  onChange={handleOnChangeCity}
                  placeholder="Tỉnh/Thành"
                  value={selectedCity?.value}
                  defaultValue={selectedCity}
                  required
                >
                  <option className="hidden" value="">
                    Tỉnh/Thành phố
                  </option>
                  {cityOptions.map((tc, index) => (
                    <option className="form-selectOption" key={index} value={tc.value}>
                      {tc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className={`form-row  required form-row-select`}>
          <div className="form-field-wrapper">
            <label className="form-label">Quận/Huyện</label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <select
                  className="form-select  form-field required"
                  name="districtId"
                  key={`districtId${selectedDistrict?.value}`}
                  onChange={handleOnChangeDistrict}
                  disabled={districtOptions.length === 0}
                  placeholder="Quận"
                  value={selectedDistrict?.value}
                  defaultValue={selectedDistrict}
                  required
                >
                  <option className="hidden" value="">
                    Quận/Huyện
                  </option>
                  {districtOptions.map((tc, index) => (
                    <option className="form-selectOption" key={index} value={tc.value}>
                      {tc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className={`form-row  required form-row-select`}>
          <div className="form-field-wrapper">
            <label className="form-label">Phường/Xã</label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <select
                  className="form-select  form-field required"
                  name="wardId"
                  key={`wardId${selectedWard?.value}`}
                  onChange={handleOnChangeWard}
                  placeholder="Huyện"
                  disabled={wardOptions.length === 0}
                  value={selectedWard?.value}
                  defaultValue={selectedWard}
                  required
                >
                  <option className="hidden" value="">
                    Phường/Xã
                  </option>
                  {wardOptions.map((tc, index) => (
                    <option className="form-selectOption" key={index} value={tc.value}>
                      {tc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <Input name="detailAddress" form={addressform} placeholder="Địa chỉ *" />

        <p className="mandatory-fields">Tất cả các trường có dấu * là bắt buộc</p>
        <div className="form-row form-row-button">
          <button className="apply-button btn btn-outline-primary btn-full " type="submit" name="dwfrm_profile_address_edit" value="Apply">
            Lưu
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default ModifyAddress;
