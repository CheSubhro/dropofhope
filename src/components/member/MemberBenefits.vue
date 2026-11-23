
<script setup>
import {
    HeartHandshake,
    GraduationCap,
    Award,
    Users,
} from 'lucide-vue-next'

defineProps({
    benefits: {
        type: Array,
        default: () => [],
    },
})

const iconMap = {
    HeartHandshake,
    GraduationCap,
    Award,
    Users,
}
</script>

<template>
    <section class="py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-5">
            <div class="mx-auto mb-12 max-w-2xl text-center">
                <span class="text-sm font-bold uppercase tracking-wider text-[#E80E0E]">
                    Why Join Us
                </span>

                <h2 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                    Make a Difference Together
                </h2>

                <p class="mt-4 text-base font-medium leading-7 text-slate-700">
                    Your time, skills, and dedication can make a meaningful difference
                    in someone's life.
                </p>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <article v-for="benefit in benefits" :key="benefit.id"
                    class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg">
                    <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <component :is="iconMap[benefit.icon]" :size="27" :stroke-width="1.8" />
                    </div>

                    <h3 class="mt-5 text-lg font-bold text-slate-900">
                        {{ benefit.title }}
                    </h3>

                    <p class="mt-3 text-sm font-medium leading-6 text-slate-700">
                        {{ benefit.description }}
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>
