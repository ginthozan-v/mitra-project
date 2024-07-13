/*
 * File: loyality-management.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 11 May 2022 04:25 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useEffect, useState } from 'react';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Forms from 'components/atoms/Forms';
import * as Yup from 'yup';

import api from 'api';
import Modal from 'components/atoms/Modal';
import Loader from 'components/molecules/Loader';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../constants';
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
  {
    label: 'Sub title EN',
    name: 'subtitleEN',
    fieldType: 'text',
    placeholder: 'Subtitle EN',
  },
  {
    label: 'Sub title FR',
    name: 'subtitleFR',
    fieldType: 'text',
    placeholder: 'Subtitle FR',
  },
  {
    label: 'Short description EN',
    name: 'descriptionEN',
    fieldType: 'text',
    placeholder: 'Short Description EN',
  },
  {
    label: 'Short description FR',
    name: 'descriptionFR',
    fieldType: 'text',
    placeholder: 'Short Description FR',
  },
  {
    label: 'Image EN',
    name: 'imageEN',
    accept: '.jpg,.jpeg,.png',
    fieldType: 'image',
  },
  {
    label: 'Image FR',
    name: 'imageFR',
    accept: '.jpg,.jpeg,.png',
    fieldType: 'image',
  },
  {
    label: 'Deep link name EN',
    name: 'deepLinkNameEN',
    fieldType: 'text',
    placeholder: 'Deep Link Name EN',
  },
  {
    label: 'Deep link name FR',
    name: 'deepLinkNameFR',
    fieldType: 'text',
    placeholder: 'Deep Link Name FR',
  },
  {
    label: 'Deep link EN',
    name: 'deepLinkEN',
    fieldType: 'text',
    placeholder: 'Deep Link EN',
  },
  {
    label: 'Deep link FR',
    name: 'deepLinkFR',
    fieldType: 'text',
    placeholder: 'Deep Link FR',
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
  labelEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  labelFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  subtitleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  subtitleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  descriptionEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  descriptionFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  imageEN: Yup.string().required('This field cannot be empty'),
  imageFR: Yup.string().required('This field cannot be empty'),
  deepLinkNameEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  deepLinkNameFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  deepLinkEN: Yup.string().url('URL is not valid').required('This field cannot be empty'),
  deepLinkFR: Yup.string().url('URL is not valid').required('This field cannot be empty'),
};

function NewLoyalityHomeManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const permission: RolePermission = usePermission(Permission.LOYALITY_SECTION);

  const fetchLoyality = async () => {
    try {
      let loyality = await api.loyality.getAll(0, 10);
      loyality = loyality?.content[0];

      if (loyality) {
        setInitialValue({
          id: loyality.id,
          titleEN: loyality.title.en,
          titleFR: loyality.title.fr,
          labelEN: loyality.label.en,
          labelFR: loyality.label.fr,
          subtitleEN: loyality.subTitle.en,
          subtitleFR: loyality.subTitle.fr,
          descriptionEN: loyality.shortDescription?.en,
          descriptionFR: loyality.shortDescription.fr,
          imageEN: loyality.image.en,
          imageFR: loyality.image.fr,
          deepLinkNameEN: loyality.deepLinkName.en,
          deepLinkNameFR: loyality.deepLinkName.fr,
          deepLinkEN: loyality.deepLink.en,
          deepLinkFR: loyality.deepLink.fr,
          isActive: loyality.active,
          createdOn: loyality.createdOn,
        });
      } else {
        setInitialValue({
          titleEN: '',
          titleFR: '',
          labelEN: '',
          labelFR: '',
          subtitleEN: '',
          subtitleFR: '',
          descriptionEN: '',
          descriptionFR: '',
          imageEN: ' ',
          imageFR: '',
          deepLinkNameEN: '',
          deepLinkNameFR: '',
          deepLinkEN: '',
          deepLinkFR: '',
          isActive: false,
          createdOn: '',
        });
      }
    } catch (error) {
      const status = error.response.status;
      console.error(`🚀 ${error.name} in '/cms/home/loyalityManagement/new' at line:74`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: status,
        content: status === 401 && 'You are not logged in',
      });
    }
  };

  const handleSubmit = async (values) => {
    try {
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

      const formValues = {
        id: values.id,
        title: {
          en: values.titleEN,
          fr: values.titleFR,
        },
        label: {
          en: values.labelEN,
          fr: values.labelFR,
        },
        subTitle: {
          en: values.subtitleEN,
          fr: values.subtitleFR,
        },
        shortDescription: {
          en: values.descriptionEN,
          fr: values.descriptionFR,
        },
        image: {
          en: imageEN,
          fr: imageFR,
        },
        deepLinkName: {
          en: values.deepLinkNameEN,
          fr: values.deepLinkNameFR,
        },
        deepLink: {
          en: values.deepLinkEN,
          fr: values.deepLinkFR,
        },
        active: values.isActive,
        createdOn: new Date(),
        updatedOn: new Date(),
      };

      await api.loyality.put(formValues);
      fetchLoyality();
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
      console.error(`🚀 ${error.name} in '/cms/home/loyalityManagement/new' at line:93`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  useEffect(() => {
    fetchLoyality();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <SEO title='Loyalty Management' desc='Loyalty Management Description' />
      <Privilege permission={permission?.read} message='view loyalty section'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        <div className='grid items-start '>
          <div className={!initialValue?.imageEN && !initialValue?.imageFR ? 'max-w-2xl' : ''}>
            <h1 className='mb-10 text-lg font-bold text-gray-800'>Loyalty home management</h1>
            {initialValue ? (
              <div className='w-full p-10 bg-white rounded shadow flex gap-8'>
                <Forms
                  formFields={formFieldData}
                  handleSubmit={handleSubmit}
                  initialValue={initialValue}
                  formsSchema={schema}
                  savePermission={permission?.update}
                  buttonValue='Update'
                />
                {(initialValue?.imageEN || initialValue?.imageFR) && (
                  <div className='flex flex-col gap-4 ml-8 border-l pl-5'>
                    {initialValue?.imageEN && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.imageEN}`}
                            alt='imageEN'
                            className='h-[200px] object-contain'
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
                            alt='imageFR'
                            className='h-[200px] object-contain'
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
}

NewLoyalityHomeManagement.auth = true;
export default NewLoyalityHomeManagement;
NewLoyalityHomeManagement.Layout = MainLayout;
NewLoyalityHomeManagement.routeSettings = routing.cmsHomeLoyalityMGMT;
