import {EGender, EAccountType} from '@enums';

const ListGender = [
  {label: 'Nam', value: EGender.Male},
  {label: 'Nữ', value: EGender.Female},
];

const RoleCanLogin = [
  EAccountType.Customer,
  EAccountType.Driver,
  EAccountType.Staff,
];

export {ListGender, RoleCanLogin};
