<script setup>
import { getSiteConfig } from '@/services/contentService'
import { useAsyncData } from '@/composables/useAsyncData'
import NoticeTicker from '@/components/layout/NoticeTicker.vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

const { data: site } = useAsyncData(getSiteConfig)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white font-sans text-slate-900">
    <NoticeTicker v-if="site" :notices="site.notices" />
    <Navbar v-if="site" :site="site" />
    <main class="flex-1"><RouterView /></main>
    <Footer v-if="site" :site="site" />
  </div>
</template>