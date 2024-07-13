/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 21 June 2022 10:02 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import Forms from 'components/atoms/Forms';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';
import api from 'api';
import Modal from 'components/atoms/Modal';
import Loader from 'components/molecules/Loader';
import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import { NETWORK_STATUS_CODES } from '../../../../constants';
import Image from 'next/image';
import envConfig from '@/config';

const formFieldData = [
  {
    sectionTitle: 'Value section title',
    fields: [
      {
        label: 'Title EN',
        name: 'sectionTitleEN',
        fieldType: 'text',
        placeholder: 'Enter section title in en',
      },
      {
        label: 'Title FR',
        name: 'sectionTitleFR',
        fieldType: 'text',
        placeholder: 'Enter section title in fr',
      },
    ],
  },
  {
    sectionTitle: 'Value 1',
    fields: [
      {
        label: 'Title EN',
        name: 'missionTitleEN',
        fieldType: 'text',
        placeholder: 'Enter section title in en',
      },
      {
        label: 'Title FR',
        name: 'missionTitleFR',
        fieldType: 'text',
        placeholder: 'Enter section title in fr',
      },
      {
        label: 'Short description EN',
        name: 'missionDescriptionEN',
        fieldType: 'text',
        placeholder: 'Enter a short description in en',
      },
      {
        label: 'Short description FR',
        name: 'missionDescriptionFR',
        fieldType: 'text',
        placeholder: 'Enter a short description in fr',
      },
      {
        label: 'Icon',
        name: 'missionIcon',
        fieldType: 'image',
        accept: '.jpg,.jpeg,.png',
        placeholder: 'Enter section title in en',
      },
    ],
  },
  {
    sectionTitle: 'Value 2',
    fields: [
      {
        label: 'Title EN',
        name: 'visionTitleEN',
        fieldType: 'text',
        placeholder: 'Enter section title in en',
      },
      {
        label: 'Title FR',
        name: 'visionTitleFR',
        fieldType: 'text',
        placeholder: 'Enter section title in fr',
      },
      {
        label: 'Short description EN',
        name: 'visionDescriptionEN',
        fieldType: 'text',
        placeholder: 'Enter a short description in en',
      },
      {
        label: 'Short description FR',
        name: 'visionDescriptionFR',
        fieldType: 'text',
        placeholder: 'Enter a short description in fr',
      },
      {
        label: 'Icon',
        name: 'visionIcon',
        fieldType: 'image',
        accept: '.jpg,.jpeg,.png',
        placeholder: 'Enter section title in en',
      },
    ],
  },
  {
    sectionTitle: 'Value 3',
    fields: [
      {
        label: 'Title EN',
        name: 'mottoTitleEN',
        fieldType: 'text',
        placeholder: 'Enter section title in en',
      },
      {
        label: 'Title FR',
        name: 'mottoTitleFR',
        fieldType: 'text',
        placeholder: 'Enter section title in fr',
      },
      {
        label: 'Short description EN',
        name: 'mottoDescriptionEN',
        fieldType: 'text',
        placeholder: 'Enter a short description in en',
      },
      {
        label: 'Short description FR',
        name: 'mottoDescriptionFR',
        fieldType: 'text',
        placeholder: 'Enter a short description in fr',
      },
      {
        label: 'Icon',
        name: 'mottoIcon',
        fieldType: 'image',
        accept: '.jpg,.jpeg,.png',
        placeholder: 'Enter section title in en',
      },
    ],
  },
  {
    sectionTitle: 'Profile section title',
    fields: [
      {
        label: 'Title EN',
        name: 'profileSectionTitleEN',
        fieldType: 'text',
        placeholder: 'Enter profile section title in en',
      },
      {
        label: 'Title FR',
        name: 'profileSectionTitleFR',
        fieldType: 'text',
        placeholder: 'Enter profile section title in fr',
      },
    ],
  },
  {
    sectionTitle: ' ',
    fields: [
      {
        label: 'Description EN',
        name: 'profileSectionDescriptionEN',
        fieldType: 'richtext',
        placeholder: 'Enter description in en',
      },
      {
        label: 'Description FR',
        name: 'profileSectionDescriptionFR',
        fieldType: 'richtext',
        placeholder: 'Enter description in fr',
      },
    ],
  },
  {
    sectionTitle: ' ',
    fields: [
      {
        label: 'Redirection title EN',
        name: 'redirectionTitleEN',
        fieldType: 'text',
        placeholder: 'Enter redirection title in en',
      },
      {
        label: 'Redirection title FR',
        name: 'redirectionTitleFR',
        fieldType: 'text',
        placeholder: 'Enter redirection title in fr',
      },
      {
        label: 'Redirection link EN',
        name: 'redirectionLinkEN',
        fieldType: 'text',
        placeholder: 'Enter redirection link in en',
      },
      {
        label: 'Redirection link FR',
        name: 'redirectionLinkFR',
        fieldType: 'text',
        placeholder: 'Enter redirection link in fr',
      },
    ],
  },
];

