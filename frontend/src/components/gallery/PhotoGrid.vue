
<script setup>
import PhotoCard from './PhotoCard.vue'

defineProps({
    photos: { type: Array, required: true },
})

const emit = defineEmits(['open'])
</script>

<template>
    <div v-if="photos.length" class="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        <PhotoCard v-for="(photo, index) in photos" :key="photo.id" :photo="photo" @click="emit('open', index)" />
    </div>

    <div v-else class="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#E80E0E]">
            <span class="text-2xl">📷</span>
        </div>
        <h3 class="mt-5 text-xl font-bold text-slate-900">No photos yet</h3>
        <p class="mt-2 text-sm text-slate-500">
            There are currently no photos in this category.
        </p>
    </div>
</template>
