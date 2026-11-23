<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight, ChevronRight, Heart, MoveDown } from 'lucide-vue-next'

defineProps({
  hero: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="relative isolate overflow-hidden bg-slate-950 text-white">
    <div class="absolute inset-0 -z-10">
      <img
        v-if="hero.image"
        :src="hero.image"
        alt="Community blood donation camp"
        class="h-full w-full object-cover opacity-30"
        @error="$event.target.style.display = 'none'"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-red-950/60"></div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div class="mb-8 flex items-center gap-2 text-sm font-medium text-slate-300">
        <RouterLink to="/" class="hover:text-white">Home</RouterLink>
        <ChevronRight class="h-4 w-4" />
        <span class="text-white">Organize a Blood Camp</span>
      </div>

      <div class="max-w-3xl">
        <span class="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs font-bold tracking-wider text-red-300">
          <Heart class="h-4 w-4" />
          {{ hero.eyebrow }}
        </span>

        <h1 class="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          {{ hero.title }}
        </h1>

        <p class="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-300 sm:text-lg">
          {{ hero.subtitle }}
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <RouterLink
            to="/camp-registration"
            class="inline-flex items-center gap-2 rounded-xl bg-[#E80E0E] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Apply Now
            <ArrowRight class="h-4 w-4" />
          </RouterLink>

          <a
            href="#how-it-works"
            class="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            <MoveDown class="h-4 w-4" />
            See How It Works
          </a>
        </div>
      </div>
    </div>
  </section>
</template>