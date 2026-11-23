<script setup>
import { ref } from 'vue'
import { CheckCircle2, LoaderCircle, Send } from 'lucide-vue-next'
import { submitDonationConfirmation } from '@/services/contentService'

const props = defineProps({
    selectedAmount: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits(['submitted'])

const form = ref({
    name: '',
    mobile: '',
    amount: props.selectedAmount || '',
    utr: '',
    email: '',
})

const loading = ref(false)
const error = ref('')
const successMessage = ref('')

const submitForm = async () => {
    error.value = ''
    successMessage.value = ''

    if (!form.value.name.trim()) {
        error.value = 'Please enter your name.'
        return
    }

    if (!/^[6-9]\d{9}$/.test(form.value.mobile)) {
        error.value = 'Please enter a valid 10-digit mobile number.'
        return
    }

    if (!Number(form.value.amount) || Number(form.value.amount) <= 0) {
        error.value = 'Please enter a valid donation amount.'
        return
    }

    if (!form.value.utr.trim()) {
        error.value = 'Please enter your UPI transaction ID (UTR).'
        return
    }

    loading.value = true

    try {
        const response = await submitDonationConfirmation({
            ...form.value,
            amount: Number(form.value.amount),
            submittedAt: new Date().toISOString(),
        })

        successMessage.value =
            response?.message ||
            'Thank you! Our team will verify your transaction.'

        emit('submitted', response)

        form.value = {
            name: '',
            mobile: '',
            amount: props.selectedAmount || '',
            utr: '',
            email: '',
        }
    } catch (err) {
        console.error('Donation confirmation failed:', err)
        error.value = 'Unable to submit your details. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <section id="donation-confirmation" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div class="mb-6">
            <span class="text-sm font-semibold uppercase tracking-wider text-[#E80E0E]">
                Payment confirmation
            </span>

            <h2 class="mt-2 text-2xl font-bold text-gray-900">
                Have You Donated?
            </h2>

            <p class="mt-2 text-sm leading-6 text-gray-500">
                Share your transaction details so our team can verify your donation and assist with your receipt.
            </p>
        </div>

        <div v-if="successMessage"
            class="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle2 :size="20" class="mt-0.5 shrink-0" />
            <div>
                <p class="font-semibold">Details submitted successfully!</p>
                <p class="mt-1">{{ successMessage }}</p>
            </div>
        </div>

        <div v-if="error" class="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
            {{ error }}
        </div>

        <form @submit.prevent="submitForm" class="space-y-5">
            <div class="grid gap-5 sm:grid-cols-2">
                <div>
                    <label for="donor-name" class="mb-2 block text-sm font-semibold text-gray-700">
                        Full Name <span class="text-red-500">*</span>
                    </label>

                    <input id="donor-name" v-model="form.name" type="text" autocomplete="name" placeholder="Enter your name"
                        required
                        class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E80E0E]" />
                </div>

                <div>
                    <label for="donor-mobile" class="mb-2 block text-sm font-semibold text-gray-700">
                        Mobile Number <span class="text-red-500">*</span>
                    </label>

                    <input id="donor-mobile" v-model="form.mobile" type="tel" inputmode="numeric" maxlength="10"
                        autocomplete="tel" placeholder="10-digit mobile number" required
                        class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E80E0E]" />
                </div>

                <div>
                    <label for="donation-amount" class="mb-2 block text-sm font-semibold text-gray-700">
                        Donation Amount (₹) <span class="text-red-500">*</span>
                    </label>

                    <input id="donation-amount" v-model="form.amount" type="number" min="1" placeholder="Enter amount"
                        required
                        class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E80E0E]" />
                </div>

                <div>
                    <label for="donation-utr" class="mb-2 block text-sm font-semibold text-gray-700">
                        UPI Transaction ID / UTR <span class="text-red-500">*</span>
                    </label>

                    <input id="donation-utr" v-model="form.utr" type="text" placeholder="Enter transaction reference"
                        required
                        class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E80E0E]" />
                </div>
            </div>

            <div>
                <label for="donor-email" class="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address <span class="font-normal text-gray-400">(Optional)</span>
                </label>

                <input id="donor-email" v-model="form.email" type="email" autocomplete="email" placeholder="you@example.com"
                    class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E80E0E]" />
            </div>

            <button type="submit" :disabled="loading"
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E80E0E] px-6 py-4 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                <LoaderCircle v-if="loading" :size="18" class="animate-spin" />
                <Send v-else :size="18" />

                {{ loading ? 'Submitting...' : 'Submit Donation Details' }}
            </button>

            <p class="text-xs leading-5 text-gray-400">
                Submission does not automatically verify your payment. Our team will check the transaction against the bank
                statement.
            </p>
        </form>
    </section>
</template>