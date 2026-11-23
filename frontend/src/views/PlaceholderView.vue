<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-slate-900">{{ route.meta.title }}</h1>
    <p class="mt-3 text-slate-500">This page is coming soon.</p>
  </section>
</template>