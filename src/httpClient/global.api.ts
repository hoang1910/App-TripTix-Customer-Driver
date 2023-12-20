import httpClient from '.';
import {routes} from './routes';

const getProvinces = () => httpClient.get(routes.global.getProvinces);

const getNews = () => httpClient.get(routes.global.news);

const getConfig = () => httpClient.get(routes.global.getConfig);

export {getProvinces, getNews, getConfig};
