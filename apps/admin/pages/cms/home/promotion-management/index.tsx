/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 11 May 2022 04:59 pm
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
import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import { NETWORK_STATUS_CODES } from '../../../../constants';

import * as Yup from 'yup';
import Image from 'next/image';
import envConfig from '@/config';

export const formFieldData = [
  {
    label: 'Title EN',
    name: 'titleEN',
    fieldType: 'text',
    placeholder: 'Title EN',
  },
  {
    label: 'Title FR',
    name: 'titleFR',
    fieldType: 'text',
    placeholder: 'Title FR',
  },
  // {
  //   label: 'Subtitle EN',
  //   name: 'subTitleEN',
  //   fieldType: 'text',
  //   placeholder: 'Subtitle EN',
  // },
  // {
  //   label: 'Subtitle FR',
  //   name: 'subTitleFR',
  //   fieldType: 'text',
  //   placeholder: 'Subtitle FR',
  // },
  {
    label: 'Label EN',
    name: 'labelEN',
    fieldType: 'text',
    placeholder: 'Label EN',
  },
  {
    label: 'Label FR',
    name: 'labelFR',
    fieldType: 'text',
    placeholder: 'Label FR',
  },
  // {
  //   label: 'Short Description EN',
  //   name: 'shortDescriptionEN',
  //   fieldType: 'text',
  //   placeholder: 'Short Description EN',
  // },
  // {
  //   label: 'Short Description FR',
  //   name: 'shortDescriptionFR',
  //   fieldType: 'text',
  //   placeholder: 'Short Description FR',
  // },
  // {
  //   label: 'Deeplink Name EN',
  //   name: 'deepLinkNameEN',
  //   fieldType: 'text',
  //   placeholder: 'Deeplink Name EN',
  // },
  // {
  //   label: 'Deeplink Name FR',
  //   name: 'deepLinkNameFR',
  //   fieldType: 'text',
  //   placeholder: 'Deeplink Name FR',
  // },
  // {
  //   label: 'Deeplink EN',
  //   name: 'deepLinkEN',
  //   fieldType: 'text',
  //   placeholder: 'Deeplink EN',
  // },
  // {
  //   label: 'Deeplink FR',
  //   name: 'deepLinkFR',
  //   fieldType: 'text',
  //   placeholder: 'Deeplink FR',
  // },
  // {
  //   label: 'Banner EN',
  //   name: 'bannerEN',
  //   fieldType: 'text',
  //   placeholder: 'Banner EN',
  // },
  // {
  //   label: 'Banner FR',
  //   name: 'bannerFR',
  //   fieldType: 'text',
  //   placeholder: 'Banner FR',
  // },
  {
    label: 'Image EN',
    name: 'imageEN',
    accept: '.jpg,.jpeg,.png',
    fieldType: 'image',
    placeholder: 'Image EN',
  },
  {
    label: 'Image FR',
    name: 'imageFR',
    accept: '.jpg,.jpeg,.png',
    fieldType: 'image',
    placeholder: 'Image FR',
  },
  {
    label: 'isActive',
    name: 'isActive',
    fieldType: 'toggle',
  },
];

export const schema = {
  titleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  titleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  // subTitleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  // subTitleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  labelEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  labelFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  // shortDescriptionEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  // shortDescriptionFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  // deepLinkNameEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  // deepLinkNameFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  // deepLinkEN: Yup.string().url('URL is not valid').required('This field cannot be empty'),
  // deepLinkFR: Yup.string().url('URL is not valid').required('This field cannot be empty'),
  // bannerEN: Yup.string()
  //   .max(255, 'Max characters 255 only allowed')
  //   .required('This field cannot be empty'),
  // bannerFR: Yup.string()
  //   .max(255, 'Max characters 255 only allowed')
  //   .required('This field cannot be empty'),
  imageEN: Yup.string().required('This field cannot be empty'),
  imageFR: Yup.string().required('This field cannot be empty'),
};

