/*
 * File: tickets.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 7 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import { useRouter } from 'next/router';
import { ROUTE_SUPPORT_NEW, ROUTE_SUPPORT_VIEW } from 'constants/routes';
import { ChevronLeftIcon, ChevronRightIcon, DipDownIcon } from '@mtcloud/ui/atoms/icons';
import RowsSelector from 'components/molecules/customer/billing/RowsSelector';
import { useEffect, useState } from 'react';
import api from 'api';
import { getAuth } from 'utils/auth';
import AuthGuard from 'components/utils/AuthGuard';
import moment from 'moment';

const Table = ({ headers, data }) => {
  const router = useRouter();
  const headerKeys = Object.keys(headers);

  return (
    <div className='overflow-x-auto overflow-y-hidden grow'>
      <table className='w-full'>
        <thead>
          <tr className='bg-[#F2F8FB] text-sm whitespace-nowrap'>
            {headerKeys.map((key, index) => (
              <th key={key} className={`${index ? 'text-left' : 'text-left'}`}>
                <div className='flex flex-row px-2 py-1'>
                  {headers[key]}
                  <DipDownIcon className='w-5 h-5' />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((row, index) => (
            <tr key={index} className='border-b border-b-[#F2F8FB] text-sm'>
              {headerKeys.map((key) => (
                <td
                  key={key}
                  className='cursor-pointer'
                  onClick={() => {
                    router.push(`${ROUTE_SUPPORT_VIEW}${row.id}`);
                  }}
                >
                  <div className='px-3 py-1'>{key === 'user' ? row[key]['name'] : row[key]}</div>
                </td>
              ))}
            </tr>
          ))}
          {!data.length && (
            <tr>
              <td colSpan={8} className='py-4 text-center'>
                You have no support tickets yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const Pagination = ({
  updatePageLimit,
  paginate,
  offset,
  resultsCount,
  totalResults,
}: {
  updatePageLimit: (num: number) => void;
  paginate: (param: string) => void;
  offset: number;
  resultsCount: number;
  totalResults: number;
}) => {
  return (
    <div className='flex justify-between p-3 text-xs text-gray-600 md:text-sm'>
      <div className='inline-flex items-center'>
        <div className='pr-2'>Rows per page</div>
        <RowsSelector updatePageLimit={updatePageLimit} />
      </div>
      <div className='inline-flex items-center'>
        <div className='mr-3'>
          {resultsCount} of {totalResults} items
        </div>
        <button
          className='disabled:opacity-25'
          onClick={() => paginate('prev')}
          disabled={offset === 0}
        >
          <ChevronLeftIcon className='w-5 h-5' />
        </button>
        <button
          className='disabled:opacity-25'
          onClick={() => paginate('next')}
          disabled={resultsCount === totalResults}
        >
          <ChevronRightIcon className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

const Tickets = () => {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);

  const router = useRouter();
  const auth = getAuth();

  const headers = {
    id: 'Support ID',
    dateTime: 'Date-Time',
    supportCategory: 'Support Category',
    createdVia: 'Created Via (Cloud Portal/ Support Call)',
    mobileNumber: 'Phone Number',
    comment: 'Message',
    status: 'Status',
  };
  const [tickets, setTickets] = useState([]);

  const updateLimit = (newState: number) => {
    setPageSize(newState);
  };

  const paginate = async (param: string) => {
    if (param === 'next') {
      fetchSupportTicket(pageNo + 1);
    } else {
      fetchSupportTicket(pageNo - 1);
    }
  };

  const fetchSupportTicket = async (page: number) => {
    try {
      const res = await api.support.findTicketsByUser(auth.externalid, page, pageSize);
      if (res) {
        setPageNo(res.offset);
        setPageSize(res.limit);
        setTotalResults(res.totalCount);
        setResultsCount(res.resultCount);

        if (page === 0) {
          setCurrentResultsCount(res.resultCount);
        } else if (page > pageNo) {
          setCurrentResultsCount(currentResultsCount + res.resultCount);
        } else {
          setCurrentResultsCount(currentResultsCount - resultsCount);
        }

        setTickets(
          res.supportTickets.map((tkt) => {
            return {
              id: tkt.id,
              dateTime: moment.utc(tkt.dateTime).local().format('YYYY-MM-DD HH:mm'),
              supportCategory: tkt.supportCategory,
              createdVia: tkt.createdVia,
              mobileNumber: tkt.phoneNumber,
              comment: tkt.messages.length ?? 0,
              status: tkt.status,
            };
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSupportTicket(pageNo);
  }, [pageSize]);

  return (
    <>
      <SEO title='Support' desc='Support Description' />
      <ItemDescription title='Support' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <div className='p-4 mx-auto max-w-7xl'>
        <div className='bg-[#FDFDFD] w-full rounded-md  shadow'>
          <div className='flex items-center justify-between p-3 text-mtBlue'>
            <h2 className='font-semibold '>Support History</h2>{' '}
            <button
              className='text-sm font-semibold bg-skyBlue border text-[#FDFDFD] px-3 py-1 rounded-md'
              onClick={() => router.push(ROUTE_SUPPORT_NEW)}
            >
              Create Support Ticket
            </button>
          </div>
          <Table headers={headers} data={tickets} />
          <Pagination
            updatePageLimit={updateLimit}
            paginate={paginate}
            resultsCount={currentResultsCount}
            totalResults={totalResults}
            offset={pageNo}
          />
        </div>
      </div>
    </>
  );
};

Tickets.Layout = MainLayout;

export default AuthGuard(Tickets);
