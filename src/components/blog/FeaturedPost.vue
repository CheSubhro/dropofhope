
<script setup>
import { RouterLink } from 'vue-router'
import { ArrowUpRight, Clock3, CalendarDays } from 'lucide-vue-next'

defineProps({
    post: { type: Object, required: true },
})
</script>

<template>
    <article class="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm lg:grid-cols-2">
        <RouterLink :to="`/blog/${post.slug}`" class="relative min-h-64 overflow-hidden bg-red-50 lg:min-h-[390px]">
            <img :src="post.image" :alt="post.title"
                class="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
                @error="$event.target.style.display = 'none'" />
            <span class="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#E80E0E] shadow">
                Featured Article
            </span>
        </RouterLink>

        <div class="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <span class="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E80E0E]">
                {{ post.category }}
            </span>

            <h2 class="mt-5 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                {{ post.title }}
            </h2>

            <p class="mt-4 leading-7 text-slate-600">{{ post.excerpt }}</p>

            <div class="mt-6 flex flex-wrap gap-4 text-xs text-slate-500">
                <span class="font-semibold text-slate-700">{{ post.author }}</span>
                <span class="inline-flex items-center gap-1">
                    <CalendarDays :size="14" /> {{ post.date }}
                </span>
                <span class="inline-flex items-center gap-1">
                    <Clock3 :size="14" /> {{ post.readTime }}
                </span>
            </div>

            <RouterLink :to="`/blog/${post.slug}`"
                class="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#E80E0E] px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                Read Article
                <ArrowUpRight :size="17" />
            </RouterLink>
        </div>
    </article>
</template>