const schema = {
  sectionTitleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  sectionTitleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  missionIcon: Yup.string().required('This field cannot be empty'),
  missionTitleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  missionTitleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  missionDescriptionEN: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
  missionDescriptionFR: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
  visionIcon: Yup.string().required('This field cannot be empty'),
  visionTitleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  visionTitleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  visionDescriptionEN: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
  visionDescriptionFR: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
  mottoIcon: Yup.string().required('This field cannot be empty'),
  mottoTitleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  mottoTitleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  mottoDescriptionEN: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
  mottoDescriptionFR: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
  profileSectionTitleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  profileSectionTitleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  profileSectionDescriptionEN: Yup.string().required('This field cannot be empty'),
  profileSectionDescriptionFR: Yup.string().required('This field cannot be empty'),
  redirectionTitleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  redirectionTitleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  redirectionLinkEN: Yup.string().url('URL is not valid').required('This field cannot be empty'),
  redirectionLinkFR: Yup.string().url('URL is not valid').required('This field cannot be empty'),
};

const NewAboutUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const permission: RolePermission = usePermission(Permission.ABOUT_US_MANAGEMENT);

  const handleSubmit = async (values) => {
    try {
      let missionIcon;
      let visionIcon;
      let mottoIcon;
      if (typeof values.missionIcon !== 'string') {
        missionIcon = await api.image.post({
          file: values.missionIcon,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'missionIcon',
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
        missionIcon = values.missionIcon;
      }

      if (typeof values.visionIcon !== 'string') {
        visionIcon = await api.image.post({
          file: values.visionIcon,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'visionIcon',
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
        visionIcon = values.visionIcon;
      }

      if (typeof values.mottoIcon !== 'string') {
        mottoIcon = await api.image.post({
          file: values.mottoIcon,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'mottoIcon',
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
        mottoIcon = values.mottoIcon;
      }

      const structuredValue = {
        section_title: {
          sectionTitle: {
            en: values.sectionTitleEN,
            fr: values.sectionTitleFR,
          },
        },
        mission: {
          missionIcon: missionIcon,
          missionTitle: {
            en: values.missionTitleEN,
            fr: values.missionTitleFR,
          },
          missionDescription: {
            en: values.missionDescriptionEN,
            fr: values.missionDescriptionFR,
          },
        },
        vision: {
          visionIcon: visionIcon,
          visionTitle: {
            en: values.visionTitleEN,
            fr: values.visionTitleFR,
          },
          visionDescription: {
            en: values.visionDescriptionEN,
            fr: values.visionDescriptionFR,
          },
        },
        motto: {
          mottoIcon: mottoIcon,
          mottoTitle: {
            en: values.mottoTitleEN,
            fr: values.mottoTitleFR,
          },
          mottoDescription: {
            en: values.mottoDescriptionEN,
            fr: values.mottoDescriptionFR,
          },
        },
        company_profile: {
          profileSectionTitle: {
            en: values.profileSectionTitleEN,
            fr: values.profileSectionTitleFR,
          },
          profileSectionDescription: {
            en: values.profileSectionDescriptionEN,
            fr: values.profileSectionDescriptionFR,
          },
        },
        redirection_link: {
          redirectionTitle: {
            en: values.redirectionTitleEN,
            fr: values.redirectionTitleFR,
          },
          redirectionLink: {
            en: values.redirectionLinkEN,
            fr: values.redirectionLinkFR,
          },
        },
      };
      const formValues = {
        contentType: 'json',
        data: JSON.stringify(structuredValue),
        id: fetchedData.id,
        position: fetchedData.position,
        status: fetchedData.status,
      };
      await api.generic_content.put(formValues);

      fetchAboutUs();
      setIsOpen(true);
      if (missionIcon === null || visionIcon === null || mottoIcon === null) {
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
      console.error(`🚀 ${error.name} in '/cms/aboutUs/aboutUsManagement/new' at line:343`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const fetchAboutUs = async () => {
    try {
      let about = await api.generic_content.get('ABOUT_US');
      about = about?.content;
      if (about) {
        setFetchedData(about);
        const formfield = JSON.parse(about.data);

        const init = {
          sectionTitleEN: formfield.section_title.sectionTitle.en,
          sectionTitleFR: formfield.section_title.sectionTitle.fr,
          missionIcon: formfield.mission.missionIcon,
          missionTitleEN: formfield.mission.missionTitle.en,
          missionTitleFR: formfield.mission.missionTitle.fr,
          missionDescriptionEN: formfield.mission.missionDescription.en,
          missionDescriptionFR: formfield.mission.missionDescription.fr,
          visionIcon: formfield.vision.visionIcon,
          visionTitleEN: formfield.vision.visionTitle.en,
          visionTitleFR: formfield.vision.visionTitle.fr,
          visionDescriptionEN: formfield.vision.visionDescription.en,
          visionDescriptionFR: formfield.vision.visionDescription.fr,
          mottoIcon: formfield.motto.mottoIcon,
          mottoTitleEN: formfield.motto.mottoTitle.en,
          mottoTitleFR: formfield.motto.mottoTitle.fr,
          mottoDescriptionEN: formfield.motto.mottoDescription.en,
          mottoDescriptionFR: formfield.motto.mottoDescription.fr,
          profileSectionTitleEN: formfield.company_profile.profileSectionTitle.en,
          profileSectionTitleFR: formfield.company_profile.profileSectionTitle.fr,
          profileSectionDescriptionEN: formfield.company_profile.profileSectionDescription.en,
          profileSectionDescriptionFR: formfield.company_profile.profileSectionDescription.fr,
          redirectionTitleEN: formfield.redirection_link.redirectionTitle.en,
          redirectionTitleFR: formfield.redirection_link.redirectionTitle.fr,
          redirectionLinkEN: formfield.redirection_link.redirectionLink.en,
          redirectionLinkFR: formfield.redirection_link.redirectionLink.fr,
        };
        setInitialValue(init);
      } else {
        setInitialValue({
          sectionTitleEN: '',
          sectionTitleFR: '',
          missionIcon: '',
          missionTitleEN: '',
          missionTitleFR: '',
          missionDescriptionEN: '',
          missionDescriptionFR: '',
          visionIcon: '',
          visionTitleEN: '',
          visionTitleFR: '',
          visionDescriptionEN: '',
          visionDescriptionFR: '',
          mottoIcon: '',
          mottoTitleEN: '',
          mottoTitleFR: '',
          mottoDescriptionEN: '',
          mottoDescriptionFR: '',
          profileSectionTitleEN: '',
          profileSectionTitleFR: '',
          profileSectionDescriptionEN: '',
          profileSectionDescriptionFR: '',
          redirectionTitleEN: '',
          redirectionTitleFR: '',
          redirectionLinkEN: '',
          redirectionLinkFR: '',
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/aboutUs/aboutUsManagement/new' at line:423`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
      setInitialValue({
        sectionTitleEN: '',
        sectionTitleFR: '',
        missionIcon: '',
        missionTitleEN: '',
        missionTitleFR: '',
        missionDescriptionEN: '',
        missionDescriptionFR: '',
        visionIcon: '',
        visionTitleEN: '',
        visionTitleFR: '',
        visionDescriptionEN: '',
        visionDescriptionFR: '',
        mottoIcon: '',
        mottoTitleEN: '',
        mottoTitleFR: '',
        mottoDescriptionEN: '',
        mottoDescriptionFR: '',
        profileSectionTitleEN: '',
        profileSectionTitleFR: '',
        profileSectionDescriptionEN: '',
        profileSectionDescriptionFR: '',
        redirectionTitleEN: '',
        redirectionTitleFR: '',
        redirectionLinkEN: '',
        redirectionLinkFR: '',
      });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
    <>
      <SEO title='About us' desc='About us management' />
      <Privilege permission={permission?.read} message='view about us content'>
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
          <div className={!initialValue?.missionIcon && !initialValue?.visionIcon && !initialValue?.mottoIcon ? 'max-w-2xl' : ''}>
            <h1 className='mb-10 text-lg font-bold text-gray-800'>About us management</h1>
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
                {(initialValue?.missionIcon || initialValue?.visionIcon || initialValue.mottoIcon) && (
                  <div className='flex flex-col gap-4 ml-8 border-l pl-5'>
                    {initialValue?.missionIcon && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.missionIcon}`}
                            className='h-[150px] object-contain'
                            alt='missionIcon'
                          />
                        </div>
                        <p className='mt-1 text-left'>Mission Icon</p>
                      </div>
                    )}
                    {initialValue?.visionIcon && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.visionIcon}`}
                            className='h-[150px] object-contain'
                            alt='visionIcon'
                          />
                        </div>
                        <p className='mt-1 text-left'>Vision Icon</p>
                      </div>
                    )}
                    {initialValue?.mottoIcon && (
                      <div className='p-2 border rounded'>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.mottoIcon}`}
                            className='h-[150px] object-contain'
                            alt='mottoIcon'
                          />
                        </div>
                        <p className='mt-1 text-left'>Motto Icon</p>
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

NewAboutUs.auth = true;
export default NewAboutUs;

NewAboutUs.Layout = MainLayout;
NewAboutUs.routeSettings = routing.cmsAboutUsMGMT;
