import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home.vue')
        },
        {
          path: 'template/:id',
          name: 'template',
          component: () => import('@/views/templateDetail.vue')
        }
      ]
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/editor.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/setting.vue')
    }
  ]
});
export default router;
