/*
 * File: [productId].tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 17 May 2022 03:04 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';
import { formFieldData, schema } from 'constants/staticData/formFields/faqCategoryFormField';
import Forms from 'components/atoms/Forms';
import Modal from 'components/atoms/Modal';
import api from 'api';
import { ROUTE_CMS_FAQ_CATEGORY_MGMT } from 'constants/routes';
import Loader from 'components/molecules/Loader';
import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import { NETWORK_STATUS_CODES } from '../../../../../constants';

const Category = () => {
  const [initialValue, setInitialValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmModalContent, setConfirmModalContent] = useState(null);
  const permission: RolePermission = usePermission(Permission.FAQ_CATEGORIES);

  const router = useRouter();
  const { categoryId } = router.query;

  function closeModal() {
    setIsOpen(false);
  }

  function closeConfirmModal() {
    setIsConfirmModalOpen(false);
  }

  const fetchFaqCategory = async (id) => {
    try {
      let response = await api.faq_category.getOne(id);
      response = response.content;
      if (response) {
        setInitialValue({
          id: response.id,
          faqTitleEN: response.title.en,
          faqTitleFR: response.title.fr,
          priority: response.priority,
          isActive: response.active,
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/faq/faqCategories/category' at line:56`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formValues = {
        id: values.id,
        title: {
          en: values.faqTitleEN,
          fr: values.faqTitleFR,
        },
        priority: values.priority,
        active: values.isActive,
      };

      await api.faq_category.put(formValues);
      fetchFaqCategory(categoryId);
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/faq/faqCategory/category' at line:87`, error.message);
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
    setIsConfirmModalOpen(true);
    setConfirmModalContent({
      heading: 'Delete!',
      content: 'Are you sure you want to permanently delete this item?',
    });
  };

  const deleteItem = async (id) => {
    try {
      await api.faq_category.delete(id);
      setIsOpen(true);
      setModalContent({
        heading: 'Deleted!',
        content: `${categoryId} deleted!`,
      });
      router.push(ROUTE_CMS_FAQ_CATEGORY_MGMT);
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/faq/faqCategory/category' at line:117`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: `Something went wrong!`,
      });
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchFaqCategory(categoryId);
    }
  }, [categoryId]);

  return (
    <>
      <SEO title='Faq Categories' desc='Faq Categories Description' />
      <Privilege permission={permission?.read} message='view faq category'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        {isConfirmModalOpen && (
          <Modal
            isOpen={isConfirmModalOpen}
            closeModal={closeConfirmModal}
            heading={confirmModalContent?.heading}
            content={confirmModalContent?.content}
          >
            <div className='flex justify-center gap-3 pt-3'>
              <button className='mt-confirmationBtnNo' onClick={closeConfirmModal}>
                No
              </button>
              <button className='mt-confirmationBtnYes' onClick={() => deleteItem(categoryId)}>
                Yes
              </button>
            </div>
          </Modal>
        )}
        <div className='max-w-2xl'>
          <h1 className='mb-10 text-lg font-bold text-gray-800'>FAQ categories</h1>
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
Category.auth = true;
export default Category;

Category.Layout = MainLayout;
Category.routeSettings = routing.cmsFaqCategoriesMGMT;
