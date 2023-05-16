import { defineConfig, loadEnv } from "vite";
import EnvironmentPlugin from "vite-plugin-environment"
import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react(), EnvironmentPlugin("all")],
//   server : {
//     port: 3000,
//   }
// })

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