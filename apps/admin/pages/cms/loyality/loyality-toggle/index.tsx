/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 18 May 2022 04:45 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Forms from 'components/atoms/Forms';

import api from 'api';
import Modal from 'components/atoms/Modal';
import Loader from 'components/molecules/Loader';

import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import { NETWORK_STATUS_CODES } from '../../../../constants';

export const formFieldData = [
  {
    label: 'isActive',
    name: 'active',
    fieldType: 'toggle',
  },
];

export const schema = {};

const NewLoyalityToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const permission: RolePermission = usePermission(Permission.ENABLE_DISABLE_LOYALTY);

  const handleSubmit = async (values) => {
    try {
      if (fetchedData) {
        const formValues = {
          contentType: 'json',
          data: JSON.stringify(values),
          id: fetchedData.id,
          position: fetchedData.position,
          status: fetchedData.status,
        };
        await api.generic_content.put(formValues);
      } else {
        const formValues = {
          contentType: 'json',
          data: JSON.stringify(values),
          position: 'LOYALTY_IS_ACTIVE',
        };
        await api.generic_content.post(formValues);
      }
      fetchLoyality();
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/loyality/loyalityToggle/new' at line:59`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchLoyality = async () => {
    try {
      let toggle = await api.generic_content.get('LOYALTY_IS_ACTIVE');
      toggle = toggle.content;
      if (toggle) {
        setFetchedData(toggle);
        const formfield = JSON.parse(toggle.data);
        setInitialValue(formfield);
      } else {
        setInitialValue({
          isActive: true,
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/loyality/loyalityToggle/new' at line:81`, error.message);
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
    fetchLoyality();
  }, []);

  return (
    <>
      <SEO title='Loyalty enable/disable' desc='Loyalty enable/disable description' />
      <Privilege permission={permission?.update} message='change loyalty status'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Loyalty enable/disable</h1>
          {initialValue ? (
            <Forms formFields={formFieldData} handleSubmit={handleSubmit} initialValue={initialValue} formsSchema={schema} buttonValue='Update' />
          ) : (
            <Loader />
          )}
        </div>
      </Privilege>
    </>
  );
};

NewLoyalityToggle.auth = true;
export default NewLoyalityToggle;
NewLoyalityToggle.Layout = MainLayout;
NewLoyalityToggle.routeSettings = routing.cmsLoyalityToggle;
