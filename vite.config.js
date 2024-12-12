import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    react: false,
    proxy: {
      "/api": "http://ems-backend-alb-1154464524.ap-south-1.elb.amazonaws.com/",
    },
  },
});
