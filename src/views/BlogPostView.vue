
<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getBlogPosts } from '@/services/contentService'
import { useAsyncData } from '@/composables/useAsyncData'

import PostCard from '@/components/blog/PostCard.vue'
import ShareButtons from '@/components/blog/ShareButtons.vue'
import RelatedPosts from '@/components/blog/RelatedPosts.vue'

import {
    CalendarDays,
    Clock3,
    ArrowLeft,
    LoaderCircle,
    RefreshCw,
} from 'lucide-vue-next'

const route = useRoute()

const { data, loading, error, reload } = useAsyncData(getBlogPosts)

const posts = computed(() => data.value?.posts || [])

const post = computed(() => {
    return posts.value.find((item) => item.slug === route.params.slug) || null
})

const relatedPosts = computed(() => {
    if (!post.value) return []

    return posts.value
        .filter(
            (item) =>
                item.category === post.value.category &&
                item.id !== post.value.id
        )
        .slice(0, 3)
})

function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}
</script>

<template>
    <main class="min-h-screen bg-slate-50 py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div v-if="loading" class="flex min-h-96 items-center justify-center">
                <div class="text-center">
                    <LoaderCircle class="mx-auto animate-spin text-[#E80E0E]" :size="38" />
                    <p class="mt-3 text-sm text-slate-500">Loading article...</p>
                </div>
            </div>

            <div v-else-if="error" class="rounded-2xl bg-white p-10 text-center">
                <h2 class="text-xl font-bold text-slate-900">Unable to load article</h2>
                <button type="button"
                    class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E80E0E] px-5 py-3 text-sm font-bold text-white"
                    @click="reload">
                    <RefreshCw :size="16" /> Try Again
                </button>
            </div>

            <div v-else-if="post">
                <RouterLink to="/blog"
                    class="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#E80E0E]">
                    <ArrowLeft :size="17" /> Back to Blog
                </RouterLink>

                <article class="mx-auto max-w-4xl">
                    <header class="text-center">
                        <span class="inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-[#E80E0E]">
                            {{ post.category }}
                        </span>

                        <h1 class="mt-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            {{ post.title }}
                        </h1>

                        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            {{ post.excerpt }}
                        </p>

                        <div class="mt-7 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
                            <span class="font-semibold text-slate-800">{{ post.author }}</span>

                            <span class="inline-flex items-center gap-1">
                                <CalendarDays :size="15" />
                                {{ formatDate(post.date) }}
                            </span>

                            <span class="inline-flex items-center gap-1">
                                <Clock3 :size="15" />
                                {{ post.readTime }}
                            </span>
                        </div>
                    </header>

                    <div class="mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-red-50 shadow-sm">
                        <img :src="post.image" :alt="post.title" class="h-full w-full object-cover"
                            @error="$event.target.style.display = 'none'" />
                    </div>

                    <div class="mx-auto mt-10 max-w-3xl">
                        <div class="space-y-6 text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">
                            <p v-for="(paragraph, index) in post.content" :key="index">
                                {{ paragraph }}
                            </p>
                        </div>

                        <div class="mt-10 border-y border-slate-200 py-6">
                            <ShareButtons :title="post.title" />
                        </div>

                        <div class="mt-8 rounded-2xl bg-white p-6 shadow-sm">
                            <p class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                                Written By
                            </p>
                            <h3 class="mt-2 text-lg font-extrabold text-slate-900">
                                {{ post.author }}
                            </h3>
                            <p class="mt-1 text-sm text-slate-500">
                                Sharing stories and information to support voluntary blood donation.
                            </p>
                        </div>
                    </div>
                </article>

                <RelatedPosts :posts="relatedPosts" />
            </div>

            <div v-else class="rounded-2xl bg-white px-5 py-16 text-center shadow-sm">
                <h2 class="text-2xl font-extrabold text-slate-900">Article Not Found</h2>
                <p class="mt-2 text-slate-500">
                    Sorry, the article you are looking for does not exist.
                </p>
                <RouterLink to="/blog"
                    class="mt-6 inline-flex rounded-xl bg-[#E80E0E] px-5 py-3 text-sm font-bold text-white hover:bg-red-700">
                    Explore Blog
                </RouterLink>
            </div>
        </div>
    </main>
</template>
