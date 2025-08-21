import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy:
      command === 'serve'
        ? {
            // Proxy para a API externa - apenas em desenvolvimento
            '/api': {
              target: 'https://api.mercadoe.space',
              changeOrigin: true,
              secure: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
              configure: (proxy) => {
                proxy.on('error', (err) => {
                  console.log('proxy error', err)
                })
                proxy.on('proxyReq', (proxyReq, req) => {
                  console.log('Sending Request to the Target:', req.method, req.url)
                })
                proxy.on('proxyRes', (proxyRes, req) => {
                  console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
                })
              },
            },
          }
        : undefined,
  },
  build: {
    // Configurações específicas para produção
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Configurações para compatibilidade com Netlify
    commonjsOptions: {
      include: [],
    },
  },
  // Configurações para compatibilidade com Netlify
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
  },
}))
