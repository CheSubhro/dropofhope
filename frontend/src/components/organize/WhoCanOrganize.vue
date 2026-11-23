<script setup>
import {
    Building2,
    GraduationCap,
    BriefcaseBusiness,
    HeartHandshake,
    Church,
    House,
} from 'lucide-vue-next'

const icons = {
    Building2,
    GraduationCap,
    BriefcaseBusiness,
    HeartHandshake,
    Church,
    House,
}

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
            <div class="mb-10 text-center">
                <span class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                    Everyone Can Contribute
                </span>
                <h2 class="mt-3 text-3xl font-bold text-slate-900">
                    Who Can Organize a Camp?
                </h2>
                <p class="mt-3 text-sm font-medium text-slate-600">
                    Organizations and communities of different kinds can come forward.
                </p>
            </div>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                <article v-for="item in items" :key="item.title"
                    class="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <div class="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <component :is="icons[item.icon]" v-if="icons[item.icon]" class="h-6 w-6" />
                    </div>
                    <h3 class="mt-4 text-sm font-bold text-slate-900">{{ item.title }}</h3>
                    <p class="mt-2 text-xs font-medium leading-5 text-slate-600">
                        {{ item.description }}
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>