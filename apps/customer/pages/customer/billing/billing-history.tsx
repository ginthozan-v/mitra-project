/*
 * File: billing-history.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 20 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import { ROUTE_BILLING_HISTORY } from 'constants/routes';
import SampleTable from 'components/molecules/customer/billing/SampleTable';
import BillingHistoryHead from 'components/molecules/customer/billing/BillingHistoryHead';
import Sidebar from 'components/molecules/Sidebar';
import menuItems from 'constants/billing/menuItems';
import MobileProductSelect from 'components/molecules/MobileSelect';
import Modal from 'components/atoms/Modal';
import { useEffect, useState } from 'react';
import BillingHistoryWindow from 'components/molecules/customer/billing/BillingHistoryWindow';
import api from 'api';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Pagination from 'components/molecules/Pagination';
import AuthGuard from 'components/utils/AuthGuard';
import useStore from 'store';
import useCurrency from '@/components/hooks/useCurrency';
import { NETWORK_STATUS_CODES } from '@/constants';

const headers = ['Date of Bill', 'Bill Number', 'Billing Mode', 'Currency', 'Sub Total', 'VAT', 'Discount', 'Total'];
type billingCycles = { id: string; title: string };
const BillingHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useRouter();
  const [total, setTotal] = useState();
  const [resultCount, setResultCount] = useState(10);
  const [page, setPage] = useState(0);
  const [billingHistoryData, setBillingHistoryData] = useState([]);
  const [referenceId, setReferenceId] = useState();
  const [billingMode, setBillingMode] = useState();
  const [billTotal, setBillTotal] = useState([]);
  const [discount, setDiscount] = useState([]);
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));
  const [isDisable, setDisable] = useState(false);
  const [categories, setCategories] = useState<billingCycles[]>([
    {
      id: null,
      title: null,
    },
  ]);
  const [selected, setSelected] = useState<billingCycles>(categories[categories.length - 1]);
  const [mgs, setMgs] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const userCurrency = useCurrency();

  const updateLimit = (newState: number) => {
    setResultCount(newState);
    setPage(0);
    setDisable(false);
  };

  const updateSelect = (newState: billingCycles) => {
    setSelected(newState);
  };

  const updateKeyword = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  const nextPage = (val: number, total: number) => {
    const x = total / (val + 1);

    if (billingHistoryData.length !== resultCount || x === resultCount) {
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

  const getBillingCycle = async () => {
    try {
      const cat = await api.billing.getBillingCycles();
      setLoading(false);
      if (typeof cat !== 'string') {
        setCategories(cat.reverse());
        setSelected(cat[0]);
      } else {
        if (!NETWORK_STATUS_CODES.includes(cat)) {
          toast.error('Something went wrong', { duration: 8000 });
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  const onActionClick = (id, mode) => {
    setIsOpen(true);
    setReferenceId(id);
    setBillingMode(mode);
  };
  useEffect(() => {
    setLoading(true);
    getBillingCycle();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getBillingHistory = async (limit: number) => {
      try {
        if (keyword !== null) {
          setMgs(`You have no bills in ${selected.title} with this criteria`);
        } else {
          setMgs(`You have no bills in ${selected.title}`);
        }

        const res = await api.billing.getBillingHistory(page, limit, selected.id, keyword, locale);
        if (typeof res !== 'string') {
          if (res.length !== 0) {
            const data = res[0].records.map(
              ({ billingReferenceId, dateOfBill, billNumber, billingMode, currency, subTotal, discount, vat, total }) => ({
                id: billingReferenceId,
                dateOfBill: new Date(dateOfBill).toLocaleDateString(),
                billNumber,
                billingMode,
                currency,
                subTotal,
                vat,
                discount,
                total,
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

            let billDiscount;
            if (res[0].discount.length !== 0) {
              billDiscount = res[0].discount.map(({ currency, value }) => ({
                currency,
                value,
              }));
            } else {
              billDiscount = [{ currency: userCurrency.symbol, value: 0 }];
            }

            setBillingHistoryData(data);
            setBillTotal(billTotalVal);
            setDiscount(billDiscount);
            setTotal(res[0].totalCount);
          } else {
            setBillingHistoryData([]);
          }
        } else {
          if (!NETWORK_STATUS_CODES.includes(res)) {
            toast.error('Something went wrong', { duration: 8000 });
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong');
      }
    };
    if (selected) {
      getBillingHistory(resultCount);
    }
  }, [selected, keyword, locale, page, resultCount]);

  return (
    <>
      <SEO title='Billing-history' desc='Billing-history Description' />
      <ItemDescription title='Billing Center' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <MobileProductSelect list={menuItems} select={menuItems[2]} />
      <div className='max-w-7xl mx-auto p-4 flex'>
        <Sidebar selected={ROUTE_BILLING_HISTORY} menuItems={menuItems} />

        <div className='grow overflow-hidden p-1'>
          <BillingHistoryHead
            items={categories}
            selected={selected}
            updateSelect={updateSelect}
            updateKeyword={updateKeyword}
            billTotal={billTotal}
            discount={discount}
          />
          <Modal isOpen={isOpen} closeModal={closeModal} className='max-w-4xl bg-white'>
            <BillingHistoryWindow closeModal={closeModal} refId={referenceId} billingMode={billingMode} />
          </Modal>

          <SampleTable onActionClick={onActionClick} isAction={false} headers={headers} data={billingHistoryData} mgs={mgs} />
        </div>
      </div>
      <div className='max-w-7xl mx-auto md:pl-56 px-2 pb-6'>
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

BillingHistory.Layout = MainLayout;

export default AuthGuard(BillingHistory);
