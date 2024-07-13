/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 13 May 2022 09:34 am
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
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../constants';

import * as Yup from 'yup';

export const formFieldData = [
  {
    label: 'Terms and Conditions EN',
    name: 'termsnConditionEN',
    fieldType: 'richtext',
    placeholder: 'Terms and Condition EN',
  },
  {
    label: 'Terms and Conditions FR',
    name: 'termsnConditionFR',
    fieldType: 'richtext',
    placeholder: 'Terms and Condition FR',
  },
  {
    label: 'Privacy Policy EN',
    name: 'privacyPolicyEN',
    fieldType: 'richtext',
    placeholder: 'Privacy Policy EN',
  },
  {
    label: 'Privacy Policy FR',
    name: 'privacyPolicyFR',
    fieldType: 'richtext',
    placeholder: 'Privacy Policy FR',
  },
];

export const schema = {
  termsnConditionEN: Yup.string().required('This field cannot be empty'),
  termsnConditionFR: Yup.string().required('This field cannot be empty'),
  privacyPolicyEN: Yup.string().required('This field cannot be empty'),
  privacyPolicyFR: Yup.string().required('This field cannot be empty'),
};

const NewPrivacyPolicy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const permission: RolePermission = usePermission(Permission.PRIVACY_POLICY);

  const handleSubmit = async (values) => {
    const structuredValue = {
      termsnCondition: {
        en: values.termsnConditionEN,
        fr: values.termsnConditionFR,
      },
      privacyPolicy: {
        en: values.privacyPolicyEN,
        fr: values.privacyPolicyFR,
      },
    };
    try {
      const formValues = {
        contentType: 'json',
        data: JSON.stringify(structuredValue),
        id: fetchedData.id,
        position: fetchedData.position,
        status: fetchedData.status,
      };
      await api.generic_content.put(formValues);

      fetchPrivacyPolicy();
      setIsOpen(true);
      setModalContent({
        heading: 'Success!',
        content: 'Successfully updated!',
      });
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/privacyPolicyManagement/new' at line:62`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchPrivacyPolicy = async () => {
    try {
      let privacy = await api.generic_content.get('TERMS_CONDITIONS');
      privacy = privacy.content;

      if (privacy) {
        setFetchedData(privacy);
        const formfield = JSON.parse(privacy.data);
        const inti = {
          termsnConditionEN: formfield.termsnCondition.en,
          termsnConditionFR: formfield.termsnCondition.fr,
          privacyPolicyEN: formfield.privacyPolicy.en,
          privacyPolicyFR: formfield.privacyPolicy.fr,
        };
        setInitialValue(inti);
      } else {
        setInitialValue({
          termsnConditionEN: '',
          termsnConditionFR: '',
          privacyPolicyEN: '',
          privacyPolicyFR: '',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/contactUs/ContactUsManagement/new' at line:96`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
      setInitialValue({
        termsnConditionEN: '',
        termsnConditionFR: '',
        privacyPolicyEN: '',
        privacyPolicyFR: '',
      });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  return (
    <>
      <SEO title='Privacy Policy Management' desc='Privacy Policy Description' />
      <Privilege permission={permission?.read} message='view privacy policy'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Registration Terms & conditions and privacy policy management</h1>
          {initialValue ? (
            <div className='w-full p-10 bg-white rounded shadow'>
              <Forms
                formFields={formFieldData}
                handleSubmit={handleSubmit}
                initialValue={initialValue}
                formsSchema={schema}
                savePermission={permission?.update}
                buttonValue='Update'
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

NewPrivacyPolicy.auth = true;
export default NewPrivacyPolicy;
NewPrivacyPolicy.Layout = MainLayout;
NewPrivacyPolicy.routeSettings = routing.cmsPrivacyPolicyMGMT;
