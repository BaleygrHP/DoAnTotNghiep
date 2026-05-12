/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import locationApi from 'api/locationApi';

function useLocationForm(shouldFetchInitialLocation) {
  const [state, setState] = useState({
    cityOptions: [],
    districtOptions: [],
    wardOptions: [],
    selectedCity: null,
    selectedDistrict: null,
    selectedWard: null,
  });

  const { selectedCity, selectedDistrict } = state;

  useEffect(() => {
    (async function () {
      if (shouldFetchInitialLocation) {
        const { cityId, districtId, wardId } = await locationApi.getInitialLocation();
        const [cities, districts, wards] = await Promise.all([
          locationApi.getCities(),
          locationApi.getDistricts(cityId),
          locationApi.getWards(districtId),
        ]);

        setState({
          cityOptions: cities,
          districtOptions: districts,
          wardOptions: wards,
          selectedCity: cities.find((city) => city.value === cityId) || null,
          selectedDistrict: districts.find((district) => district.value === districtId) || null,
          selectedWard: wards.find((ward) => ward.value === wardId) || null,
        });

        return;
      }

      const cityOptions = await locationApi.getCities();
      setState((prevState) => ({
        ...prevState,
        cityOptions,
      }));
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (!selectedCity?.value) {
        return;
      }

      const districtOptions = await locationApi.getDistricts(selectedCity.value);
      setState((prevState) => ({
        ...prevState,
        districtOptions,
      }));
    })();
  }, [selectedCity]);

  useEffect(() => {
    (async function () {
      if (!selectedDistrict?.value) {
        return;
      }

      const wardOptions = await locationApi.getWards(selectedDistrict.value);
      setState((prevState) => ({
        ...prevState,
        wardOptions,
      }));
    })();
  }, [selectedDistrict]);

  function onCitySelect(option) {
    setState((prevState) => ({
      ...prevState,
      selectedCity: option,
      selectedDistrict: null,
      selectedWard: null,
      districtOptions: [],
      wardOptions: [],
    }));
  }

  function onDistrictSelect(option) {
    setState((prevState) => ({
      ...prevState,
      selectedDistrict: option,
      selectedWard: null,
      wardOptions: [],
    }));
  }

  function onWardSelect(option) {
    setState((prevState) => ({
      ...prevState,
      selectedWard: option,
    }));
  }

  return {
    state,
    setLocationState: setState,
    onCitySelect,
    onDistrictSelect,
    onWardSelect,
  };
}

export default useLocationForm;
