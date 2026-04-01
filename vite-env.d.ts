/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_BASE_API: string
  readonly VITE_NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
