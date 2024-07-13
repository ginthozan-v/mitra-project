export const STATIC_REVALIDATION_DURATION = 60;
export const IMAGE_PATH = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/cms/${process.env.NEXT_PUBLIC_API_VERSION}/static-content`;
export const CONSOLE_LINK = {
  id: 6,
  titleFE: 'Console',
  title: { en: 'Console', fr: 'Console' },
  active: true,
  level: 0,
  expandable: false,
  URL: 'https://console.myt.mu/',
  isExternal: true,
  requireAuth: true,
};
export const NETWORK_STATUS_CODES = ['ERR_NETWORK'];
