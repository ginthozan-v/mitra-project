/*
 * File: payment-methods.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 08 July 2022 12:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import routing from 'constants/routingConfig';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import Forms from 'components/atoms/Forms';

import api from 'api';
import Loader from 'components/molecules/Loader';
import Modal from 'components/atoms/Modal';

import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Image from 'next/image';
import { NETWORK_STATUS_CODES } from '../../../../constants';
import envConfig from '@/config';

import * as Yup from 'yup';

export const formFieldData = [
  {
    sectionTitle: 'Payment method my.t Money',
    fields: [
      {
        label: 'Title EN',
        name: 'myt_titleEN',
        fieldType: 'text',
        placeholder: 'Title EN',
      },
      {
        label: 'Title FR',
        name: 'myt_titleFR',
        fieldType: 'text',
        placeholder: 'Title FR',
      },
      {
        label: 'Logo',
        name: 'myt_logo',
        accept: '.jpg,.jpeg,.png',
        fieldType: 'image',
      },
      {
        label: 'Transaction Limit',
        name: 'myt_transaction_limit',
        fieldType: 'number',
      },
      {
        label: 'Transaction currency supported',
        name: 'myt_supported_currency',
        fieldType: 'checkbox-group',
        fields: [
          {
            name: 'myt_supported_currency',
            label: 'MUR',
          },
          {
            name: 'myt_supported_currency',
            label: 'USD',
          },
          {
            name: 'myt_supported_currency',
            label: 'EUR',
          },
        ],
      },

      {
        label: 'isActive',
        name: 'myt_active',
        fieldType: 'toggle',
      },
    ],
  },
  {
    sectionTitle: 'Payment method SBM',
    fields: [
      {
        label: 'Title EN',
        name: 'sbm_titleEN',
        fieldType: 'text',
        placeholder: 'Title EN',
      },
      {
        label: 'Title FR',
        name: 'sbm_titleFR',
        fieldType: 'text',
        placeholder: 'Title FR',
      },
      {
        label: 'Logo',
        name: 'sbm_logo',
        accept: '.jpg,.jpeg,.png',
        fieldType: 'image',
      },
      {
        label: 'Transaction Limit',
        name: 'sbm_transaction_limit',
        fieldType: 'number',
      },
      {
        label: 'Transaction currency supported',
        name: 'sbm_supported_currency',
        fieldType: 'checkbox-group',
        fields: [
          {
            name: 'sbm_supported_currency',
            label: 'MUR',
          },
          {
            name: 'sbm_supported_currency',
            label: 'USD',
          },
          {
            name: 'sbm_supported_currency',
            label: 'EUR',
          },
        ],
      },
      {
        label: 'isActive',
        name: 'sbm_active',
        fieldType: 'toggle',
      },
    ],
  },
  {
    sectionTitle: 'Payment method PayPal',
    fields: [
      {
        label: 'Title EN',
        name: 'paypal_titleEN',
        fieldType: 'text',
        placeholder: 'Title EN',
      },
      {
        label: 'Title FR',
        name: 'paypal_titleFR',
        fieldType: 'text',
        placeholder: 'Title FR',
      },
      {
        label: 'Logo',
        accept: '.jpg,.jpeg,.png',
        name: 'paypal_logo',
        fieldType: 'image',
      },
      {
        label: 'Transaction Limit',
        name: 'paypal_transaction_limit',
        fieldType: 'number',
      },
      {
        label: 'Transaction currency supported',
        name: 'paypal_supported_currency',
        fieldType: 'checkbox-group',
        fields: [
          {
            name: 'paypal_supported_currency',
            label: 'MUR',
          },
          {
            name: 'paypal_supported_currency',
            label: 'USD',
          },
          {
            name: 'paypal_supported_currency',
            label: 'EUR',
          },
        ],
      },
      {
        label: 'isActive',
        name: 'paypal_active',
        fieldType: 'toggle',
      },
    ],
  },
];

export const schema = {
  myt_titleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  myt_titleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  myt_logo: Yup.string().required('This field cannot be empty'),
  myt_transaction_limit: Yup.number()
    .typeError('you must specify a number')
    .min(1, 'Transaction limit must be greater than zero.')
    .required('This field cannot be empty'),
  sbm_titleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  sbm_titleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  sbm_logo: Yup.string().required('This field cannot be empty'),
  sbm_transaction_limit: Yup.number()
    .typeError('you must specify a number')
    .min(1, 'Transaction limit must be greater than zero.')
    .required('This field cannot be empty'),
  paypal_titleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  paypal_titleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  paypal_logo: Yup.string().required('This field cannot be empty'),
  paypal_transaction_limit: Yup.number()
    .typeError('you must specify a number')
    .min(1, 'Transaction limit must be greater than zero.')
    .required('This field cannot be empty'),
  myt_supported_currency: Yup.array().min(1, 'This field cannot be empty'),
  sbm_supported_currency: Yup.array().min(1, 'This field cannot be empty'),
  paypal_supported_currency: Yup.array().min(1, 'This field cannot be empty'),
};

const NewPaymentMethod = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const permission: RolePermission = usePermission(Permission.PAYMENT_METHODS);

  const fetchPaymentMethods = async () => {
    try {
      let payment = await api.payment_method.getAll(0, 3);
      payment = payment.content;
      const MYT = payment.filter((x) => x.uniqueKey === 'MYTMoney')[0];
      const SBM = payment.filter((x) => x.uniqueKey === 'IPAY')[0];
      const PAYPAL = payment.filter((x) => x.uniqueKey === 'PAYPAL')[0];

      if (payment) {
        setInitialValue({
          // MYT
          myt_id: MYT?.id,
          myt_titleEN: MYT?.title.en,
          myt_titleFR: MYT?.title.fr,
          myt_logo: MYT?.logo,
          myt_transaction_limit: MYT?.transactionLimit,
          myt_active: MYT?.active,
          myt_supported_currency: MYT?.currencySupported.split(','),

          //SBM
          sbm_id: SBM?.id,
          sbm_titleEN: SBM?.title.en,
          sbm_titleFR: SBM?.title.fr,
          sbm_logo: SBM?.logo,
          sbm_transaction_limit: SBM?.transactionLimit,
          sbm_active: SBM?.active,
          sbm_supported_currency: SBM?.currencySupported.split(','),

          //Paypal
          paypal_id: PAYPAL?.id,
          paypal_titleEN: PAYPAL?.title.en,
          paypal_titleFR: PAYPAL?.title.fr,
          paypal_logo: PAYPAL?.logo,
          paypal_transaction_limit: PAYPAL?.transactionLimit,
          paypal_active: PAYPAL?.active,
          paypal_supported_currency: PAYPAL?.currencySupported.split(','),
        });
      } else {
        setInitialValue({
          myt_titleEN: '',
          myt_titleFR: '',
          myt_logo: '',
          myt_transaction_limit: '',
          myt_active: false,
          sbm_titleEN: '',
          sbm_titleFR: '',
          sbm_logo: '',
          sbm_transaction_limit: '',
          sbm_active: false,
          paypal_titleEN: '',
          paypal_titleFR: '',
          paypal_logo: '',
          paypal_transaction_limit: '',
          paypal_active: false,
          myt_supported_currency: [],
          sbm_supported_currency: [],
          paypal_supported_currency: [],
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/payment/paymentMethods' at line:71`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const handleSubmit = async (values) => {
    try {
      let myt_logo;
      if (typeof values.myt_logo !== 'string') {
        myt_logo = await api.image.post({
          file: values.myt_logo,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'imageEN',
                type: 'system',
                autoGenerateKey: true,
              }),
            ],
            {
              type: 'application/json',
            },
          ),
        });
      } else {
        myt_logo = values.myt_logo;
      }

      let sbm_logo;
      if (typeof values.sbm_logo !== 'string') {
        sbm_logo = await api.image.post({
          file: values.sbm_logo,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'imageFR',
                type: 'system',
                autoGenerateKey: true,
              }),
            ],
            {
              type: 'application/json',
            },
          ),
        });
      } else {
        sbm_logo = values.sbm_logo;
      }

      let paypal_logo;
      if (typeof values.paypal_logo !== 'string') {
        paypal_logo = await api.image.post({
          file: values.paypal_logo,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'imageFR',
                type: 'system',
                autoGenerateKey: true,
              }),
            ],
            {
              type: 'application/json',
            },
          ),
        });
      } else {
        paypal_logo = values.paypal_logo;
      }
      const formValue = {
        list: [
          {
            id: values.myt_id,
            title: {
              en: values.myt_titleEN,
              fr: values.myt_titleFR,
            },
            logo: myt_logo,
            currencySupported: String(values.myt_supported_currency),
            transactionLimit: values.myt_transaction_limit,
            active: values.myt_active,
            uniqueKey: 'MYTMoney',
          },
          {
            id: values.sbm_id,
            title: {
              en: values.sbm_titleEN,
              fr: values.sbm_titleFR,
            },
            logo: sbm_logo,
            currencySupported: String(values.sbm_supported_currency),
            transactionLimit: values.sbm_transaction_limit,
            active: values.sbm_active,
            uniqueKey: 'IPAY',
          },
          {
            id: values.paypal_id,
            title: {
              en: values.paypal_titleEN,
              fr: values.paypal_titleFR,
            },
            logo: paypal_logo,
            currencySupported: String(values.paypal_supported_currency),
            transactionLimit: values.paypal_transaction_limit,
            active: values.paypal_active,
            uniqueKey: 'PAYPAL',
          },
        ],
      };
      // console.log(formValue);
      await api.payment_method.put(formValue);
      fetchPaymentMethods();
      setIsOpen(true);
      if (myt_logo === null || sbm_logo === null || paypal_logo === null) {
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      } else {
        setModalContent({
          heading: 'Success!',
          content: 'Successfully updated!',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/payment/paymentMethods' at line:128`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return (
    <>
      <SEO title='Payment Methods' desc='Payment Methods description' />
      <Privilege permission={permission?.read} message='view payment method'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        <div className='grid items-start'>
          <div className={!initialValue?.myt_logo && !initialValue?.sbm_logo && !initialValue?.paypal_logo ? 'max-w-2xl' : ''}>
            <h1 className='mb-10 text-lg font-bold text-gray-800'>Payment method management</h1>
            {initialValue ? (
              <div className='w-full p-10 bg-white rounded shadow flex gap-8'>
                <Forms
                  formFields={formFieldData}
                  handleSubmit={handleSubmit}
                  initialValue={initialValue}
                  formsSchema={schema}
                  buttonValue='Update'
                  savePermission={permission?.update}
                />
                {(initialValue?.myt_logo || initialValue?.sbm_logo || initialValue?.paypal_logo) && (
                  <div className='flex flex-col gap-4 ml-8 border-l pl-5'>
                    {initialValue?.myt_logo && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.myt_logo}`}
                            className='h-[250px] object-contain'
                          />
                        </div>
                        <p className='mt-1 text-left'>MYT Money Logo</p>
                      </div>
                    )}
                    {initialValue?.sbm_logo && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.sbm_logo}`}
                            className='h-[250px] object-contain'
                          />
                        </div>
                        <p className='mt-1 text-left'>SBM Logo</p>
                      </div>
                    )}
                    {initialValue?.paypal_logo && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.paypal_logo}`}
                            className='h-[250px] object-contain'
                          />
                        </div>
                        <p className='mt-1 text-left'>Paypal Logo</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </Privilege>
    </>
  );
};

NewPaymentMethod.auth = true;
export default NewPaymentMethod;

NewPaymentMethod.Layout = MainLayout;
NewPaymentMethod.routeSettings = routing.cmsPaymentMethods;
