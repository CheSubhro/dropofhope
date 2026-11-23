<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Users, Droplet, Hospital, Handshake, MapPinned } from 'lucide-vue-next'

const props = defineProps({ impact: { type: Object, required: true } })

const icons = { Users, Droplet, Hospital, Handshake, MapPinned }

const root = ref(null)
const counts = ref(props.impact.items.map(() => 0))
let observer = null
let started = false

function animate() {
  const duration = 1800
  const startTime = performance.now()
  const step = (now) => {
    const t = Math.min((now - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3) 
    counts.value = props.impact.items.map((i) => Math.round(i.value * eased))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true
        animate()
      }
    },
    { threshold: 0.3 },
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="root" class="bg-white py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {{ impact.title }}
      </h2>

      <div class="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/20 shadow-lg ring-1 ring-slate-200 sm:grid-cols-3 lg:grid-cols-5"
           style="background-color: #4A4D7D">
        <div v-for="(item, i) in impact.items" :key="item.id"
             class="flex flex-col items-center bg-[#4A4D7D] px-4 py-8 text-center text-white">
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <component :is="icons[item.icon]" :size="24" />
          </span>
          <p class="impact-number mt-4">
              {{ counts[i].toLocaleString() }}+
          </p>

          <p class="impact-label mt-2">
              {{ item.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>