/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 17 May 2022 02:58 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useState } from 'react';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import { formFieldData, schema } from 'constants/staticData/formFields/faqCategoryFormField';
import Forms from 'components/atoms/Forms';
import api from 'api';
import Modal from 'components/atoms/Modal';

import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import { NETWORK_STATUS_CODES } from '../../../../constants';

const NewCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const initialValue = {
    faqTitleEN: '',
    faqTitleFR: '',
    priority: '',
    isActive: false,
  };
  const permission: RolePermission = usePermission(Permission.FAQ_CATEGORIES);

  const handleSubmit = async (values) => {
    try {
      const formValues = {
        title: {
          en: values.faqTitleEN,
          fr: values.faqTitleFR,
        },
        priority: values.priority,
        active: values.isActive,
      };
      await api.faq_category.post(formValues);
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully created!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/faqCategories/new' at line:47`, error.message);
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

  return (
    <>
      <SEO title='Faq Categories' desc='Faq Categories Description' />
      <Privilege permission={permission?.create} message='create faq category'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>FAQ categories</h1>
          <div className='w-full p-10 bg-white rounded shadow'>
            <Forms formFields={formFieldData} handleSubmit={handleSubmit} initialValue={initialValue} formsSchema={schema} buttonValue='Save' />
          </div>
        </div>
      </Privilege>
    </>
  );
};
NewCategory.auth = true;
export default NewCategory;

NewCategory.Layout = MainLayout;
NewCategory.routeSettings = routing.cmsFaqCategoriesMGMT;
