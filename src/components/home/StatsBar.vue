<script setup>
import { UserPlus, Tent, Stethoscope, Droplet, FileDown, Users  } from 'lucide-vue-next'

defineProps({ links: { type: Array, required: true } })

const icons = { UserPlus, Tent, Stethoscope, Droplet, FileDown, Users  }
</script>

<template>
  <section class="bg-slate-50 py-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
        <RouterLink v-for="item in links" :key="item.id" :to="item.to"
                    class="group flex flex-col items-center gap-3 bg-white px-4 py-6 text-center transition hover:bg-rose-50">
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition group-hover:bg-rose-600 group-hover:text-white">
            <component :is="icons[item.icon]" :size="24" :stroke-width="2" />
          </span>
          <span class="text-sm font-semibold leading-snug text-slate-800 group-hover:text-rose-600">
            {{ item.label }}
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>