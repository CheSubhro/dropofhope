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
                    class="group flex flex-col items-center gap-3 bg-white px-4 py-6 text-center transition hover:bg-[#E80E0E]/5">
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#E80E0E]/10 text-[#E80E0E] transition group-hover:bg-[#E80E0E] group-hover:text-white">
            <component :is="icons[item.icon]" :size="24" :stroke-width="2" />
          </span>
          <span class="text-sm font-semibold leading-snug text-slate-800 group-hover:text-[#E80E0E]">
            {{ item.label }}
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>