/*
 * File: [newsId].tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 12 May 2022 03:35 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import Forms from 'components/atoms/Forms';

import { formFieldData, schema } from 'constants/staticData/formFields/newsFormField';
import Modal from 'components/atoms/Modal';
import api from 'api';
import { ROUTE_CMS_HOME_LATEST_NEWS } from 'constants/routes';
import Loader from 'components/molecules/Loader';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import { NETWORK_STATUS_CODES } from '../../../../../constants';
import envConfig from '@/config';

const News = () => {
  const [initialValue, setInitialValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalDeleteContent, setModalDeleteContent] = useState(null);
  const permission: RolePermission = usePermission(Permission.LATEST_NEWS);

  const router = useRouter();
  const { newsId } = router.query;

  function closeDeleteModal() {
    setIsDelete(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (values) => {
    try {
      let image;
      if (typeof values.image !== 'string') {
        image = await api.image.post({
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
      } else {
        image = values.image;
      }
      const formValues = {
        id: values.id,
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
        createdOn: values.createdOn,
        updatedOn: new Date(),
      };

      await api.latest_news.put(formValues);
      fetchNews(newsId);
      setIsOpen(true);
      if (image === null) {
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
      console.error(`🚀 ${error.name} in '/cms/home/latestNews/news' at line:63`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
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
      await api.latest_news.delete(id);
      await api.image.delete(initialValue?.image);
      setModalContent({
        heading: 'Success!',
        content: 'Item deleted!.',
      });
      router.push(ROUTE_CMS_HOME_LATEST_NEWS);
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/latestNews/News' at line:100`, error.message);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchNews = async (id) => {
    try {
      let news = await api.latest_news.getOne(id);
      news = news?.content;

      if (news) {
        setInitialValue({
          id: news.id,
          titleEN: news.title.en,
          titleFR: news.title.fr,
          descriptionEN: news.description.en,
          descriptionFR: news.description.fr,
          image: news.image ?? '',
          redirectionNameEN: news.redirectionLinkName.en,
          redirectionNameFR: news.redirectionLinkName.fr,
          redirectionEN: news.redirectionLink.en,
          redirectionFR: news.redirectionLink.fr,
          isActive: news.active,
        });
      }
    } catch (error) {
      console.error(`🚀 ${error.name} in '/cms/home/latestNews/News' at line:143`, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  useEffect(() => {
    fetchNews(newsId);
  }, [newsId]);

  return (
    <>
      <SEO title='Latest News' desc='Latest News Description' />
      <Privilege permission={permission?.read} message='view latest news'>
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
              <button className='mt-confirmationBtnYes' onClick={() => deleteItem(newsId)}>
                Yes
              </button>
            </div>
          </Modal>
        )}
        <div className='grid items-start'>
          <div className={!initialValue?.image ? 'max-w-2xl' : ''}>
            <h1 className='mb-10 text-lg font-bold text-gray-800'>Latest news management</h1>
            {initialValue ? (
              <div className='w-full p-10 bg-white rounded shadow flex gap-8'>
                <Forms
                  formFields={formFieldData}
                  handleSubmit={handleSubmit}
                  initialValue={initialValue}
                  formsSchema={schema}
                  buttonValue='Update'
                  savePermission={permission?.update}
                  deletePermission={permission?.delete}
                  deleteItem={deleteConfirmation}
                />
                {initialValue?.image && (
                  <div className='flex flex-col gap-4 ml-8 border-l pl-5'>
                    <div className='p-2 border rounded'>
                      <div>
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.image}`}
                          className='h-[250px] object-contain'
                        />
                      </div>
                    </div>
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

News.auth = true;
export default News;
News.Layout = MainLayout;
News.routeSettings = routing.cmsHomeLatestNews;
