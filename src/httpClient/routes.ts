import {url} from './url';

const routes = {
  global: {
    getProvinces: url.baseUrl + '/province-city',
    news: url.baseUrl + '/news',
    getConfig: url.baseUrl + '/config-system',
  },
  authentication: {
    login: url.baseUrl + '/usersystem/login',
    register: url.baseUrl + '/usersystem/register',
    getUserInfo: url.baseUrl + '/usersystem/detail',
    sendOtp: url.baseUrl + '/otp/phone/send',
    confirmOtp: url.baseUrl + '/otp/valid',
    updateUserInfo: url.baseUrl + '/usersystem',
    changeCoin: url.baseUrl + '/usersystem/exchange-voucher-coins',
    putNotificationToken: url.baseUrl + '/usersystem/fcm-token-devide',
    changePassword: url.baseUrl + '/usersystem/change-password',
  },
  trip: {
    getRouteInfo: url.baseUrl + '/route',
    getTrip: url.baseUrl + '/trips',
    postBookTicket: url.baseUrl + '/booking',
    postBookTicketRound: url.baseUrl + '/booking/round-trip',
    getBooking: url.baseUrl + '/ticket',
    cancelBooking: url.baseUrl + '/bookings/cancel',
    feedback: url.baseUrl + '/ticket/vote-star-for-customers',
    getHistoryDriver: url.baseUrl + '/trips/history-driver',
    putCheckin: url.baseUrl + '/ticket/check-in-by-driver',
    startTrip: url.baseUrl + '/trips/start-trip-by-driver',
    getTripDetail: url.baseUrl + '/trips/detail',
    confirmFinishTrip: url.baseUrl + '/trips/confirm-finish-trip-by-driver',
    getSearchTrip: url.baseUrl + '/trips/search',
    historyTripDriver: url.baseUrl + '/trips/history-driver',
    driverHistory: url.baseUrl + '/trips/trip-finish-cancel-of-driver',
    driverReady: url.baseUrl + '/trips/trip-ready-of-driver',
    checkout: url.baseUrl + '/ticket/check-out-by-driver',
    getSeatUnavailable: url.baseUrl + './trips/find-seat',
    getTicketPrice: url.baseUrl + '/booking/get-tick-type-of-trip',
  },
  payment: {
    topUp: url.baseUrl + '/payment/create_payment-url',
    transactionHistory: url.baseUrl + '/payment-transaction',
  },
  notification: {
    getNotification: url.baseUrl + '/notification',
    seenNotification: url.baseUrl + '/notification/seen',
  },
};

export {routes};
