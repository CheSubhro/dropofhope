
<script setup>
import PostCard from './PostCard.vue'

defineProps({
    posts: { type: Array, required: true },
})
</script>

<template>
    <section v-if="posts.length" class="mt-16">
        <div class="mb-7">
            <p class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">Keep Exploring</p>
            <h2 class="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">Related Articles</h2>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
    </section>
</template>
