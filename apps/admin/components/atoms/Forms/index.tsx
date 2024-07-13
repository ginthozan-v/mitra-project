/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 11 April 2022 01:58 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import React, { Fragment, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Button from '@mtcloud/ui/atoms/Button';
import CheckBox from '@mtcloud/ui/atoms/CheckBox';
import Label from '@mtcloud/ui/atoms/Label';
import RolesSelect from '@mtcloud/ui/atoms/RolesSelect';
import FaqCategorySelect from '@mtcloud/ui/atoms/FaqCategorySelect';
import CountrySelectAsync from '@mtcloud/ui/atoms/CountrySelectAsync';
import CountryCodeSelectAsync from '@mtcloud/ui/atoms/CountryCodeSelectAsync';

import TextField from '@mtcloud/ui/atoms/TextInput';
import FloatInput from '@mtcloud/ui/atoms/FloatInput';
import InputInfo from '@mtcloud/ui/atoms/InputInfo';
import FileUploadField from '@mtcloud/ui/atoms/FileUploadField';
import ImageUpload from '@mtcloud/ui/atoms/ImageUpload';
import ImageFileUpload from '@mtcloud/ui/atoms/ImageFileUpload';
import ToggleSwitch from '@mtcloud/ui/atoms/ToggleSwitch';
import Dropdown from '@mtcloud/ui/atoms/Dropdown';
import RichEditor from '@mtcloud/ui/atoms/RichEditor';
import { MinusIcon, PlusIcon, EyeCrossedIcon, EyeIcon } from '@mtcloud/ui/atoms/icons';
import DateTimePicker from '@mtcloud/ui/atoms/DateTimePicker';

import useWarnIfUnsavedChanges from '../../../hooks/useWarnIfUnsavedChanges';

function Forms({
  formFields,
  initialValue,
  handleSubmit,
  formsSchema,
  buttonValue,
  isDelete = false,
  deleteItem = null,
  savePermission = true,
  deletePermission = false,
}) {
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const formSchema = Yup.object().shape(formsSchema);
  const [show, setShow] = useState(false);

  const WarnIfUnsaved = (dirty) => {
    useWarnIfUnsavedChanges(dirty, () => {
      return confirm('Are you sure you don’t want to save changes.');
    });
  };

  return (
    <Formik
      initialValues={initialValue}
      enableReinitialize
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values).then(() => {
          actions.setSubmitting(false);
          actions.resetForm();
        });
      }}
    >
      {({ handleSubmit, errors, values, touched, isSubmitting, isValidating, isValid, setFieldValue, dirty }) => (
        <>
          {/* warn user when leaving the page without saving */}
          {WarnIfUnsaved(Object.keys(touched).some((v) => v !== '') && dirty)}

          <Form onSubmit={handleSubmit} className='w-full'>
            {/* Plain Form Fields */}
            {formFields
              .filter((x) => !x.sectionTitle && !x.extraField)
              .map((field, i) => (
                <div key={i} className='mb-4 md:flex md:items-baseline'>
                  <div className='md:w-1/3'>
                    <Label name={field.name} errors={errors}>
                      {field.label}
                    </Label>
                  </div>
                  <div className='md:w-2/3'>
                    {field.fieldType === 'roles-select' ? (
                      <RolesSelect name={field.name} errors={errors} />
                    ) : field.fieldType === 'faq-category' ? (
                      <FaqCategorySelect name={field.name} errors={errors} />
                    ) : field.fieldType === 'country-select' ? (
                      <CountrySelectAsync name={field.name} errors={errors} />
                    ) : field.fieldType === 'dropdown' ? (
                      <Dropdown name={field.name} options={field.options} errors={errors} />
                    ) : field.fieldType === 'checkbox' ? (
                      <CheckBox name={field.name} />
                    ) : field.fieldType === 'checkbox-group' ? (
                      <div className='flex items-center gap-3 mt-2'>
                        {field.fields.map((field, index) => (
                          <CheckBox key={index} name={field.name} label={field.label} />
                        ))}
                      </div>
                    ) : field.fieldType === 'radio-button' ? (
                      <div role='group' aria-labelledby='my-radio-group' className='flex flex-col items-start gap-3'>
                        {field.options.map((option, index) => (
                          <label key={index} className='flex items-center gap-2 leading-none'>
                            <Field type='radio' name={field.name} value={option.value} className='w-4 h-4' />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    ) : field.fieldType === 'country-code' ? (
                      <CountryCodeSelectAsync name={field.name} errors={errors} />
                    ) : field.fieldType === 'file' ? (
                      <FileUploadField
                        name={field.name}
                        accept={field.accept}
                        errors={errors.name}
                        touched={touched.name}
                        onChange={(fileUploaded) => {
                          setFieldValue(field.name, fileUploaded);
                        }}
                      />
                    ) : field.fieldType === 'image' ? (
                      <ImageUpload
                        name={field.name}
                        errors={errors.name}
                        touched={touched.name}
                        accept={field.accept}
                        maxSize={field.maxSize}
                        value={values[field.name]}
                        onChange={(fileUploaded) => {
                          setFieldValue(field.name, fileUploaded);
                        }}
                      />
                    ) : field.fieldType === 'image-file' ? (
                      <ImageFileUpload
                        name={field.name}
                        errors={errors.name}
                        touched={touched.name}
                        accept={field.accept}
                        maxSize={field.maxSize}
                        value={values[field.name]}
                        onChange={(fileUploaded) => {
                          setFieldValue(field.name, fileUploaded);
                        }}
                      />
                    ) : field.fieldType === 'toggle' ? (
                      <ToggleSwitch name={field.name} />
                    ) : field.fieldType == 'richtext' ? (
                      <div className='mt-2'>
                        <RichEditor
                          value={values[field.name]}
                          onChange={(e: string) => {
                            setFieldValue(field.name, e);
                          }}
                        />
                      </div>
                    ) : field.fieldType === 'datetime' ? (
                      <DateTimePicker
                        name={field.name}
                        errors={errors.name}
                        touched={touched.name}
                        value={values[field.name]}
                        onChange={(datetime) => {
                          setFieldValue(field.name, datetime);
                        }}
                      />
                    ) : field.fieldType === 'float' ? (
                      <FloatInput
                        name={field.name}
                        type={field.fieldType}
                        placeholder={field.placeholder}
                        errors={errors}
                        setFieldValue={setFieldValue}
                      />
                    ) : field.fieldType === 'password' ? (
                      <div className='relative'>
                        <div className='absolute top-0 bottom-0 right-0 grid w-10 place-items-center'>
                          <button onClick={() => setShow(!show)} type='button'>
                            {show ? <EyeIcon className='w-6 h-6 text-[#00aeef]' /> : <EyeCrossedIcon className='w-6 h-6 text-[#00aeef]' />}
                          </button>
                        </div>
                        <TextField
                          name={field.name}
                          type={show ? 'text' : 'password'}
                          placeholder={field.placeholder}
                          errors={errors[field.name]}
                          touched={touched[field.name]}
                        />
                      </div>
                    ) : (
                      <TextField
                        name={field.name}
                        type={field.fieldType}
                        placeholder={field.placeholder}
                        errors={errors[field.name]}
                        disable={field.disable}
                        touched={touched[field.name]}
                      />
                    )}
                    {/* Text input info */}
                    {field.info && <InputInfo info={field.info} />}
                    {/* Error */}
                    {errors[field.name] && touched[field.name] && (
                      <span className='text-[#EA0000] text-xs font-normal order-2 self-stretch'>{errors[field.name]}</span>
                    )}
                  </div>
                </div>
              ))}

            {/* Section Form Fields */}
            {formFields[0].sectionTitle &&
              formFields.map((section, i) => (
                <Fragment key={i}>
                  <div className={`flex space-x-2 w-full items-center ${i >= 1 && 'mt-8'}`}>
                    {section.additional ? (
                      <span className='flex items-center justify-between w-full p-2 text-sm font-normal text-gray-700 bg-gray-50 '>
                        {section.sectionTitle}{' '}
                        <div onClick={() => setShowAdditionalField(!showAdditionalField)}>
                          {showAdditionalField ? <MinusIcon className='w-4 h-4 cursor-pointer' /> : <PlusIcon className='w-4 h-4 cursor-pointer' />}
                        </div>
                      </span>
                    ) : (
                      <span className='mb-4 text-sm font-semibold text-gray-700 '>{section.sectionTitle}</span>
                    )}
                  </div>
                  <div className={`grid grid-cols-2 gap-x-3  ${section.additional && showAdditionalField && 'bg-gray-50 p-2 pt-5'}`}>
                    {section.additional
                      ? showAdditionalField &&
                        section.fields.map((field, j) => (
                          <div key={j} className='flex-col mb-4 md:flex md:items-baseline'>
                            <div>
                              <Label name={field.name} errors={errors}>
                                {field.label}
                              </Label>
                            </div>
                            <div className='w-full'>
                              {field.fieldType === 'roles-select' ? (
                                <RolesSelect name={field.name} errors={errors} />
                              ) : field.fieldType === 'country-select' ? (
                                <CountrySelectAsync name={field.name} errors={errors} />
                              ) : field.fieldType === 'toggle' ? (
                                <ToggleSwitch name={field.name} />
                              ) : field.fieldType === 'checkbox' ? (
                                <CheckBox name={field.name} />
                              ) : field.fieldType === 'country-select' ? (
                                <CountrySelectAsync name={field.name} errors={errors} />
                              ) : field.fieldType === 'checkbox-group' ? (
                                <div className='flex items-center gap-3 mt-2'>
                                  {field.fields.map((field, index) => (
                                    <CheckBox key={index} name={field.name} label={field.label} />
                                  ))}
                                </div>
                              ) : field.fieldType === 'country-code' ? (
                                <CountryCodeSelectAsync name={field.name} errors={errors} />
                              ) : field.fieldType == 'richtext' ? (
                                <div className='col-span-2 mt-2'>
                                  <RichEditor value={values[field.name]} onChange={(e: string) => setFieldValue(field.name, e)} />
                                </div>
                              ) : field.fieldType === 'dropdown' ? (
                                <Dropdown name={field.name} options={field.options} errors={errors} />
                              ) : field.fieldType === 'file' ? (
                                <FileUploadField
                                  name={field.name}
                                  accept={field.accept}
                                  errors={errors.name}
                                  touched={touched.name}
                                  onChange={(fileUploaded) => {
                                    setFieldValue(field.name, fileUploaded);
                                  }}
                                />
                              ) : field.fieldType === 'image' ? (
                                <ImageUpload
                                  name={field.name}
                                  value={values[field.name]}
                                  errors={errors.name}
                                  touched={touched.name}
                                  accept={field.accept}
                                  maxSize={field.maxSize}
                                  onChange={(fileUploaded) => {
                                    setFieldValue(field.name, fileUploaded);
                                  }}
                                />
                              ) : field.fieldType === 'image-file' ? (
                                <ImageFileUpload
                                  name={field.name}
                                  errors={errors.name}
                                  touched={touched.name}
                                  accept={field.accept}
                                  maxSize={field.maxSize}
                                  value={values[field.name]}
                                  onChange={(fileUploaded) => {
                                    setFieldValue(field.name, fileUploaded);
                                  }}
                                />
                              ) : field.fieldType === 'datetime' ? (
                                <DateTimePicker
                                  name={field.name}
                                  errors={errors.name}
                                  touched={touched.name}
                                  value={values[field.name]}
                                  onChange={(datetime) => {
                                    setFieldValue(field.name, datetime);
                                  }}
                                />
                              ) : field.fieldType === 'float' ? (
                                <FloatInput
                                  name={field.name}
                                  type={field.fieldType}
                                  placeholder={field.placeholder}
                                  errors={errors}
                                  setFieldValue={setFieldValue}
                                />
                              ) : (
                                <TextField
                                  name={field.name}
                                  type={field.fieldType}
                                  placeholder={field.placeholder}
                                  errors={errors}
                                  disable={field.disable}
                                />
                              )}

                              {/* Text input info */}
                              {field.info && <InputInfo info={field.info} />}
                            </div>
                            {errors[field.name] && touched[field.name] && (
                              <span className='text-[#EA0000] text-xs font-normal order-2 self-stretch'>{errors[field.name]}</span>
                            )}
                          </div>
                        ))
                      : section.fields.map((field, j) => (
                          <div key={j} className={`md:flex flex-col md:items-baseline mb-4 ${field.fieldType === 'richtext' && 'col-span-2'}`}>
                            <div className='w-full h-8'>
                              <Label name={field.name} errors={errors}>
                                {field.label}
                              </Label>
                            </div>

                            <div className='w-full'>
                              {field.fieldType === 'roles-select' ? (
                                <RolesSelect name={field.name} errors={errors} />
                              ) : field.fieldType === 'country-select' ? (
                                <CountrySelectAsync name={field.name} errors={errors} />
                              ) : field.fieldType === 'toggle' ? (
                                <ToggleSwitch name={field.name} />
                              ) : field.fieldType === 'checkbox' ? (
                                <CheckBox name={field.name} />
                              ) : field.fieldType === 'dropdown' ? (
                                <Dropdown name={field.name} options={field.options} errors={errors} />
                              ) : field.fieldType === 'checkbox-group' ? (
                                <div className='flex items-center gap-3 mt-2'>
                                  {field.fields.map((field, index) => (
                                    <CheckBox key={index} name={field.name} label={field.label} />
                                  ))}
                                </div>
                              ) : field.fieldType === 'country-code' ? (
                                <CountryCodeSelectAsync name={field.name} errors={errors} />
                              ) : field.fieldType == 'richtext' ? (
                                <div className='mt-2'>
                                  <RichEditor value={values[field.name]} onChange={(e: string) => setFieldValue(field.name, e)} />
                                </div>
                              ) : field.fieldType === 'file' ? (
                                <FileUploadField
                                  name={field.name}
                                  errors={errors.name}
                                  accept={field.accept}
                                  touched={touched.name}
                                  onChange={(fileUploaded) => {
                                    setFieldValue(field.name, fileUploaded);
                                  }}
                                />
                              ) : field.fieldType === 'image' ? (
                                <ImageUpload
                                  name={field.name}
                                  value={values[field.name]}
                                  errors={errors.name}
                                  touched={touched.name}
                                  accept={field.accept}
                                  maxSize={field.maxSize}
                                  onChange={(fileUploaded) => {
                                    setFieldValue(field.name, fileUploaded);
                                  }}
                                />
                              ) : field.fieldType === 'image-file' ? (
                                <ImageFileUpload
                                  name={field.name}
                                  errors={errors.name}
                                  touched={touched.name}
                                  accept={field.accept}
                                  maxSize={field.maxSize}
                                  value={values[field.name]}
                                  onChange={(fileUploaded) => {
                                    setFieldValue(field.name, fileUploaded);
                                  }}
                                />
                              ) : field.fieldType === 'datetime' ? (
                                <DateTimePicker
                                  name={field.name}
                                  errors={errors.name}
                                  touched={touched.name}
                                  value={values[field.name]}
                                  onChange={(datetime) => {
                                    setFieldValue(field.name, datetime);
                                  }}
                                />
                              ) : field.fieldType === 'float' ? (
                                <FloatInput
                                  name={field.name}
                                  type={field.fieldType}
                                  placeholder={field.placeholder}
                                  errors={errors}
                                  setFieldValue={setFieldValue}
                                />
                              ) : (
                                <TextField name={field.name} type={field.fieldType} placeholder={field.placeholder} errors={errors} />
                              )}

                              {/* Text input info */}
                              {field.info && <InputInfo info={field.info} />}
                              {/* Error */}
                              {errors[field.name] && touched[field.name] && (
                                <span className='text-[#EA0000] text-xs font-normal order-2 self-stretch'>{errors[field.name]}</span>
                              )}
                            </div>
                          </div>
                        ))}
                  </div>
                </Fragment>
              ))}

            {/* Submit Btn */}
            <div className='mt-8 md:flex md:items-baseline'>
              {!formFields[0].sectionTitle && <div className='md:w-1/3' />}
              <div className='flex items-center gap-2 text-base md:w-2/3'>
                {savePermission && (
                  <Button
                    colorScheme='skyBlue'
                    textStyleScheme='semiboldSmall'
                    textColorScheme='white'
                    sizeScheme='sm'
                    borderScheme='rounded'
                    type='submit'
                    disabled={isSubmitting || !isValid}
                  >
                    {buttonValue}
                  </Button>
                )}
                {deletePermission && (
                  <Button
                    colorScheme='lightGray'
                    textStyleScheme='semiboldSmall'
                    textColorScheme='charcoal'
                    sizeScheme='sm'
                    borderScheme='rounded'
                    type='button'
                    // disabled={isSubmitting || isValidating}
                    onClick={() => deleteItem()}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default Forms;
