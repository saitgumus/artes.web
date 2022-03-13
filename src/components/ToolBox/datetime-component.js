import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { getDateIsoDate } from "../../Types/Common";

/**
 *
 * @param {object} props
 */
export default function DateTimeComponent(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(props.defaultDate ? props.defaultDate:getDateIsoDate());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (props.onChangeDate) {
      props.onChangeDate(date);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin={"none"}
        fullWidth
        id="date-picker-inline"
        label={props.label ? props.label : "date picker"}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
