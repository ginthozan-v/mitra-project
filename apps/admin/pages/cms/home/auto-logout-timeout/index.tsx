/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 17 May 2022 04:09 pm
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

import * as Yup from 'yup';

export const formFieldData = [
  {
    label: 'Idle period (mins)',
    name: 'period',
    fieldType: 'number',
    placeholder: 'minutes',
  },
];

export const schema = {
  period: Yup.number().positive().required('This field cannot be empty'),
};

const LogoutTimeout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const permission: RolePermission = usePermission(Permission.AUTO_LOGOUT_TIMEOUT);

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
          position: 'AUTO_LOGOUT',
        };
        await api.generic_content.post(formValues);
      }
      fetchAutologout();
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/autoLogoutTimeout/new' at line:56`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchAutologout = async () => {
    try {
      let logout = await api.generic_content.get('AUTO_LOGOUT');
      logout = logout.content;
      if (logout) {
        setFetchedData(logout);
        const formfield = JSON.parse(logout.data);
        setInitialValue(formfield);
      } else {
        setInitialValue({
          period: '',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/autoLogoutTimeout/new' at line:83`, error.message);
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
    fetchAutologout();
  }, []);

  return (
    <>
      <SEO title='Auto Logout Timeout' desc='Auto Logout Timeout Description' />
      <Privilege permission={permission?.read} message='view auto-logout time'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Auto-logout timeout</h1>
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

LogoutTimeout.auth = true;
export default LogoutTimeout;

LogoutTimeout.Layout = MainLayout;
LogoutTimeout.routeSettings = routing.cmsLogoutTimeout;
