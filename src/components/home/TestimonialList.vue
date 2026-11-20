<script setup>
defineProps({ testimonials: { type: Array, required: true } })
</script>

<template>
  <section id="testimonials" class="bg-white py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-center text-3xl font-bold tracking-tight sm:text-4xl">What people say</h2>
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <figure v-for="t in testimonials" :key="t.id" class="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <blockquote class="text-slate-700">“{{ t.quote }}”</blockquote>
          <figcaption class="mt-6 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-semibold text-white">
              {{ t.author.charAt(0) }}
            </span>
            <span>
              <span class="block text-sm font-semibold text-slate-900">{{ t.author }}</span>
              <span class="block text-xs text-slate-500">{{ t.role }}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>