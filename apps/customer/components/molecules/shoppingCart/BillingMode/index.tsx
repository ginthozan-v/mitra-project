/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 18 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { PropsStepper } from '@mtcloud/globals/types';
import React, { useEffect, useMemo, useState } from 'react';
import StInfoIcon from '@mtcloud/ui/atoms/icons/StInfoIcon';
import RadioButton from '@mtcloud/ui/atoms/RadioButton';
import PaymentTypes from './paymentTypes';
import StErrorIcon from '@mtcloud/ui/atoms/icons/StErrorIcon';
import { Form, Formik } from 'formik';
import CheckBox from '@mtcloud/ui/atoms/CheckBox';
import Button from '@mtcloud/ui/atoms/Button';
import ErrorMgs from '@mtcloud/ui/atoms/ErrorMessage';
import validatorFunctions from '@mtcloud/utils/validation/ShoppingCart';
import Link from 'next/link';
import { ROUTE_SETTINGS_POSTPAID } from 'constants/routes';
import TermsAndConditions from 'components/atoms/TermsAndConditions';
import { BillingDetail, Cart, POSTPAID_STATUS } from 'models';
import { GENERIC_CONTENT } from 'api/generic-contents';
import api from 'api';
import { useRouter } from 'next/router';
import useCurrency from '@/components/hooks/useCurrency';
import { BILLING_MODE } from '@/models';
import useStore from '@/store';
import { currencyList } from '@/constants/global';

