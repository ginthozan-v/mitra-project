/*
 * File: hero-banners.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 11 May 2022 03:49 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Forms from 'components/atoms/Forms';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import { formFieldData, schema } from 'constants/staticData/formFields/heroBannerFormField';
import Modal from 'components/atoms/Modal';
import api from 'api';
import { ROUTE_CMS_HOME_HERO_BANNER } from 'constants/routes';
import Loader from 'components/molecules/Loader';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import Image from 'next/image';
import moment from 'moment';
import { el } from 'date-fns/locale';
import { NETWORK_STATUS_CODES } from '../../../../../constants';
import envConfig from '@/config';

const HeroBanner = () => {
  const [initialValue, setInitialValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalDeleteContent, setModalDeleteContent] = useState(null);
  const permission: RolePermission = usePermission(Permission.HERO_BANNER);

  const router = useRouter();
  const { bannerId } = router.query;

  function closeDeleteModal() {
    setIsDelete(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (values) => {
    try {
      let desktopBannerEN;
      let desktopBannerFR;
      let tabBannerEN;
      let tabBannerFR;
      let mobileBannerEN;
      let mobileBannerFR;
      if (typeof values.desktop_bannerEN !== 'string') {
        desktopBannerEN = await api.image.post({
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
      } else {
        desktopBannerEN = values.desktop_bannerEN;
      }

      if (typeof values.desktop_bannerFR !== 'string') {
        desktopBannerFR = await api.image.post({
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
      } else {
        desktopBannerFR = values.desktop_bannerFR;
      }

      if (typeof values.tab_bannerEN !== 'string') {
        tabBannerEN = await api.image.post({
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
      } else {
        tabBannerEN = values.tab_bannerEN;
      }

      if (typeof values.tab_bannerFR !== 'string') {
        tabBannerFR = await api.image.post({
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
      } else {
        tabBannerFR = values.tab_bannerFR;
      }

      if (typeof values.mobile_bannerEN !== 'string') {
        mobileBannerEN = await api.image.post({
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
      } else {
        mobileBannerEN = values.mobile_bannerEN;
      }

      if (typeof values.mobile_bannerFR !== 'string') {
        mobileBannerFR = await api.image.post({
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
      } else {
        mobileBannerFR = values.mobile_bannerFR;
      }

      const formValues = {
        id: values.id,
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
        // startDateTime: new Date(values.scheduleStartDateTime).toISOString(),
        // endDateTime: new Date(values.scheduleEndDateTime).toISOString(),
        startDateTime: values.scheduleStartDateTime,
        endDateTime: values.scheduleEndDateTime,
        priority: values.priority,
        active: values.isActive,
        createdOn: values.createdOn,
      };

      await api.hero_banner.put(formValues);
      fetchBanner(bannerId);
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
          content: 'Successfully updated!',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/heroBanner/[bennerId]' at line:52`, error.message);
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
      await api.hero_banner.delete(id);
      const imageData = {
        desktop_bannerEN: '',
        desktop_bannerFR: '',
        tab_bannerEN: '',
        tab_bannerFR: '',
        mobile_bannerEN: '',
        mobile_bannerFR: '',
      };
      Object.keys(imageData).forEach(async (key) => {
        await api.image.delete(initialValue[`${key}`]);
      });

      setModalContent({
        heading: 'Success!',
        content: 'Item deleted!.',
      });
      router.push(ROUTE_CMS_HOME_HERO_BANNER);
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/heroBanner/[bennerId]' at line:95`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const fetchBanner = async (id) => {
    try {
      let banner = await api.hero_banner.getOne(id);
      banner = banner?.content;

      if (banner) {
        setInitialValue({
          id: banner.id,
          title: banner.title,
          desktop_bannerEN: banner.images.filter((x) => x.bannerSize === 'DESKTOP')[0]?.banner?.en,
          desktop_bannerFR: banner.images.filter((x) => x.bannerSize === 'DESKTOP')[0]?.banner?.fr,
          tab_bannerEN: banner.images.filter((x) => x.bannerSize === 'TAB')[0]?.banner?.en,
          tab_bannerFR: banner.images.filter((x) => x.bannerSize === 'TAB')[0]?.banner?.fr,
          mobile_bannerEN: banner.images.filter((x) => x.bannerSize === 'MOBILE')[0]?.banner?.en,
          mobile_bannerFR: banner.images.filter((x) => x.bannerSize === 'MOBILE')[0]?.banner?.fr,
          redirectionEN: banner.redirectionLink.en,
          redirectionFR: banner.redirectionLink.fr,
          scheduleStartDateTime: moment.utc(banner.startDateTime).local().format('YYYY-MM-DD HH:mm'),
          scheduleEndDateTime: moment.utc(banner.endDateTime).local().format('YYYY-MM-DD HH:mm'),
          priority: banner.priority,
          isActive: banner.active,
          createdOn: banner.createdOn,
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/heroBanner/[bennerId]' at line:136`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  useEffect(() => {
    fetchBanner(bannerId);
  }, [bannerId]);

  return (
    <>
      <SEO title='Hero Banner' desc='Hero Benner Description' />
      <Privilege permission={permission?.read} message='view banners'>
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
              <button className='mt-confirmationBtnYes' onClick={() => deleteItem(bannerId)}>
                Yes
              </button>
            </div>
          </Modal>
        )}
        <div className='grid items-start'>
          <div
            className={
              !initialValue?.desktop_bannerEN &&
              !initialValue?.desktop_bannerFR &&
              !initialValue?.tab_bannerEN &&
              !initialValue?.tab_bannerFR &&
              !initialValue?.mobile_bannerEN &&
              !initialValue?.mobile_bannerFR
                ? 'max-w-2xl'
                : ''
            }
          >
            <h1 className='mb-10 text-lg font-bold text-gray-800'>Hero banner</h1>
            {initialValue ? (
              <div className='w-full p-10 bg-white rounded shadow flex gap-8'>
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
                {(initialValue?.desktop_bannerEN ||
                  initialValue?.desktop_bannerFR ||
                  initialValue?.tab_bannerEN ||
                  initialValue?.tab_bannerFR ||
                  initialValue?.mobile_bannerEN ||
                  initialValue?.mobile_bannerFR) && (
                  <div className='flex flex-col gap-4 ml-8 border-l pl-5'>
                    {initialValue?.desktop_bannerEN && (
                      <div className='p-2 border rounded'>
                        <div className='object-contain'>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.desktop_bannerEN}`}
                            alt='desktop_bannerEN'
                            className='h-[150px] object-contain'
                          />
                        </div>
                        <p className='mt-1 text-left'>Desktop Banner English</p>
                      </div>
                    )}
                    {initialValue?.desktop_bannerFR && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.desktop_bannerFR}`}
                            alt='desktop_bannerFR'
                            className='h-[150px] object-contain'
                          />
                        </div>
                        <p className='mt-1 text-left'>Desktop Banner French</p>
                      </div>
                    )}
                    {initialValue?.tab_bannerEN && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.tab_bannerEN}`}
                            alt='tab_bannerEN'
                            className='h-[150px] object-contain'
                          />
                        </div>
                        <p className='mt-1 text-left'>Tab Banner English</p>
                      </div>
                    )}
                    {initialValue?.tab_bannerFR && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.tab_bannerFR}`}
                            alt='tab_bannerFR'
                            className='h-[150px] object-contain'
                          />
                        </div>
                        <p className='mt-1 text-left'>Tab Banner French</p>
                      </div>
                    )}
                    {initialValue?.mobile_bannerEN && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.mobile_bannerEN}`}
                            alt='mobile_bannerEN'
                            className='h-[150px] object-contain'
                          />
                        </div>
                        <p className='mt-1 text-left'>Mobile Banner English</p>
                      </div>
                    )}
                    {initialValue?.mobile_bannerFR && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.mobile_bannerFR}`}
                            alt='mobile_bannerFR'
                            className='h-[150px] object-contain'
                          />
                        </div>
                        <p className='mt-1 text-left'>Mobile Banner French</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </Privilege>
    </>
  );
};

HeroBanner.auth = true;
export default HeroBanner;
HeroBanner.Layout = MainLayout;
HeroBanner.routeSettings = routing.cmsHomeHeroBanner;
