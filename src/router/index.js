import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
        { path: 'donor-registration', name: 'donor-reg', meta: { title: 'Donor Registration' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'camp-registration', name: 'camp-reg', meta: { title: 'Camp Registration' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'about', name: 'about', meta: { title: 'About Us' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'blog', name: 'blog', meta: { title: 'Blog' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'gallery', name: 'gallery', meta: { title: 'Gallery' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'donate', name: 'donate', meta: { title: 'Donate' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'search', name: 'search', meta: { title: 'Search' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'organize-camp', name: 'organize-camp', meta: { title: 'Organize a Blood Camp' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'find-doctor', name: 'find-doctor', meta: { title: 'Find a Doctor' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'request-blood', name: 'request-blood', meta: { title: 'Request Blood for Patient' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'download-certificate', name: 'download-certificate', meta: { title: 'Download Certificate' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'join-member', name: 'join-member', meta: { title: 'Join as a Member' }, component: () => import('@/views/PlaceholderView.vue') },
      ],
    },
    // later: { path: '/admin', component: AdminLayout, meta: { requiresAuth: true }, children: [...] }
  ],
  scrollBehavior: (to) => (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }),
})