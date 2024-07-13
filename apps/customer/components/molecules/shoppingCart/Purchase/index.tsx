/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 18 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { PropsStepper } from '@mtcloud/globals/types';
import OTPInput from '@mtcloud/ui/atoms/OTPField';
import Timer from '@mtcloud/ui/atoms/OTPField/Timer';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { validatePayment } from '@mtcloud/utils/validation/ShoppingCart';
import { PaymentData } from '@mtcloud/utils/validation/types';
import RadioButton from '@mtcloud/ui/atoms/RadioButton';
import Button from '@mtcloud/ui/atoms/Button';
import api from 'api';
import { useRouter } from 'next/router';
import MytPaymentForm from 'components/atoms/MytPaymentForm';
import { BILLING_MODE, PaymentGateway, PAYMENT_GATEWAY } from '@/models';
import ContinueShopping from 'components/atoms/ContinueShopping';
import { IMAGE_PATH } from '@/constants';
import BackToShoppingCart from '@/components/atoms/BackToShoppingCart';
import toast from 'react-hot-toast';
import { getAuth } from '@/utils/auth';

const Purchase = ({
  step,
  updateStep,
  currency,
  pricing,
  payment,
  updatePayment,
}: { currency: any; pricing: any; payment?: string } & {
  updatePayment?: (x: string) => void;
} & PropsStepper) => {
  const [isDisabled, setDisable] = useState(false);
  const [, setResend] = useState(false);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([]);
  const [gateway, setGateway] = useState<any>('');
  const { locale } = useRouter();
  const [otpValid, setOtpValidation] = useState<any>(true);
  const [creditNote, setCreditNote] = useState<any>('');
  const [paymentData, setPaymentData] = useState<{
    appId: string;
    merchantTradeNo: string;
    encryptedPayload: string;
    paymentType: string;
    signature: string;
  }>(null);
  const auth = getAuth();
  const { push } = useRouter();

  const sendOTP = () => {
    api.otp.sendOTP({ action: 'CHECKOUT', type: 'SMS_EMAIL' });
  };

  const mask = (content: string) => {
    if (content.includes('@')) {
      return '******' + content.substring(content.indexOf('@'));
    } else {
      return '******' + content.slice(-4);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('billing-mode') === BILLING_MODE.PREPAID) {
      api.cart.getCreditNote(localStorage.getItem('cart'), currency.title).then((res) => {
        if (res?.creditNote) {
          setCreditNote(res?.creditNote);
        }
      });
    }
  }, [currency.title]);

  useEffect(() => {
    if (payment === BILLING_MODE.POSTPAID) {
      sendOTP();
    } else {
      api.user.settings.getPaymentMethods().then((res) => {
        const defaultGateway = res.find((g) => g.preferred);
        setGateway(defaultGateway?.uniqueKey);
        setPaymentGateways(res);
      });
    }
  }, []);

  const updateState = (newState: boolean) => {
    setDisable(newState);
  };

  const updateResend = (newState: boolean) => {
    setResend(newState);
  };
  const saveUserData = (data: PaymentData) => {
    const cartId = localStorage.getItem('cart');
    api.cart
      .lockCart(cartId, true)
      .then((res) => {
        if (res.status !== 200) return;

        api.payment
          .initiatePayment(
            {
              cartId: cartId,
              amount: pricing.total,
              currencyCode: currency.title,
              langCode: locale,
            },
            gateway,
          )
          .then((res) => {
            localStorage.setItem('gateway', gateway);
            const paymentRes = res.data.data;
            if (gateway == PAYMENT_GATEWAY.SBM && paymentRes.formUrl) {
              console.log('payment gateware redirection', paymentRes.formUrl);
              window.location = paymentRes.formUrl;
            } else if (
              paymentRes.appId &&
              paymentRes.merchantTradeNo &&
              paymentRes.encryptedPayload &&
              paymentRes.paymentType &&
              paymentRes.signature
            ) {
              setPaymentData(paymentRes);
            }
          });
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  const onChangeOTP = async (otp: string) => {
    if (otp.length === 6) {
      setResend(false);
      const response = await api.register.verifyOTP({
        userId: auth.externalid,
        type: 'sms/email',
        code: otp,
      });

      if (response) {
        const cartId = localStorage.getItem('cart');
        api.cart
          .lockCart(cartId, true)
          .then((res) => {
            if (res.status !== 200) return;
            push(`/customer/checkout/complete?cart=${cartId}&success=${response}`);
          })
          .catch((error) => {
            toast.error('Something went wrong');
          });

        return;
      } else {
        setOtpValidation(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        gateway: 'MYT',
      }}
      validate={(values: PaymentData) => {
        return validatePayment(values);
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        saveUserData(values);
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            gateway: '',
          },
        });
      }}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <div className='flex flex-col-reverse justify-center mx-auto max-w-7xl md:flex-row'>
          <div className='w-full md:w-[362px] p-4 '>
            <div className='p-4 bg-gray-100 rounded-md shadow text-mtBlue'>
              <h2 className='text-2xl font-normal text-center '>Order Summary</h2>
              <div className='flex w-full'>
                <div className='w-1/2'>
                  <ul className='mt-5'>
                    <li className='text-outerSpace mt-9'>Sub Total</li>
                    <li className='text-lg font-medium text-outerSpace mt-9'>Discount </li>
                    {creditNote && <li className='font-medium text-outerSpace mt-9'>Credit Note </li>}
                    <li className='text-outerSpace mt-9'>VAT</li>
                    <li className='text-outerSpace mt-9'>Total</li>
                  </ul>
                </div>
                <div className='w-1/2'>
                  <ul className='mt-5 text-right'>
                    <li className='text-outerSpace mt-9'>
                      {currency.symbol} {pricing?.subTotal}
                    </li>
                    <li className='text-lg font-medium text-outerSpace mt-9'>
                      {currency.symbol} {pricing?.discount}
                    </li>
                    {creditNote && (
                      <li className='font-medium text-outerSpace mt-9'>
                        {currency.symbol} {creditNote.amount}
                      </li>
                    )}
                    <li className='text-outerSpace mt-9'>
                      {currency.symbol} {pricing?.vat}
                    </li>
                    <li className='text-outerSpace mt-9'>
                      {currency.symbol} {pricing?.total}
                    </li>
                  </ul>
                </div>
              </div>
              <p className='italic mt-10 text-sm text-gray-600'>
                * This is an estimated price for the complete duration, you will only be charged monthly. The amount charged monthly may differ with
                VAT calculations.
              </p>
              <div className='flex flex-col items-center'>
                <ContinueShopping style='link' className='mt-16' />
                <BackToShoppingCart style='link' />
              </div>
            </div>
          </div>
          <div className='md:w-[615px] p-4 '>
            <div className='p-4 bg-white rounded-md shadow text-mtBlue'>
              {payment === BILLING_MODE.PREPAID ? (
                <Form onSubmit={handleSubmit}>
                  <h2 className='px-6 mb-16 text-xl font-normal md:text-3xl md:font-medium'>Select Payment Method</h2>
                  {paymentGateways.map(({ id, title, uniqueKey, preferred, currencySupported, logo }) => (
                    <div className='flex flex-row justify-between px-4 md:px-6' key={id}>
                      <div className='pl-6 md:pl-14 flex items-center justify-between rounded-lg bg-[#F2F8FB] shadow mb-4 h-14 w-full md:w-[454px]'>
                        <div className='flex items-center'>
                          <RadioButton
                            name='gateway'
                            value={title[locale]}
                            className='shrink-0'
                            checked={preferred}
                            onClick={() => {
                              setGateway(uniqueKey);
                            }}
                          />

                          {logo !== null ? (
                            <div className='px-3 shrink-0 '>
                              <img src={`${IMAGE_PATH}/${logo}`} alt={title[locale]} className='w-9' />
                            </div>
                          ) : (
                            <span className='px-3'>{title[locale]}</span>
                          )}
                          {title[locale]}
                        </div>
                        <div className=''>
                          <ul className='pr-2 text-sm text-right'>
                            <li className='text-outerSpace'>{currencySupported}</li>
                          </ul>
                        </div>
                      </div>
                      {/* <span className='w-2 mb-4 ml-2 text-sm md:w-4'>{currencySupported}</span> */}
                    </div>
                  ))}

                  <div className='flex flex-row px-4 mt-4 md:px-6'>
                    <div className='flex justify-around items-center rounded-2xl bg-white text-2xl shadow-md mb-4 h-14 w-full md:w-[454px]'>
                      <div>Total</div>
                      <div>
                        {currency.symbol}
                        {pricing?.total}
                      </div>
                    </div>
                  </div>
                  {paymentGateways?.length > 0 && (
                    <div className='px-4 md:px-6'>
                      <Button
                        colorScheme='skyBlue'
                        textStyleScheme='semiboldMedium'
                        textColorScheme='white'
                        sizeScheme='wf'
                        className='h-12'
                        borderScheme='rounded'
                        onClick={() => {
                          ('');
                        }}
                        type='submit'
                        // disabled={!(isValid && dirty)}
                      >
                        Confirm Payment
                      </Button>
                    </div>
                  )}
                </Form>
              ) : (
                <div>
                  <h2 className='px-6 mb-16 text-xl font-normal text-center'>This purchase will be added to your monthly bill.</h2>
                  <div className='text-[#6F7482] text-base text-center font-medium p-1 md:p-3 w-full'>
                    Please enter the verification code you received on {mask(auth.mobileNo)} or {mask(auth.email)}
                    <OTPInput
                      autoFocus
                      disabled={isDisabled}
                      length={6}
                      className='m-3'
                      inputClassName='w-10 h-12 mr-2 md:mr-4 mb-4 md:mb-0 text-lg text-center rounded border border-solid border-[#003E5C] bg-[#F2F8FB]'
                      onChangeOTP={(otp) => onChangeOTP(otp)}
                      // userId={0}
                      // type=""
                    />
                    {!otpValid && <div className='pl-2 md:pl-3 my-5 text-[#EA0000] text-xs font-normal'>Please enter valid OTP.</div>}
                    <div className='text-[#6F7482] text-base font-medium'>
                      <Timer setDisable={updateState} setResend={updateResend} eventName='POSTPAID_PURCHASE' userId='' type='' />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {paymentData && (
              <MytPaymentForm
                appId={paymentData.appId}
                merchantTradeNo={paymentData.merchantTradeNo}
                encryptedPayload={paymentData.encryptedPayload}
                paymentType={paymentData.paymentType}
                signature={paymentData.signature}
              />
            )}
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Purchase;
