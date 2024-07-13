/*
 * File: [productId].tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 12 May 2022 10:30 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import { formFieldData, schema } from 'constants/staticData/formFields/featuredProductFormField';
import Forms from 'components/atoms/Forms';
import Modal from 'components/atoms/Modal';
import Loader from 'components/molecules/Loader';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import api from 'api';
import Image from 'next/image';
import { ROUTE_CMS_HOME_FEATURED_PRODUCTS } from 'constants/routes';
import { NETWORK_STATUS_CODES } from '../../../../../constants';
import envConfig from '@/config';

const FeatureProduct = () => {
  const [initialValue, setInitialValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [modalDeleteContent, setModalDeleteContent] = useState(null);
  const [productType, setProductType] = useState('');
  const [productDropdown, setProductDropdown] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [products, setProducts] = useState([]);
  const [solutions, setSolutions] = useState([]);

  formFieldData[0].options = productDropdown;

  const permission: RolePermission = usePermission(Permission.FEATURED_PRODUCTS);

  const router = useRouter();
  const { productId } = router.query;

  const handleTypeChange = (e: any) => {
    setInitialValue({ ...initialValue, productName: '' });
    const value = e.target.value;
    setProductType(value);
    if (value === 'PRODUCT_LEVEL_2') {
      setProductDropdown(products);
    } else if (value === 'MARKETPLACE_LEVEL_2') {
      setProductDropdown(marketplace);
    } else if (value === 'SOLUTION') {
      setProductDropdown(solutions);
    }
  };

  const selectDropdown = (value) => {
    setProductType(value);
    if (value === 'PRODUCT_LEVEL_2') {
      setProductDropdown(products);
    } else if (value === 'MARKETPLACE_LEVEL_2') {
      setProductDropdown(marketplace);
    } else if (value === 'SOLUTION') {
      setProductDropdown(solutions);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }

  const handleSubmit = async (values) => {
    try {
      let icon;

      if (typeof values.icon !== 'string') {
        icon = await api.image.post({
          file: values.icon,
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
        icon = values.icon;
      }
      const obj = {
        productId: values.productName,
        type: productType,
        icon: icon,
        displayName: values.displayNameEN,
        displayNameFR: values.displayNameFR,
        shortDescription: values.descriptionEN,
        shortDescriptionFR: values.descriptionFR,
        scheduleStart: values.scheduleStartDateTime,
        scheduleEnd: values.scheduleEndDateTime,
        priority: values.priority,
        isActive: values.isActive,
      };

      if (Date.parse(values.scheduleStartDateTime) < Date.parse(values.scheduleEndDateTime)) {
        await api.featured_products.put(obj, productId);
        fetchFeaturedProduct(productId);
        setIsOpen(true);
        if (icon === null) {
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
      } else {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Schedule start should be less than Schedule end!.',
        });
      }
    } catch (error) {
      console.log('error', error);
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
    setIsDeleteOpen(true);
    setModalDeleteContent({
      heading: 'Delete!',
      content: 'Are you sure you want to permanently delete this item?',
    });
  };

  const deleteItem = async (id) => {
    try {
      await api.featured_products.delete(id);
      await api.image.delete(initialValue?.icon);

      setIsDeleteOpen(false);
      router.push(ROUTE_CMS_HOME_FEATURED_PRODUCTS);
    } catch (error) {
      setIsDeleteOpen(false);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: `Something went wrong!`,
      });
    }
  };

  const fetchFeaturedProduct = async (id) => {
    try {
      const data = await api.featured_products.getOne(id);

      selectDropdown(data.type);
      setInitialValue({
        id: data.id,
        productName: data.productId,
        icon: data.icon,
        displayNameEN: data.displayName.en,
        displayNameFR: data.displayName.fr,
        descriptionEN: data.shortDescription.en,
        descriptionFR: data.shortDescription.fr,
        scheduleStartDateTime: data.scheduleStart,
        scheduleEndDateTime: data.scheduleEnd,
        priority: data.priority,
        isActive: data.isActive,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await api.product_search.getProductsCatalogueSubcategory();
      const marketplace = await api.product_search.getMarketPlaceSubcategory();
      const solutions = await api.product_search.getSolutionCatalogue();

      const marketArr = marketplace.marketplaceSubCategories?.map((data) => ({
        value: data.subCategoryId,
        label: data.productSubCategoryTitle.en,
      }));

      const productsArr = products.productSubCategories?.map((data) => ({
        value: data.subCategoryId,
        label: data.productSubCategoryTitle.en,
      }));

      const solutionsArr = solutions.solutions?.map((data) => ({
        value: data.solutionId,
        label: data.solutionTitle.en,
      }));
      setProductDropdown(productsArr);
      setMarketplace(marketArr);
      setProducts(productsArr);
      setSolutions(solutionsArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (marketplace.length > 0 && products.length > 0 && solutions.length > 0) {
      fetchFeaturedProduct(productId);
    }
  }, [productId, products, marketplace, solutions]);

  return (
    <>
      <SEO title='Featured Products' desc='Featured Products Description' />
      <Privilege permission={permission?.read} message='view featured products'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center gap-3 pt-3'>
              <button className='mt-confirmationBtnNo' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        {isDeleteOpen && (
          <Modal isOpen={isDeleteOpen} closeModal={closeDeleteModal} heading={modalDeleteContent?.heading} content={modalDeleteContent?.content}>
            <div className='flex justify-center gap-3 pt-3'>
              <button className='mt-confirmationBtnNo' onClick={closeDeleteModal}>
                No
              </button>
              <button className='mt-confirmationBtnYes' onClick={() => deleteItem(productId)}>
                Yes
              </button>
            </div>
          </Modal>
        )}
        <div className='max-w-2xl'>
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Featured products</h1>
          {initialValue && marketplace.length > 0 && products.length > 0 && solutions.length > 0 ? (
            <div className='w-full p-10 bg-white rounded shadow'>
              <div>
                <div className='mb-4 md:flex md:items-baseline'>
                  <div className='md:w-1/3'>
                    <label className='self-stretch my-1 text-sm font-normal tracking-wide'>Type</label>
                  </div>
                  <div onChange={handleTypeChange}>
                    <div className='flex items-center gap-2'>
                      <input
                        type='radio'
                        value='PRODUCT_LEVEL_2'
                        name='productType'
                        className='w-4 h-4'
                        defaultChecked={productType === 'PRODUCT_LEVEL_2'}
                      />{' '}
                      Products
                    </div>
                    <div className='flex items-center gap-2'>
                      <input
                        type='radio'
                        value='MARKETPLACE_LEVEL_2'
                        name='productType'
                        className='w-4 h-4'
                        defaultChecked={productType === 'MARKETPLACE_LEVEL_2'}
                      />{' '}
                      Marketplace Products
                    </div>
                    <div className='flex items-center gap-2'>
                      <input type='radio' value='SOLUTION' name='productType' className='w-4 h-4' defaultChecked={productType === 'SOLUTION'} />{' '}
                      Solutions
                    </div>
                  </div>
                </div>
              </div>

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
              {/* Image section */}
              {initialValue.icon && (
                <div className='flex items-start gap-4 mt-8 border-t pt-5'>
                  <div className='p-2 border rounded'>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content/${initialValue?.icon}`}
                      width={100}
                      height={100}
                    />
                    <p className='mt-1 text-center'>Logo Small</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </Privilege>
    </>
  );
};

FeatureProduct.auth = true;
export default FeatureProduct;
FeatureProduct.Layout = MainLayout;
FeatureProduct.routeSettings = routing.cmsHomeFeaturedProducts;
