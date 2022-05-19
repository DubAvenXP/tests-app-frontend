import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// const baseURL = 'http://localhost:8080/api/v1';
const baseURL = 'https://technical-test-adubon.herokuapp.com/api/v1';

const api = axios.create({ baseURL });

export { api };
