
<script setup>
import {
    UserPlus,
    Tent,
    Droplet,
    Award,
    ArrowUpRight,
} from 'lucide-vue-next'

const iconMap = {
    UserPlus,
    Tent,
    Droplet,
    Award,
}

defineProps({
    data: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <section class="py-20 md:py-24">
        <div class="mx-auto max-w-7xl px-5">

            <div class="mb-12 text-center">
                <span class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                    Our Services
                </span>
                <h2 class="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                    What We Do
                </h2>
                <p class="mx-auto mt-4 max-w-xl text-gray-500">
                    We make it easier for people to participate in blood donation and help those in need.
                </p>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                <div v-for="item in data" :key="item.id"
                    class="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:border-red-100 hover:shadow-xl">
                    <div
                        class="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E] transition group-hover:bg-[#E80E0E] group-hover:text-white">
                        <component :is="iconMap[item.icon]" :size="27" />
                    </div>

                    <h3 class="mt-7 text-xl font-bold text-gray-900">
                        {{ item.title }}
                    </h3>

                    <p class="mt-4 min-h-24 text-sm leading-7 text-gray-500">
                        {{ item.description }}
                    </p>

                    <router-link :to="item.link.to"
                        class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#E80E0E]">
                        {{ item.link.label }}
                        <ArrowUpRight :size="17" />
                    </router-link>
                </div>

            </div>
        </div>
    </section>
</template>
