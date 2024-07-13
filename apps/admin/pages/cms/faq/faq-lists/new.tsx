/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 17 May 2022 03:42 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useState } from 'react';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import { formFieldData, schema } from 'constants/staticData/formFields/faqListFormField';
import Forms from 'components/atoms/Forms';
import api from 'api';
import Modal from 'components/atoms/Modal';

import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import { NETWORK_STATUS_CODES } from '../../../../constants';

const NewFaq = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const initialValue = {
    category: '',
    questionEN: '',
    questionFR: '',
    answerEN: '',
    answerFR: '',
    priority: '',
    isActive: false,
  };

  const permission: RolePermission = usePermission(Permission.FAQ_LISTS);

  const handleSubmit = async (values) => {
    try {
      const formValues = {
        categoryId: values.category,
        question: {
          en: values.questionEN,
          fr: values.questionFR,
        },
        answer: {
          en: values.answerEN,
          fr: values.answerFR,
        },
        priority: values.priority,
        active: values.isActive,
      };

      await api.faq.post(formValues);
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully created!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/faq/faqList/new' at line:56`, error.message);
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
      <SEO title='Faq' desc='Faq Description' />
      <Privilege permission={permission?.create} message='create faq list'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>FAQ list</h1>
          <div className='w-full p-10 bg-white rounded shadow'>
            <Forms formFields={formFieldData} handleSubmit={handleSubmit} initialValue={initialValue} formsSchema={schema} buttonValue='Save' />
          </div>
        </div>
      </Privilege>
    </>
  );
};
NewFaq.auth = true;
export default NewFaq;

NewFaq.Layout = MainLayout;
NewFaq.routeSettings = routing.cmsFaqListMGMT;
