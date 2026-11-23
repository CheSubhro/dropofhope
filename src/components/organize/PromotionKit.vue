<script setup>
import { ref } from 'vue'
import { Copy, Check, MessageCircle, Share2, FileText } from 'lucide-vue-next'

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})

const copiedIndex = ref(-1)
const copyError = ref('')

async function copyText(text, index) {
    copyError.value = ''

    try {
        if (!navigator.clipboard?.writeText) {
            throw new Error('Clipboard access is unavailable.')
        }

        await navigator.clipboard.writeText(text)
        copiedIndex.value = index

        window.setTimeout(() => {
            if (copiedIndex.value === index) copiedIndex.value = -1
        }, 2000)
    } catch {
        copyError.value = 'Unable to copy. Please select and copy the text manually.'
    }
}

const icons = [MessageCircle, Share2, FileText]
</script>

<template>
    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
            <div class="mx-auto mb-10 max-w-2xl text-center">
                <span class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                    Ready-to-Use Resources
                </span>
                <h2 class="mt-3 text-3xl font-bold text-slate-900">
                    Promote Your Blood Camp
                </h2>
                <p class="mt-3 text-sm font-medium leading-7 text-slate-600">
                    Use these sample messages to spread awareness. Add your confirmed
                    camp date, time, venue and contact details before sharing.
                </p>
            </div>

            <div class="grid gap-5 lg:grid-cols-3">
                <article v-for="(item, index) in items" :key="item.title"
                    class="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div class="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <component :is="icons[index] || FileText" class="h-6 w-6" />
                    </div>

                    <p class="mt-5 text-xs font-bold uppercase tracking-wider text-[#E80E0E]">
                        {{ item.type }}
                    </p>
                    <h3 class="mt-2 text-lg font-bold text-slate-900">
                        {{ item.title }}
                    </h3>
                    <p class="mt-2 text-sm font-medium leading-6 text-slate-600">
                        {{ item.description }}
                    </p>

                    <pre
                        class="mt-5 flex-1 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 font-sans text-sm font-medium leading-6 text-slate-700">{{ item.text }}</pre>

                    <button type="button"
                        class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E80E0E] px-4 py-3 text-sm font-bold text-[#E80E0E] transition hover:bg-red-50"
                        @click="copyText(item.text, index)">
                        <Check v-if="copiedIndex === index" class="h-4 w-4" />
                        <Copy v-else class="h-4 w-4" />
                        {{ copiedIndex === index ? 'Copied!' : 'Copy Text' }}
                    </button>
                </article>
            </div>

            <p v-if="copyError" class="mt-4 text-center text-sm font-semibold text-red-600">
                {{ copyError }}
            </p>
        </div>
    </section>
</template>