import { defineConfig } from 'vite'
import EnvironmentPlugin from "vite-plugin-environment"
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  server : {
    port: 3000,
  }
})
