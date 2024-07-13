/*
 * File: [productId].tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 17 May 2022 03:50 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import { formFieldData, schema } from 'constants/staticData/formFields/faqListFormField';
import Forms from 'components/atoms/Forms';
import Modal from 'components/atoms/Modal';
import api from 'api';
import { ROUTE_CMS_FAQ_LIST_MGMT } from 'constants/routes';
import Loader from 'components/molecules/Loader';
import { NETWORK_STATUS_CODES } from '../../../../../constants';

import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';

const Faq = () => {
  const [initialValue, setInitialValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [modalDeleteContent, setModalDeleteContent] = useState(null);
  const permission: RolePermission = usePermission(Permission.FAQ_LISTS);

  const router = useRouter();
  const { faqId } = router.query;

  function closeModal() {
    setIsOpen(false);
  }

  function closeDeleteModal() {
    setIsDelete(false);
  }

  const handleSubmit = async (values) => {
    try {
      const formValues = {
        id: values.id,
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

      await api.faq.put(formValues);
      fetchFaq(faqId);
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/faq/faqList/faq' at line:71`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const deleteConfirmation = () => {
    setIsDelete(true);
    setModalDeleteContent({
      heading: 'Delete!',
      content: 'Are you sure you want to permanently delete this item?',
    });
  };

  const deleteItem = async (id) => {
    try {
      await api.faq.delete(id);
      setModalContent({
        heading: 'Success!',
        content: 'Item deleted!.',
      });
      router.push(ROUTE_CMS_FAQ_LIST_MGMT);
    } catch (error) {
      setIsDelete(false);
      console.error(`🚀 ${error.name} in '/cms/faq/faqList/faq' at line:95`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const fetchFaq = async (id) => {
    try {
      let faq = await api.faq.getOne(id);
      faq = faq?.content;
      if (faq) {
        setInitialValue({
          id: faq.id,
          category: [{ value: faq.faqCategory?.id, label: faq.faqCategory?.titleEn }],
          questionEN: faq.question.en,
          questionFR: faq.question.fr,
          answerEN: faq.answer.en,
          answerFR: faq.answer.fr,
          priority: faq.priority,
          isActive: faq.active,
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/faq/faqList/faq' at line:121`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  useEffect(() => {
    if (faqId) {
      fetchFaq(faqId);
    }
  }, [faqId]);

  return (
    <>
      <SEO title='Faq' desc='Faq Description' />
      <Privilege permission={permission?.read} message='view faq list content'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        {isDelete && (
          <Modal isOpen={isDelete} closeModal={closeDeleteModal} heading={modalDeleteContent?.heading} content={modalDeleteContent?.content}>
            <div className='flex justify-center gap-3 pt-3'>
              <button className='mt-confirmationBtnNo' onClick={closeDeleteModal}>
                No
              </button>
              <button className='mt-confirmationBtnYes' onClick={() => deleteItem(faqId)}>
                Yes
              </button>
            </div>
          </Modal>
        )}
        <div className='max-w-2xl'>
          <h1 className='mb-10 text-lg font-bold text-gray-800'>FAQ list</h1>

          {initialValue ? (
            <div className='w-full p-10 bg-white rounded shadow'>
              <Forms
                formFields={formFieldData}
                handleSubmit={handleSubmit}
                initialValue={initialValue}
                formsSchema={schema}
                buttonValue='Update'
                deleteItem={deleteConfirmation}
                savePermission={permission?.update}
                deletePermission={permission?.delete}
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
Faq.auth = true;
export default Faq;

Faq.Layout = MainLayout;
Faq.routeSettings = routing.cmsFaqListMGMT;
