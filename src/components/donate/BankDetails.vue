<script setup>
import { useCopy } from '@/composables/useCopy'
import { Check, Copy, Landmark } from 'lucide-vue-next'

defineProps({
    bank: {
        type: Object,
        required: true,
    },
})

const { copiedValue, copyText } = useCopy()

const fields = [
    { key: 'accountName', label: 'Account Holder' },
    { key: 'accountNumber', label: 'Account Number' },
    { key: 'ifsc', label: 'IFSC Code' },
    { key: 'bankName', label: 'Bank Name' },
    { key: 'branch', label: 'Branch' },
]
</script>

<template>
    <section class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                <Landmark :size="23" />
            </div>

            <div>
                <h2 class="text-xl font-bold text-gray-900">
                    Bank Transfer
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                    Alternative way to support our mission.
                </p>
            </div>
        </div>

        <div class="mt-6 divide-y divide-gray-100">
            <div v-for="field in fields" :key="field.key" class="flex items-center justify-between gap-3 py-4">
                <div class="min-w-0">
                    <p class="text-xs font-medium uppercase tracking-wider text-gray-400">
                        {{ field.label }}
                    </p>

                    <p class="mt-1 break-all text-sm font-semibold text-gray-800">
                        {{ bank[field.key] || 'Not provided' }}
                    </p>
                </div>

                <button v-if="bank[field.key]" type="button" @click="copyText(bank[field.key], field.key)"
                    class="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#E80E0E]">
                    <Check v-if="copiedValue === field.key" :size="15" />
                    <Copy v-else :size="15" />
                    {{ copiedValue === field.key ? 'Copied' : 'Copy' }}
                </button>
            </div>
        </div>

        <p class="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            Please verify the account holder name and bank details before making a transfer. Submit your transaction
            reference after payment.
        </p>
    </section>
</template>