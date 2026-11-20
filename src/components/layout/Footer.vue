<script setup>
defineProps({ site: { type: Object, required: true } })
</script>

<template>
  <footer id="contact" class="border-t-4 border-[#E80E0E] bg-[#FFF5F5]">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
      <div>
        <p class="text-xl font-extrabold">
          <span class="text-[#E80E0E]">Drop</span><span class="text-slate-700">Of</span><span class="text-emerald-600">Hope</span>
        </p>
        <p class="mt-3 text-sm text-slate-600">{{ site.footer.tagline }}</p>
      </div>
      <div v-for="col in site.footer.columns" :key="col.title">
        <h3 class="text-sm font-bold text-slate-900">{{ col.title }}</h3>
        <ul class="mt-4 space-y-2">
          <li v-for="l in col.links" :key="l.label">
            <a :href="l.href" class="text-sm text-slate-600 transition hover:text-[#E80E0E]">{{ l.label }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-[#E80E0E]/15 bg-[#E80E0E]/5 py-6 text-center text-sm text-slate-600">
      © {{ new Date().getFullYear() }} {{ site.name }}. All rights reserved.
    </div>
  </footer>
</template>