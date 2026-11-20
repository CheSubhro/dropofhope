<script setup>
defineProps({ hero: { type: Object, required: true } })
</script>

<template>
  <section class="bg-gradient-to-b from-brand-50 to-white">
    <div class="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
      <span class="inline-block rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
        {{ hero.eyebrow }}
      </span>
      <h1 class="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
        {{ hero.title }}
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-600">{{ hero.subtitle }}</p>
      <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a :href="hero.primaryCta.href"
           class="w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:w-auto">
          {{ hero.primaryCta.label }}
        </a>
        <a :href="hero.secondaryCta.href"
           class="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto">
          {{ hero.secondaryCta.label }}
        </a>
      </div>
    </div>
  </section>
</template>