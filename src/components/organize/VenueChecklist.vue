<script setup>
import { ref } from 'vue'
import { ClipboardCheck } from 'lucide-vue-next'

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})

const checkedItems = ref([])
</script>

<template>
    <section class="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
                <span class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                    Before You Apply
                </span>
                <h2 class="mt-3 text-3xl font-bold text-slate-900">
                    Venue Readiness Checklist
                </h2>
                <p class="mt-4 text-sm font-medium leading-7 text-slate-600">
                    A suitable venue helps the organizing team manage donors comfortably.
                    Use this checklist to review your proposed location before submitting
                    your application.
                </p>

                <div class="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p class="text-sm font-semibold leading-6 text-amber-900">
                        Final venue suitability will be assessed with the coordinating blood
                        bank or hospital. Checking these items does not mean the venue is
                        automatically approved.
                    </p>
                </div>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
                <div class="mb-5 flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <ClipboardCheck class="h-6 w-6 text-[#E80E0E]" />
                        <h3 class="font-bold text-slate-900">Venue Checklist</h3>
                    </div>
                    <span class="text-xs font-bold text-slate-500">
                        {{ checkedItems.length }}/{{ items.length }} checked
                    </span>
                </div>

                <div class="mb-5 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div class="h-full rounded-full bg-emerald-500 transition-all"
                        :style="{ width: `${items.length ? (checkedItems.length / items.length) * 100 : 0}%` }"></div>
                </div>

                <div class="space-y-4">
                    <label v-for="item in items" :key="item"
                        class="flex cursor-pointer items-start gap-3 text-sm font-medium leading-6 text-slate-700">
                        <input v-model="checkedItems" type="checkbox" :value="item"
                            class="mt-1 h-4 w-4 rounded border-slate-300 accent-[#E80E0E]" />
                        <span>{{ item }}</span>
                    </label>
                </div>

                <button type="button" class="mt-6 text-xs font-bold text-[#E80E0E] hover:underline"
                    @click="checkedItems = []">
                    Reset checklist
                </button>
            </div>
        </div>
    </section>
</template>