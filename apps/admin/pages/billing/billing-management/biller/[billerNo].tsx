/*
 * File: [billerNo].tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 02 Aug 2022 12:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import SEO from 'components/utils/SEO';
import MainLayout from 'components/layouts/MainLayout';
import routing from 'constants/routingConfig';
import Badge from '@mtcloud/ui/atoms/Badge';
import Table from 'components/atoms/Table';
import { useEffect, useState } from 'react';
import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import { useRouter } from 'next/router';
import api from 'api';
import Modal from 'components/atoms/Modal';
import BillerIndividula from 'components/pages/billing/biller/individual';
import BillerEnterprise from 'components/pages/billing/biller/enterprise';
import Status from 'components/utils/Status';
import Currency from 'components/utils/Currency';
import moment from 'moment';
import Link from 'next/link';
import { EyeIcon } from '@mtcloud/ui/atoms/icons';

const columns = [
  {
    Header: 'Date of Bill',
    accessor: 'col1',
  },
  {
    Header: 'Bill Number',
    accessor: 'col2',
  },
  {
    Header: 'Billing Mode',
    accessor: 'col3',
  },
  {
    Header: 'Currency',
    accessor: 'col4',
  },
  {
    Header: 'Sub Total',
    accessor: 'col5',
  },
  {
    Header: 'Discounts',
    accessor: 'col6',
  },
  {
    Header: 'Credit Note',
    accessor: 'col7',
  },
  {
    Header: 'VAT',
    accessor: 'col8',
  },
  {
    Header: 'Total',
    accessor: 'col9',
  },
  {
    Header: 'Status',
    accessor: 'col10',
  },
  {
    Header: '',
    accessor: 'col11',
  },
];

const Biller = () => {
  const permission: RolePermission = usePermission(Permission.BILLING_MANAGEMENT);

  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [biller, setBiller] = useState(null);
  const [billingHistory, setBillingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [currentResultsCount, setCurrentResultsCount] = useState(0);

  const router = useRouter();
  const { billerNo }: any = router.query;

  const pageNext = () => {
    fetchBillingHistory(pageNo + 1, billerNo, '');
  };

  const pagePrevious = () => {
    fetchBillingHistory(pageNo - 1, billerNo, '');
  };

  const fetchBiller = async (id: string) => {
    try {
      let biller = await api.biller_management.getOne(id);
      setBiller(biller);
    } catch (error) {
      console.error(`🚀 ${error.name} `, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const fetchBillingHistory = async (page: number, id: string, searchKey?: string) => {
    setIsLoading(true);
    try {
      let res = await api.biller_management.billingHistory(id, page, pageSize, searchKey);
      const array = [];
      if (res.totalCount > 0) {
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

        res.records.map((data) => {
          array.push({
            col1: moment(data.dateOfBill).format('DD/MM/YYYY'),
            col2: data.billNumber,
            col3: data.billingMode.name,
            col4: data.currency.code,
            col5: Currency(data.subTotal, data.currency?.code),
            col6: Currency(data.discount, data.currency?.code),
            col7: Currency(data.creditNoteAmount, 'MUR'),
            col8: Currency(data.vat, data.currency?.code),
            col9: Currency(data.total, data.currency?.code),
            col10: (
              <div className='w-full mx-auto'>
                <Badge value={data.status.name} type={Status(data.status.code)} />
              </div>
            ),
            col11: (
              <div className='flex items-center gap-3'>
                <Link href={`${data.billingReferenceId}`}>
                  <a>
                    <EyeIcon className='w-5 h-5 mx-auto' />
                  </a>
                </Link>
              </div>
            ),
          });
        });
      }

      setBillingHistory(array);
      setIsLoading(false);
    } catch (error) {
      console.error(`🚀 ${error.name} `, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
      setBillingHistory([]);
      setIsLoading(false);
    }
  };

  const downloadReceipt = async () => {
    try {
      let res = await api.biller_management.downloadBilling(billerNo);

      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = `bill-${billerNo}.pdf`;
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

  const renderBill = (type: string) => {
    if (type === 'INDIVIDUAL') {
      return <BillerIndividula data={biller?.userBill} download={downloadReceipt} />;
    } else {
      return <BillerEnterprise data={biller?.userBill} download={downloadReceipt} />;
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (billerNo) {
      fetchBiller(billerNo);
      fetchBillingHistory(pageNo, billerNo, '');
    }
  }, [billerNo]);

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
          <div className='flex justify-center pt-3'>
            <button className='mt-confirmationBtnYes' onClick={closeModal}>
              Ok
            </button>
          </div>
        </Modal>
      )}
      <SEO title='Biller Management' desc='Biller Management Description' />
      <Privilege permission={permission?.read} message='view this page'>
        <div>{biller?.userBill ? renderBill(biller?.userType) : <></>}</div>
        <div className='p-5 mt-5 bg-white rounded-lg shadow'>
          <div className='flex items-center justify-between'>
            <h1>User Billing History</h1>
            <input
              type='text'
              placeholder='search by Date of Bill, Bill Number, Billing Mode, Currency, Status'
              className={`form-control appearance-none static w-[450px] h-10 rounded  border-b border-solid box-border self-stretch p-3 font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none focus:bg-white`}
              onChange={(e) => fetchBillingHistory(pageNo, billerNo, e.target.value)}
            />
          </div>

          <div className='mt-5'>
            <Table
              isLoading={isLoading}
              columns={columns}
              data={billingHistory}
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

Biller.auth = true;
export default Biller;

Biller.Layout = MainLayout;
Biller.routeSettings = routing.billingMgmt;
