import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';

const DateTimePicker = ({ name, value, errors, touched, onChange }: any) => {
  const [dateWithInitialValue, setDateWithInitialValue] = useState<Dayjs | null>(null);

  let borderColor = 'ring-[#003e5c]';
  if (errors && touched) {
    borderColor = 'ring-[#EA0000]';
  }

  const handleOnChange = (date: any) => {
    setDateWithInitialValue(date);
    onChange(date);
  };

  useEffect(() => {
    if (value) {
      setDateWithInitialValue(dayjs(value));

      setTimeout(function () {
        onChange(dayjs(value));
      }, 500);
    } else {
      setDateWithInitialValue(dayjs());
    }
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          className={`form-control appearance-none static w-full h-10 bg-[#f2f8fb] border ring-1 border-solid ${borderColor} box-border rounded self-stretch p-3 my-1.5 font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none focus:bg-white`}
          value={dateWithInitialValue}
          onChange={(newValue) => {
            handleOnChange(newValue);
          }}
          onError={console.log}
          minDate={dayjs()}
          inputFormat='YYYY/MM/DD hh:mm a'
          mask='____/__/__ __:__ _M'
          renderInput={(params) => (
            <TextField
              hiddenLabel
              sx={{
                '& fieldset': { border: 'none' },
                '& input': {
                  fontSize: '0.875rem',
                  fontWeight: 200,
                  color: '#535353',
                  height: 'auto',
                },
              }}
              size='small'
              fullWidth
              {...params}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateTimePicker;
