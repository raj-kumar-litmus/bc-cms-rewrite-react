import { defineConfig, loadEnv } from "vite";
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    define: {
      "process.env": env,
    },
    plugins: [react()],
    server : {
      port: 3000,
    }
  });
};