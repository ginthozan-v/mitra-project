import * as Yup from 'yup';

export const formFieldData = [{
        label: 'Title EN',
        name: 'titleEN',
        fieldType: 'text',
        placeholder: 'Title English',
    },
    {
        label: 'Title FR',
        name: 'titleFR',
        fieldType: 'text',
        placeholder: 'Title French',
    },
    {
        label: 'Description EN',
        name: 'descriptionEN',
        fieldType: 'text',
        placeholder: 'Description English',
    },
    {
        label: 'Description FR',
        name: 'descriptionFR',
        fieldType: 'text',
        placeholder: 'Description French',
    },
    {
        label: 'Image',
        name: 'image',
        accept:'.jpg,.jpeg,.png',
        fieldType: 'image',
        placeholder: 'Image',
    },
    {
        label: 'Redirection Link Name EN',
        name: 'redirectionNameEN',
        fieldType: 'text',
        placeholder: 'Redirection Link EN',
    },
    {
        label: 'Redirection Link Name FR',
        name: 'redirectionNameFR',
        fieldType: 'text',
        placeholder: 'Redirection Link FR',
    },
    {
        label: 'Redirection Link EN',
        name: 'redirectionEN',
        fieldType: 'text',
        placeholder: 'Redirection Link EN',
    },
    {
        label: 'Redirection Link FR',
        name: 'redirectionFR',
        fieldType: 'text',
        placeholder: 'Redirection Link FR',
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
    descriptionEN: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
    descriptionFR: Yup.string().max(1000, 'Max characters 1000 only allowed').required('This field cannot be empty'),
    image: Yup.string().required('This field cannot be empty'),
    redirectionNameEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
    redirectionNameFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
    redirectionEN: Yup.string().url('URL is not valid').required('This field cannot be empty'),
    redirectionFR: Yup.string().url('URL is not valid').required('This field cannot be empty'),
};