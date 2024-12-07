/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLIENT_ID: string;
    readonly VTIE_DOMAIN: string;
    readonly VITE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}