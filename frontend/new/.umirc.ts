import { defineConfig } from 'umi';

export const routes = [
  { path: '/manage', component: 'manager', name: '零件管理' },
  { path: '/bigdata', component: 'bigdata' },
  { path: '/workpack', component: 'workpack', name: '项目进度视图' },
];

export default defineConfig({
  routes: routes,
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
  layout: {
    title: '船舶建设管理系统',
    locale: true,
    layout: 'side',
    route: { path: '/', routes: routes },
  },
});
