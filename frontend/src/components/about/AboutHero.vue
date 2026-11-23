
<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-100 py-20 md:py-28">
    <div class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-200/30 blur-3xl"></div>

    <div class="relative mx-auto max-w-7xl px-5 text-center">
      <span class="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-[#E80E0E]">
        {{ data.eyebrow }}
      </span>

      <h1 class="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
        {{ data.title }}
      </h1>

      <p class="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
        {{ data.subtitle }}
      </p>

      <div class="mt-8 flex items-center justify-center gap-2 text-sm">
        <template v-for="(item, index) in data.breadcrumb" :key="item.label">
          <router-link
            v-if="item.to"
            :to="item.to"
            class="text-gray-500 transition hover:text-[#E80E0E]"
          >
            {{ item.label }}
          </router-link>

          <span v-else class="font-semibold text-[#E80E0E]">
            {{ item.label }}
          </span>

          <span v-if="index < data.breadcrumb.length - 1" class="text-gray-400">
            /
          </span>
        </template>
      </div>
    </div>
  </section>
</template>
