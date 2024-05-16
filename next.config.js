/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack: (config, { dev, isServer, webpack, nextRuntime }) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.module.rules.push({
          test: /\.node$/,
          use: [
            {
              loader: "nextjs-node-loader",
            },
          ],
        });
        return config;
      }
}

module.exports = nextConfig
