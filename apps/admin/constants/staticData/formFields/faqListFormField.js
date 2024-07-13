import * as Yup from 'yup';

export const formFieldData = [
    {
        label: 'FAQ category',
        name: 'category',
        fieldType: 'faq-category',
    },
    {
        label: 'Question EN',
        name: 'questionEN',
        fieldType: 'text',
        placeholder: 'Question English'
    },
    {
        label: 'Question FR',
        name: 'questionFR',
        fieldType: 'text',
        placeholder: 'Question French'
    },
    {
        label: 'Answer EN',
        name: 'answerEN',
        fieldType: 'richtext',
        placeholder: 'Answer English'
    },
    {
        label: 'Answer FR',
        name: 'answerFR',
        fieldType: 'richtext',
        placeholder: 'Answer French'
    },
    {
        label: 'Priority',
        name: 'priority',
        fieldType: 'number',
        placeholder: '1'
    },
    {
        label: 'isActive',
        name: 'isActive',
        fieldType: 'toggle',
    },
];

export const schema = {
    category: Yup.number().required('This field cannot be empty'),
    questionEN: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
    questionFR: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
    answerEN: Yup.string().required('This field cannot be empty'),
    answerFR: Yup.string().required('This field cannot be empty'),
    priority:  Yup.number().positive().integer().typeError('you must specify a number').required('This field cannot be empty'),
};