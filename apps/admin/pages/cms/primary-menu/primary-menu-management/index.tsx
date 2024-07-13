/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 13 May 2022 04:56 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Forms from 'components/atoms/Forms';

import api from 'api';
import Loader from 'components/molecules/Loader';
import Modal from 'components/atoms/Modal';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../constants';

import * as Yup from 'yup';

export const formFieldData = [
  {
    sectionTitle: 'Product menu',
    fields: [
      {
        label: 'Menu title EN',
        name: 'productMenuTitleEN',
        fieldType: 'text',
        placeholder: 'Enter menu title in en',
      },
      {
        label: 'Menu title FR',
        name: 'productMenuTitleFR',
        fieldType: 'text',
        placeholder: 'Enter menu title in fr',
      },
      {
        label: 'isActive',
        name: 'productIsActive',
        fieldType: 'toggle',
      },
    ],
  },
  {
    sectionTitle: 'Marketplace menu',
    fields: [
      {
        label: 'Menu title EN',
        name: 'marketplaceMenuTitleEN',
        fieldType: 'text',
        placeholder: 'Enter menu title in en',
      },
      {
        label: 'Menu title FR',
        name: 'marketplaceMenuTitleFR',
        fieldType: 'text',
        placeholder: 'Enter menu title in fr',
      },
      {
        label: 'isActive',
        name: 'marketplaceMenuIsActive',
        fieldType: 'toggle',
      },
    ],
  },
  {
    sectionTitle: 'Solutions menu',
    fields: [
      {
        label: 'Menu title EN',
        name: 'solutionMenuTitleEN',
        fieldType: 'text',
        placeholder: 'Enter menu title in en',
      },
      {
        label: 'Menu title FR',
        name: 'solutionMenuTitleFR',
        fieldType: 'text',
        placeholder: 'Enter menu title in fr',
      },
      {
        label: 'isActive',
        name: 'solutionMenuIsActive',
        fieldType: 'toggle',
      },
    ],
  },

  {
    sectionTitle: 'Documentation menu',
    fields: [
      {
        label: 'Menu title EN',
        name: 'documentationMenuTitleEN',
        fieldType: 'text',
        placeholder: 'Enter menu title in en',
      },
      {
        label: 'Menu title FR',
        name: 'documentationMenuTitleFR',
        fieldType: 'text',
        placeholder: 'Enter menu title in fr',
      },
      {
        label: 'isActive',
        name: 'documentationMenuIsActive',
        fieldType: 'toggle',
      },
    ],
  },
  {
    sectionTitle: 'Pricing menu',
    fields: [
      {
        label: 'Menu title EN',
        name: 'pricingMenuTitleEN',
        fieldType: 'text',
        placeholder: 'Enter menu title in en',
      },
      {
        label: 'Menu title FR',
        name: 'pricingMenuTitleFR',
        fieldType: 'text',
        placeholder: 'Enter menu title in fr',
      },
      {
        label: 'isActive',
        name: 'pricingMenuIsActive',
        fieldType: 'toggle',
      },
    ],
  },
];

export const schema = {
  productMenuTitleEN: Yup.string().required('This field cannot be empty'),
  productMenuTitleFR: Yup.string().required('This field cannot be empty'),
  marketplaceMenuTitleEN: Yup.string().required('This field cannot be empty'),
  marketplaceMenuTitleFR: Yup.string().required('This field cannot be empty'),
  solutionMenuTitleEN: Yup.string().required('This field cannot be empty'),
  solutionMenuTitleFR: Yup.string().required('This field cannot be empty'),
  pricingMenuTitleEN: Yup.string().required('This field cannot be empty'),
  pricingMenuTitleFR: Yup.string().required('This field cannot be empty'),
  documentationMenuTitleEN: Yup.string().required('This field cannot be empty'),
  documentationMenuTitleFR: Yup.string().required('This field cannot be empty'),
};

const NewMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const permission: RolePermission = usePermission(Permission.PRIMARY_MENU);

  const fetchPrimaryMenu = async () => {
    try {
      let menu = await api.primary_menu.getAll(0, 5);
      menu = menu.content;
      if (menu) {
        setInitialValue({
          productMenuId: menu[0].id,
          productMenuTitleEN: menu[0].title.en,
          productMenuTitleFR: menu[0].title.fr,
          productIsActive: menu[0].active,
          marketplaceMenuId: menu[1].id,
          marketplaceMenuTitleEN: menu[1].title.en,
          marketplaceMenuTitleFR: menu[1].title.fr,
          marketplaceMenuIsActive: menu[1].active,
          solutionMenuId: menu[2].id,
          solutionMenuTitleEN: menu[2].title.en,
          solutionMenuTitleFR: menu[2].title.fr,
          solutionMenuIsActive: menu[2].active,
          pricingMenuId: menu[3].id,
          pricingMenuTitleEN: menu[3].title.en,
          pricingMenuTitleFR: menu[3].title.fr,
          pricingMenuIsActive: menu[3].active,
          documentationMenuId: menu[4].id,
          documentationMenuTitleEN: menu[4].title.en,
          documentationMenuTitleFR: menu[4].title.fr,
          documentationMenuIsActive: menu[4].active,
        });
      } else {
        setInitialValue({
          productMenuTitleEN: '',
          productMenuTitleFR: '',
          productIsActive: false,
          marketplaceMenuTitleEN: '',
          marketplaceMenuTitleFR: '',
          marketplaceMenuIsActive: false,
          solutionMenuTitleEN: '',
          solutionMenuTitleFR: '',
          solutionMenuIsActive: false,
          pricingMenuTitleEN: '',
          pricingMenuTitleFR: '',
          pricingMenuIsActive: false,
          documentationMenuTitleEN: '',
          documentationMenuTitleFR: '',
          documentationMenuIsActive: false,
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/primaryMenu/PrimaryMenuManagement/new' at line:76`, error.message);
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
        list: [
          //1
          {
            id: values.productMenuId,
            title: {
              en: values.productMenuTitleEN,
              fr: values.productMenuTitleFR,
            },
            active: values.productIsActive,
          },
          //2
          {
            id: values.marketplaceMenuId,
            title: {
              en: values.marketplaceMenuTitleEN,
              fr: values.marketplaceMenuTitleFR,
            },
            active: values.marketplaceMenuIsActive,
          },
          //3
          {
            id: values.solutionMenuId,
            title: {
              en: values.solutionMenuTitleEN,
              fr: values.solutionMenuTitleFR,
            },
            active: values.solutionMenuIsActive,
          },
          //4
          {
            id: values.pricingMenuId,
            title: {
              en: values.pricingMenuTitleEN,
              fr: values.pricingMenuTitleFR,
            },
            active: values.pricingMenuIsActive,
          },
          //5
          {
            id: values.documentationMenuId,
            title: {
              en: values.documentationMenuTitleEN,
              fr: values.documentationMenuTitleFR,
            },
            active: values.documentationMenuIsActive,
          },
        ],
      };
      await api.primary_menu.put(formValues);
      fetchPrimaryMenu();
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/primaryMenu/PrimaryMenuManagement/new' at line:135`, error.message);
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

  useEffect(() => {
    fetchPrimaryMenu();
  }, []);

  return (
    <>
      <SEO title='Primary Menu Management' desc='Primary Menu Description' />
      <Privilege permission={permission?.read} message='view primary menu'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Primary menu management</h1>
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
NewMenu.auth = true;
export default NewMenu;
NewMenu.Layout = MainLayout;
NewMenu.routeSettings = routing.cmsPrimaryMenuMGMT;
