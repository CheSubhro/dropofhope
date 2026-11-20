<script setup>
import { ArrowRight } from 'lucide-vue-next'
import MiniSlider from '@/components/home/MiniSlider.vue'

defineProps({ section: { type: Object, required: true } })
</script>

<template>
  <section class="bg-white py-16">
    <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
      <!--  Who's Who -->
      <article class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img v-if="section.image.src" :src="section.image.src" :alt="section.image.alt"
             class="aspect-4/3 w-full object-cover" />
        <div v-else class="flex aspect-4/3 w-full items-center justify-center bg-linear-to-br from-rose-100 to-emerald-100">
          <svg class="h-20 w-20" viewBox="0 0 40 40" fill="none">
            <path d="M20 4C20 4 8 17 8 25a12 12 0 0 0 24 0C32 17 20 4 20 4Z" fill="#E80E0E" />
            <path d="M20 14c-1.8 2.6-4 5.6-4 8.4a4 4 0 0 0 8 0c0-2.8-2.2-5.8-4-8.4Z" fill="#fff" opacity=".4" />
          </svg>
        </div>
        <div class="flex flex-1 flex-col p-6">
          <h3 class="text-xl font-bold text-slate-900">{{ section.image.title }}</h3>
          <RouterLink :to="section.image.link.to"
                      class="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#E80E0E] hover:text-[#E80E0E]/80">
            {{ section.image.link.label }} <ArrowRight :size="16" />
          </RouterLink>
          <p class="mt-2 text-sm text-slate-600">{{ section.image.subtitle }}</p>
        </div>
      </article>

      <!-- About -->
      <article class="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <h3 class="text-xl font-bold text-slate-900">{{ section.about.title }}</h3>
        <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{{ section.about.text }}</p>
        <RouterLink :to="section.about.link.to"
                    class="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#E80E0E] hover:text-[#E80E0E]/80">
          {{ section.about.link.label }} <ArrowRight :size="16" />
        </RouterLink>
      </article>

      <!--  hero slider -->
      <article class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <MiniSlider :slides="section.slider.slides" />
        <div class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="text-xl font-bold text-slate-900">{{ section.slider.title }}</h3>
          <RouterLink :to="section.slider.link.to"
                      class="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#E80E0E] hover:text-[#E80E0E]/80">
            {{ section.slider.link.label }} <ArrowRight :size="16" />
          </RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>