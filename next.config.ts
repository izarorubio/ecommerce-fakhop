import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack(config) {
    // Asegúrate de que la ruta al alias se resuelva correctamente
    config.resolve.alias['@/*'] = path.resolve(__dirname, 'src');

    return config;
  },
};

export default nextConfig;

