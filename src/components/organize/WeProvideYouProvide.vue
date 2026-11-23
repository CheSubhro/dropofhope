<script setup>
import { CheckCircle2, Users } from 'lucide-vue-next'

defineProps({
    weProvide: {
        type: Array,
        default: () => [],
    },
    youProvide: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-6xl">
            <div class="mb-10 text-center">
                <span class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                    Working Together
                </span>
                <h2 class="mt-3 text-3xl font-bold text-slate-900">
                    Let's Make It Happen Together
                </h2>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
                <div class="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
                    <div class="flex items-center gap-3">
                        <div class="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                            <Users class="h-6 w-6" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-900">We Coordinate</h3>
                            <p class="text-sm font-medium text-slate-600">Guidance from our side</p>
                        </div>
                    </div>

                    <ul class="mt-7 space-y-4">
                        <li v-for="item in weProvide" :key="item"
                            class="flex items-start gap-3 text-sm font-medium leading-6 text-slate-700">
                            <CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <div class="rounded-2xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
                    <div class="flex items-center gap-3">
                        <div class="rounded-xl bg-red-50 p-3 text-[#E80E0E]">
                            <Users class="h-6 w-6" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-900">You Arrange</h3>
                            <p class="text-sm font-medium text-slate-600">Support from the organizer</p>
                        </div>
                    </div>

                    <ul class="mt-7 space-y-4">
                        <li v-for="item in youProvide" :key="item"
                            class="flex items-start gap-3 text-sm font-medium leading-6 text-slate-700">
                            <CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 text-[#E80E0E]" />
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>

            <p class="mt-5 text-center text-xs font-medium leading-5 text-slate-500">
                Final responsibilities, medical arrangements and resource availability must be confirmed before the camp is
                approved.
            </p>
        </div>
    </section>
</template>