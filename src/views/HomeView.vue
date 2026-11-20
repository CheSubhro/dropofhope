<script setup>
import { getHomeData } from '@/services/contentService'
import { useAsyncData } from '@/composables/useAsyncData'
import HeroSection from '@/components/home/HeroSection.vue'
import StatsBar from '@/components/home/StatsBar.vue'
import FeaturedGrid from '@/components/home/FeaturedGrid.vue'
import TestimonialList from '@/components/home/TestimonialList.vue'

const { data, loading, error, reload } = useAsyncData(getHomeData)
</script>

<template>
  <div v-if="loading" class="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-24">
    <div class="mx-auto h-10 w-2/3 rounded bg-slate-200"></div>
    <div class="mx-auto h-5 w-1/2 rounded bg-slate-200"></div>
    <div class="grid gap-6 pt-10 sm:grid-cols-3">
      <div v-for="n in 3" :key="n" class="h-48 rounded-2xl bg-slate-200"></div>
    </div>
  </div>

  <div v-else-if="error" class="px-4 py-32 text-center">
    <p class="text-slate-700">Something went wrong while loading the page.</p>
    <button class="mt-4 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white" @click="reload">Try again</button>
  </div>

  <template v-else>
    <HeroSection :hero="data.hero" />
    <StatsBar :stats="data.stats" />
    <FeaturedGrid :featured="data.featured" />
    <TestimonialList :testimonials="data.testimonials" />
  </template>
</template>