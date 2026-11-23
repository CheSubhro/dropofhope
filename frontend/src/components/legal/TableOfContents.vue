
<script setup>
import { ref } from 'vue'
import { ChevronDown, List, Check } from 'lucide-vue-next'

const props = defineProps({
    sections: {
        type: Array,
        required: true,
    },
    activeSection: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['navigate'])
const mobileOpen = ref(false)

const navigateTo = (id) => {
    emit('navigate', id)
    mobileOpen.value = false
}
</script>

<template>
    <div class="w-full">
        <!-- Mobile Table of Contents -->
        <div class="mb-6 lg:hidden">
            <button type="button"
                class="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left"
                @click="mobileOpen = !mobileOpen">
                <span class="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <List class="h-4 w-4 text-[#E80E0E]" />
                    Table of Contents
                </span>

                <ChevronDown class="h-5 w-5 text-slate-500 transition-transform" :class="{ 'rotate-180': mobileOpen }" />
            </button>

            <div v-if="mobileOpen" class="mt-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                <button v-for="(section, index) in sections" :key="section.id" type="button"
                    class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition" :class="activeSection === section.id
                            ? 'bg-red-50 font-bold text-[#E80E0E]'
                            : 'text-slate-600 hover:bg-slate-50'
                        " @click="navigateTo(section.id)">
                    <span class="w-5 shrink-0 text-xs font-bold text-slate-400">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                    <span class="flex-1">{{ section.title }}</span>
                    <Check v-if="activeSection === section.id" class="h-4 w-4" />
                </button>
            </div>
        </div>

        <!-- Desktop Table of Contents -->
        <aside class="hidden lg:block">
            <div class="sticky top-28">
                <div class="mb-4 flex items-center gap-2">
                    <List class="h-4 w-4 text-[#E80E0E]" />
                    <h2 class="text-sm font-bold uppercase tracking-wider text-slate-800">
                        On This Page
                    </h2>
                </div>

                <nav class="max-h-[calc(100vh-10rem)] space-y-1 overflow-y-auto pr-2">
                    <button v-for="(section, index) in sections" :key="section.id" type="button"
                        class="flex w-full items-start gap-3 border-l-2 px-3 py-2 text-left text-sm leading-5 transition"
                        :class="activeSection === section.id
                                ? 'border-[#E80E0E] bg-red-50 font-bold text-[#E80E0E]'
                                : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
                            " @click="navigateTo(section.id)">
                        <span class="shrink-0 text-xs font-semibold text-slate-400">
                            {{ String(index + 1).padStart(2, '0') }}
                        </span>
                        <span>{{ section.title }}</span>
                    </button>
                </nav>
            </div>
        </aside>
    </div>
</template>
