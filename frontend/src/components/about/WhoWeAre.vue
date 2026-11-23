
<script setup>
import { ArrowRight } from 'lucide-vue-next'

defineProps({
    data: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <section class="py-20 md:py-24">
        <div class="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2">

            <div class="relative">
                <div class="overflow-hidden rounded-3xl bg-gray-100">
                    <img :src="data.image" :alt="data.imageAlt" class="h-[380px] w-full object-cover md:h-[480px]" />
                </div>

                <div class="absolute -bottom-5 left-5 rounded-xl bg-white px-6 py-4 shadow-xl md:left-8">
                    <p class="font-bold text-[#E80E0E]">
                        {{ data.badge }}
                    </p>
                </div>
            </div>

            <div>
                <span class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                    {{ data.eyebrow }}
                </span>

                <h2 class="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                    {{ data.title }}
                </h2>

                <div class="mt-6 space-y-5 text-base leading-8 text-gray-600">
                    <p v-for="(paragraph, index) in data.paragraphs" :key="index">
                        {{ paragraph }}
                    </p>
                </div>

                <router-link to="/donor-registration"
                    class="mt-8 inline-flex items-center gap-2 font-semibold text-[#E80E0E] hover:gap-3">
                    Join Our Mission
                    <ArrowRight :size="18" />
                </router-link>
            </div>

        </div>
    </section>
</template>
