<script setup>
defineProps({ featured: { type: Object, required: true } })
</script>

<template>
  <section id="featured" class="bg-slate-50 py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ featured.title }}</h2>
        <p class="mt-3 text-slate-600">{{ featured.subtitle }}</p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="item in featured.items" :key="item.id"
                 class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <img v-if="item.image" :src="item.image" :alt="item.title" class="aspect-video w-full object-cover" />
          <div v-else class="aspect-video w-full bg-gradient-to-br from-brand-100 to-brand-50"></div>
          <div class="p-6">
            <span class="text-xs font-semibold uppercase tracking-wide text-brand-600">{{ item.category }}</span>
            <h3 class="mt-2 text-lg font-semibold text-slate-900">{{ item.title }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ item.description }}</p>
            <a :href="item.href" class="mt-4 inline-block text-sm font-semibold text-brand-600 group-hover:text-brand-700">
              Learn more →
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>