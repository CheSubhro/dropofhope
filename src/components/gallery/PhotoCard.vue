
<script setup>
import { ref } from 'vue'
import { ZoomIn } from 'lucide-vue-next'

defineProps({
    photo: { type: Object, required: true },
})

const emit = defineEmits(['click'])
const imageError = ref(false)
</script>

<template>
    <button type="button"
        class="group relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-red-100 via-rose-50 to-slate-200 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        :aria-label="`View ${photo.title}`" @click="emit('click')">
        <img v-if="!imageError" :src="photo.thumb || photo.src" :alt="photo.title" loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
            @error="imageError = true" />

        <div class="absolute inset-0 bg-gradient-to-br from-red-100/30 via-rose-200/20 to-slate-300/30"></div>

        <div
            class="absolute inset-0 flex flex-col items-center justify-center bg-[#E80E0E]/0 p-4 text-center transition duration-300 group-hover:bg-[#E80E0E]/70">
            <span
                class="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                <ZoomIn :size="25" />
            </span>

            <h3
                class="mt-3 translate-y-3 text-sm font-bold text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base">
                {{ photo.title }}
            </h3>
        </div>
    </button>
</template>
