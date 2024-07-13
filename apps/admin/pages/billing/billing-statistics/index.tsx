/*
 * File: billing-status.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 29 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import api from 'api';

const yearlyMonthlyDropdown = [
  { value: 'yearly', label: 'Yearly' },
  { value: 'monthly', label: 'Monthly' },
];

const months: any[] = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const BillingStatus = () => {
  const [years, setYears] = useState([]);
  const [year, setYear] = useState({ label: 2022, value: 2022 });
  const [month, setMonth] = useState(months[0]);
  const [type, setType] = useState('yearly');
  const [response, setResponse] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);
  const permission: RolePermission = usePermission(Permission.BILLING_STATISTICS);

  const onChangeValue = (event) => {
    setType(event.target.value);
  };

  const getRevenue = () => {
    api.biller_management
      .revenueStatistics({
        reportGrouping: type.toUpperCase(),
        startingYear: +year.value,
        endingYear: +year.value,
      })
      .then((res) => {
        setResponse(res);
      });
  };

  const findRevenue = () => {
    const report = response.find(
      (r) => +r.group === (type === 'yearly' ? year.value : month.value),
    );

    if (report) {
      setRevenue(report.revenue);
    }
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = +year.value; y <= currentYear; y++) {
      years.push({ value: y, label: y });
    }
    setYears(years);
  }, []);

  useEffect(getRevenue, [type, year.value]);

  useEffect(() => {
    if (response.length > 0) {
      findRevenue();
    }
  }, [response, month.value]);

  return (
    <>
      <SEO title='Billing Statistics' desc='Billing Statistics Description' />
      <Privilege permission={permission?.read} message='view this page'>
        <div>
          <div className='flex flex-col gap-5 '>
            <div className='flex space-x-8'>
              <label>
                <input
                  className='float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:border-4 checked:border-blue-600 focus:outline-none'
                  type='radio'
                  value='yearly'
                  name='filter'
                  defaultChecked
                  onChange={onChangeValue}
                />{' '}
                <span className='font-semibold leading-none text-gray-800'>Yearly</span>
              </label>

              <label>
                <input
                  className='float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:border-4 checked:border-blue-600 focus:outline-none'
                  type='radio'
                  value='monthly'
                  name='filter'
                  onChange={onChangeValue}
                />{' '}
                <span className='font-semibold leading-none text-gray-800'> Monthly</span>
              </label>
            </div>
            <div className='flex space-x-3'>
              <Select
                id='year'
                instanceId='year'
                placeholder='Select Year'
                value={year}
                options={years}
                className={`flex-shrink-0 w-[200px] appearance-none static border border-solid box-border rounded focus:outline-none`}
                onChange={(value) => setYear(value)}
              />

              {type === 'monthly' && (
                <Select
                  id='month'
                  instanceId='month'
                  placeholder='Select Month'
                  value={month}
                  options={months}
                  className={`flex-shrink-0 w-[200px] appearance-none static border border-solid box-border rounded focus:outline-none`}
                  onChange={(value) => setMonth(value)}
                />
              )}
            </div>
          </div>

          <div className='mt-10'>
            <p className='text-xl text-gray-700'>
              Total Revenue: <span className='text-2xl font-bold'> {revenue.toFixed(2)} MUR</span>
            </p>
          </div>
        </div>
      </Privilege>
    </>
  );
};

BillingStatus.auth = true;
export default BillingStatus;

BillingStatus.Layout = MainLayout;
BillingStatus.routeSettings = routing.billingStatus;
