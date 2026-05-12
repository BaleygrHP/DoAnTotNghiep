import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import useLocationForm from '../address/useLocationForm';
import { TextField } from '@mui/material';

AddressCombobox.propTypes = {
  form: PropTypes.object.isRequired,
};

function AddressCombobox(props) {
  const { form } = props;
  const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);

  const { cityOptions, districtOptions, wardOptions } = state;
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const handleOnChangeCity = (e) => {
    let index = e.target.selectedIndex;
    let label = e.target[index].text;
    let value = e.target.value;
    setCity(value);
    onCitySelect({ value: value, label: label });
  };
  const handleOnChangeDistrict = (e) => {
    let index = e.target.selectedIndex;
    let label = e.target[index].text;
    let value = e.target.value;
    setDistrict(value);
    onDistrictSelect({ value: value, label: label });
  };
  const handleOnChangeWard = (e) => {
    let index = e.target.selectedIndex;
    let label = e.target[index].text;
    let value = e.target.value;
    setWard(value);
    onWardSelect({ value: value, label: label });
  };

  return (
    <>
      <Controller
        name="city"
        control={form.control}
        render={({ onChange }) => (
          <TextField
            fullWidth={true}
            label="Tỉnh/Thành phố"
            required
            select
            SelectProps={{ native: true }}
            variant="outlined"
            value={city}
            onChange={handleOnChangeCity}
            onBlur={onChange}
          >
            <option className="u-hidden"></option>
            {cityOptions.map((tc, index) => (
              <option key={index} value={tc.value}>
                {tc.label}
              </option>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="district"
        control={form.control}
        render={({ onChange }) => (
          <TextField
            fullWidth={true}
            label="Quận"
            disabled={districtOptions.length === 0}
            required
            select
            SelectProps={{ native: true }}
            variant="outlined"
            value={district}
            onChange={handleOnChangeDistrict}
            onBlur={onChange}
          >
            <option className="u-hidden"></option>
            {districtOptions.map((tc, index) => (
              <option key={index} value={tc.value}>
                {tc.label}
              </option>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="ward"
        control={form.control}
        render={({ onChange }) => (
          <TextField
            fullWidth={true}
            label="ward"
            disabled={wardOptions.length === 0}
            required
            select
            SelectProps={{ native: true }}
            variant="outlined"
            value={ward}
            onChange={handleOnChangeWard}
            onBlur={onChange}
          >
            <option className="u-hidden"></option>
            {wardOptions.map((tc, index) => (
              <option key={index} value={tc.value}>
                {tc.label}
              </option>
            ))}
          </TextField>
        )}
      />
    </>
  );
}

export default AddressCombobox;
