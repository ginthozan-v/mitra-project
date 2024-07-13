import * as Yup from 'yup';

export const formFieldData = [
    {
        label: 'FAQ category title EN',
        name: 'faqTitleEN',
        fieldType: 'text',
        placeholder: 'Title EN',
    },
    {
        label: 'FAQ category title FR',
        name: 'faqTitleFR',
        fieldType: 'text',
        placeholder: 'Title FR',
    },
    {
        label: 'Priority',
        name: 'priority',
        fieldType: 'number',
        placeholder: '1',
    },
    {
        label: 'isActive',
        name: 'isActive',
        fieldType: 'toggle',
    },
];

export const schema = {
    faqTitleEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
    faqTitleFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
    priority: Yup.number().positive().integer().typeError('you must specify a number').required('This field cannot be empty'),
};