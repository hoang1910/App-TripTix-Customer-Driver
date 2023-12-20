import { EAccountType, EGender } from "@enums";

type TRegisterParams = {
  fullName: string;
  address: string;
  birthday: number;
  email: string;
  phone: string;
  gender: EGender;
  role: EAccountType;
  password: string;
};

export type { TRegisterParams };
