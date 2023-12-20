import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const timeStampToUtc = (time: number) => {
  return dayjs.unix(time).utc();
};
