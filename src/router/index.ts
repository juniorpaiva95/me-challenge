import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/order/:id',
      component: () => import('@/views/OrderView.vue'),
    },
  ],
})

export default router
