
<script setup>
import {
    Lightbulb,
    Users,
    TrendingUp,
    Globe,
} from 'lucide-vue-next'

const iconMap = {
    Lightbulb,
    Users,
    TrendingUp,
    Globe,
}

defineProps({
    data: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <section class="bg-gray-50 py-20 md:py-24">
        <div class="mx-auto max-w-5xl px-5">

            <div class="mb-14 text-center">
                <span class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                    Our Journey
                </span>
                <h2 class="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                    Every Step Has Made Us Stronger
                </h2>
            </div>

            <div class="relative">
                <div class="absolute bottom-5 left-5 top-5 w-0.5 bg-red-200 md:left-1/2 md:-translate-x-1/2"></div>

                <div v-for="(item, index) in data" :key="item.id"
                    class="relative mb-12 flex items-start gap-6 last:mb-0 md:items-center"
                    :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
                    <div
                        class="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#E80E0E] text-white shadow md:absolute md:left-1/2 md:-translate-x-1/2">
                        <component :is="iconMap[item.icon]" :size="17" />
                    </div>

                    <div class="w-full rounded-2xl bg-white p-6 shadow-sm md:w-[44%]">
                        <span class="text-sm font-bold text-[#E80E0E]">
                            {{ item.year }}
                        </span>
                        <h3 class="mt-2 text-xl font-bold text-gray-900">
                            {{ item.title }}
                        </h3>
                        <p class="mt-3 text-sm leading-7 text-gray-500">
                            {{ item.description }}
                        </p>
                    </div>

                    <div class="hidden md:block md:w-[44%]"></div>
                </div>

            </div>
        </div>
    </section>
</template>
