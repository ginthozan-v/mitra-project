/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 13 May 2022 12:27 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState } from 'react';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Forms from 'components/atoms/Forms';

import { formFieldData, schema } from 'constants/staticData/formFields/socialMediaFormField';
import api from 'api';
import Modal from 'components/atoms/Modal';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../constants';

const NewSocialMediaRedirection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState({
    title: '',
    logoImage: '',
    redirectionLink: '',
    priority: '',
    isActive: false,
  });
  const permission: RolePermission = usePermission(Permission.SOCIAL_MEDIA);

  const handleSubmit = async (values: any) => {
    try {
      const logoImage = await api.image.post({
        file: values.logoImage,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'logoImage',
              type: 'system',
              autoGenerateKey: true,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      });
      const formValues = {
        logoTitle: values.title,
        logoImage: logoImage,
        link: values.redirectionLink,
        priority: values.priority,
        active: values.isActive,
      };

      await api.social_media_redirection.post(formValues);
      setIsOpen(true);
      if (logoImage === null) {
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      } else {
        setModalContent({
          heading: 'Success!',
          content: 'Successfully created!',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/socialMediaRedirections' at line:52`, error.message);
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
      <SEO title='Social Media Redirection' desc='Social Media Redirection Description' />
      <Privilege permission={permission?.create} message='create social media links'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Social Media Redirection</h1>
          <div className='w-full p-10 bg-white rounded shadow'>
            <Forms formFields={formFieldData} handleSubmit={handleSubmit} initialValue={initialValue} formsSchema={schema} buttonValue='Save' />
          </div>
        </div>
      </Privilege>
    </>
  );
};

NewSocialMediaRedirection.auth = true;
export default NewSocialMediaRedirection;
NewSocialMediaRedirection.Layout = MainLayout;
NewSocialMediaRedirection.routeSettings = routing.cmsSocialMedia;
