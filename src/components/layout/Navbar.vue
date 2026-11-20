<script setup>
import { ref } from 'vue'
defineProps({ site: { type: Object, required: true } })
const open = ref(false)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
    <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="text-xl font-bold text-brand-700">{{ site.name }}</RouterLink>

      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="link in site.nav" :key="link.label">
          <a :href="link.href" class="text-sm font-medium text-slate-600 transition hover:text-brand-600">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <a :href="site.cta.href"
         class="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 md:inline-block">
        {{ site.cta.label }}
      </a>

      <button class="rounded-md p-2 text-slate-700 md:hidden" aria-label="Toggle menu" @click="open = !open">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path v-if="!open" stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </nav>

    <div v-if="open" class="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
      <a v-for="link in site.nav" :key="link.label" :href="link.href"
         class="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-50" @click="open = false">
        {{ link.label }}
      </a>
      <a :href="site.cta.href" class="mt-2 block rounded-lg bg-brand-600 px-4 py-2 text-center font-semibold text-white">
        {{ site.cta.label }}
      </a>
    </div>
  </header>
</template>