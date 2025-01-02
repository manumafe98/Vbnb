import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.BACKEND_URL": JSON.stringify(process.env.BACKEND_URL),
    "import.meta.env.CLOUDINARY_UPLOAD_PRESET": JSON.stringify(process.env.CLOUDINARY_UPLOAD_PRESET),
    "import.meta.env.CLOUDINARY_API_KEY": JSON.stringify(process.env.CLOUDINARY_API_KEY),
  }
})
