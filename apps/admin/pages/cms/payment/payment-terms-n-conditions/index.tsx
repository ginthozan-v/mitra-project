/*
 * File: payment-methods.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 21 July 2022 12:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import routing from 'constants/routingConfig';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import Forms from 'components/atoms/Forms';
import * as Yup from 'yup';
import api from 'api';
import Modal from 'components/atoms/Modal';
import Loader from 'components/molecules/Loader';

import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import { NETWORK_STATUS_CODES } from '../../../../constants';

export const formFieldData = [
  {
    label: 'Title EN',
    name: 'titleEN',
    fieldType: 'text',
    placeholder: 'Title English',
  },
  {
    label: 'Title FR',
    name: 'titleFR',
    fieldType: 'text',
    placeholder: 'Title French',
  },
  {
    label: 'Payment Terms and Conditions EN',
    name: 'paymentTermsEN',
    fieldType: 'richtext',
    placeholder: 'Payment Terms and Conditions English',
  },
  {
    label: 'Payment Terms and Conditions FR',
    name: 'paymentTermsFR',
    fieldType: 'richtext',
    placeholder: 'Payment Terms and Conditions French',
  },
];

export const schema = {
  titleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  titleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  paymentTermsEN: Yup.string().required('This field cannot be empty'),
  paymentTermsFR: Yup.string().required('This field cannot be empty'),
};

const PaymentTerms = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const permission: RolePermission = usePermission(Permission.PAYMENT_TERMS);

  const handleSubmit = async (values) => {
    const structuredValue = {
      title: {
        en: values.titleEN,
        fr: values.titleFR,
      },
      terms: {
        en: values.paymentTermsEN,
        fr: values.paymentTermsFR,
      },
    };
    try {
      if (fetchedData) {
        const formValues = {
          contentType: 'json',
          data: JSON.stringify(structuredValue),
          id: fetchedData.id,
          position: fetchedData.position,
          status: fetchedData.status,
        };
        await api.generic_content.put(formValues);
      } else {
        const formValues = {
          contentType: 'json',
          data: JSON.stringify(structuredValue),
          position: 'PAYMENT_TNC',
        };
        await api.generic_content.post(formValues);
      }
      fetchPaymentTNC();
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/payment/paymentTerms/new' at line:52`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchPaymentTNC = async () => {
    try {
      let terms = await api.generic_content.get('PAYMENT_TNC');
      terms = terms?.content;
      if (terms) {
        setFetchedData(terms);
        const formfield = JSON.parse(terms.data);
        const inti = {
          titleEN: formfield.title.en,
          titleFR: formfield.title.fr,
          paymentTermsEN: formfield.terms.en,
          paymentTermsFR: formfield.terms.fr,
        };
        setInitialValue(inti);
      } else {
        setInitialValue({
          titleEN: '',
          titleFR: '',
          paymentTermsEN: '',
          paymentTermsFR: '',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/payment/paymentTerms/new' at line:111`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchPaymentTNC();
  }, []);
  return (
    <>
      <SEO title='Payment Terms & Conditions' desc='Payment Terms & Conditions description' />
      <Privilege permission={permission?.read} message='view payment terms'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        <div className='max-w-2xl'>
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Payment terms &amp; conditions management</h1>
          {initialValue ? (
            <div className='w-full p-10 bg-white rounded shadow'>
              <Forms
                formFields={formFieldData}
                handleSubmit={handleSubmit}
                initialValue={initialValue}
                formsSchema={schema}
                buttonValue='Update'
                savePermission={permission?.update}
              />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </Privilege>
    </>
  );
};

PaymentTerms.auth = true;
export default PaymentTerms;
PaymentTerms.Layout = MainLayout;
PaymentTerms.routeSettings = routing.cmsPaymentTerms;
