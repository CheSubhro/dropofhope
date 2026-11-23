
<script setup>
defineProps({
    categories: { type: Array, required: true },
    activeCategory: { type: String, required: true },
    counts: { type: Object, required: true },
})

const emit = defineEmits(['select'])
</script>

<template>
    <div class="flex flex-wrap justify-center gap-3">
        <button v-for="category in categories" :key="category.id" type="button"
            class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200"
            :class="activeCategory === category.id
                ? 'bg-[#E80E0E] text-white shadow-md shadow-red-200'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-[#E80E0E]'"
            @click="emit('select', category.id)">
            {{ category.name }}

            <span class="rounded-full px-2 py-0.5 text-xs" :class="activeCategory === category.id
                ? 'bg-white/20 text-white'
                : 'bg-slate-100 text-slate-500'">
                {{ counts[category.id] || 0 }}
            </span>
        </button>
    </div>
</template>
