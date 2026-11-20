<script setup>
defineProps({ hero: { type: Object, required: true } })
</script>

<template>
  <section class="relative overflow-hidden bg-linear-to-br from-rose-50 via-white to-emerald-50">
    <div class="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl"></div>

    <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
      <div class="text-center lg:text-left">
        <span class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-rose-600 shadow-sm ring-1 ring-rose-100">
          <span class="h-2 w-2 animate-pulse rounded-full bg-rose-500"></span>
          {{ hero.eyebrow }}
        </span>

        <h1 class="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {{ hero.title }}
          <span class="bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {{ hero.highlight }}
          </span>
        </h1>

        <p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0">
          {{ hero.subtitle }}
        </p>

        <div class="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <RouterLink :to="hero.primaryCta.to"
                      class="w-full rounded-full bg-linear-to-r from-rose-600 to-orange-500 px-8 py-3.5 text-center font-bold text-white shadow-lg shadow-rose-500/30 transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto">
            {{ hero.primaryCta.label }}
          </RouterLink>
          <RouterLink :to="hero.secondaryCta.to"
                      class="w-full rounded-full border-2 border-slate-300 bg-white px-8 py-3.5 text-center font-bold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-600 sm:w-auto">
            {{ hero.secondaryCta.label }}
          </RouterLink>
        </div>

        <ul class="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600 lg:justify-start">
          <li v-for="p in hero.points" :key="p" class="flex items-center gap-2">
            <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" />
            </svg>
            {{ p }}
          </li>
        </ul>
      </div>

      <div class="relative mx-auto w-full max-w-md lg:max-w-none">
        <div class="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-linear-to-br from-rose-400 to-emerald-400 opacity-30"></div>

        <div class="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-4 ring-white">
          <img v-if="hero.image" :src="hero.image" :alt="hero.imageAlt"
               class="aspect-4/5 w-full object-cover sm:aspect-square lg:aspect-4/5" />
         <div v-else class="flex aspect-4/5 w-full items-center justify-center bg-linear-to-br from-rose-100 to-emerald-100 sm:aspect-square lg:aspect-4/5">
            <svg class="h-32 w-32" viewBox="0 0 40 40" fill="none">
              <path d="M20 4C20 4 8 17 8 25a12 12 0 0 0 24 0C32 17 20 4 20 4Z" fill="#e11d48" />
              <path d="M20 14c-1.8 2.6-4 5.6-4 8.4a4 4 0 0 0 8 0c0-2.8-2.2-5.8-4-8.4Z" fill="#fff" opacity=".4" />
            </svg>
          </div>
        </div>

        <div class="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-slate-100 sm:-left-6">
          <span class="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2 0 3.5 1 4.3 2.4l1.3 1.9 1.3-1.9c.8-1.4 2.3-2.4 4.3-2.4 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21Z" />
            </svg>
          </span>
          <span>
            <span class="block text-xl font-extrabold leading-none text-slate-900">{{ hero.badge.value }}</span>
            <span class="text-xs font-medium text-slate-500">{{ hero.badge.label }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>