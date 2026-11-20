<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({ site: { type: Object, required: true } })

const router = useRouter()
const open = ref(false)
const searchOpen = ref(false)
const query = ref('')

function submitSearch() {
  const q = query.value.trim()
  if (!q) return
  router.push({ name: 'search', query: { q } })
  searchOpen.value = false
  open.value = false
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white shadow-md">
    <div class="h-1.5 w-full bg-linear-to-r from-rose-600 via-rose-400 to-emerald-500"></div>

    <nav class="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <!-- Logo + Brand name + Tagline -->
      <RouterLink to="/" class="flex shrink-0 items-center gap-3">
        <span class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-2 ring-rose-200">
          <img v-if="site.logo" :src="site.logo" :alt="site.name" class="h-full w-full object-cover" />
          <svg v-else class="h-8 w-8" viewBox="0 0 40 40" fill="none">
            <path d="M20 4C20 4 8 17 8 25a12 12 0 0 0 24 0C32 17 20 4 20 4Z" fill="#e11d48" />
            <path d="M20 14c-1.8 2.6-4 5.6-4 8.4a4 4 0 0 0 8 0c0-2.8-2.2-5.8-4-8.4Z" fill="#fff" opacity=".4" />
          </svg>
        </span>
        <span class="flex flex-col leading-tight">
          <span class="text-2xl font-extrabold tracking-tight">
            <span class="text-rose-600">Drop</span><span class="text-slate-700">Of</span><span class="text-emerald-600">Hope</span>
          </span>
          <span class="text-xs font-semibold text-slate-600">{{ site.tagline }}</span>
        </span>
      </RouterLink>

      <!-- Desktop menu -->
      <ul class="hidden items-center gap-1 lg:flex">
        <li v-for="link in site.nav" :key="link.label">
          <RouterLink :to="link.to" custom v-slot="{ href, navigate, isActive, isExactActive }">
            <a :href="href" @click="navigate"
               :aria-current="(link.to === '/' ? isExactActive : isActive) ? 'page' : undefined"
               class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
               :class="(link.to === '/' ? isExactActive : isActive)
                 ? 'bg-rose-600 text-white shadow-md shadow-rose-500/30'
                 : 'text-slate-800 hover:bg-rose-50 hover:text-rose-600'">
              {{ link.label }}
            </a>
          </RouterLink>
        </li>
      </ul>

      <!-- Search + Donate -->
      <div class="flex items-center gap-3">
        <button class="rounded-full bg-slate-100 p-2.5 text-slate-700 transition hover:bg-rose-100 hover:text-rose-600"
                aria-label="Search" @click="searchOpen = !searchOpen">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path stroke-linecap="round" d="m20 20-3.5-3.5" />
          </svg>
        </button>

        <!-- Donate button -->
        <RouterLink :to="site.cta.to"
                    class="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-rose-600 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/40 ring-2 ring-rose-200 transition-all duration-200 hover:-translate-y-0.5 hover:from-rose-700 hover:to-orange-600 hover:shadow-xl hover:shadow-rose-500/50">
          <svg class="h-4 w-4 transition-transform group-hover:scale-125" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2 0 3.5 1 4.3 2.4l1.3 1.9 1.3-1.9c.8-1.4 2.3-2.4 4.3-2.4 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21Z" />
          </svg>
          {{ site.cta.label }}
        </RouterLink>

        <button class="rounded-md p-2 text-slate-800 lg:hidden" aria-label="Toggle menu" @click="open = !open">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path v-if="!open" stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Search bar -->
    <div v-if="searchOpen" class="border-t border-rose-100 bg-rose-50 px-4 py-3">
      <div class="mx-auto flex max-w-3xl gap-2">
        <input v-model="query" type="search" placeholder="Search..." autofocus
               class="w-full rounded-full border border-rose-200 bg-white px-5 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
               @keyup.enter="submitSearch" />
        <button class="rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                @click="submitSearch">
          Search
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="open" class="border-t border-slate-200 bg-white px-4 py-4 shadow-inner lg:hidden">
      <RouterLink v-for="link in site.nav" :key="link.label" :to="link.to" custom
                  v-slot="{ href, navigate, isActive, isExactActive }">
        <a :href="href" @click="navigate(); open = false"
           class="mb-1 block rounded-lg px-4 py-2.5 text-sm font-semibold"
           :class="(link.to === '/' ? isExactActive : isActive)
             ? 'bg-rose-600 text-white'
             : 'text-slate-800 hover:bg-[#E2798B] hover:text-white'">
          {{ link.label }}
        </a>
      </RouterLink>
    </div>
  </header>
</template>