<script setup>
import {
    HeartPulse,
    HandHeart,
    Megaphone,
    Building2,
} from 'lucide-vue-next'

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})

const icons = {
    'heart-pulse': HeartPulse,
    'hand-heart': HandHeart,
    megaphone: Megaphone,
    'building-2': Building2,
}
</script>

<template>
    <section>
        <div class="mx-auto max-w-2xl text-center">
            <span class="text-sm font-semibold uppercase tracking-wider text-[#E80E0E]">
                Transparency matters
            </span>

            <h2 class="mt-3 text-3xl font-bold text-gray-900">
                Where Your Donation Goes
            </h2>

            <p class="mt-3 text-gray-500">
                Your contribution helps us support several important activities in our community.
            </p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article v-for="item in items" :key="item.id"
                class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div class="flex items-center justify-between">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <component :is="icons[item.icon] || HeartPulse" :size="23" />
                    </div>

                    <span class="text-2xl font-bold text-[#E80E0E]">
                        {{ item.percentage }}%
                    </span>
                </div>

                <h3 class="mt-5 text-lg font-bold text-gray-900">
                    {{ item.title }}
                </h3>

                <p class="mt-2 text-sm leading-6 text-gray-500">
                    {{ item.description }}
                </p>

                <div class="mt-5 h-2 overflow-hidden rounded-full bg-red-50">
                    <div class="h-full rounded-full bg-[#E80E0E]" :style="{ width: `${item.percentage}%` }"></div>
                </div>
            </article>
        </div>

        <p class="mt-5 text-center text-xs text-gray-400">
            Illustrative allocation for demonstration only. Replace these percentages with your organisation's actual
            financial allocation before publishing.
        </p>
    </section>
</template>