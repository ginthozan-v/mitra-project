/* eslint-disable no-unused-vars */
/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PaymentHistoryHead = ({
  billTotal,
  mvpDate,
  sDate,
  eDate,
  updateStartDate,
  updateEndDate,
  updateKeyword,
}: {
  billTotal: { currency: string; value: number }[];
  mvpDate: Date;
  sDate: Date;
  eDate: Date;
  updateStartDate: (val: Date) => void;
  updateEndDate: (val: Date) => void;
  updateKeyword: (val: string) => void;
}) => {
  const [startDate, setStartDate] = useState(sDate);
  const [endDate, setEndDate] = useState(eDate);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    updateStartDate(new Date(start));
    if (end !== null) {
      updateEndDate(new Date(end));
    } else {
      updateEndDate(new Date());
    }
  };

  return (
    <div className='py-4 md:flex md:justify-between'>
      <div>
        <div className='font-semibold mb-1'>Transaction Date</div>
        <div className='flex md:flex-row flex-col'>
          <div>
            <div style={{ width: '300px' }}>
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={mvpDate}
                maxDate={new Date()}
                dateFormat={'MMM d, yyyy'}
                className=' w-full bg-[#F2F8FB] rounded-md px-3 py-2 border border-mtBlue/50'
              />
            </div>
          </div>
        </div>

        <input
          className='max-w-[300px] w-full bg-[#F2F8FB] rounded-md px-3 py-2 border border-mtBlue/50 mt-5'
          placeholder='Filter by'
          id='keyword'
          onChange={() => updateKeyword((document.getElementById('keyword') as HTMLInputElement).value)}
        />
        <p className='mt-1 text-gray-400 text-sm'>Filter by Receipt No, Bill Number, Payment Method</p>
      </div>

      <div className='flex flex-row'>
        <div className='text-sm'>Transaction Total : </div>
        <div className='flex flex-col pl-1 text-sm font-semibold text-right'>
          {billTotal.map(({ currency, value }) => (
            <div key={currency}>
              {currency} {value.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryHead;
