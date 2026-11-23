
<script setup>
import { RouterLink } from 'vue-router'
import { ArrowUpRight, Clock3, CalendarDays } from 'lucide-vue-next'

defineProps({
    post: { type: Object, required: true },
})
</script>

<template>
    <article
        class="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <RouterLink :to="`/blog/${post.slug}`" class="block">
            <div class="relative aspect-[16/10] overflow-hidden bg-red-50">
                <img :src="post.image" :alt="post.title"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    @error="$event.target.style.display = 'none'" />
                <span class="absolute left-4 top-4 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#E80E0E]">
                    {{ post.category }}
                </span>
            </div>
        </RouterLink>

        <div class="p-5">
            <div class="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span class="inline-flex items-center gap-1">
                    <CalendarDays :size="14" />
                    {{ post.date }}
                </span>
                <span class="inline-flex items-center gap-1">
                    <Clock3 :size="14" />
                    {{ post.readTime }}
                </span>
            </div>

            <RouterLink :to="`/blog/${post.slug}`">
                <h3
                    class="line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-[#E80E0E]">
                    {{ post.title }}
                </h3>
            </RouterLink>

            <p class="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                {{ post.excerpt }}
            </p>

            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span class="text-sm font-medium text-slate-700">{{ post.author }}</span>
                <RouterLink :to="`/blog/${post.slug}`"
                    class="inline-flex items-center gap-1 text-sm font-bold text-[#E80E0E] hover:gap-2">
                    Read more
                    <ArrowUpRight :size="16" />
                </RouterLink>
            </div>
        </div>
    </article>
</template>
