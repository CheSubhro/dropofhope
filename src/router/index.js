import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [{ path: '', name: 'home', component: () => import('@/views/HomeView.vue') }],
    },
    // later: { path: '/admin', component: AdminLayout, meta: { requiresAuth: true }, children: [...] }
  ],
  scrollBehavior: (to) => (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }),
})