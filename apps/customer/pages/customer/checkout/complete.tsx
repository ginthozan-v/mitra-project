import api from 'api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Complete from 'components/atoms/CompletionIndividual';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import SEO from 'components/utils/SEO';
import MainLayout from 'components/layouts/MainLayout';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ROUTE_SUPPORT_NEW } from 'constants/routes';
import { BILLING_MODE } from '@/models';
import { isLoggedIn } from '@/utils/auth';

const CheckoutComplete = () => {
  const { query, push } = useRouter();
  const [status, setStatus] = useState<'PENDING' | 'COMPLETED' | 'FAIL' | ''>('');
  const [uniqueId, setUniqueId] = useState(null);
  const [billingMode, setBillingMode] = useState<BILLING_MODE>(null);

  const handleDownloadReceipt = async () => {
    try {
      const results = await api.billing.downloadPaymentReceipt(uniqueId);
      const url = window.URL.createObjectURL(new Blob([results]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', uniqueId + '.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutCart = () => {
    const cartId = localStorage.getItem('cart');
    api.cart.checkoutCart(cartId).then((res) => {
      if (res.status !== 200) return;
      localStorage.removeItem('cart');
      localStorage.removeItem('billing-mode');
      // api.cart.createCart().then((res) => {
      //   if (res?.visitId) {
      //     if (isLoggedIn()) {
      //       localStorage.setItem('cart', res.visitId);
      //     }
      //   }
      // });
    });
  };

  useEffect(() => {
    const gateway = localStorage.getItem('gateway');
    setTimeout(() => {
      const paymentId = (query.paymentUniqueId || query.orderId || '') + '';
      if (paymentId) {
        setBillingMode(BILLING_MODE.PREPAID);
        api.payment.checkStatus(paymentId, gateway).then((res) => {
          if (res.status !== 200) return;
          localStorage.removeItem('gateway');
          if (res?.data.paymentStatus == 'PENDING') {
            push('/customer/cart?step=2');
          } else {
            setStatus(res?.data.paymentStatus);

            if (res?.data.paymentStatus == 'COMPLETED') {
              setUniqueId(res?.data?.uniqueId);
              checkoutCart();
            }
          }
        });
      } else if (query.cart && query.success) {
        setBillingMode(BILLING_MODE.POSTPAID);
        setStatus('COMPLETED');
        checkoutCart();
      }
    }, 100);
  }, [query]);

  return (
    <>
      <SEO title='Checkout' desc='Cart Description' />
      <ItemDescription title='Checkout Complete' />

      {status === 'COMPLETED' && (
        <>
          <Complete
            title1={`${billingMode === BILLING_MODE.PREPAID ? 'Payment' : 'Purchase'} Success`}
            successMgs='Your purchase was successful, you will receive an email shortly.'
          />
          <div className='flex items-center justify-center gap-8 text-center'>
            {billingMode === BILLING_MODE.PREPAID && (
              <Link href='#'>
                <a
                  onClick={() => handleDownloadReceipt()}
                  className='box-border inline-flex items-center justify-center w-48 h-12 mt-4 text-base font-semibold text-center text-white rounded bg-mtBlue md:w-52'
                >
                  Download Receipt
                </a>
              </Link>
            )}
            <Link href='/'>
              <a className='box-border inline-flex items-center justify-center w-48 h-12 mt-4 text-base font-semibold text-center bg-white border-2 border-solid rounded text-mtBlue border-mtBlue md:w-52'>
                Done
              </a>
            </Link>
          </div>
        </>
      )}
      {['FAIL', 'PENDING'].includes(status) && (
        <>
          {status === 'FAIL' ? (
            <Complete
              title1={`${billingMode === BILLING_MODE.PREPAID ? 'Payment' : 'Purchase'} Unsuccessful`}
              successMgs='Sorry, something went wrong. Please contact our customer support center.'
            />
          ) : (
            <Complete
              title1={`Payment Pending`}
              successMgs='The payment for your purchase is currently being processed. You will receive an email once the processing is complete.'
            />
          )}

          <div className='flex items-center justify-center gap-8 text-center'>
            <Link href={ROUTE_SUPPORT_NEW}>
              <a className='box-border inline-flex items-center justify-center w-48 h-12 mt-4 text-base font-semibold text-center text-white rounded bg-mtBlue md:w-52'>
                Support
              </a>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

CheckoutComplete.Layout = MainLayout;

export default CheckoutComplete;
