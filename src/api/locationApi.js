import axios from 'axios';
import { PATHS } from 'constants/paths';
import { isMockMode, mockLocationApi } from 'mocks';

function mapLocations(data) {
  return data.map(({ id, name }) => ({ value: id, label: name }));
}

const locationApi = {
  async getCities() {
    if (isMockMode) {
      return mockLocationApi.getCities();
    }

    const response = await axios.get(PATHS.CITIES);
    return mapLocations(response.data.data);
  },

  async getDistricts(cityId) {
    if (isMockMode) {
      return mockLocationApi.getDistricts(cityId);
    }

    const response = await axios.get(`${PATHS.DISTRICTS}/${cityId}.json`);
    return mapLocations(response.data.data);
  },

  async getWards(districtId) {
    if (isMockMode) {
      return mockLocationApi.getWards(districtId);
    }

    const response = await axios.get(`${PATHS.WARDS}/${districtId}.json`);
    return mapLocations(response.data.data);
  },

  async getInitialLocation() {
    if (isMockMode) {
      return mockLocationApi.getInitialLocation();
    }

    const response = await axios.get(PATHS.LOCATION);
    return response.data;
  },
};

export default locationApi;
