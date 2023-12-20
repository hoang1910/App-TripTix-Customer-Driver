import {ECarTypeId} from '@enums/route';

const CarTypes = {
  [ECarTypeId.Limousine]: 'Limousine',
  [ECarTypeId.Bed]: 'Giường',
  [ECarTypeId.Chair]: 'Ghế',
};

const CarTypeArray = [
  {value: ECarTypeId.Limousine, label: CarTypes[ECarTypeId.Limousine]},
  {value: ECarTypeId.Bed, label: CarTypes[ECarTypeId.Bed]},
  {value: ECarTypeId.Chair, label: CarTypes[ECarTypeId.Chair]},
];

const TimeFilterId = {
  Morning: '1',
  Noon: '2',
  Evening: '3',
};

const TimeFilterArray = [
  {
    value: TimeFilterId.Morning,
    label: 'Morning (6:00 - 11:00)',
  },
  {
    value: TimeFilterId.Noon,
    label: 'Noon (12:00 - 15:00)',
  },
  {
    value: TimeFilterId.Morning,
    label: 'Evening (16:00 - 22:00)',
  },
];

const PriceTypeId = {
  Up: 'up',
  Down: 'down',
};

const PriceTypeArray = [
  {
    value: PriceTypeId.Up,
    label: 'Tăng dần',
  },
  {
    value: PriceTypeId.Down,
    label: 'Giảm dần',
  },
];

const BookingStatusId = {
  Paid: 'PAID',
  Cancel: 'CANCEL',
  Run: 'RUN',
  Finish: 'FINISH',
  Ready: 'READY',
  Checkin: 'CHECKIN',
  NoCheckin: 'NO_CHECKIN',
  NoShow: 'NO_SHOW',
};

export const BookingStatusLabel = {
  [BookingStatusId.Paid]: 'Đã thanh toán',
  [BookingStatusId.Cancel]: 'Huỷ',
  [BookingStatusId.Run]: 'Đang chạy',
  [BookingStatusId.Finish]: 'Đã hoàn thành',
  [BookingStatusId.Ready]: 'Chuẩn bị',
  [BookingStatusId.Checkin]: 'Đã checkin',
  [BookingStatusId.NoCheckin]: 'Chờ checkin',
  [BookingStatusId.NoShow]: 'Lỡ chuyến',
};

const StatusArray = [
  {
    value: null,
    label: 'Tất cả',
  },
  {
    value: BookingStatusId.Ready,
    label: BookingStatusLabel[BookingStatusId.Ready],
  },
  {
    value: BookingStatusId.Run,
    label: BookingStatusLabel[BookingStatusId.Run],
  },
  {
    value: BookingStatusId.Finish,
    label: BookingStatusLabel[BookingStatusId.Finish],
  },
];

export const StatusCustomerArray = [
  {
    value: null,
    label: 'Tất cả',
  },
  {
    value: BookingStatusId.Finish,
    label: BookingStatusLabel[BookingStatusId.Finish],
  },
  {
    value: BookingStatusId.Cancel,
    label: BookingStatusLabel[BookingStatusId.Cancel],
  },
  // {
  //   value: BookingStatusId.Checkin,
  //   label: BookingStatusLabel[BookingStatusId.Checkin],
  // },
  // {
  //   value: BookingStatusId.NoCheckin,
  //   label: BookingStatusLabel[BookingStatusId.NoCheckin],
  // },
  {
    value: BookingStatusId.NoShow,
    label: BookingStatusLabel[BookingStatusId.NoShow],
  },
];

const CompletedStatus = [
  BookingStatusId.Finish,
  BookingStatusId.Cancel,
  BookingStatusId.NoShow,
];
const UnfinishedStatus = [
  BookingStatusId.Paid,
  BookingStatusId.Run,
  BookingStatusId.Checkin,
  BookingStatusId.NoCheckin,
];
const CanCancelStatus = [BookingStatusId.Paid];

export {
  CarTypes,
  CarTypeArray,
  TimeFilterArray,
  PriceTypeArray,
  PriceTypeId,
  BookingStatusId,
  CompletedStatus,
  UnfinishedStatus,
  CanCancelStatus,
  StatusArray,
};
