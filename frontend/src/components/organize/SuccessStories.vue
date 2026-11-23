<script setup>
import { Users, Droplet, Quote } from 'lucide-vue-next'

defineProps({
    stories: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <section class="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
            <div class="mb-10 text-center">
                <span class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                    Community Participation
                </span>
                <h2 class="mt-3 text-3xl font-bold text-slate-900">
                    Every Camp Starts With People Like You
                </h2>
                <p class="mt-3 text-sm font-medium text-slate-600">
                    Sample stories illustrating how organizations can bring communities together.
                </p>
            </div>

            <div class="grid gap-6 md:grid-cols-3">
                <article v-for="story in stories" :key="story.org"
                    class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div class="relative h-44 bg-gradient-to-br from-red-100 via-rose-50 to-emerald-50">
                        <img v-if="story.image" :src="story.image" :alt="story.org" class="h-full w-full object-cover"
                            @error="$event.target.style.display = 'none'" />
                        <div class="absolute inset-0 flex items-center justify-center">
                            <Quote class="h-12 w-12 text-red-300/80" />
                        </div>
                    </div>

                    <div class="p-6">
                        <span
                            class="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                            Demo Story
                        </span>
                        <h3 class="mt-4 text-lg font-bold text-slate-900">
                            {{ story.org }}
                        </h3>
                        <p class="mt-3 text-sm font-medium leading-6 text-slate-600">
                            “{{ story.quote }}”
                        </p>

                        <div class="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                            <div>
                                <div class="flex items-center gap-2 text-[#E80E0E]">
                                    <Users class="h-4 w-4" />
                                    <strong class="text-xl">{{ story.donors }}</strong>
                                </div>
                                <p class="mt-1 text-xs font-semibold text-slate-500">Donors</p>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 text-emerald-700">
                                    <Droplet class="h-4 w-4" />
                                    <strong class="text-xl">{{ story.units }}</strong>
                                </div>
                                <p class="mt-1 text-xs font-semibold text-slate-500">Units</p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <p class="mt-5 text-center text-xs font-medium text-slate-500">
                These are illustrative examples, not verified records of actual camps.
            </p>
        </div>
    </section>
</template>