
<script setup>
import { ref, onMounted } from 'vue'
import LegalLayout from '@/components/legal/LegalLayout.vue'
import { getPrivacyPageData } from '@/services/contentService'

const pageData = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
    try {
        pageData.value = await getPrivacyPageData()
    } catch (err) {
        console.error('Failed to load privacy policy:', err)
        error.value = 'Unable to load the Privacy Policy. Please try again later.'
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <main>
        <div v-if="loading" class="flex min-h-[50vh] items-center justify-center">
            <div class="text-center">
                <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#E80E0E]"></div>
                <p class="mt-4 text-sm font-semibold text-slate-600">
                    Loading Privacy Policy...
                </p>
            </div>
        </div>

        <div v-else-if="error" class="flex min-h-[50vh] items-center justify-center px-4">
            <p class="max-w-lg text-center font-semibold text-red-600">
                {{ error }}
            </p>
        </div>

        <LegalLayout v-else-if="pageData" :page-data="pageData" />
    </main>
</template>

<style>
@media print {
    @page {
        margin: 18mm;
    }

    body {
        background: #ffffff !important;
        color: #000000 !important;
        font-size: 11pt !important;
    }

    nav,
    header,
    footer,
    button,
    .print\:hidden {
        display: none !important;
    }

    main,
    section,
    article,
    div {
        box-shadow: none !important;
    }

    article {
        break-inside: avoid;
        page-break-inside: avoid;
    }

    h1,
    h2,
    h3 {
        color: #000000 !important;
        break-after: avoid;
    }

    p,
    li {
        color: #222222 !important;
        font-size: 11pt !important;
        line-height: 1.6 !important;
    }

    a {
        color: #000000 !important;
        text-decoration: none !important;
    }
}
</style>
