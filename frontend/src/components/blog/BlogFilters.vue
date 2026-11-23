
<script setup>
import { Search } from 'lucide-vue-next'

defineProps({
    categories: { type: Array, required: true },
    search: { type: String, required: true },
    activeCategory: { type: String, required: true },
})

const emit = defineEmits(['update:search', 'update:category'])
</script>

<template>
    <section class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <div class="relative">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="19" />
            <input :value="search" type="search" placeholder="Search articles by title or topic..."
                class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-50"
                @input="emit('update:search', $event.target.value)" />
        </div>

        <div class="mt-5 flex flex-wrap gap-2">
            <button v-for="category in categories" :key="category.id" type="button"
                class="rounded-full px-4 py-2 text-sm font-semibold transition" :class="activeCategory === category.id
                    ? 'bg-[#E80E0E] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-[#E80E0E]'"
                @click="emit('update:category', category.id)">
                {{ category.name }}
            </button>
        </div>
    </section>
</template>
