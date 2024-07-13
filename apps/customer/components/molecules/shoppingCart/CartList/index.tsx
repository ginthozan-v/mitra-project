/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 18 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect } from 'react';
import { PropsStepper } from '@mtcloud/globals/types';
import samplePayload from './samplePayload';
import ChevronRightIcon from '@mtcloud/ui/atoms/icons/ChevronRightIcon';
import { useState } from 'react';
import CircleCloseIcon from '@mtcloud/ui/atoms/icons/CircleCloseIcon';
import QuantityButton from 'components/atoms/QuantityButton';
import api from 'api';
import { Cart, CartItem, CartItem_View } from 'models';
import toast from 'react-hot-toast';
import ContinueShopping from 'components/atoms/ContinueShopping';
import { DeleteIcon } from '@mtcloud/ui/atoms/icons';
import BillingType from '@/components/atoms/BillingType';
import { NETWORK_STATUS_CODES } from '@/constants';

const CartList = ({ currency, cart, updateCart, step, updateStep }: PropsStepper & { currency: any; cart: Cart; updateCart: any }) => {
  const [promoStep, setPromoStep] = useState(0);
  const [showPromo, setShowPromo] = useState(true);

  const updateState = (newState: number) => {
    setPromoStep(newState);
  };
  useEffect(() => {
    updateCart();
  }, [currency.title]);

  const deleteCartItem = (cartItem: CartItem_View) => {
    api.cart.removeCartItem(cart.visitId, cartItem.id).then((res) => {
      updateCart();
      if (!NETWORK_STATUS_CODES.includes(res?.code)) {
        if (res.response.data?.error_code) {
          toast.error(res.response.data?.message);
        } else {
          toast.success(res.response.data?.message);
        }
      }
    });
  };

  const saveCartItem = (cartItem: CartItem_View) => {
    const payload = {
      isWrapper: cartItem.detail.isWrapper,
      region: cartItem.detail.region.code,
      series: cartItem.detail.series,
      infraType: cartItem.detail.infraType.code,
      az: cartItem.detail.availabilityZone.code,
      vCPU: cartItem.detail.vCPU,
      memory: cartItem.detail.memory,
      billingType: cartItem.summary.billingType,
      duration: cartItem.summary.duration,
      storages: cartItem.detail.storages.map((i) => ({
        diskType: i.diskType.code,
        size: i.size,
        isDefaultStorage: i.isDefault,
      })),
      networks: cartItem.detail.networks.map((i) => ({
        isDefault: i.isDefault,
        infraType: i.infraType.code,
        bandwidth: i.bandwidth,
        quantity: i.quantity,
      })),
      productId: cartItem.productId,
      quantity: cartItem.summary.quantity,
    };
    api.cart.addToSavedItems(payload).then((res) => {
      updateCart();
      if (res.error_code) {
        toast.error(res.message);
      } else {
        api.cart.removeCartItem(cart.visitId, cartItem.id).then((res) => {
          updateCart();
          if (res.error_code) {
            toast.error(res.message);
          } else {
            toast.success('Successfully added to saved items');
          }
        });
      }
    });
  };

  const updateCartItem = (cartItem: CartItem_View) => {
    const item = CartItem.get(cartItem);
    if (item.quantity == 0) {
      api.cart.removeCartItem(cart.visitId, cartItem.id).then((res) => {
        updateCart();
        if (!NETWORK_STATUS_CODES.includes(res?.code)) {
          if (res.response.data?.error_code) {
            toast.error(res.response.data?.message);
          } else {
            toast.success(res.response.data?.message);
          }
        }
      });
    } else {
      api.cart.updateCartItem(cart.visitId, cartItem.id, item).then((res) => {
        updateCart();
        if (!NETWORK_STATUS_CODES.includes(res?.code)) {
          if (res.response.data?.error_code) {
            toast.error(res.response.data?.message);
          } else {
            toast.success(res.response.data?.message);
          }
        }
      });
    }
  };

  return (
    <div className='mx-auto max-w-7xl px-4 flex flex-col md:flex-row w-full'>
      {cart && cart.items ? (
        <>
          {cart?.items?.length > 0 ? (
            <>
              <div className='grow'>
                {cart?.items?.map((item: CartItem_View) => (
                  <Cart_Item key={item.id} item={item} currency={currency} update={updateCartItem} remove={deleteCartItem} save={saveCartItem} />
                ))}
              </div>
              <div className='w-[360px] p-4 '>
                <div className='bg-gray-100 rounded-md shadow p-4 text-mtBlue'>
                  <h2 className='text-2xl font-semibold text-center '>Order Summary</h2>
                  <div className='flex w-full'>
                    <div className='w-1/2'>
                      <ul className='mt-5'>
                        <li className='text-outerSpace mt-4'>Sub Total</li>
                        <li className='text-outerSpace font-medium mt-4'>Discount </li>
                        <li className='text-outerSpace mt-4'>VAT</li>
                        <li className='text-outerSpace mt-4'>Total</li>
                      </ul>
                    </div>
                    <div className='w-1/2'>
                      <ul className='mt-5 text-right'>
                        <li className='text-outerSpace mt-4'>
                          {currency.symbol}
                          {cart?.pricing?.subTotal}
                        </li>
                        <li className='text-outerSpace font-medium mt-4'>
                          {currency.symbol}
                          {cart?.pricing?.discount}
                        </li>
                        <li className='text-outerSpace mt-4'>
                          {currency.symbol}
                          {cart?.pricing?.vat}
                        </li>
                        <li className='text-outerSpace mt-4'>
                          {currency.symbol}
                          {cart?.pricing?.total}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <StepFilter
                    promoStep={promoStep}
                    updatePromoStep={updateState}
                    samplePayload={samplePayload}
                    setShowPromo={setShowPromo}
                    showPromo={showPromo}
                  />

                  <button
                    className='bg-[#00aeef] py-1 text-white rounded-md font-semibold h-12 w-full mt-4'
                    onClick={() => {
                      updateStep(step + 1);
                    }}
                  >
                    Checkout
                  </button>
                  <div className='flex flex-col items-center'>
                    {/* <button className="bg-[#FFFFFF] py-1 font-semibold text-center text-base text-[#474747] rounded border-solid border-2 border-[#474747] box-border h-12 w-48 md:w-52 mt-4">
              Continue Shopping
            </button> */}
                    <ContinueShopping />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartList;

const EmptyCart = () => {
  return (
    <div className='text-center w-full'>
      <p className='text-xl mb-6'>Your cart is empty.</p>
      <ContinueShopping />
    </div>
  );
};

const Cart_Item = ({ item, currency, update, remove, save }: { item: CartItem_View; currency: any; update: any; remove: any; save: any }) => {
  const timeUnit = (unit, unitCount = 1) => {
    if (!unit) return;
    const timeUnit = unit?.slice(0, -2)?.toLowerCase();
    return unitCount == 1 ? timeUnit : `${timeUnit}s`;
  };

  const getDuration = (duration, type) => {
    if (!duration || !type) return;
    return `${duration} ${timeUnit(type, duration)}`;
  };

  const key = {
    price: {
      net: 'netPrice',
      hourly: 'unitPricePerHour',
      monthly: 'unitPricePerMonth',
      yearly: 'unitPricePerYear',
      ['3 yearly']: 'unitPricePer3Year',
    },
  };

  const getPrice = (pricing, billingType) => {
    if (!pricing || !billingType) return;
    return `${currency.symbol} ${pricing[key.price[billingType.toLowerCase()]]} / ${timeUnit(billingType)}`;
  };

  const changeBillingType = (billingType) => {
    item.summary.billingType = billingType;
    update(item);
  };

  const changeDuration = (duration) => {
    item.summary.duration = duration;
    update(item);
  };

  const changeQuantity = (quantity) => {
    item.summary.quantity = quantity;
    update(item);
  };

  return (
    <div className='p-4 rounded-md bg-[#F2F8FB] shadow mt-4' key={item.id}>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-[#474747] text-xl md:text-2xl '>{item.summary?.title}</h2>
          {item.summary?.displayItemCode && <h3 className='text-sonicSilver mt-1'>{item.summary?.displayItemCode}</h3>}
        </div>
        <div>
          <h2 className='text-right text-[#1A1A1A] font-normal text-2xl md:text-4xl -mt-1'>{getPrice(item.pricing, item.summary?.billingType)}</h2>
          <h3 className='text-right text-sonicSilver'>{item.discount?.amount}</h3>
        </div>
      </div>
      <div className='flex w-full justify-between space-x-6'>
        <div className='grow'>
          <ul className='mt-5 space-y-3'>
            <li className='text-outerSpace'>
              <div className='flex items-center'>
                <label className='w-[95px] min-w-[95px]'>Billing Type: </label>
                <div className='flex gap-1'>
                  <BillingType selection={item.summary?.billingType} changeBillingType={changeBillingType} />
                </div>
              </div>
            </li>
            <li className='text-outerSpace'>
              <div className='flex items-center'>
                <label className='w-[95px] min-w-[95px]'>Duration: </label>
                <QuantityButton quantity={item.summary?.duration} change={changeDuration} />
                {/* {getDuration(item.summary?.duration, item.summary?.billingType)} */}
              </div>
            </li>
            {/* <li className='text-outerSpace'>
              <div className='flex flex-col md:flex-row'>
                <label className='w-[95px] min-w-[95px]'>Quantity: </label>
                <QuantityButton quantity={item.summary?.quantity} change={changeQuantity} />
              </div>
            </li> */}
          </ul>
        </div>
      </div>
      <div className='flex items-center mt-6'>
        <div className='flex items-center space-x-3'>
          {/* <span className='cursor-pointer'>
            <EditIcon className='w-6 mx-auto cursor-pointer' />
          </span> */}
          <span
            className='cursor-pointer'
            onClick={() => {
              remove(item);
            }}
          >
            <DeleteIcon className='w-6 mx-auto' />
          </span>
        </div>
        <button
          className='flex items-center text-mtBlue font-semibold ml-auto'
          onClick={() => {
            save(item);
          }}
        >
          <span>Save for later</span>
          <ChevronRightIcon className='w-5 h-5 ml-1' />
        </button>
      </div>
    </div>
  );
};

function StepFilter({ promoStep, updatePromoStep, samplePayload, setShowPromo, showPromo }: any) {
  if (promoStep === 0) {
    return (
      <div className='flex justify-between p-4 rounded-md bg-[#F2F8FB] shadow mt-4'>
        <div>
          <h2 className='text-outerSpace text-2xl font-medium'>Promo Code: PC0001</h2>
          <div className='flex mt-1'>
            <button
              className='flex text-mtBlue font-semibold'
              onClick={() => {
                updatePromoStep(promoStep + 1);
              }}
            >
              <span>Remove promo applied</span>
              <ChevronRightIcon className='w-5 h-5 ml-1 mt-1' />
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (promoStep === 1) {
    return (
      <div className='flex justify-between p-4 rounded-md bg-[#F2F8FB] shadow mt-4'>
        <div>
          <h2 className='text-outerSpace text-xl font-normal'>{samplePayload.length} Promo codes available</h2>
          <div className='flex mt-1'>
            <button
              className='flex text-mtBlue font-semibold'
              onClick={() => {
                updatePromoStep(promoStep + 1);
              }}
            >
              <span>Add</span>
              <ChevronRightIcon className='w-5 h-5 ml-1 mt-1' />
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (promoStep === 2) {
    return (
      <div>
        {showPromo ? (
          <div className='flex justify-between p-4 rounded-md bg-[#F2F8FB] shadow mt-4'>
            <div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  className='text-lg'
                  onClick={() => {
                    setShowPromo(false);
                  }}
                >
                  <CircleCloseIcon className='w-5 h-5 text-[#00AEEF] ' />
                </button>
              </div>

              <h2 className='text-outerSpace text-2xl font-medium'>Select a Promo Code</h2>
              {samplePayload.map(({ id, offerName, promoCode }) => (
                <div className='flex mt-1' key={id}>
                  <span>{offerName}</span>
                  <div className='flex pl-8'>
                    <span>{promoCode} </span>
                    <button className='flex text-mtBlue font-semibold pl-3 '>
                      <span>Apply</span>
                      <ChevronRightIcon className='w-5 h-5 ml-1 mt-1' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }

  return null;
}
