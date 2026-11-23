<script setup>
import { Download, Eye, CalendarDays, MapPin, Droplet } from 'lucide-vue-next'

defineProps({
    certificates: {
        type: Array,
        default: () => [],
    },
    downloadingId: {
        type: String,
        default: '',
    },
})

defineEmits(['preview', 'download'])

function formatDate(value) {
    return new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}
</script>

<template>
    <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
                <h3 class="text-lg font-bold text-slate-900">Your Certificates</h3>
                <p class="text-sm font-medium text-slate-600">
                    {{ certificates.length }} donation record(s) found
                </p>
            </div>
        </div>

        <div v-for="certificate in certificates" :key="certificate.certificateId"
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p class="text-xs font-bold uppercase tracking-wide text-slate-500">
                        {{ certificate.certificateId }}
                    </p>
                    <h4 class="mt-1 text-base font-bold text-slate-900">
                        {{ certificate.campName }}
                    </h4>
                </div>

                <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    Verified Record
                </span>
            </div>

            <div class="mt-4 grid gap-3 sm:grid-cols-3">
                <div class="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CalendarDays class="h-4 w-4 text-[#E80E0E]" />
                    {{ formatDate(certificate.donationDate) }}
                </div>

                <div class="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Droplet class="h-4 w-4 text-[#E80E0E]" />
                    {{ certificate.bloodGroup }}
                </div>

                <div class="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin class="h-4 w-4 text-[#E80E0E]" />
                    {{ certificate.location }}
                </div>
            </div>

            <div class="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                <button type="button"
                    class="inline-flex items-center gap-2 rounded-xl bg-[#E80E0E] px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
                    :disabled="downloadingId === certificate.certificateId" @click="$emit('download', certificate)">
                    <Download class="h-4 w-4" />
                    {{ downloadingId === certificate.certificateId ? 'Preparing...' : 'Download PDF' }}
                </button>

                <button type="button"
                    class="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-[#E80E0E] hover:text-[#E80E0E]"
                    @click="$emit('preview', certificate)">
                    <Eye class="h-4 w-4" />
                    Preview
                </button>
            </div>
        </div>
    </div>
</template>