/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 04 May 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { IMAGE_PATH } from '@/constants';
import { BinIcon } from '@mtcloud/ui/atoms/icons';
import api from 'api';
import { PaymentGateway, PAYMENT_GATEWAY } from 'models';
import { useRouter } from 'next/router';
// import Confirm from 'components/molecules/Confirm';
import React, { useEffect, useState } from 'react';
import useStore from 'store';

const Payment = () => {
  const { locale } = useRouter();
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>(null);
  const { loading, setLoading } = useStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }));
  // const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(null);
  // const [paymentMethodForRemoval, setPaymentMethodForRemoval] = useState(null);
  // const [confirm, setConfirm] = useState(false);
  // const [paymentMethodType, setPaymentMethodType] = useState(0);
  // const [defaultGateway, setDefaultGateway] = useState<any>({});

  const getPaymentMethods = async () => {
    const res = await api.user.settings.getPaymentMethods();

    if (res) {
      setPaymentGateways(res);
      if (res.length > 0) {
        let defaultGateway = {
          index: -1,
          gateway: null,
        };
        const dGateway = res.find((m) => m.preferred);

        if (!dGateway) {
          const mytMoney = res.find((m, i) => {
            if (m.uniqueKey === PAYMENT_GATEWAY.MYT) {
              m.preferred = true;
              defaultGateway = {
                index: i,
                gateway: m,
              };
              return m;
            }
          });
          selectDefaultPaymentGateway(mytMoney).then((result) => {
            if (result.status === 'SUCCESSFUL') {
              res.splice(defaultGateway.index, 1, defaultGateway.gateway);
              setPaymentGateways([...res]);
            }
          });
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const selectDefaultPaymentGateway = async (paymentGateway: PaymentGateway) => {
    setLoading(true);
    const res = await api.user.settings.updatePaymentMethod(paymentGateway.uniqueKey);
    getPaymentMethods();

    return res;
  };

  //#region Remove Payment Method...
  // const removePaymentMethod = async () => {
  //   api.user.settings.removePaymentMethod(paymentMethodForRemoval.id).then(async (res) => {
  //     setConfirm(false);
  //     if (paymentMethodForRemoval.id === defaultPaymentMethod.id) {
  //       await api.user.settings.updatePaymentMethod('My.T');
  //     }
  //     setPaymentMethodForRemoval(null);
  //     getPaymentMethods();
  //   });
  // };
  //#endregion Remove Payment Method...

  //#region Add Payment Method...
  // const selectPaymentMethodType = (type) => {
  //   return () => {
  //     setPaymentMethodType(type);
  //   };
  // };

  // const addPaymentMethod = () => {
  //   if (paymentMethodType == 0) {
  //     console.log('Add new credit/debit card.');
  //   } else {
  //     console.log('Add PayPal account.');
  //   }
  // };
  //#endregion Add Payment Method...

  const PaymentGateway = ({ paymentGateway }) => {
    return (
      <div className='px-4 flex items-center rounded-lg bg-[#F2F8FB] shadow h-14 w-full'>
        <div className='flex items-center'>
          <input
            className='w-4 h-4 shrink-0 '
            type='radio'
            name='prepaid'
            defaultChecked={paymentGateway!.preferred}
            onChange={() => selectDefaultPaymentGateway(paymentGateway)}
          />

          {paymentGateway.logo && (
            <div className='pl-3 shrink-0 '>
              <img src={`${IMAGE_PATH}/${paymentGateway.logo}`} alt='card-icon' className='w-9' />
            </div>
          )}
        </div>
        <div className='px-3 ttext-sm text-outerSpace'>{paymentGateway.title[locale]}</div>
        {/* <div className='ml-auto'>
        <button
          className='text-sm'
          onClick={() => {
            setConfirm(true);
            setPaymentMethodForRemoval(paymentMethod);
          }}
        >
          <BinIcon className='w-4 h-4 text-red-600' />
        </button>
      </div> */}
      </div>
    );
  };

  return (
    <>
      <div className='mx-auto w-full justify-center flex flex-col md:flex-row'>
        <div className='w-full' style={{ maxWidth: 615 }}>
          <div className='bg-white rounded-md shadow p-4 text-mtBlue'>
            <h2 className='text-lg md:text-3xl font-normal md:font-medium mb-3' onClick={getPaymentMethods}>
              Saved Payment Methods
            </h2>
            {paymentGateways && paymentGateways?.length !== 0 ? (
              <div className='space-y-4'>
                {paymentGateways?.map((paymentGateway) => (
                  <PaymentGateway paymentGateway={paymentGateway} key={paymentGateway.id} />
                ))}
              </div>
            ) : (
              <div className='py-3 flex flex-row justify-center'>
                <div className='flex items-center mb-4 w-full'>{paymentGateways === null ? 'Loading...' : 'No saved payment method found.'}</div>
              </div>
            )}

            {/* <div className='px-4 md:px-6 flex flex-row justify-center'>
              <div className='px-4 flex items-center rounded-lg bg-[#D4E6F2] shadow mb-4 h-14 w-full'>
                <div className='flex items-center'>
                  <input
                    className='w-4 h-4 shrink-0 '
                    type='radio'
                    name='prepaid'
                    defaultChecked={defaultPaymentMethod && defaultPaymentMethod.id === 'my.t'}
                    onChange={() => selectDefaultPaymentGateway(mytMoney)}
                  />
                  <span className='px-3 text-base'>MY.T. Money</span>
                </div>
                <div className='ml-auto'>Express Checkout</div>
              </div>
            </div> */}

            {/* <div>
              <h2 className='mt-12 px-6 text-lg md:text-3xl font-normal md:font-medium mb-3'>
                Add Payment Method
              </h2>
              <div className='px-4 md:px-6 flex flex-row justify-around w-full'>
                <div
                  onClick={selectPaymentMethodType(0)}
                  className={`${
                    paymentMethodType == 0 ? 'border-[#2563eb]' : 'border-transparent'
                  } border-2 cursor-pointer flex flex-col mr-2 md:mr-3 md:ml-6 items-center rounded-lg bg-[#F2F8FB] shadow-md w-1/2`}
                >
                  <span className='py-3 px-2 text-center text-base md:text-xl'>
                    Credit or Debit Card
                  </span>
                  <div className='p-3'>
                    <img src='/mastercard.png' alt='' className='w-10 md:w-16' />
                  </div>
                </div>
                <div
                  onClick={selectPaymentMethodType(1)}
                  className={`${
                    paymentMethodType == 1 ? 'border-[#2563eb]' : 'border-transparent'
                  } border-2 cursor-pointer flex flex-col ml-2 md:ml-3 md:mr-6 items-center rounded-lg bg-[#F2F8FB] shadow-md w-1/2`}
                >
                  <span className='py-3 px-2 text-center text-base md:text-xl'>PayPal</span>
                  <div className='p-3 mt-auto'>
                    <img src='/paypal.png' alt='' className='w-9 md:w-16' />
                  </div>
                </div>
              </div>
              <div className='text-xs text-center p-2'>
                Select the payment method you wish to add.
              </div>
              <div className='px-4 md:px-6'>
                <button
                  className='bg-[#00aeef] py-1 text-white rounded-md font-semibold h-12 w-full mt-4'
                  onClick={addPaymentMethod}
                >
                  Add
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* {confirm && (
        <Confirm
          open={confirm}
          heading='Remove Card'
          content={`Are you sure you want to delete ${paymentMethodForRemoval.maskedCardNumber} ${paymentMethodForRemoval.paymentType}?`}
          onConfirm={removePaymentMethod}
          onCancel={() => {
            setConfirm(false);
          }}
        />
      )} */}
    </>
  );
};

export default Payment;
