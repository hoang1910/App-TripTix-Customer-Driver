import httpClient from '.';
import {routes} from './routes';

const getNotification = (userId: number) => {
  return httpClient.get(
    `${routes.notification.getNotification}?idUser=${userId}`,
  );
};

const putSeenNotification = (userId: number) => {
  return httpClient.put(
    `${routes.notification.seenNotification}?idUser=${userId}`,
  );
};

export {getNotification, putSeenNotification};
