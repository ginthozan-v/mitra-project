const withTM = require("next-transpile-modules")(["@mtcloud/ui", "@mtcloud/globals", "@mtcloud/utils"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['flagcdn.com', 'upload.wikimedia.org'],
  },
});