import * as Yup from 'yup';

export const formFieldData = [
  {
    sectionTitle: ' ',
    fields: [
      {
        label: 'Banner title',
        name: 'title',
        fieldType: 'text',
        placeholder: 'Banner 1',
      },
      {
        label: 'Priority',
        name: 'priority',
        fieldType: 'number',
        placeholder: '1',
      },
    ],
  },
  {
    sectionTitle: 'Home Banner (Desktop : 2000 X 500 px)',
    fields: [
      {
        label: 'Banner image EN',
        name: 'desktop_bannerEN',
        fieldType: 'image',
        accept:'.jpg,.jpeg,.png',
        placeholder: 'Banner EN',
      },
      {
        label: 'Banner image FR',
        name: 'desktop_bannerFR',
        accept:'.jpg,.jpeg,.png',
        fieldType: 'image',
        placeholder: 'Banner FR',
      },
    ],
  },
  {
    sectionTitle: 'Home Banner (Tab : 1200 X 500 px)',
    fields: [
      {
        label: 'Banner image EN',
        name: 'tab_bannerEN',
        accept:'.jpg,.jpeg,.png',
        fieldType: 'image',
        placeholder: 'Banner EN',
      },
      {
        label: 'Banner image FR',
        name: 'tab_bannerFR',
        accept:'.jpg,.jpeg,.png',
        fieldType: 'image',
        placeholder: 'Banner FR',
      },
    ],
  },
  {
    sectionTitle: 'Home Banner (Mobile : 500 X 500 px)',
    fields: [
      {
        label: 'Banner image EN',
        name: 'mobile_bannerEN',
        accept:'.jpg,.jpeg,.png',
        fieldType: 'image',
        placeholder: 'Banner EN',
      },
      {
        label: 'Banner image FR',
        name: 'mobile_bannerFR',
        accept:'.jpg,.jpeg,.png',
        fieldType: 'image',
        placeholder: 'Banner FR',
      },
    ],
  },
  {
    sectionTitle: ' ',
    fields: [
      {
        label: 'Redirection link EN',
        name: 'redirectionEN',
        fieldType: 'text',
        placeholder: 'Redirection link EN',
      },
      {
        label: 'Redirection link FR',
        name: 'redirectionFR',
        fieldType: 'text',
        placeholder: 'Redirection link FR',
      },
    ],
  },
  {
    sectionTitle: ' ',
    fields: [
      {
        label: 'Schedule start ',
        name: 'scheduleStartDateTime',
        fieldType: 'datetime',
        placeholder: 'Start Date-Time',
      },
      {
        label: 'Schedule end ',
        name: 'scheduleEndDateTime',
        fieldType: 'datetime',
        placeholder: 'End Date-Time',
      },
    ],
  },
  {
    sectionTitle: ' ',
    fields: [
      {
        label: 'isActive',
        name: 'isActive',
        fieldType: 'toggle',
      },
    ],
  },
];

export const schema = {
  title: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  desktop_bannerEN: Yup.string().required('This field cannot be empty'),
  desktop_bannerFR: Yup.string().required('This field cannot be empty'),
  tab_bannerEN: Yup.string().required('This field cannot be empty'),
  tab_bannerFR: Yup.string().required('This field cannot be empty'),
  mobile_bannerEN: Yup.string().required('This field cannot be empty'),
  mobile_bannerFR: Yup.string().required('This field cannot be empty'),
  redirectionEN: Yup.string()
    .url('URL is not valid')
    .required('This field cannot be empty'),
  redirectionFR: Yup.string()
    .url('URL is not valid')
    .required('This field cannot be empty'),
  scheduleStartDateTime: Yup.date().required('This field cannot be empty'),
  scheduleEndDateTime: Yup.date().required('This field cannot be empty'),
  priority: Yup.number().positive().integer().typeError('you must specify a number').required('This field cannot be empty'),
};
