import DateRangePicker, {
  DateRangePickerProps,
} from "@wojtekmaj/react-daterange-picker";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

export type DatePickerProps = DateRangePickerProps;

export const DatePicker = (props: DatePickerProps) => {
  return <DateRangePicker {...props} />;
};
