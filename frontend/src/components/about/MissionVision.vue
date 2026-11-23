
<script setup>
import {
    Target,
    Eye,
    HeartHandshake,
    ShieldCheck,
    HandHeart,
    Zap,
} from 'lucide-vue-next'

const iconMap = {
    Target,
    Eye,
    HeartHandshake,
    ShieldCheck,
    HandHeart,
    Zap,
}

defineProps({
    data: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <section class="bg-gray-50 py-20 md:py-24">
        <div class="mx-auto max-w-7xl px-5">

            <div class="mx-auto mb-12 max-w-2xl text-center">
                <span class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                    What Drives Us
                </span>
                <h2 class="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                    Our Mission & Vision
                </h2>
            </div>

            <div class="grid gap-7 md:grid-cols-2">

                <div v-for="(item, index) in [data.mission, data.vision]" :key="index"
                    class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <component :is="iconMap[item.icon]" :size="28" />
                    </div>

                    <p class="mt-6 text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                        {{ item.eyebrow }}
                    </p>

                    <h3 class="mt-3 text-2xl font-bold text-gray-900">
                        {{ item.title }}
                    </h3>

                    <p class="mt-4 leading-7 text-gray-600">
                        {{ item.description }}
                    </p>
                </div>

            </div>

            <div class="mt-20">
                <div class="mb-10 text-center">
                    <h3 class="text-2xl font-bold text-gray-900">
                        Our Core Values
                    </h3>
                    <p class="mt-2 text-gray-500">
                        The principles that guide everything we do.
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div v-for="item in data.values" :key="item.id" class="rounded-2xl bg-white p-6 text-center shadow-sm">
                        <div
                            class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[#E80E0E]">
                            <component :is="iconMap[item.icon]" :size="26" />
                        </div>

                        <h4 class="mt-5 font-bold text-gray-900">
                            {{ item.title }}
                        </h4>

                        <p class="mt-2 text-sm leading-6 text-gray-500">
                            {{ item.description }}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
