<script setup>
import {
    HeartHandshake,
    Users,
    Award,
    Stethoscope,
} from 'lucide-vue-next'

const icons = {
    HeartHandshake,
    Users,
    Award,
    Stethoscope,
}

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <section class="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
            <div class="mx-auto mb-10 max-w-2xl text-center">
                <span class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                    Make An Impact
                </span>
                <h2 class="mt-3 text-3xl font-bold text-slate-900">
                    Why Organize a Blood Camp?
                </h2>
                <p class="mt-3 text-sm font-medium leading-7 text-slate-600">
                    A well-coordinated camp can bring people together and encourage a lasting culture of voluntary blood
                    donation.
                </p>
            </div>

            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <article v-for="(item, index) in items" :key="item.title"
                    class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div class="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <component :is="icons[item.icon]" v-if="icons[item.icon]" class="h-6 w-6" />
                        <span v-else class="font-bold">{{ index + 1 }}</span>
                    </div>
                    <h3 class="mt-5 text-lg font-bold text-slate-900">{{ item.title }}</h3>
                    <p class="mt-2 text-sm font-medium leading-6 text-slate-600">
                        {{ item.description }}
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>