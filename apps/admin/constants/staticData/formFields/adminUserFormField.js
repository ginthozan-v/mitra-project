/**
 * File: adminUserFormField.js
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 23 November 2022, 09:34
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
 import * as Yup from 'yup';

 export const formFieldData = [
     {
         label: 'User Name *',
         name: 'username',
         fieldType: 'text',
         placeholder: 'User Name',
     },
     {
         label: 'Huawei Reference Id *',
         name: 'userId',
         fieldType: 'text',
         placeholder: 'User Id',
     },
     {
         label: 'Password *',
         name: 'password',
         fieldType: 'password',
         placeholder: 'Password',
     },
     {
         label: 'Domain Name',
         name: 'domainName',
         fieldType: 'text',
         placeholder: 'Domain Name',
     },
     {
         label: 'User Type *',
         name: 'userType',
         fieldType: 'dropdown',
         options: [
           { value: 'BSS_ADMIN', label: 'BSS Admin' },
           { value: 'CORPORATE_VDC_ADMIN', label: 'Corporate VDC Admin' },
           { value: 'INDIVIDUAL_VDC_ADMIN ', label: 'Individual VDC Admin' },
         ],
     },
     {
        label: 'IDP Id',
        name: 'idpId',
        fieldType: 'text',
        placeholder: 'IDP Id',
    },
    {
        label: 'VDC Id',
        name: 'vdcId',
        fieldType: 'text',
        placeholder: 'VDC Id',
    },
    {
        label: 'VDC Name',
        name: 'vdcName',
        fieldType: 'text',
        placeholder: 'VDC Name',
    },
    
 ];
 
 export const schema = {
    username: Yup.string()
       .min(2, 'Too Short!')
       .max(50, 'Too Long!')
       .required('This field cannot be empty'),
    userId: Yup.string()
       .required('This field cannot be empty'),
    password: Yup.string()
       .required('This field cannot be empty'),
    userType: Yup.string().required("This field cannot be empty"),
   };