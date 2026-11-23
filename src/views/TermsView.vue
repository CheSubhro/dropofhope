
<script setup>
import { ref, onMounted } from 'vue'
import LegalLayout from '@/components/legal/LegalLayout.vue'
import { getTermsPageData } from '@/services/contentService'

const pageData = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
    try {
        pageData.value = await getTermsPageData()
    } catch (err) {
        console.error('Failed to load terms and conditions:', err)
        error.value = 'Unable to load Terms & Conditions. Please try again later.'
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
                    Loading Terms & Conditions...
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
