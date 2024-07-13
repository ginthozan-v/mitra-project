const withTM = require("next-transpile-modules")(["@mtcloud/ui", "@mtcloud/globals", "@mtcloud/utils"]);

module.exports = withTM({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'flagcdn.com',
      'upload.wikimedia.org',
      'portal-dev-gateway.mytcloud.mu',
      'portal-qa-gateway.mytcloud.mu',
      'portal-uat-gateway.mytcloud.mu',
      'portal-gateway.mytcloud.mu',
      'portal-dr-gateway.mytcloud.mu',
    ],
  },
});
