import { DateTime } from "luxon";

export const createdAt = (dateNow) => {
  return DateTime.fromMillis(dateNow).toFormat("ccc',' DD',' t");
};
