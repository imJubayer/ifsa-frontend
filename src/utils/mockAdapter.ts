/**
 * Adaptor for axios
 */

import AxiosMockAdapter from 'axios-mock-adapter';
import axios from './axiosService';

const services = new AxiosMockAdapter(axios, { delayResponse: 0 });
export default services;
