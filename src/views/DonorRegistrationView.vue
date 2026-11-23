<script setup>
import { CheckCircle2, ChevronDown } from 'lucide-vue-next'
import { getDonorPageData } from '@/services/contentService'
import { useAsyncData } from '@/composables/useAsyncData'
import DonorForm from '@/components/donor/DonorForm.vue'

const { data, loading, error, reload } = useAsyncData(getDonorPageData)
</script>

<template>
  <div v-if="loading" class="mx-auto max-w-3xl animate-pulse space-y-6 px-4 py-24">
    <div class="mx-auto h-10 w-1/2 rounded bg-slate-200"></div>
    <div class="h-96 rounded-2xl bg-slate-200"></div>
  </div>

  <div v-else-if="error" class="px-4 py-32 text-center">
    <p class="text-slate-700">Something went wrong while loading the page.</p>
    <button class="mt-4 rounded-full bg-[#E80E0E] px-5 py-2 font-semibold text-white" @click="reload">Try again</button>
  </div>

  <template v-else>
    <!-- Banner -->
    <section class="bg-linear-to-br from-[#E80E0E]/10 via-white to-emerald-50">
      <div class="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{{ data.hero.title }}</h1>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{{ data.hero.subtitle }}</p>
      </div>
    </section>

    <section class="bg-slate-50 py-12">
      <div class="mx-auto max-w-3xl space-y-8 px-4 sm:px-6">
        <!-- Form -->
        <DonorForm :blood-groups="data.bloodGroups" :districts="data.districts" />

        <!-- Eligibility ও FAQ: form-এর নিচে পাশাপাশি -->
        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">Who can donate?</h3>
            <ul class="mt-4 space-y-3">
              <li v-for="item in data.eligibility" :key="item" class="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 :size="18" class="mt-0.5 shrink-0 text-emerald-600" />
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
            <div class="mt-3 divide-y divide-slate-100">
              <details v-for="f in data.faq" :key="f.id" class="group py-3">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-900">
                  {{ f.q }}
                  <ChevronDown :size="18" class="shrink-0 text-[#E80E0E] transition group-open:rotate-180" />
                </summary>
                <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ f.a }}</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>