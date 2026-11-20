<script setup>
defineProps({ site: { type: Object, required: true } })
</script>

<template>
  <footer id="contact" class="border-t border-slate-200 bg-slate-50">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
      <div>
        <p class="text-xl font-bold text-brand-700">{{ site.name }}</p>
        <p class="mt-3 text-sm text-slate-600">{{ site.footer.tagline }}</p>
      </div>
      <div v-for="col in site.footer.columns" :key="col.title">
        <h3 class="text-sm font-semibold text-slate-900">{{ col.title }}</h3>
        <ul class="mt-4 space-y-2">
          <li v-for="l in col.links" :key="l.label">
            <a :href="l.href" class="text-sm text-slate-600 hover:text-brand-600">{{ l.label }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
      © {{ new Date().getFullYear() }} {{ site.name }}. All rights reserved.
    </div>
  </footer>
</template>