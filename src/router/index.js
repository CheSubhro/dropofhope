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
        { path: 'donor-registration', name: 'donor-reg', component: () => import('@/views/DonorRegistrationView.vue') },
        { path: 'camp-registration', name: 'camp-reg', component: () => import('@/views/CampRegistrationView.vue') },
        
        {
          path: 'about',
          name: 'about',
          meta: { title: 'About Us' },
          component: () => import('@/views/AboutView.vue'),
        },

        {
          path: 'blog',
          name: 'blog',
          meta: { title: 'Our Blog' },
          component: () => import('@/views/BlogView.vue'),
        },
        {
          path: 'blog/:slug',
          name: 'blog-post',
          meta: { title: 'Blog Post' },
          component: () => import('@/views/BlogPostView.vue'),
        },


        {
          path: 'gallery',
          name: 'gallery',
          meta: { title: 'Our Gallery' },
          component: () => import('@/views/GalleryView.vue'),
        },

        {
          path: 'donate',
          name: 'donate',
          meta: { title: 'Donate' },
          component: () => import('@/views/DonateView.vue'),
        },

        {
          path: 'request-blood',
          name: 'request-blood',
          meta: { title: 'Request Blood' },
          component: () => import('@/views/RequestBloodView.vue'),
        },

        {
          path: 'join-member',
          name: 'join-member',
          meta: { title: 'Join as a Member' },
          component: () => import('@/views/JoinMemberView.vue'),
        },

        {
          path: 'find-doctor',
          name: 'find-doctor',
          meta: { title: 'Find a Doctor' },
          component: () => import('@/views/FindDoctorView.vue'),
        },
        {
          path: 'download-certificate',
          name: 'download-certificate',
          meta: { title: 'Download Certificate' },
          component: () => import('@/views/DownloadCertificateView.vue'),
        },
        {
          path: 'organize-camp',
          name: 'organize-camp',
          meta: { title: 'Organize a Blood Camp' },
          component: () => import('@/views/OrganizeCampView.vue'),
        },

        


        { path: 'search', name: 'search', meta: { title: 'Search' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'privacy', name: 'privacy', meta: { title: 'Privacy Policy' }, component: () => import('@/views/PlaceholderView.vue') },
        { path: 'terms', name: 'terms', meta: { title: 'Terms & Conditions' }, component: () => import('@/views/PlaceholderView.vue') },
      ],
    },
    // later: { path: '/admin', component: AdminLayout, meta: { requiresAuth: true }, children: [...] }
  ],
  scrollBehavior: (to) => (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }),
})