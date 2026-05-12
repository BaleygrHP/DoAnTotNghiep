/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputCombobox from './inputCommon/inputCombobox';
import Input from './inputCommon/inputText';
import useLocationForm from './address/useLocationForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import locationApi from 'api/locationApi';

const FETCH_TYPES = {
  DISTRICTS: 'FETCH_DISTRICTS',
  WARDS: 'FETCH_WARDS',
};

async function fetchLocationOptions(fetchType, locationId) {
  switch (fetchType) {
    case FETCH_TYPES.DISTRICTS:
      return locationApi.getDistricts(locationId);
    case FETCH_TYPES.WARDS:
      return locationApi.getWards(locationId);
    default:
      return [];
  }
}

function UpdateAddress(props) {
  const { data } = props;
  const { state, setLocationState, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);
  const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;

  const schema = yup.object().shape({
    nameCustomer: yup.string().required('Ten khong hop le'),
    detailAddress: yup.string().required('Dia chi khong hop le'),
    phoneNumber: yup.string().required('So dien thoai khong hop le'),
  });

  const addressform = useForm({
    defaultValues: {
      _id: data._id,
      city: data.city,
      district: data.district,
      ward: data.ward,
      nameCustomer: data.nameCustomer,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      default: data.default,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async function () {
      const [districts, wards] = await Promise.all([
        fetchLocationOptions(FETCH_TYPES.DISTRICTS, data.city.value),
        fetchLocationOptions(FETCH_TYPES.WARDS, data.district.value),
      ]);

      setLocationState((prevState) => ({
        ...prevState,
        selectedCity: data.city,
        selectedDistrict: data.district,
        selectedWard: data.ward,
        districtOptions: districts,
        wardOptions: wards,
      }));

      addressform.reset({
        _id: data._id,
        city: data.city,
        district: data.district,
        ward: data.ward,
        nameCustomer: data.nameCustomer,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        default: data.default,
      });
    })();
  }, [data]);

  const handleSubmit = async (values) => {
    values.city = selectedCity;
    values.district = selectedDistrict;
    values.ward = selectedWard;
    values._id = data._id;
    values.isdefault = data.default;

    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleOnChangeCity = (event) => {
    const index = event.target.selectedIndex;
    const label = event.target[index].text;
    const value = event.target.value;
    onCitySelect({ value, label });
  };

  const handleOnChangeDistrict = (event) => {
    const index = event.target.selectedIndex;
    const label = event.target[index].text;
    const value = event.target.value;
    onDistrictSelect({ value, label });
  };

  const handleOnChangeWard = (event) => {
    const index = event.target.selectedIndex;
    const label = event.target[index].text;
    const value = event.target.value;
    onWardSelect({ value, label });
  };

  const categoryOptions = [
    { label: 'Ong', value: 'Male' },
    { label: 'Ba', value: 'Female' },
  ];

  return (
    <form className="form-horizontal" onSubmit={addressform.handleSubmit(handleSubmit)}>
      <fieldset>
        <InputCombobox name="gender" form={addressform} label="Ong/Ba" dataForm={categoryOptions} />
        <Input name="nameCustomer" form={addressform} placeholder="Ho va Ten *" />
        <Input name="phoneNumber" form={addressform} placeholder="So dien thoai *" />
        <div className="form-row required form-row-select">
          <div className="form-field-wrapper">
            <label className="form-label">Tinh/Thanh pho</label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <select
                  className="form-select form-field required"
                  name="cityId"
                  key={`cityId_${selectedCity?.value}`}
                  onChange={handleOnChangeCity}
                  placeholder="Tinh/Thanh"
                  value={selectedCity?.value || ''}
                  defaultValue={selectedCity}
                >
                  <option className="hidden">Tinh/Thanh</option>
                  {cityOptions.map((city, index) => (
                    <option className="form-selectOption" key={index} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="form-row required form-row-select">
          <div className="form-field-wrapper">
            <label className="form-label">Quan/Huyen</label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <select
                  className="form-select form-field required"
                  name="districtId"
                  key={`districtId${selectedDistrict?.value}`}
                  onChange={handleOnChangeDistrict}
                  disabled={districtOptions.length === 0}
                  placeholder="Quan"
                  value={selectedDistrict?.value || ''}
                  defaultValue={selectedDistrict}
                >
                  <option className="hidden">Quan/Huyen</option>
                  {districtOptions.map((district, index) => (
                    <option className="form-selectOption" key={index} value={district.value}>
                      {district.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="form-row required form-row-select">
          <div className="form-field-wrapper">
            <label className="form-label">Phuong/Xa</label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <select
                  className="form-select form-field required"
                  name="wardId"
                  key={`wardId${selectedWard?.value}`}
                  onChange={handleOnChangeWard}
                  placeholder="Huyen"
                  disabled={wardOptions.length === 0}
                  value={selectedWard?.value || ''}
                  defaultValue={selectedWard}
                >
                  <option className="hidden">Phuong/Xa</option>
                  {wardOptions.map((ward, index) => (
                    <option className="form-selectOption" key={index} value={ward.value}>
                      {ward.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <Input name="detailAddress" form={addressform} placeholder="Dia chi *" />

        <p className="mandatory-fields">Tat ca cac truong co dau * la bat buoc</p>
        <div className="form-row form-row-button">
          <button className="apply-button btn btn-outline-primary btn-full " type="submit" name="dwfrm_profile_address_edit" value="Apply">
            Luu
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default UpdateAddress;