const BillingMode = ({
  step,
  cart,
  updateStep,
  // payment,
  updatePayment,
}: { payment?: string } & {
  cart: Cart;
  updatePayment?: (x: string) => void;
} & PropsStepper) => {
  const { id: currencyId, symbol, updateCurrency } = useCurrency();
  const [showModal, setShowModal] = useState(false);
  const [, setModalName] = useState('');
  const [billingMode, setBillingMode] = useState(BILLING_MODE.PREPAID);
  const [paymentTypes, setPaymentTypes] = useState<any>([]);
  const [postpaidStatus, setPostpaidStatus] = useState<any>('');
  const [creditNote, setCreditNote] = useState<any>('');
  const [creditLimit, setCreditLimit] = useState<number>(10000000000);
  const [terms, setTerms] = useState({ title: { en: '', fr: '' }, content: { en: '', fr: '' } });
  const { locale } = useRouter();
  const setCurrencySwitchable = useStore((store) => store.setCurrencySwitchable);

  useEffect(() => {
    api.cart.getCreditNote(cart.visitId, currencyId.toUpperCase()).then((res) => {
      if (res?.creditNote) {
        setCreditNote(res?.creditNote);
      }
    });
  }, [currencyId]);

  useEffect(() => {
    api.genericContents.get(GENERIC_CONTENT.PAYMENT_TNC).then((res) => {
      setTerms({ title: res?.title, content: res?.terms });
    });
  }, []);

  const setModal = (name: string) => {
    setModalName(name);
    setShowModal(true);
  };

  const PostpaidMurMsg = useMemo(() => {
    return (
      <>
        {postpaidStatus === POSTPAID_STATUS.VERIFIED && billingMode === BILLING_MODE.POSTPAID && currencyId !== 'mur' && (
          <>
            <StInfoIcon className='w-6 h-6 text-[#3A7FFF]' />
            <p className='ml-2.5 text-[#3A7FFF] text-base font-medium'>Postpaid billing will be processed in MUR.</p>
          </>
        )}
      </>
    );
  }, [billingMode]);

  const saveUserData = (data: BillingDetail) => {
    const cartId = localStorage.getItem('cart');
    api.cart.updateBilling(cartId, data).then((res) => {
      if (res?.status !== 200) return;
      updateStep(step + 1);
    });
  };

  const getPostpaidSettings = async () => {
    const res = await api.user.settings.getPostpaidSettings();

    // res.postPaidBillingStatus = POSTPAID_STATUS.VERIFIED;
    setPostpaidStatus(res.postPaidBillingStatus);

    const paymentTypes = [...PaymentTypes];

    if (res.postPaidBillingStatus === POSTPAID_STATUS.PENDING) {
      paymentTypes[1].validation = 'Verification Pending.';
    } else if (res.postPaidBillingStatus === POSTPAID_STATUS.REJECTED) {
      paymentTypes[1].validation = 'Verification Rejected.';
    } else if (res.postPaidBillingStatus === POSTPAID_STATUS.VERIFIED) {
      if (cart?.pricing?.total > creditLimit) {
        paymentTypes[1].validation = 'Credit limit exceeded.';
      } else {
        paymentTypes[1].validation = '';
      }
    } else {
      paymentTypes[1].validation = 'Verification Required.';
    }

    setPaymentTypes(paymentTypes);
  };

  useEffect(() => {
    getPostpaidSettings();
  }, []);

  useEffect(() => {
    updatePayment(billingMode); // Initial selection
  }, [paymentTypes]);

  return (
    <Formik
      initialValues={{
        // billingMode: defaultPaymentType?.paymentType || '',
        billingMode: billingMode,
        isBillingTCAgreed: false,
      }}
      validate={(values: BillingDetail) => {
        return validatorFunctions.reduce((acc, func) => {
          const errorData = func(values);
          return { ...acc, ...errorData };
        }, {});
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        saveUserData(values);
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            billingMode: '',
            isBillingTCAgreed: false,
          },
        });
      }}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <Form
          className={`mx-auto max-w-7xl px-4 flex flex-col items-center ${isValid ? 'valid' : 'invalid'} ${dirty ? 'dirty' : 'pristine'}`}
          onSubmit={handleSubmit}
        >
          <div className='grow'>
            <h2 className='text-outerSpace text-5xl text-center'>Billing Mode</h2>

            {paymentTypes?.length > 0 && (
              <>
                {paymentTypes.map(({ id, paymentType, label, notification, checked, validation }) => (
                  <div className='flex flex-row' key={id}>
                    <div className='flex justify-between items-center px-2 md:px-4 rounded-md bg-[#F2F8FB] shadow mt-4 h-28 w-full md:w-5/6'>
                      <label className={`flex item-center md:w-1/2 ${validation && 'opacity-50'}`}>
                        <RadioButton
                          name='billingMode'
                          value={paymentType}
                          className='pt-1'
                          disabled={validation ? true : false}
                          checked={checked}
                          onClick={(e: any) => {
                            if (e.target.value === BILLING_MODE.POSTPAID) {
                              if (currencyId !== 'mur') {
                                updateCurrency('mur');
                              }
                              // localStorage.setItem('postpaid_checkout', '1');
                              setCurrencySwitchable(false);
                            } else {
                              // localStorage.removeItem('postpaid_checkout');
                              setCurrencySwitchable(true);
                            }
                            updatePayment(e.target.value);
                            setBillingMode(e.target.value);
                          }}
                        />
                        <span className='px-2 md:px-3'>{label}</span>
                      </label>

                      {validation ? (
                        <div className='flex items-center w-1/2 text-[#EA0000]'>
                          <StErrorIcon className='w-6 h-6 ' />
                          <span>{validation}</span>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {paymentType === BILLING_MODE.PREPAID && billingMode === BILLING_MODE.PREPAID && creditNote && (
                      <span className='mt-4 ml-2 w-1/6'>
                        Credit note:
                        <br />
                        {symbol} {creditNote.amount} applied.
                      </span>
                    )}
                  </div>
                ))}

                <div className='flex my-2.5'>
                  {postpaidStatus !== POSTPAID_STATUS.VERIFIED && (
                    <>
                      <StInfoIcon className='w-6 h-6 text-[#3A7FFF]' />
                      <p className='ml-2.5 text-[#3A7FFF] text-base font-medium'>
                        {postpaidStatus === POSTPAID_STATUS.PENDING && <text>Your request is currently being reviewed by our agents.</text>}
                        {(!postpaidStatus || postpaidStatus === POSTPAID_STATUS.REJECTED) && (
                          <>
                            You can request for postpaid billing through{' '}
                            <Link href={ROUTE_SETTINGS_POSTPAID}>
                              <a className='inline-flex items-center text-mtgreen font-semibold'>settings</a>
                            </Link>
                            .
                          </>
                        )}
                      </p>
                    </>
                  )}
                  {PostpaidMurMsg}
                </div>

                <div className='my-2.5'>
                  <div className='text-[#474747] text-base font-medium'>
                    <label>
                      <span className='inline-block align-middle px-1'>
                        <CheckBox name='isBillingTCAgreed' />
                      </span>
                      <span className='ml-3'>I confirm that I have read, confirm and agree to the </span>
                    </label>
                    <button className='text-mtgreen font-semibold' onClick={() => setModal('terms')} type='button'>
                      Terms and Conditions
                    </button>
                    .
                  </div>
                  <ErrorMgs name='privacy' />
                  {showModal && (
                    <TermsAndConditions
                      title={terms.title?.[locale]}
                      content={terms.content?.[locale]}
                      show={showModal}
                      setVisibility={setShowModal}
                    />
                  )}
                </div>
                <div className='flex flex-col items-center py-3'>
                  <Button
                    colorScheme='skyBlue'
                    textStyleScheme='semiboldMedium'
                    textColorScheme='white'
                    sizeScheme='md'
                    borderScheme='rounded'
                    onClick={() => {
                      ('');
                    }}
                    type='submit'
                    disabled={!(isValid && dirty)}
                  >
                    Confirm
                  </Button>
                </div>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BillingMode;
