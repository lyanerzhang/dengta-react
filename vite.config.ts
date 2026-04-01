import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    server: {
      port: 8081,
      open: false,
      proxy: {
        "/api": {
          target: "https://dengta6.honganhome.com/",
          changeOrigin: true,
          rewrite: (p) => p,
        },
      },
    },
    base: env.VITE_PUBLIC_PATH || "/",
    build: {
      outDir: "dist",
      sourcemap: false,
    },
  }
})
