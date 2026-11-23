
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight, Mail, CheckCircle2 } from 'lucide-vue-next'

const props = defineProps({
    posts: { type: Array, required: true },
    categories: { type: Array, required: true },
})

const emit = defineEmits(['select-category'])

const email = ref('')
const subscribed = ref(false)
const emailError = ref('')

function subscribe() {
    emailError.value = ''

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.value = 'Please enter a valid email address.'
        return
    }

    subscribed.value = true
    email.value = ''
}
</script>

<template>
    <aside class="space-y-6">
        <section class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 class="text-lg font-extrabold text-slate-900">Recent Posts</h3>

            <div class="mt-5 space-y-4">
                <RouterLink v-for="post in posts.slice(0, 4)" :key="post.id" :to="`/blog/${post.slug}`"
                    class="group flex gap-3">
                    <img :src="post.image" :alt="post.title" class="h-16 w-16 shrink-0 rounded-xl bg-red-50 object-cover"
                        @error="$event.target.style.display = 'none'" />
                    <div class="min-w-0">
                        <p
                            class="line-clamp-2 text-sm font-bold leading-5 text-slate-800 transition group-hover:text-[#E80E0E]">
                            {{ post.title }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">{{ post.date }}</p>
                    </div>
                </RouterLink>
            </div>
        </section>

        <section class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 class="text-lg font-extrabold text-slate-900">Categories</h3>

            <div class="mt-4 space-y-1">
                <button v-for="category in categories.filter((item) => item.id !== 'all')" :key="category.id" type="button"
                    class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-red-50 hover:text-[#E80E0E]"
                    @click="emit('select-category', category.id)">
                    <span>{{ category.name }}</span>
                    <ArrowUpRight :size="15" />
                </button>
            </div>
        </section>

        <section class="rounded-2xl bg-slate-950 p-5 text-white shadow-sm">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                <Mail :size="22" />
            </div>

            <h3 class="mt-4 text-xl font-extrabold">Stay Updated</h3>
            <p class="mt-2 text-sm leading-6 text-slate-300">
                Get the latest stories, awareness articles and community updates.
            </p>

            <div v-if="subscribed"
                class="mt-5 flex items-start gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-300">
                <CheckCircle2 :size="18" class="shrink-0" />
                Thank you! Your demo subscription was successful.
            </div>

            <form v-else class="mt-5 space-y-3" @submit.prevent="subscribe">
                <input v-model="email" type="email" placeholder="Your email address"
                    class="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-red-400" />
                <p v-if="emailError" class="text-xs text-red-300">{{ emailError }}</p>
                <button type="submit"
                    class="w-full rounded-xl bg-[#E80E0E] px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                    Subscribe Now
                </button>
            </form>

            <p class="mt-3 text-xs text-slate-400">Demo only. No email is stored or sent.</p>
        </section>
    </aside>
</template>
