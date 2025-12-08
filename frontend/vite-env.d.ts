/// <reference types="vite/client" />

/**
 * Minimal ImportMeta types so TypeScript recognizes import.meta.env.VITE_*
 * and you don't get "Property 'env' does not exist on type 'ImportMeta'."
 */
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  // add other VITE_... variables here if you use them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
