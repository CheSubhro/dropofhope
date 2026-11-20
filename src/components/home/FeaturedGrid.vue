<script setup>
import { ArrowRight, CalendarDays, Droplet, Share2, MapPin, Clock, Hospital, Heart } from 'lucide-vue-next'

defineProps({ features: { type: Object, required: true } })
</script>

<template>
  <section class="bg-slate-50 py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{{ features.title }}</h2>
        <p class="mt-3 text-slate-600">{{ features.subtitle }}</p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <!-- Upcoming Blood Camps -->
        <article class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header class="flex items-center gap-3 border-b border-slate-100 bg-rose-50 px-5 py-4">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-white">
              <CalendarDays :size="20" />
            </span>
            <h3 class="text-lg font-bold text-slate-900">{{ features.camps.title }}</h3>
          </header>

          <ul class="flex-1 divide-y divide-slate-100">
            <li v-for="c in features.camps.items" :key="c.id">
              <RouterLink :to="c.to" class="flex items-center gap-4 px-5 py-4 transition hover:bg-rose-50/60">
                <span class="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                  <span class="text-xl font-extrabold leading-none">{{ c.day }}</span>
                  <span class="text-[11px] font-semibold uppercase">{{ c.month }}</span>
                </span>
                <span class="min-w-0">
                  <span class="block truncate font-semibold text-slate-900">{{ c.name }}</span>
                  <span class="mt-1 flex items-center gap-1 text-xs text-slate-500"><MapPin :size="13" /> {{ c.location }}</span>
                  <span class="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><Clock :size="13" /> {{ c.time }}</span>
                </span>
              </RouterLink>
            </li>
          </ul>

          <RouterLink :to="features.camps.link.to"
                      class="flex items-center justify-center gap-1 border-t border-slate-100 px-5 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50">
            {{ features.camps.link.label }} <ArrowRight :size="16" />
          </RouterLink>
        </article>

        <!-- Urgent Blood Requests -->
        <article class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header class="flex items-center gap-3 border-b border-slate-100 bg-rose-50 px-5 py-4">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-white">
              <Droplet :size="20" />
            </span>
            <h3 class="text-lg font-bold text-slate-900">{{ features.requests.title }}</h3>
          </header>

          <ul class="flex-1 divide-y divide-slate-100">
            <li v-for="r in features.requests.items" :key="r.id">
              <RouterLink :to="r.to" class="flex items-center gap-4 px-5 py-4 transition hover:bg-rose-50/60">
                <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rose-600 text-lg font-extrabold text-white shadow">
                  {{ r.group }}
                </span>
                <span class="min-w-0">
                  <span class="block font-semibold text-slate-900">{{ r.patient }} · {{ r.units }} unit{{ r.units > 1 ? 's' : '' }}</span>
                  <span class="mt-1 flex items-center gap-1 truncate text-xs text-slate-500"><Hospital :size="13" /> {{ r.hospital }}</span>
                  <span class="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><MapPin :size="13" /> {{ r.location }}</span>
                </span>
              </RouterLink>
            </li>
          </ul>

          <RouterLink :to="features.requests.link.to"
                      class="flex items-center justify-center gap-1 border-t border-slate-100 px-5 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50">
            {{ features.requests.link.label }} <ArrowRight :size="16" />
          </RouterLink>
        </article>

        <!--  Social Feed -->
        <article class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header class="flex items-center gap-3 border-b border-slate-100 bg-emerald-50 px-5 py-4">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Share2 :size="20" />
            </span>
            <h3 class="text-lg font-bold text-slate-900">{{ features.feed.title }}</h3>
          </header>

          <ul class="flex-1 divide-y divide-slate-100">
            <li v-for="p in features.feed.items" :key="p.id" class="px-5 py-4">
              <div class="flex items-center gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {{ p.author.charAt(0) }}
                </span>
                <span class="text-sm font-semibold text-slate-900">{{ p.author }}</span>
                <span class="ml-auto text-xs text-slate-400">{{ p.time }}</span>
              </div>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ p.text }}</p>
              <span class="mt-2 inline-flex items-center gap-1 text-xs font-medium text-rose-500">
                <Heart :size="14" fill="currentColor" /> {{ p.likes }}
              </span>
            </li>
          </ul>

          <RouterLink :to="features.feed.link.to"
                      class="flex items-center justify-center gap-1 border-t border-slate-100 px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
            {{ features.feed.link.label }} <ArrowRight :size="16" />
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>