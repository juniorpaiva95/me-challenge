import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/order/:id',
      name: 'order-view',
      component: () => import('@/views/OrderView.vue'),
    },
  ],
})

export default router
