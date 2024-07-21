import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const isDevelop = process.env.VITE_DEVELOP === "true";

  const serverConfig = isDevelop
    ? {
        https: {
          key: fs.readFileSync("localhost-key.pem"),
          cert: fs.readFileSync("localhost.pem"),
        },
      }
    : {};

  return defineConfig({
    plugins: [react()],
    server: {
      ...serverConfig,
    },
  });
};
