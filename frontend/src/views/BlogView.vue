
<script setup>
import { computed, ref } from 'vue'
import { getBlogPosts } from '@/services/contentService'
import { useAsyncData } from '@/composables/useAsyncData'

import BlogHero from '@/components/blog/BlogHero.vue'
import BlogFilters from '@/components/blog/BlogFilters.vue'
import FeaturedPost from '@/components/blog/FeaturedPost.vue'
import PostCard from '@/components/blog/PostCard.vue'
import BlogSidebar from '@/components/blog/BlogSidebar.vue'
import { LoaderCircle, RefreshCw } from 'lucide-vue-next'

const { data, loading, error, reload } = useAsyncData(getBlogPosts)

const search = ref('')
const activeCategory = ref('all')
const visibleCount = ref(6)

const blog = computed(() => data.value)

const featuredPost = computed(() => {
    return blog.value?.posts.find((post) => post.featured) || null
})

const filteredPosts = computed(() => {
    if (!blog.value) return []

    return blog.value.posts.filter((post) => {
        const matchesCategory =
            activeCategory.value === 'all' ||
            post.category.toLowerCase().replaceAll(' ', '-') === activeCategory.value

        const searchText = search.value.trim().toLowerCase()

        const matchesSearch =
            !searchText ||
            post.title.toLowerCase().includes(searchText) ||
            post.excerpt.toLowerCase().includes(searchText) ||
            post.category.toLowerCase().includes(searchText) ||
            post.author.toLowerCase().includes(searchText)

        return matchesCategory && matchesSearch
    })
})

const featuredId = computed(() => featuredPost.value?.id)

const gridPosts = computed(() => {
    return filteredPosts.value.filter((post) => post.id !== featuredId.value)
})

const visiblePosts = computed(() => gridPosts.value.slice(0, visibleCount.value))

const hasMore = computed(() => visibleCount.value < gridPosts.value.length)

function loadMore() {
    visibleCount.value += 3
}

function selectCategory(category) {
    activeCategory.value = category
    visibleCount.value = 6
}

function updateSearch(value) {
    search.value = value
    visibleCount.value = 6
}
</script>

<template>
    <main>
        <BlogHero v-if="blog" :data="blog.hero" />

        <section class="bg-slate-50 py-12 sm:py-16">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div v-if="loading" class="flex min-h-64 items-center justify-center">
                    <div class="text-center">
                        <LoaderCircle class="mx-auto animate-spin text-[#E80E0E]" :size="38" />
                        <p class="mt-3 text-sm text-slate-500">Loading articles...</p>
                    </div>
                </div>

                <div v-else-if="error" class="rounded-2xl bg-white p-10 text-center shadow-sm">
                    <h2 class="text-xl font-bold text-slate-900">Unable to load blog posts</h2>
                    <p class="mt-2 text-sm text-slate-500">Please try again.</p>
                    <button type="button"
                        class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E80E0E] px-5 py-3 text-sm font-bold text-white"
                        @click="reload">
                        <RefreshCw :size="16" /> Try Again
                    </button>
                </div>

                <template v-else-if="blog">
                    <BlogFilters :categories="blog.categories" :search="search" :active-category="activeCategory"
                        @update:search="updateSearch" @update:category="selectCategory" />

                    <div v-if="featuredPost && activeCategory === 'all' && !search" class="mt-10">
                        <div class="mb-5">
                            <p class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                                Editor's Pick
                            </p>
                            <h2 class="mt-1 text-2xl font-extrabold text-slate-900">Featured Article</h2>
                        </div>
                        <FeaturedPost :post="featuredPost" />
                    </div>

                    <div class="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <div>
                            <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
                                <div>
                                    <p class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                                        Explore Our Articles
                                    </p>
                                    <h2 class="mt-1 text-2xl font-extrabold text-slate-900">
                                        Latest Articles
                                    </h2>
                                </div>
                                <p class="text-sm text-slate-500">
                                    {{ gridPosts.length }} articles found
                                </p>
                            </div>

                            <div v-if="visiblePosts.length" class="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                                <PostCard v-for="post in visiblePosts" :key="post.id" :post="post" />
                            </div>

                            <div v-else
                                class="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                                <h3 class="text-xl font-bold text-slate-900">No posts found</h3>
                                <p class="mt-2 text-sm text-slate-500">
                                    Try another search term or select a different category.
                                </p>
                                <button type="button" class="mt-5 text-sm font-bold text-[#E80E0E] hover:underline"
                                    @click="search = ''; selectCategory('all')">
                                    Clear filters
                                </button>
                            </div>

                            <div v-if="hasMore" class="mt-10 text-center">
                                <button type="button"
                                    class="rounded-xl border-2 border-[#E80E0E] px-7 py-3 text-sm font-bold text-[#E80E0E] transition hover:bg-[#E80E0E] hover:text-white"
                                    @click="loadMore">
                                    Load More Articles
                                </button>
                            </div>
                        </div>

                        <BlogSidebar :posts="blog.posts" :categories="blog.categories" @select-category="selectCategory" />
                    </div>
                </template>
            </div>
        </section>
    </main>
</template>
