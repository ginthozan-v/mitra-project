/*
 * File: pyament-history.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 20 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';

import { ROUTE_PAYMENT_HISTORY } from 'constants/routes';
import SampleTable from 'components/molecules/customer/billing/SampleTable';
import PaymentHistoryHead from 'components/molecules/customer/billing/PaymentHistoryHead';
import MobileProductSelect from 'components/molecules/MobileSelect';
import Sidebar from 'components/molecules/Sidebar';
import menuItems from 'constants/billing/menuItems';
import { useEffect, useState } from 'react';
import Modal from 'components/atoms/Modal';
import TransactionReceiptWindow from 'components/molecules/customer/billing/TransactionReceiptWindow';
import { useRouter } from 'next/router';
import api from 'api';
import toast from 'react-hot-toast';
import Pagination from 'components/molecules/Pagination';
import { Oval } from 'react-loader-spinner';
import AuthGuard from 'components/utils/AuthGuard';
import useStore from 'store';
import useCurrency from '@/components/hooks/useCurrency';

const headers = ['Transaction Date', 'Receipt Number', 'Bill Number', 'Payment Method', 'Transaction Type', 'Currency', 'Transaction Amount'];

type totalBill = { currency: string; value: number };
const PyamentHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useRouter();
  const [total, setTotal] = useState();
  const [resultCount, setResultCount] = useState(10);
  const [page, setPage] = useState(0);
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [receiptNumberVal, setReceiptNumber] = useState();
  const [billTotal, setBillTotal] = useState<totalBill[]>([]);
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));
  const [serviceStartDate, setServiceStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [mgs, setMgs] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [isDisable, setDisable] = useState(false);
  const userCurrency = useCurrency();

  const updateKeyword = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  const updateLimit = (newState: number) => {
    setResultCount(newState);
    setPage(0);
    setDisable(false);
  };

  const updateStartDate = (sDate) => {
    setStartDate(sDate);
  };

  const updateEndDate = (eDate) => {
    setEndDate(eDate);
  };

  const nextPage = (val: number, total: number) => {
    const x = total / (val + 1);

    if (paymentHistoryData.length !== resultCount || x === resultCount) {
      setDisable(true);
      setPage(val);
    } else {
      setDisable(false);
      setPage(val + 1);
    }
  };

  const prevPage = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  const onActionClick = (val) => {
    setIsOpen(true);
    setReceiptNumber(val);
  };

  useEffect(() => {
    setLoading(true);
    const getStartDate = async () => {
      try {
        const stDate = await api.billing.getStartDate();

        setServiceStartDate(new Date(stDate.serviceStartDate));

        // setStartDate(new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate()));
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong');
      }
    };
    getStartDate();
  }, [endDate, locale, page, resultCount]);

  useEffect(() => {
    setLoading(true);
    const getData = async (limit: number) => {
      if (keyword !== null) {
        setMgs(
          `You have no receipts from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()} with this criteria`,
        );
      } else {
        setMgs(`You have no receipts from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}`);
      }

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 0);

      const res = await api.billing.getPaymentHistory(page, limit, keyword, startDate.toISOString(), endDate.toISOString(), locale);

      if (res.length !== 0) {
        const data = res[0].records.map(
          ({ transactionDate, billNumber, receiptNumber, paymentMethod, transactionType, currency, transactionAmount }) => ({
            id: receiptNumber,
            transactionDate: new Date(transactionDate).toLocaleDateString(),
            receiptNumber,
            billNumber,
            paymentMethod,
            transactionType,
            currency,
            transactionAmount,
          }),
        );

        let billTotalVal;
        if (res[0].total.length !== 0) {
          billTotalVal = res[0].total.map(({ currency, value }) => ({
            currency,
            value,
          }));
        } else {
          billTotalVal = [{ currency: userCurrency.symbol, value: 0 }];
        }

        setPaymentHistoryData(data);
        setBillTotal(billTotalVal);
        setTotal(res[0].totalCount);
      } else {
        setPaymentHistoryData([]);
      }

      setLoading(false);
    };
    getData(resultCount);
  }, [startDate, keyword, endDate, locale, page, resultCount]);

  return (
    <>
      <SEO title='Pyament-history' desc='Pyament-history Description' />
      <ItemDescription title='Billing Center' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <MobileProductSelect list={menuItems} select={menuItems[3]} />
      <div className='max-w-7xl mx-auto p-4 flex relative'>
        <Sidebar selected={ROUTE_PAYMENT_HISTORY} menuItems={menuItems} />

        <div className='grow overflow-hidden p-1'>
          <PaymentHistoryHead
            billTotal={billTotal}
            mvpDate={serviceStartDate}
            sDate={startDate}
            eDate={endDate}
            updateStartDate={updateStartDate}
            updateEndDate={updateEndDate}
            updateKeyword={updateKeyword}
          />
          <Modal isOpen={isOpen} closeModal={closeModal} className='max-w-2xl bg-white'>
            <TransactionReceiptWindow closeModal={closeModal} receiptNumber={receiptNumberVal} />
          </Modal>

          <SampleTable onActionClick={onActionClick} isAction={false} headers={headers} data={paymentHistoryData} mgs={mgs} />
        </div>
      </div>
      <div className='max-w-7xl mx-auto md:pl-56 px-2 '>
        <Pagination
          updatePageLimit={updateLimit}
          limit={resultCount}
          count={total}
          page={page}
          nextPage={nextPage}
          prevPage={prevPage}
          isDisable={isDisable}
        />
      </div>
    </>
  );
};

PyamentHistory.Layout = MainLayout;

export default AuthGuard(PyamentHistory);
