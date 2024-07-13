import * as Yup from 'yup';

export const formFieldData = [
    {
        label: 'Product name',
        name: 'productName',
        fieldType: 'dropdown',
        options:[]
    },
    {
        label: 'Icon (120px X 120px)',
        name: 'icon',
        fieldType: 'image',
        accept:'.jpg,.jpeg,.png',
    },
    {
        label: 'Display name EN',
        name: 'displayNameEN',
        fieldType: 'text',
        placeholder: 'Display name EN',
    },
    {
        label: 'Display name FR',
        name: 'displayNameFR',
        fieldType: 'text',
        placeholder: 'Display name FR',
    },
    {
        label: 'Short description EN',
        name: 'descriptionEN',
        fieldType: 'text',
        placeholder: 'Short description EN',
    },
    {
        label: 'Short description FR',
        name: 'descriptionFR',
        fieldType: 'text',
        placeholder: 'Short description FR',
    },
    {
        label: 'Schedule start',
        name: 'scheduleStartDateTime',
        fieldType: 'datetime',
        placeholder: 'Start Date-Time',
    },
    {
        label: 'Schedule end',
        name: 'scheduleEndDateTime',
        fieldType: 'datetime',
        placeholder: 'End Date-Time',
    },
    {
        label: 'Priority',
        name: 'priority',
        fieldType: 'number',
        placeholder: '',
    },
    {
        label: 'isActive',
        name: 'isActive',
        fieldType: 'toggle',
    },
];

export const schema = {
    productName: Yup.string().required('This field cannot be empty'),
    icon: Yup.string().required('This field cannot be empty'),
    displayNameEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
    displayNameFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
    descriptionEN: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
    descriptionFR: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
    scheduleStartDateTime: Yup.string().required('This field cannot be empty'),
    scheduleEndDateTime: Yup.string().required('This field cannot be empty'),
    priority: Yup.number().positive().integer().typeError('you must specify a number').required('This field cannot be empty'),
};