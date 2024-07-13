/*
 * File: cart.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 23 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { PropsStepper } from '@mtcloud/globals/types';
import AuthGuard from 'components/utils/AuthGuard';
import api from 'api';
import useCurrency from 'components/hooks/useCurrency';
import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import BillingMode from 'components/molecules/shoppingCart/BillingMode';
import CartList from 'components/molecules/shoppingCart/CartList';
import Purchase from 'components/molecules/shoppingCart/Purchase';
import Stepper from 'components/molecules/shoppingCart/Stepper';
import SEO from 'components/utils/SEO';
import { BILLING_MODE, Cart } from '@/models';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getAuth } from 'utils/auth';
import { currencyList } from '@/constants/global';
import { NETWORK_STATUS_CODES } from '@/constants';

function StepFilter({ step, updateStep, payment, updatePayment }: { payment?: string; updatePayment?: (x: string) => void } & PropsStepper) {
  const [cart, setCart] = useState<Cart>({} as Cart);
  const currency = useCurrency();
  const currencyTitle = currency.title;
  const auth = getAuth();

  const getCart = async () => {
    if (auth) {
      let cartRes = await api.cart.getUserCart(currencyTitle);
      if (cartRes !== undefined) {
        if (cartRes['response']?.data?.error_code === 'NO_ACTIVE_CARTS_FOR_USER') {
          await api.cart.createCart().then(async (res) => {
            if (res?.visitId) {
              localStorage.setItem('cart', res.visitId);
              cartRes = await api.cart.getUserCart(currencyTitle);
            }
          });
        }
        if (cartRes) {
          setCart(cartRes);
        }
      }
    }
  };

  useEffect(() => {
    // if (step > 0) {
    getCart();
    // }
  }, [currency.title, step]);

  useEffect(() => {
    if (step === 0 && cart.visitId) {
      api.cart.clearCreditNote(cart.visitId);
      api.cart.lockCart(cart.visitId, false);
    }
  }, [cart.visitId, step]);

  if (step === 0) {
    return <CartList currency={currency} cart={cart} updateCart={getCart} step={step} updateStep={updateStep} />;
  }
  if (step === 1) {
    return (
      <BillingMode
        step={step}
        cart={cart}
        updateStep={updateStep}
        // payment={payment}
        updatePayment={updatePayment}
      />
    );
  }
  if (step === 2) {
    return (
      <Purchase step={step} updateStep={updateStep} currency={currency} pricing={cart.pricing} payment={payment} updatePayment={updatePayment} />
    );
  }

  return null;
}

const CartComponent = () => {
  const [payment, setPayment] = useState<string>(BILLING_MODE.PREPAID);
  const { query, push } = useRouter();
  const [step, setStep] = useState<number>(+query?.step || 0);

  const updateState = (newState: number) => {
    push(`?step=${newState}`);
    setStep(newState);
  };

  const updatePaymentState = (newType: BILLING_MODE) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('billing-mode', newType);
    }
    setPayment(newType);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPayment(localStorage.getItem('billing-mode') || BILLING_MODE.PREPAID);
    }
  }, []);

  useEffect(() => {
    setStep(+query?.step || 0);
  }, [query?.step]);

  return (
    <>
      <SEO title='Cart' desc='Cart Description' />
      <ItemDescription title='Shopping Cart' />
      {step < 4 ? <Stepper step={step} updateStep={updateState} /> : null}

      <StepFilter step={step} updateStep={updateState} payment={payment} updatePayment={updatePaymentState} />
    </>
  );
};

CartComponent.Layout = MainLayout;

export default AuthGuard(CartComponent);
