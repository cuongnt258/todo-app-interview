import { Due } from "@models/Task";

const convertDateToDueObject = (dateString: Date | string): Due => {
  const date = new Date(dateString);

  const formattedDate = {
    lang: "en",
    is_recurring: false,
    string: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    }),
    date: date.toISOString().split("T")[0],
    timezone: null,
  };

  return formattedDate;
};

const formatDate = (dateString: Date | string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const DateUtils = { convertDateToDueObject, formatDate };
export default DateUtils;
