/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 22 June 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import Forms from 'components/atoms/Forms';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';
import api from 'api';
import Modal from 'components/atoms/Modal';
import Loader from 'components/molecules/Loader';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../constants';

const formFieldData = [
  {
    label: 'Address',
    name: 'address',
    fieldType: 'text',
    placeholder: 'Enter address',
  },
  {
    label: 'Email Address',
    name: 'email',
    fieldType: 'email',
    placeholder: 'Enter email address',
  },
  {
    label: 'Telephone number',
    name: 'telephone',
    fieldType: 'text',
    placeholder: 'Enter telephone number',
  },
  {
    label: 'Hotline number',
    name: 'hotline',
    fieldType: 'text',
    placeholder: 'Enter hotline number',
  },
];

const schema = {
  address: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  email: Yup.string().email().required('This field cannot be empty'),
  telephone: Yup.string().required('This field cannot be empty'),
  hotline: Yup.string().required('This field cannot be empty'),
};

const NewContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const permission: RolePermission = usePermission(Permission.CONTACT_US_MANAGEMENT);

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
          position: 'CONTACT_US',
        };
        await api.generic_content.post(formValues);
      }
      fetchContactDetail();
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/contactUs/ContactUsManagement/new' at line:87`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const fetchContactDetail = async () => {
    try {
      let contact = await api.generic_content.get('CONTACT_US');
      contact = contact.content;
      if (contact) {
        setFetchedData(contact);
        const formfield = JSON.parse(contact.data);
        setInitialValue(formfield);
      } else {
        setInitialValue({
          address: '',
          email: '',
          telephone: '',
          hotline: '',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/contactUs/ContactUsManagement/new' at line:116`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
      setInitialValue({
        address: '',
        email: '',
        telephone: '',
        hotline: '',
      });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchContactDetail();
  }, []);

  return (
    <>
      <SEO title='Contact us' desc='Contact us management' />
      <Privilege permission={permission?.read} message='view contact us content'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Contact detail management</h1>
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
NewContactUs.auth = true;
export default NewContactUs;

NewContactUs.Layout = MainLayout;
NewContactUs.routeSettings = routing.cmsContactUsMGMT;
