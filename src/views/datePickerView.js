import React from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerView(props) {
    return (
      <div>
        <DatePicker
        selected={props.startDate}
        onChange={props.onChange}
        startDate={props.startDate}
        endDate={props.endDate}
        selectsRange
        />
      </div>
    );
  }

  export default DatePickerView;