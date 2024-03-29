import {data} from '@screens/SelectRoute/constant';
import httpClient from '.';
import {routes} from './routes';

const baseURL = 'http://btbs.ap-southeast-1.elasticbeanstalk.com';

const getTrips = ({
  routeId,
  startTime,
}: {
  routeId: string;
  startTime: number;
}) => {
  return httpClient.get(
    `${routes.trip.getTrip}?routeId=${routeId}&startTime=${startTime}&status=READY&adminCheck=ACCEPT`,
  );
};

const getSearchTrips = ({
  fromId,
  toId,
  startTime,
}: {
  fromId: string;
  toId: string;
  startTime: number;
}) => {
  return httpClient.get(
    `${routes.trip.getSearchTrip}?codeDeparturePoint=${fromId}&codeDestination=${toId}&startTime=${startTime}`,
  );
};

const getRouteInfo = (departurePoint: string, destination: string) =>
  httpClient.get(
    `${routes.trip.getRouteInfo}?codeDeparturePoint=${departurePoint}&codeDestination=${destination}`,
  );

const postBookTicket = (data: {
  idTrip: number;
  idCustomer: number;
  listTicket: {
    codePickUpPoint: number;
    codeDropOffPoint: number;
    seatName: string[];
  }[];
}) => httpClient.post(routes.trip.postBookTicket, data);

const postBookTicketRound = (data: {
  idTrip: number;
  idCustomer: number;
  codePickUpPoint: number;
  codeDropOffPoint: number;
  seatName: string[];
  phoneGuest: string;
  nameGuest: string;
  idTrip2: number;
  codePickUpPoint2: number;
  codeDropOffPoint2: number;
  seatName2: string[];
}) => httpClient.post(routes.trip.postBookTicketRound, data);

const getBookings = (idCustomer: number) =>
  httpClient.get(`${routes.trip.getBooking}?idCustomer=${idCustomer}`);

const putCancelBooking = (idTicket: number) =>
  httpClient.put(routes.trip.cancelBooking, {
    idTicket,
  });

const putFeedback = (idTicket: number, star: number) => {
  return httpClient.put(routes.trip.feedback, {
    idTicket,
    star,
  });
};

const getHistoryDriver = (driverId: number, time: number) => {
  return httpClient.get(
    `${routes.trip.getHistoryDriver}?driverId=${driverId}&startTime=${time}`,
  );
};

const putCheckin = (idTrip: number, bookingCode: string) => {
  return httpClient.put(
    `${routes.trip.putCheckin}?idTrip=${idTrip}&ticketCode=${bookingCode}`,
  );
};

const putStartTrip = (idTrip: number) => {
  return httpClient.put(`${routes.trip.startTrip}?idTrip=${idTrip}`);
};

const getTripDetail = (idTrip: number) => {
  return httpClient.get(`${routes.trip.getTripDetail}?id=${idTrip}`);
};

const putConfirmSuccessTrip = (idTrip: number) => {
  return httpClient.put(routes.trip.confirmFinishTrip, {idTrip});
};

const getHistoryTripDriver = (
  driverId: number,
  status: string,
  page: number,
  totalPage: number,
) => {
  return httpClient.get(
    `${routes.trip.historyTripDriver}?driverId=${driverId}&status=${status}&pageIndex=${page}&pageSize=${totalPage}`,
  );
};

const getHistoryRoleDriver = (
  driverId: number,
  page: number,
  totalPage: number,
) => {
  return httpClient.get(
    `${routes.trip.driverHistory}?driverId=${driverId}&pageIndex=${page}&pageSize=${totalPage}`,
  );
};
const getReadyRoleDriver = (
  driverId: number,
  page: number,
  totalPage: number,
) => {
  return httpClient.get(
    `${routes.trip.driverReady}?driverId=${driverId}&pageIndex=${page}&pageSize=${totalPage}`,
  );
};

const getSeatUnavailable = (
  pickUpId: number,
  stationId: number,
  tripId: number,
  comboSeatStations: {
    codePickUpPoint: number;
    codeDropOffPoint: number;
    seatName: string[];
  }[],
) => {
  return httpClient.put(routes.trip.getSeatUnavailable, {
    idStationPickUp: pickUpId,
    idStationDropOff: stationId,
    idTrip: tripId,
    comboSeatStations,
  });
};

const getPriceTicket = (
  pickUpId: number,
  stationId: number,
  tripId: number,
) => {
  return httpClient.get(
    `${routes.trip.getTicketPrice}?codePickUpPoint=${pickUpId}&codeDropOffPoint=${stationId}&idTrip=${tripId}`,
  );
};

const putCheckout = (idTrip: number, idBooking: number) => {
  return httpClient.put(
    `${routes.trip.checkout}?idTrip=${idTrip}&ticketCode=${idBooking}`,
  );
};

export {
  getTrips,
  getRouteInfo,
  postBookTicket,
  getBookings,
  putCancelBooking,
  putFeedback,
  getHistoryDriver,
  putCheckin,
  putStartTrip,
  getTripDetail,
  putConfirmSuccessTrip,
  getSearchTrips,
  getHistoryTripDriver,
  postBookTicketRound,
  getHistoryRoleDriver,
  getReadyRoleDriver,
  putCheckout,
  getSeatUnavailable,
  getPriceTicket,
};
