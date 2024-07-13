/*
 * File: purchased-products.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 20 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';

import { ROUTE_PURCHASED_PRODUCTS } from 'constants/routes';
import SampleTable from 'components/molecules/customer/billing/SampleTable';
import AllProductsSelector from 'components/molecules/customer/billing/AllProductsSelector';
import Modal from 'components/atoms/Modal';
import { useEffect, useState } from 'react';
import ReviewWindow from 'components/molecules/customer/billing/ReviewWindow';
import Sidebar from 'components/molecules/Sidebar';
import MobileProductSelect from 'components/molecules/MobileSelect';
import menuItems from 'constants/billing/menuItems';
import api from 'api';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Pagination from 'components/molecules/Pagination';
import { Oval } from 'react-loader-spinner';
import AuthGuard from 'components/utils/AuthGuard';
import useStore from 'store';
import { NETWORK_STATUS_CODES } from '@/constants';

const headers = ['Purchased On', 'Product Name', 'Specification', 'Billing Type', 'Billing Mode', 'Unit Price', 'Valid Until'];

const catItems = [{ id: null, title: 'All Products' }];
type categoryList = { id: string; title: string };

const PurchasedProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useRouter();
  const [total, setTotal] = useState();
  const [resultCount, setResultCount] = useState(10);
  const [page, setPage] = useState(0);
  const [purchasedData, setPurchasedData] = useState([]);
  const [productId, setProductId] = useState();
  const [productName, setProductName] = useState();
  const [reviewData, setReviewData] = useState([]);
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(catItems[0]);
  const [isExpired, setExpired] = useState(null);
  const [isDisable, setDisable] = useState(false);

  const mgs = 'You have no purchased products.';

  const getCategories = async (limit: number) => {
    const cat = await api.billing.getCategories(locale, false);
    const exp = await api.billing.getPurchacedProducts(page, limit, null, true, locale);
    let items;
    if (exp[0]?.data.length !== 0) {
      items = [...catItems, ...cat, { id: null, title: 'Expired Products' }];
    } else {
      items = [...catItems, ...cat];
    }

    setCategories(items);
  };
  const getData = async (limit: number, expired: boolean) => {
    try {
      const res = await api.billing.getPurchacedProducts(page, limit, selected.id, expired, locale);
      if (typeof res !== 'string') {
        if (res[0].data.length !== 0) {
          const data = res[0].data.map(({ purchasedOn, productName, billingType, billingMode, specification, unitPrice, validUntil, productId }) => ({
            id: productId,
            purchasedOn: new Date(purchasedOn).toLocaleDateString(),
            productName,
            specification: specification.replaceAll('|', ' \r\n'),
            billingType,
            billingMode,
            unitPrice,
            validUntil: new Date(validUntil).toLocaleDateString(),
          }));
          const review = res[0].data.map(({ productId, status, rating, ratingDescription }) => ({
            productId,
            status,
            rating,
            ratingDescription,
          }));

          setPurchasedData(data);
          setReviewData(review);
          setTotal(res[0].count);
        } else {
          setPurchasedData([]);
          setReviewData([]);
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

  const updateLimit = (newState: number) => {
    setResultCount(newState);
    setPage(0);
    setDisable(false);
  };

  const updateSelect = (newState: categoryList) => {
    setSelected(newState);
  };

  const nextPage = (val: number, total: number) => {
    const x = total / (val + 1);

    if (purchasedData.length !== resultCount || x === resultCount) {
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

  const onActionClick = (val, status) => {
    if (status === 'UNEXPIRED') {
      console.log('route to product customization');
    } else if (status === 'EXPIRED' || status === 'UNEXPIRED_RATED' || status === 'EXPIRED_RATED') {
      setIsOpen(true);
      setProductId(val);
      purchasedData.forEach((i) => {
        if (i.id === val) {
          setProductName(i.productName);
        }
      });
    }
  };
  useEffect(() => {
    setLoading(true);
    getCategories(resultCount);
  }, [resultCount]);

  useEffect(() => {
    if (selected.title === 'Expired Products') {
      setExpired(true);
      setLoading(true);
      getData(resultCount, true);
    } else {
      setExpired(null);
      setLoading(true);
      getData(resultCount, null);
    }
  }, [selected]);

  useEffect(() => {
    setLoading(true);
    getData(resultCount, isExpired);
  }, [locale, page, resultCount]);

  return (
    <>
      <SEO title='Purchased-products' desc='Purchased-products Description' />
      <ItemDescription title='Billing Center' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <MobileProductSelect list={menuItems} select={menuItems[1]} />
      <div className='max-w-7xl mx-auto p-4 flex relative'>
        <Sidebar selected={ROUTE_PURCHASED_PRODUCTS} menuItems={menuItems} />

        <div className='grow overflow-hidden p-1'>
          <div className='py-4'>
            <AllProductsSelector items={categories} selected={selected} updateSelect={(val) => updateSelect(val)} />
          </div>
          <Modal isOpen={isOpen} closeModal={closeModal}>
            <ReviewWindow setIsOpen={setIsOpen} productId={productId} productName={productName} />
          </Modal>

          <SampleTable onActionClick={onActionClick} isAction headers={headers} data={purchasedData} review={reviewData} mgs={mgs} />
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

PurchasedProducts.Layout = MainLayout;

export default AuthGuard(PurchasedProducts);
