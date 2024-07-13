/*
 * File: hero-banners.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 11 May 2022 12:18 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState } from 'react';

import Forms from 'components/atoms/Forms';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import { formFieldData, schema } from 'constants/staticData/formFields/heroBannerFormField';
import api from 'api';
import Modal from 'components/atoms/Modal';

import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../constants';

const NewBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState({
    title: '',
    desktop_bannerEN: '',
    desktop_bannerFR: '',
    tab_bannerEN: '',
    tab_bannerFR: '',
    mobile_bannerEN: '',
    mobile_bannerFR: '',
    redirectionEN: '',
    redirectionFR: '',
    scheduleStartDateTime: '',
    scheduleEndDateTime: '',
    priority: '',
    isActive: false,
  });
  const permission: RolePermission = usePermission(Permission.HERO_BANNER);

  const handleSubmit = async (values) => {
    try {
      const desktopBannerEN = await api.image.post({
        file: values.desktop_bannerEN,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'desktop_bannerEN',
              type: 'system',
              autoGenerateKey: true,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      });
      const desktopBannerFR = await api.image.post({
        file: values.desktop_bannerFR,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'desktop_bannerFR',
              type: 'system',
              autoGenerateKey: true,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      });
      const tabBannerEN = await api.image.post({
        file: values.tab_bannerEN,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'tab_bannerEN',
              type: 'system',
              autoGenerateKey: true,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      });
      const tabBannerFR = await api.image.post({
        file: values.tab_bannerFR,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'tab_bannerFR',
              type: 'system',
              autoGenerateKey: true,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      });
      const mobileBannerEN = await api.image.post({
        file: values.mobile_bannerEN,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'mobile_bannerEN',
              type: 'system',
              autoGenerateKey: true,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      });
      const mobileBannerFR = await api.image.post({
        file: values.mobile_bannerFR,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'mobile_bannerFR',
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
        title: values.title,
        images: [
          {
            banner: {
              en: desktopBannerEN,
              fr: desktopBannerFR,
            },
            bannerSize: 'DESKTOP',
          },
          {
            banner: {
              en: tabBannerEN,
              fr: tabBannerFR,
            },
            bannerSize: 'TAB',
          },
          {
            banner: {
              en: mobileBannerEN,
              fr: mobileBannerFR,
            },
            bannerSize: 'MOBILE',
          },
        ],
        redirectionLink: {
          en: values.redirectionEN,
          fr: values.redirectionFR,
        },
        startDateTime: values.scheduleStartDateTime,
        endDateTime: values.scheduleEndDateTime,
        priority: values.priority,
        active: values.isActive,
        createdOn: new Date(),
      };

      await api.hero_banner.post(formValues);
      setIsOpen(true);
      if (
        desktopBannerEN === null ||
        desktopBannerFR === null ||
        tabBannerEN === null ||
        tabBannerFR === null ||
        mobileBannerEN === null ||
        mobileBannerFR === null
      ) {
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
      console.error(`🚀 ${error.name} in '/cms/home/heroBanner/new' at line:52`, error.message);
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
      <SEO title='Hero Banner' desc='Hero Benner Description' />
      <Privilege permission={permission?.create} message='create list of banners'>
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
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Hero banner</h1>
          <div className='w-full p-10 bg-white rounded shadow'>
            <Forms formFields={formFieldData} handleSubmit={handleSubmit} initialValue={initialValue} formsSchema={schema} buttonValue='Save' />
          </div>
        </div>
      </Privilege>
    </>
  );
};

NewBanner.auth = true;
export default NewBanner;
NewBanner.Layout = MainLayout;
NewBanner.routeSettings = routing.cmsHomeHeroBanner;
