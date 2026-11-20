<script setup>
defineProps({ stats: { type: Array, required: true } })
</script>

<template>
  <section class="border-y border-slate-200 bg-white">
    <dl class="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
      <div v-for="s in stats" :key="s.id" class="text-center">
        <dd class="text-3xl font-bold text-brand-600 sm:text-4xl">{{ s.value }}</dd>
        <dt class="mt-1 text-sm text-slate-600">{{ s.label }}</dt>
      </div>
    </dl>
  </section>
</template>