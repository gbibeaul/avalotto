const withTM = require("next-transpile-modules")(["@gamble/blockchain"]); // pass the modules you would like to see transpiled

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
};

module.exports = withTM(nextConfig);
