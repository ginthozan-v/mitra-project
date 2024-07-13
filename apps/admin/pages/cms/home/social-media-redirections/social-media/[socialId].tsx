/*
 * File: [socialId].tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 13 May 2022 12:41 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Forms from 'components/atoms/Forms';

import { formFieldData, schema } from 'constants/staticData/formFields/socialMediaFormField';
import Modal from 'components/atoms/Modal';
import api from 'api';
import { ROUTE_CMS_SOCIAL_MEDIA } from 'constants/routes';
import Loader from 'components/molecules/Loader';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import Image from 'next/image';
import { NETWORK_STATUS_CODES } from '../../../../../constants';
import envConfig from '@/config';

const SocialMedia = () => {
  const [initialValue, setInitialValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalDeleteContent, setModalDeleteContent] = useState(null);
  const permission: RolePermission = usePermission(Permission.SOCIAL_MEDIA);

  const router = useRouter();
  const { socialId } = router.query;

  function closeDeleteModal() {
    setIsDelete(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const fetchSocialMedia = async (id) => {
    let response = await api.social_media_redirection.getOne(id);
    response = response?.content;

    if (response) {
      setInitialValue({
        id: response.id,
        title: response.logoTitle,
        logoImage: response.logoImage,
        redirectionLink: response.link,
        priority: response.priority,
        isActive: response.active,
      });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      let logoImage;

      if (typeof values.logoImage !== 'string') {
        logoImage = await api.image.post({
          file: values.logoImage,
          data: new Blob(
            [
              JSON.stringify({
                fileName: 'icon',
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
        logoImage = values.logoImage;
      }
      const formValues = {
        id: values.id,
        logoTitle: values.title,
        logoImage: logoImage,
        link: values.redirectionLink,
        priority: values.priority,
        active: values.isActive,
      };

      await api.social_media_redirection.put(formValues);
      fetchSocialMedia(socialId);
      setIsOpen(true);
      if (logoImage === null) {
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
      console.error(`🚀 ${error.name} in '/cms/home/socialMediaRedirections/socialMedia' at line:69`, error.message);
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
      await api.social_media_redirection.delete(id);
      await api.image.delete(initialValue?.logoImage);
      setModalContent({
        heading: 'Success!',
        content: 'Item deleted!.',
      });
      router.push(ROUTE_CMS_SOCIAL_MEDIA);
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/socialMediaRedirection/[socialId]' at line:103`, error.message);
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
    fetchSocialMedia(socialId);
  }, [socialId]);

  return (
    <>
      <SEO title='Social Media Redirection' desc='Social Media Redirection Description' />
      <Privilege permission={permission?.read} message='view social media links'>
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
              <button className='mt-confirmationBtnYes' onClick={() => deleteItem(socialId)}>
                Yes
              </button>
            </div>
          </Modal>
        )}
        <div className='grid items-start'>
          <div className='max-w-2xl'>
            <h1 className='mb-10 text-lg font-bold text-gray-800'>Social Media Redirection</h1>

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
                {/* Image section */}
                {initialValue.logoImage && (
                  <div className='flex items-start gap-4 mt-8 border-t pt-5'>
                    {initialValue?.logoImage && (
                      <div className='p-2 border rounded'>
                        <div className='relative w-auto h-[150px]'>
                          {/* <Image src={initialValue?.logoImage} layout='fill' objectFit='contain' /> */}
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.logoImage}`}
                            className='relative w-auto h-[150px] object-contain'
                          />
                        </div>
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

SocialMedia.auth = true;
export default SocialMedia;
SocialMedia.Layout = MainLayout;
SocialMedia.routeSettings = routing.cmsSocialMedia;
