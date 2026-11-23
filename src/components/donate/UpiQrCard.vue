<script setup>
import { computed, ref, watch } from 'vue'
import QRCode from 'qrcode'
import {
    Check,
    Copy,
    ExternalLink,
    QrCode,
    Smartphone,
} from 'lucide-vue-next'
import { useCopy } from '@/composables/useCopy'

const props = defineProps({
    upi: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        default: 500,
    },
})

const qrImage = ref('')
const qrLoading = ref(false)
const qrError = ref('')

const { copiedValue, copyText } = useCopy()

const upiLink = computed(() => {
    const params = new URLSearchParams({
        pa: props.upi.id,
        pn: props.upi.name,
        cu: props.upi.currency || 'INR',
    })

    if (props.amount > 0) {
        params.set('am', props.amount.toFixed(2))
    }

    return `upi://pay?${params.toString()}`
})

const generateQr = async () => {
    qrLoading.value = true
    qrError.value = ''

    try {
        qrImage.value = await QRCode.toDataURL(upiLink.value, {
            width: 320,
            margin: 2,
            errorCorrectionLevel: 'H',
            color: {
                dark: '#171717',
                light: '#FFFFFF',
            },
        })
    } catch (error) {
        console.error('QR generation failed:', error)
        qrError.value = 'Unable to generate QR code. Please try again.'
    } finally {
        qrLoading.value = false
    }
}

watch(upiLink, generateQr, { immediate: true })

const copyUpi = () => copyText(props.upi.id, 'upi')
</script>

<template>
    <section class="rounded-2xl border border-red-100 bg-white p-5 shadow-xl shadow-red-100/40 sm:p-7">
        <div class="text-center">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                <QrCode :size="24" />
            </div>

            <h2 class="mt-4 text-2xl font-bold text-gray-900">
                Scan & Donate
            </h2>

            <p class="mt-2 text-sm text-gray-500">
                Scan this QR code using any UPI app.
            </p>
        </div>

        <div
            class="mx-auto mt-6 flex min-h-[250px] max-w-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-red-200 bg-red-50/50 p-4">
            <div v-if="qrLoading" class="text-sm text-gray-500">
                Generating QR code...
            </div>

            <div v-else-if="qrError" class="text-center text-sm text-red-600">
                {{ qrError }}
                <button type="button" @click="generateQr" class="mt-2 block font-semibold underline">
                    Try again
                </button>
            </div>

            <img v-else-if="qrImage" :src="qrImage" alt="UPI donation QR code"
                class="h-full w-full max-w-[240px] object-contain" />
        </div>

        <div class="mt-5 rounded-xl bg-gray-50 p-4">
            <p class="text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                Selected Donation Amount
            </p>

            <p class="mt-1 text-center text-3xl font-bold text-[#E80E0E]">
                {{ amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : 'Enter an amount' }}
            </p>
        </div>

        <div class="mt-5">
            <p class="text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                UPI ID
            </p>

            <div class="mt-2 flex items-center justify-between gap-3 rounded-xl border border-gray-200 px-4 py-3">
                <span class="break-all text-sm font-semibold text-gray-800">
                    {{ upi.id }}
                </span>

                <button type="button" @click="copyUpi"
                    class="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#E80E0E]">
                    <Check v-if="copiedValue === 'upi'" :size="16" />
                    <Copy v-else :size="16" />
                    {{ copiedValue === 'upi' ? 'Copied' : 'Copy' }}
                </button>
            </div>
        </div>

        <a :href="upiLink"
            class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E80E0E] px-5 py-4 font-semibold text-white transition hover:bg-red-700">
            <Smartphone :size="19" />
            Pay with UPI App
            <ExternalLink :size="16" />
        </a>

        <div class="mt-6 space-y-3">
            <p class="text-sm font-bold text-gray-900">
                How to donate
            </p>

            <div class="flex items-start gap-3 text-sm text-gray-600">
                <span
                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-[#E80E0E]">1</span>
                Open Google Pay, PhonePe, Paytm or another UPI app.
            </div>

            <div class="flex items-start gap-3 text-sm text-gray-600">
                <span
                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-[#E80E0E]">2</span>
                Scan the QR code or use the UPI payment button.
            </div>

            <div class="flex items-start gap-3 text-sm text-gray-600">
                <span
                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-[#E80E0E]">3</span>
                Verify the recipient and amount, then complete your payment.
            </div>
        </div>

        <p class="mt-5 text-center text-xs leading-5 text-gray-400">
            Always verify the recipient's UPI ID and payment details before confirming.
        </p>
    </section>
</template>