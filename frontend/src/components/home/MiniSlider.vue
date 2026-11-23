<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({ slides: { type: Array, required: true } })

const current = ref(0)
let timer = null

const next = () => (current.value = (current.value + 1) % props.slides.length)
const prev = () => (current.value = (current.value - 1 + props.slides.length) % props.slides.length)

const start = () => { timer = setInterval(next, 4000) }
const stop = () => clearInterval(timer)

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <div class="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-100" @mouseenter="stop" @mouseleave="start">
    <div class="flex h-full transition-transform duration-500 ease-out"
         :style="{ transform: `translateX(-${current * 100}%)` }">
      <div v-for="s in slides" :key="s.id" class="relative h-full w-full shrink-0">
        <img v-if="s.image" :src="s.image" :alt="s.title" class="h-full w-full object-cover" />
        <div v-else class="h-full w-full bg-linear-to-br from-rose-200 to-emerald-200"></div>
        <div class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 text-white">
          <p class="font-bold">{{ s.title }}</p>
          <p class="text-xs text-white/80">{{ s.text }}</p>
        </div>
      </div>
    </div>

    <button class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-slate-800 shadow hover:bg-white"
            aria-label="Previous" @click="prev">
      <ChevronLeft :size="18" />
    </button>
    <button class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-slate-800 shadow hover:bg-white"
            aria-label="Next" @click="next">
      <ChevronRight :size="18" />
    </button>

    <div class="absolute right-3 top-3 flex gap-1.5">
      <span v-for="(s, i) in slides" :key="s.id" class="h-1.5 rounded-full bg-white transition-all"
            :class="i === current ? 'w-5' : 'w-1.5 opacity-60'"></span>
    </div>
  </div>
</template>