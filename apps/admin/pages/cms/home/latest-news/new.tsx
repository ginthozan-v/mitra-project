/*
 * File:new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 12 May 2022 03:35 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState } from 'react';

import Forms from 'components/atoms/Forms';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import { formFieldData, schema } from 'constants/staticData/formFields/newsFormField';
import api from 'api';
import Modal from 'components/atoms/Modal';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../constants';

const NewNews = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState({
    titleEN: '',
    titleFR: '',
    descriptionEN: '',
    descriptionFR: '',
    image: '',
    redirectionNameEN: '',
    redirectionNameFR: '',
    redirectionEN: '',
    redirectionFR: '',
    isActive: false,
  });
  const permission: RolePermission = usePermission(Permission.LATEST_NEWS);

  const handleSubmit = async (values) => {
    try {
      const image = await api.image.post({
        file: values.image,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'latest_news_image',
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
        title: {
          en: values.titleEN,
          fr: values.titleFR,
        },
        description: {
          en: values.descriptionEN,
          fr: values.descriptionFR,
        },
        image: image,
        redirectionLinkName: {
          en: values.redirectionNameEN,
          fr: values.redirectionNameFR,
        },
        redirectionLink: {
          en: values.redirectionEN,
          fr: values.redirectionFR,
        },
        active: values.isActive,
      };
      await api.latest_news.post(formValues);
      setIsOpen(true);
      if (image === null) {
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
      console.error(`🚀 ${error.name} in '/cms/home/latestNews/new' at line:62`, error.message);
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
      <SEO title='Latest News' desc='Latest News Description' />
      <Privilege permission={permission?.create} message='create latest news'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Latest news management</h1>
          <div className='w-full p-10 bg-white rounded shadow'>
            <Forms formFields={formFieldData} handleSubmit={handleSubmit} initialValue={initialValue} formsSchema={schema} buttonValue='Save' />
          </div>
        </div>
      </Privilege>
    </>
  );
};

NewNews.auth = true;
export default NewNews;
NewNews.Layout = MainLayout;
NewNews.routeSettings = routing.cmsHomeLatestNews;
