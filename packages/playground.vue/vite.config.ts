import { fileURLToPath, URL } from 'node:url'
import macros from 'unplugin-vue-macros/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.BASE_URL,
    plugins: [
        macros({
            plugins: {
                vue: vue(),
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'vue': 'vue/dist/vue.esm-bundler.js',
        },
    },
})
