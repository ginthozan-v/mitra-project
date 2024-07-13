/*
 * File: rule-customization.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 02 August 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Label from '@mtcloud/ui/atoms/Label';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';
import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import Forms from 'components/atoms/Forms';
import * as Yup from 'yup';
import api from 'api';
import { useEffect, useState } from 'react';
import Modal from 'components/atoms/Modal';
import { statusError } from 'constants/types/statusError';

const vatCalculation = [
  {
    label: 'VAT Percentage',
    name: 'vatPercentage',
    fieldType: 'float',
  },
];

const exchangeRate = [
  {
    sectionTitle: 'Exchange Rate',
    fields: [
      {
        label: 'MUR = Rs. 1.00',
        name: 'usd',
        fieldType: 'float',
        placeholder: 'USD rate',
        info: 'USD rate',
      },
      {
        label: ' ',
        name: 'eur',
        fieldType: 'float',
        placeholder: 'EUR rate',
        info: 'EUR rate',
      },
    ],
  },
];

const vatSchema = {
  vatPercentage: Yup.string().required('This field cannot be empty'),
};

const exchangeRateSchema = {
  usd: Yup.string().required('This field cannot be empty'),
  eur: Yup.string().required('This field cannot be empty'),
};

const RuleCustomization = () => {
  const permission: RolePermission = usePermission(Permission.RULE_CUSTOMIZATION);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [vatInit, setvatInit] = useState({
    vatPercentage: '',
  });
  const [exchangeRateInit, setExchangeRateInit] = useState({
    usd: '',
    eur: '',
  });

  const handleVatSubmit = async (values) => {
    try {
      await api.rule_customization.updateVatPercentage(values);
      fetchVatPercentage();
      setIsOpen(true);
      setModalContent({
        heading: 'Success',
        content: 'Vat percentage updated successfully!',
      });
    } catch (error) {
      console.log(error);
      setIsOpen(true);
      const status = error.response.status;
      setModalContent({
        heading: status,
        content: statusError[status],
      });
    }
  };

  const handleExchangeRateSubmit = async (values) => {
    try {
      const obj = {
        conversionRates: [
          {
            code: 'USD',
            conversionRate: values.usd,
          },
          {
            code: 'EUR',
            conversionRate: values.eur,
          },
        ],
      };
      await api.rule_customization.updateExchangeRate(obj);
      setIsOpen(true);
      setModalContent({
        heading: 'Success',
        content: 'Exchange rate updated successfully!',
      });
      fetchExchangeRate();
    } catch (error) {
      console.log(error);
      setIsOpen(true);
      const status = error.response.status;
      setModalContent({
        heading: status,
        content: statusError[status],
      });
    }
  };

  const fetchVatPercentage = async () => {
    try {
      const data = await api.rule_customization.getVatPercentage();
      setvatInit(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExchangeRate = async () => {
    try {
      let data = await api.rule_customization.getExchangeRate();
      data = data.conversionRates;
      setExchangeRateInit({
        usd: data.find((x) => x.code === 'USD').conversionRate.toFixed(2),
        eur: data.find((x) => x.code === 'EUR').conversionRate.toFixed(2),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchVatPercentage();
    fetchExchangeRate();
  }, []);

  return (
    <>
      <SEO title='Rule Customization' desc='Rule Customization Description' />
      <Privilege permission={permission?.read} message='view this page'>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            heading={modalContent?.heading}
            content={modalContent?.content}
          >
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        <div>
          <div className='grid max-w-lg p-5 bg-white rounded-lg shadow'>
            <Forms
              formFields={vatCalculation}
              handleSubmit={handleVatSubmit}
              initialValue={vatInit}
              formsSchema={vatSchema}
              buttonValue='Update'
              savePermission={permission?.update}
            />
            <hr className='my-6' />
            <Forms
              formFields={exchangeRate}
              handleSubmit={handleExchangeRateSubmit}
              initialValue={exchangeRateInit}
              formsSchema={exchangeRateSchema}
              buttonValue='Update'
              savePermission={permission?.update}
            />
          </div>
        </div>
      </Privilege>
    </>
  );
};

RuleCustomization.auth = true;
export default RuleCustomization;

RuleCustomization.Layout = MainLayout;
RuleCustomization.routeSettings = routing.billingCustomization;
