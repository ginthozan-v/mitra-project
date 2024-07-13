/*
 * File: saved.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 23 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import ItemSet from 'components/organisms/saved/ItemSet';
import AuthGuard from 'components/utils/AuthGuard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from 'api';
import useCurrency from 'components/hooks/useCurrency';
import toast from 'react-hot-toast';
import { ROUTE_CART, ROUTE_PRODUCTS } from 'constants/routes';
import { Oval } from 'react-loader-spinner';
import useStore from 'store';
import { NETWORK_STATUS_CODES } from '@/constants';

const Saved = () => {
  const { locale } = useRouter();
  const [savedItemData, setData] = useState([]);
  const [total, setTotal] = useState();
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));
  const currency = useCurrency();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const res = await api.savedItems.getSavedItems(currency.title);
        if (typeof res !== 'string') {
          const data = res.items.map(({ id, summary, detail, pricing, discount }) => ({
            id,
            title: summary.title,
            quantity: summary.quantity,
            billingType: summary.billingType,
            duration: summary.duration,
            billingStartDate: summary.billingStartDate,
            billingEndDate: summary.billingEndDate,
            detail: detail?.otherAttributes.map(({ key, value }) => ({ key, value })),
            pricing: pricing.netPrice,
            discount: discount.amount,
          }));

          setData(data);
          setTotal(res.total);
        } else {
          if (!NETWORK_STATUS_CODES.includes(res)) {
            toast.error('Something went wrong', { duration: 8000 });
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong', { duration: 8000 });
      }
    };
    getData();
  }, [currency.title, locale]);

  //delete item
  async function deleteItem(id) {
    setLoading(true);
    const res = await api.savedItems.removeSavedItem(id);
    if (res.status === 200) {
      location.reload();
    } else {
      setLoading(false);
      if (!NETWORK_STATUS_CODES.includes(res)) {
        toast.error('Something went wrong', { duration: 8000 });
      }
    }
  }
  //addToCart
  async function addToCart(id) {
    setLoading(true);
    const cart = await api.savedItems.getUserCart();

    if (typeof cart !== 'string') {
      if (!cart.visitId) {
        try {
          await api.savedItems.createCart();
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error('Something went wrong', { duration: 8000 });
        }
      }
    } else {
      setLoading(false);
      if (!NETWORK_STATUS_CODES.includes(cart)) {
        toast.error('Something went wrong', { duration: 8000 });
      }
    }

    setLoading(true);
    const res = await api.savedItems.addToCart(id);
    if (res.status === 200) {
      location.reload();
    } else {
      setLoading(false);
      if (!NETWORK_STATUS_CODES.includes(res)) {
        toast.error('Something went wrong', { duration: 8000 });
      }
    }
  }
  //buyNow
  async function buyNow(id) {
    setLoading(true);
    const cart = await api.savedItems.getUserCart();

    if (typeof cart !== 'string') {
      if (!cart.visitId) {
        try {
          await api.savedItems.createCart();
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error('Something went wrong', { duration: 8000 });
        }
      }
    } else {
      setLoading(false);
      if (!NETWORK_STATUS_CODES.includes(cart)) {
        toast.error('Something went wrong', { duration: 8000 });
      }
    }
    setLoading(true);
    const res = await api.savedItems.addToCart(id);
    if (res.status === 200) {
      setLoading(false);
      router.push(ROUTE_CART);
    } else {
      setLoading(false);
      if (!NETWORK_STATUS_CODES.includes(res)) {
        toast.error('Something went wrong', { duration: 8000 });
      }
    }
  }
  //buyAll
  async function buyAll() {
    setLoading(true);
    const res = await api.savedItems.addToCartAll();
    if (res.status === 200) {
      setLoading(false);
      router.push(ROUTE_CART);
    } else {
      setLoading(false);
      if (!NETWORK_STATUS_CODES.includes(res)) {
        toast.error('Something went wrong', { duration: 8000 });
      }
    }
  }
  return (
    <>
      <SEO title='Saved' desc='Saved Description' />
      <ItemDescription title='Saved Items' type='TitleBanner' image='/bgsample-mt.jpg' />

      <div>
        {savedItemData.length === 0 ? (
          <div className='text-center text-3xl font-medium py-20'>
            You have no saved items.
            <div className='flex mt-6 justify-center'>
              <button
                className='ml-4 py-1.5 px-4 bg-skyBlue text-white rounded-md font-semibold text-base'
                onClick={() => router.push(ROUTE_PRODUCTS)}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div>
            <ItemSet data={savedItemData} total={total} deleteItem={deleteItem} addToCart={addToCart} buyAll={buyAll} buyNow={buyNow} />
          </div>
        )}
      </div>
    </>
  );
};

Saved.Layout = MainLayout;

export default AuthGuard(Saved);
