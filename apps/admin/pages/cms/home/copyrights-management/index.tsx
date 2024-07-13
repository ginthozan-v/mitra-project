/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 17 May 2022 10:04 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Forms from 'components/atoms/Forms';

import api from 'api';
import Modal from 'components/atoms/Modal';
import Loader from 'components/molecules/Loader';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../constants';

// 🚀 form field
const formFieldData = [
  {
    label: 'Copyright label',
    name: 'copyright',
    fieldType: 'richtext',
    placeholder: 'Copyright label',
  },
];

// 🚀 validation schema
const schema = {
  copyright: Yup.string().required('This field cannot be empty'),
};

const NewCopyrights = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const permission: RolePermission = usePermission(Permission.COPYRIGHTS);

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
          position: 'COPYRIGHTS',
        };
        await api.generic_content.post(formValues);
      }
      fetchCopyrights();
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/copyrightsManagement/new' at line:52`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchCopyrights = async () => {
    try {
      let copyright = await api.generic_content.get('COPYRIGHTS');
      copyright = copyright.content;
      if (copyright) {
        setFetchedData(copyright);
        const formfield = JSON.parse(copyright.data);
        setInitialValue(formfield);
      } else {
        setInitialValue({
          copyright: '',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/copyrightsManagement/new' at line:80`, error.message);
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
    fetchCopyrights();
  }, []);

  return (
    <>
      <SEO title='Copyrights Management' desc='Copyrights Description' />
      <Privilege permission={permission?.read} message='view copyright info'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Copyrights management</h1>
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
NewCopyrights.auth = true;
export default NewCopyrights;

NewCopyrights.Layout = MainLayout;
NewCopyrights.routeSettings = routing.cmsCopyrightsMGMT;
