<script setup>
import { Star, Quote, MapPin } from 'lucide-vue-next'

defineProps({ testimonials: { type: Object, required: true } })
</script>

<template>
  <section id="testimonials" class="bg-slate-50 py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{{ testimonials.title }}</h2>
        <p class="mt-3 text-slate-600">{{ testimonials.subtitle }}</p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <figure v-for="t in testimonials.items" :key="t.id"
                class="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <Quote :size="32" class="text-[#E80E0E]/30" />

          <!-- Star rating -->
          <div class="mt-3 flex gap-0.5">
            <Star v-for="n in 5" :key="n" :size="16"
                  :class="n <= t.rating ? 'text-amber-400' : 'text-slate-200'" fill="currentColor" />
          </div>

          <blockquote class="mt-4 flex-1 text-sm leading-relaxed text-slate-700">“{{ t.quote }}”</blockquote>

          <figcaption class="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
            <img v-if="t.image" :src="t.image" :alt="t.author" class="h-11 w-11 rounded-full object-cover" />
            <span v-else class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E80E0E] font-bold text-white">
              {{ t.author.charAt(0) }}
            </span>

            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm font-semibold text-slate-900">{{ t.author }}</span>
              <span class="block truncate text-xs text-slate-500">{{ t.role }}</span>
              <span v-if="t.location" class="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                <MapPin :size="12" /> {{ t.location }}
              </span>
            </span>

            <span v-if="t.bloodGroup"
                  class="rounded-full bg-[#E80E0E]/10 px-2.5 py-1 text-xs font-extrabold text-[#E80E0E]">
              {{ t.bloodGroup }}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>