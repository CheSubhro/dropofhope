<script setup>
import { ref } from 'vue'
import { Search, ShieldCheck, ShieldAlert, LoaderCircle } from 'lucide-vue-next'
import { verifyCertificate } from '@/services/contentService'

const certificateId = ref('')
const loading = ref(false)
const result = ref(null)
const error = ref('')

async function verify() {
    error.value = ''
    result.value = null

    if (!certificateId.value.trim()) {
        error.value = 'Please enter a certificate number.'
        return
    }

    loading.value = true

    try {
        result.value = await verifyCertificate(certificateId.value)
    } catch {
        error.value = 'Unable to verify this certificate. Please try again.'
    } finally {
        loading.value = false
    }
}

function formatDate(value) {
    return new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}
</script>

<template>
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div class="mb-5 flex items-center gap-3">
            <div class="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <ShieldCheck class="h-6 w-6" />
            </div>
            <div>
                <h3 class="text-lg font-bold text-slate-900">Verify a Certificate</h3>
                <p class="text-sm font-medium text-slate-600">
                    Check the authenticity of a Drop Of Hope certificate.
                </p>
            </div>
        </div>

        <form class="flex flex-col gap-3 sm:flex-row" @submit.prevent="verify">
            <input v-model="certificateId" class="form-input flex-1" placeholder="Example: CERT-2026-000123" />

            <button type="submit" :disabled="loading"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-60">
                <LoaderCircle v-if="loading" class="h-4 w-4 animate-spin" />
                <Search v-else class="h-4 w-4" />
                {{ loading ? 'Checking...' : 'Verify' }}
            </button>
        </form>

        <p v-if="error" class="mt-4 text-sm font-semibold text-red-600">
            {{ error }}
        </p>

        <div v-if="result?.valid" class="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <div class="flex items-center gap-2 text-emerald-700">
                <ShieldCheck class="h-5 w-5" />
                <strong class="text-sm">Certificate is valid</strong>
            </div>

            <div class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <p class="text-slate-600">
                    Certificate holder:
                    <strong class="block text-slate-900">{{ result.certificate.donorName }}</strong>
                </p>
                <p class="text-slate-600">
                    Donation date:
                    <strong class="block text-slate-900">
                        {{ formatDate(result.certificate.donationDate) }}
                    </strong>
                </p>
                <p class="text-slate-600">
                    Certificate number:
                    <strong class="block text-slate-900">{{ result.certificate.certificateId }}</strong>
                </p>
                <p class="text-slate-600">
                    Blood group:
                    <strong class="block text-slate-900">{{ result.certificate.bloodGroup }}</strong>
                </p>
            </div>
        </div>

        <div v-else-if="result && !result.valid"
            class="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <ShieldAlert class="mt-0.5 h-5 w-5 shrink-0" />
            <div>
                <strong class="text-sm">Certificate not found</strong>
                <p class="mt-1 text-sm">
                    We could not find a matching certificate. Please check the certificate number.
                </p>
            </div>
        </div>
    </div>
</template>