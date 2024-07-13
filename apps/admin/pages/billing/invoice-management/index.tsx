import DatePicker from '@mtcloud/ui/atoms/DatePicker';
import { EyeIcon } from '@mtcloud/ui/atoms/icons';
import api from 'api';
import Modal from 'components/atoms/Modal';
import Privilege from 'components/atoms/privilege';
import Table from 'components/atoms/Table';
import MainLayout from 'components/layouts/MainLayout';
import Currency from 'components/utils/Currency';
import SEO from 'components/utils/SEO';
import { ROUTE_BILLING_INVOICE_MGMT_VIEW } from 'constants/routes';
import routing from 'constants/routingConfig';
import { statusError } from 'constants/types/statusError';
import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const InvoiceManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [billingList, setBillingList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState(moment().local().subtract(1, 'M').startOf('day').format());
  const [to, setTo] = useState(moment().local().endOf('day').format());

  const permission: RolePermission = usePermission(Permission.INVOICE_MANAGEMENT);

  const columns = [
    {
      Header: 'Transaction Date',
      accessor: 'col1',
    },
    {
      Header: 'Receipt Number',
      accessor: 'col2',
    },
    {
      Header: 'Email',
      accessor: 'col3',
    },
    {
      Header: 'Name',
      accessor: 'col4',
    },
    {
      Header: 'User Type',
      accessor: 'col5',
    },
    {
      Header: 'BRN',
      accessor: 'col6',
    },
    {
      Header: 'Bill Number',
      accessor: 'col7',
    },
    {
      Header: 'Payment Method',
      accessor: 'col8',
    },
    {
      Header: 'Transaction Type',
      accessor: 'col9',
    },
    {
      Header: 'Currency',
      accessor: 'col10',
    },
    {
      Header: 'Transaction Amount',
      accessor: 'col11',
    },
    {
      Header: '',
      accessor: 'col12',
    },
  ];

  const pageNext = () => {
    fetchInvoice(pageNo + 1);
  };

  const pagePrevious = () => {
    fetchInvoice(pageNo - 1);
  };

  const fetchInvoice = async (page: number) => {
    setIsLoading(true);
    try {
      const fromDate = new Date(from).toISOString();
      const toDate = new Date(to).toISOString();
      const response = await api.invoice_management.getAll(page, pageSize, fromDate, toDate, search);

      if (response) {
        setPageNo(response.offset);
        setPageSize(response.limit);
        setTotalResults(response.totalCount);
        setResultsCount(response.resultCount);

        if (page === 0) {
          setCurrentResultsCount(response.resultCount);
        } else if (page > pageNo) {
          setCurrentResultsCount(currentResultsCount + response.resultCount);
        } else {
          setCurrentResultsCount(currentResultsCount - resultsCount);
        }

        let array = [];
        response.records?.map((data) => {
          const rowData = {
            col1: moment(data.transactionDate).format('DD/MM/YYYY'),
            col2: data.receiptNumber,
            col3: data.email,
            col4: `${data.firstName} ${' '} ${data.lastName}`,
            col5: data.userType.name,
            col6: data.brn,
            col7: data.billNumber,
            col8: data.paymentMethod.en,
            col9: data.transactionType.en,
            col10: data.currency.code,
            col11: `${Currency(data.transactionAmount, data.currency.code)}`,
            col12: (
              <div className='flex items-center gap-3'>
                <Link href={`${ROUTE_BILLING_INVOICE_MGMT_VIEW}/${data.receiptNumber}`}>
                  <a>
                    <EyeIcon className='w-5 h-5 mx-auto' />
                  </a>
                </Link>
              </div>
            ),
          };

          array.push(rowData);
        });

        setBillingList(array);
      }
    } catch (error) {
      const status = error.response.status;
      console.error(`🚀 ${error.name} in '/cms/home/loyalityManagement/new' at line:74`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error',
        content: statusError[status] ?? 'Something went wrong!',
      });
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleExport = async () => {
    try {
      const fromDate = new Date(from).toISOString();
      const toDate = new Date(to).toISOString();
      const response = await api.invoice_management.downloadCSV(pageNo, pageSize, fromDate, toDate, search);
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = `invoice-${moment(fromDate).local().format('DD-MM-YYYY')}-to-${moment(toDate).local().format('DD-MM-YYYY')}.csv`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(`🚀 ${error.name} `, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  useEffect(() => {
    fetchInvoice(pageNo);
  }, [from, to, search]);

  return (
    <>
      <SEO title='InvoiceManagement' desc='InvoiceManagement Description' />
      <Privilege permission={permission?.read} message='view this page'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        <div>
          <div className='flex flex-wrap items-center justify-between gap-5'>
            <div className='flex items-center gap-5'>
              <DatePicker name='from' value={from} onChange={(value) => setFrom(moment(value).local().startOf('day').format())} />
              <DatePicker name='to' value={to} onChange={(value) => setTo(moment(value).local().endOf('day').format())} />
            </div>
            <div className='flex items-center gap-5'>
              <input
                type='text'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder='Receipt Number, Bill Number, Payment Method, Email, Name, User Type, BRN'
                className={`form-control appearance-none static w-[550px] h-10 rounded  border-b border-solid box-border self-stretch p-3 font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none focus:bg-white`}
              />
              <button onClick={() => handleExport()}>
                <a className='px-3 py-2 m-0 text-sm font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
                  Export
                </a>
              </button>
            </div>
          </div>

          <div className='mt-5'>
            <Table
              isLoading={isLoading}
              columns={columns}
              data={billingList}
              offset={pageNo}
              totalResults={totalResults}
              pageNext={pageNext}
              pagePrevious={pagePrevious}
              currentResultsCount={currentResultsCount}
            />
          </div>
        </div>
      </Privilege>
    </>
  );
};

InvoiceManagement.auth = true;
export default InvoiceManagement;

InvoiceManagement.Layout = MainLayout;
InvoiceManagement.routeSettings = routing.invoiceMgmt;
