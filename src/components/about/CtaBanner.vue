
<script setup>
import { ArrowRight, Heart, Tent } from 'lucide-vue-next'

defineProps({
    data: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <section class="px-5 py-20 md:py-24">
        <div
            class="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#E80E0E] px-7 py-16 text-center md:px-16 md:py-20">

            <div class="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10"></div>
            <div class="absolute -bottom-28 -right-16 h-80 w-80 rounded-full border-[45px] border-white/10"></div>

            <div class="relative">
                <span class="inline-block rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white">
                    {{ data.eyebrow }}
                </span>

                <h2 class="mx-auto mt-6 max-w-3xl text-3xl font-bold text-white md:text-5xl">
                    {{ data.title }}
                </h2>

                <p class="mx-auto mt-5 max-w-2xl leading-8 text-white/85">
                    {{ data.description }}
                </p>

                <div class="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

                    <router-link :to="data.primaryCta.to"
                        class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-[#E80E0E] transition hover:bg-gray-100">
                        <Heart :size="19" />
                        {{ data.primaryCta.label }}
                        <ArrowRight :size="18" />
                    </router-link>

                    <router-link :to="data.secondaryCta.to"
                        class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 px-7 py-4 font-bold text-white transition hover:bg-white/10">
                        <Tent :size="19" />
                        {{ data.secondaryCta.label }}
                    </router-link>

                </div>
            </div>

        </div>
    </section>
</template>
