import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.CLOUDINARY_UPLOAD_PRESET": JSON.stringify(process.env.CLOUDINARY_UPLOAD_PRESET),
    "import.meta.env.CLOUDINARY_API_KEY": JSON.stringify(process.env.CLOUDINARY_API_KEY),
  },
  server: {
    proxy: {
      "/backend": {
        target: "https://vbnb-backend-latest.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, "")
      }
    }
  }
})
