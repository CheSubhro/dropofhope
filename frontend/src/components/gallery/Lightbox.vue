
<script setup>
import { ref, watch } from 'vue'
import {
    X,
    ChevronLeft,
    ChevronRight,
    CalendarDays,
} from 'lucide-vue-next'

const props = defineProps({
    show: { type: Boolean, default: false },
    photo: { type: Object, default: null },
    currentIndex: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
})

const emit = defineEmits([
    'close',
    'next',
    'previous',
    'touch-start',
    'touch-end',
])

const imageError = ref(false)

watch(
    () => props.photo?.src,
    () => {
        imageError.value = false
    }
)

function formatDate(date) {
    if (!date) return ''

    return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}
</script>

<template>
    <Teleport to="body">
        <Transition name="lightbox">
            <div v-if="show && photo" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
                @click.self="emit('close')">
                <!-- Close -->
                <button type="button" aria-label="Close image"
                    class="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#E80E0E]"
                    @click="emit('close')">
                    <X :size="23" />
                </button>

                <!-- Previous -->
                <button type="button" aria-label="Previous image"
                    class="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#E80E0E] sm:left-5 sm:h-12 sm:w-12"
                    @click="emit('previous')">
                    <ChevronLeft :size="26" />
                </button>

                <!-- Image -->
                <div class="flex max-h-full w-full max-w-5xl flex-col items-center"
                    @touchstart="emit('touch-start', $event)" @touchend="emit('touch-end', $event)">
                    <div class="relative flex h-[65vh] w-full items-center justify-center sm:h-[72vh]">
                        <img v-if="!imageError" :src="photo.src" :alt="photo.title"
                            class="max-h-full max-w-full rounded-lg object-contain shadow-2xl" @error="imageError = true" />

                        <div v-else
                            class="flex h-full w-full max-w-3xl items-center justify-center rounded-xl bg-gradient-to-br from-red-200 to-slate-500 text-center text-lg font-bold text-white">
                            {{ photo.title }}
                        </div>
                    </div>

                    <!-- Caption -->
                    <div class="mt-5 w-full max-w-3xl text-center text-white">
                        <h3 class="text-lg font-bold sm:text-xl">{{ photo.title }}</h3>

                        <p class="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/70">
                            {{ photo.caption }}
                        </p>

                        <div class="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-white/60">
                            <span class="inline-flex items-center gap-1">
                                <CalendarDays :size="14" />
                                {{ formatDate(photo.date) }}
                            </span>

                            <span>
                                {{ currentIndex + 1 }} / {{ total }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Next -->
                <button type="button" aria-label="Next image"
                    class="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#E80E0E] sm:right-5 sm:h-12 sm:w-12"
                    @click="emit('next')">
                    <ChevronRight :size="26" />
                </button>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
    transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
    opacity: 0;
}
</style>
