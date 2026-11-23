<script setup>
import { CheckCircle2 } from 'lucide-vue-next'

defineProps({
    steps: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <section id="how-it-works" class="scroll-mt-20 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl">
            <div class="mb-12 text-center">
                <span class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                    Simple Process
                </span>
                <h2 class="mt-3 text-3xl font-bold text-slate-900">
                    How It Works
                </h2>
                <p class="mt-3 text-sm font-medium text-slate-600">
                    From your first application to the camp day, here is what to expect.
                </p>
            </div>

            <div class="relative space-y-8">
                <div class="absolute bottom-8 left-5 top-8 w-0.5 bg-red-100 sm:left-7"></div>

                <article v-for="(step, index) in steps" :key="step.title" class="relative flex gap-5 sm:gap-7">
                    <div
                        class="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E80E0E] text-sm font-bold text-white shadow-md sm:h-14 sm:w-14">
                        {{ index + 1 }}
                    </div>

                    <div class="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <h3 class="text-base font-bold text-slate-900 sm:text-lg">
                                {{ step.title }}
                            </h3>
                            <span class="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E80E0E]">
                                {{ step.timing }}
                            </span>
                        </div>
                        <p class="mt-3 text-sm font-medium leading-6 text-slate-600">
                            {{ step.text }}
                        </p>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>