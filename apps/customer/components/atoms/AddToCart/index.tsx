/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: Monday, 8 August 2022 05:29 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import api from 'api';
import { CartItem } from 'models';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { isLoggedIn } from 'utils/auth';
import { getCookie, setCookie } from 'utils/cookie';

const AddToCart = ({
  className,
  product,
  quantity,
  isDisabled,
  callback,
  children,
}: {
  className?: string;
  product?: any;
  quantity?: number;
  isDisabled?: boolean;
  callback?: () => void;
  children?: any;
}) => {
  const { push } = useRouter();

  const addToCart = async () => {
    if (!isLoggedIn()) {
      push('/login?redirect=' + window.location.pathname);
    } else {
      if (typeof callback === 'function') {
        callback();
      }

      let visitId = localStorage.getItem('cart') || getCookie('cart');
      if (!visitId) {
        const res = await api.cart.createCart();

        if (res?.visitId) {
          visitId = res.visitId;
          if (isLoggedIn()) {
            localStorage.setItem('cart', visitId);
          } else {
            setCookie({ name: 'cart', value: visitId });
          }
        }
      }

      if (visitId) {
        const res = await api.cart.addToCart(visitId, new CartItem({ productId: product.productId, quantity }));
        if (res.error_code) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
        }
      }
    }
  };

  return (
    <button className={className} onClick={addToCart} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default AddToCart;