const NewPromotion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const permission: RolePermission = usePermission(Permission.PROMOTION_SECTION);

  const handleSubmit = async (values) => {
    let imageEN;
    if (typeof values.imageEN !== 'string') {
      imageEN = await api.image.post({
        file: values.imageEN,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'imageEN',
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
      imageEN = values.imageEN;
    }

    let imageFR;
    if (typeof values.imageFR !== 'string') {
      imageFR = await api.image.post({
        file: values.imageFR,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'imageFR',
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
      imageFR = values.imageFR;
    }
    const formObj = {
      id: values.id,
      image: {
        en: imageEN,
        fr: imageFR,
      },
      title: {
        en: values.titleEN,
        fr: values.titleFR,
      },
      subTitle: {
        en: '', //values.subTitleEN,
        fr: '', //values.subTitleFR,
      },
      label: {
        en: values.labelEN,
        fr: values.labelFR,
      },
      shortDescription: {
        en: '', // values.shortDescriptionEN,
        fr: '', // values.shortDescriptionFR,
      },
      deepLinkName: {
        en: '', //values.deepLinkNameEN,
        fr: '', // values.deepLinkNameFR,
      },
      deepLink: {
        en: '', // values.deepLinkEN,
        fr: '', // values.deepLinkFR,
      },
      // banner: {
      //   en: values.bannerEN,
      //   fr: values.bannerFR,
      // },
      active: values.isActive,
    };
    try {
      await api.promotional_offer.put(formObj);

      fetchPromotionDetail();
      setIsOpen(true);
      if (imageEN === null || imageFR === null) {
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
      console.error(`🚀 ${error.name} in '/cms/home/promotionManagement/new' at line:63`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchPromotionDetail = async () => {
    try {
      let promotions = await api.promotional_offer.getAll();
      promotions = promotions.content[0];
      console.log(promotions);
      if (promotions) {
        const init = {
          id: promotions.id,
          titleEN: promotions.title.en,
          titleFR: promotions.title.fr,
          // subTitleEN: promotions.subTitle.en,
          // subTitleFR: promotions.subTitle.fr,
          labelEN: promotions.label.en,
          labelFR: promotions.label.fr,
          // shortDescriptionEN: promotions.shortDescription.en,
          // shortDescriptionFR: promotions.shortDescription.fr,
          // deepLinkNameEN: promotions.deepLinkName.en,
          // deepLinkNameFR: promotions.deepLinkName.fr,
          // deepLinkEN: promotions.deepLink.en,
          // deepLinkFR: promotions.deepLink.fr,
          // bannerEN: promotions.title.en,
          // bannerFR: promotions.title.fr,
          imageEN: promotions.image.en,
          imageFR: promotions.image.fr,
          isActive: promotions.active,
        };
        setInitialValue(init);
      } else {
        setInitialValue({
          titleEN: '',
          titleFR: '',
          // subTitleEN: '',
          // subTitleFR: '',
          labelEN: '',
          labelFR: '',
          // shortDescriptionEN: '',
          // shortDescriptionFR: '',
          // deepLinkNameEN: '',
          // deepLinkNameFR: '',
          // deepLinkEN: '',
          // deepLinkFR: '',
          // bannerEN: '',
          // bannerFR: '',
          imageEN: '',
          imageFR: '',
          isActive: false,
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/promotionManagement/new' at line:84`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchPromotionDetail();
  }, []);

  return (
    <>
      <SEO title='Promotion Management' desc='Promotion Management Description' />
      <Privilege permission={permission?.read} message='view promotion section'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        <div className='grid items-start'>
          <div className={!initialValue?.imageEN && !initialValue?.imageFR ? 'max-w-2xl' : ''}>
            <h1 className='mb-10 text-lg font-bold text-gray-800'>Promotion home management</h1>
            {initialValue ? (
              <div className='w-full p-10 bg-white rounded shadow flex gap-8'>
                <Forms
                  formFields={formFieldData}
                  handleSubmit={handleSubmit}
                  initialValue={initialValue}
                  formsSchema={schema}
                  buttonValue='Update'
                  savePermission={permission?.update}
                />
                {(initialValue?.imageEN || initialValue?.imageFR) && (
                  <div className='flex flex-col gap-4 ml-8 border-l pl-5'>
                    {initialValue?.imageEN && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.imageEN}`}
                            className='h-[150px] object-contain'
                            alt='imageEN'
                          />
                        </div>
                        <p className='mt-1 text-left'>Image English</p>
                      </div>
                    )}
                    {initialValue?.imageFR && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.imageFR}`}
                            className='h-[150px] object-contain'
                            alt='imageFR'
                          />
                        </div>
                        <p className='mt-1 text-left'>Image French</p>
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

NewPromotion.auth = true;
export default NewPromotion;
NewPromotion.Layout = MainLayout;
NewPromotion.routeSettings = routing.cmsPromotionMGMT;
