
<script setup>
import { ref } from 'vue'
import { Facebook, MessageCircle, Link2, Check } from 'lucide-vue-next'

const props = defineProps({
    title: { type: String, required: true },
})

const copied = ref(false)

const pageUrl = () => window.location.href

function shareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(`${props.title} ${pageUrl()}`)}`
    window.open(url, '_blank', 'noopener,noreferrer')
}

function shareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl())}`
    window.open(url, '_blank', 'noopener,noreferrer')
}

async function copyLink() {
    try {
        await navigator.clipboard.writeText(pageUrl())
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch {
        window.prompt('Copy this link:', pageUrl())
    }
}
</script>

<template>
    <div class="flex flex-wrap items-center gap-3">
        <span class="mr-1 text-sm font-bold text-slate-700">Share:</span>

        <button type="button" aria-label="Share on WhatsApp"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600 transition hover:bg-green-100"
            @click="shareWhatsApp">
            <MessageCircle :size="18" />
        </button>

        <button type="button" aria-label="Share on Facebook"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-100"
            @click="shareFacebook">
            <Facebook :size="18" />
        </button>

        <button type="button" aria-label="Copy article link"
            class="flex h-10 items-center justify-center gap-2 rounded-full bg-slate-100 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            @click="copyLink">
            <Check v-if="copied" :size="16" />
            <Link2 v-else :size="16" />
            {{ copied ? 'Copied' : 'Copy link' }}
        </button>
    </div>
</template>
