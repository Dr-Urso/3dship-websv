import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
    { path: '/manage', component: 'manager' },
    { path: '/bigdata', component: 'bigdata' },
    { path: '/workpack', component: 'workpack' },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
    '/static': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
  npmClient: 'pnpm',
  tailwindcss: {},
  plugins: ['@umijs/plugins/dist/tailwindcss', '@umijs/plugins/dist/layout'],
  layout: {},
});
