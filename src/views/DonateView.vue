<script setup>
import { computed, ref, watch } from 'vue'
import {
    HeartHandshake,
    ShieldCheck,
    ChevronDown,
} from 'lucide-vue-next'

import { getDonatePageData } from '@/services/contentService'
import { useAsyncData } from '@/composables/useAsyncData'

import AmountPicker from '@/components/donate/AmountPicker.vue'
import UpiQrCard from '@/components/donate/UpiQrCard.vue'
import DonationConfirmForm from '@/components/donate/DonationConfirmForm.vue'
import BankDetails from '@/components/donate/BankDetails.vue'
import FundUsage from '@/components/donate/FundUsage.vue'
import CtaBanner from '@/components/about/CtaBanner.vue'

const {
    data: donate,
    loading,
    error,
    reload,
} = useAsyncData(getDonatePageData)

const selectedAmount = ref(500)
const donorName = ref('')
const anonymousDonation = ref(false)
const openFaq = ref(0)

const faqs = computed(() => donate.value?.faqs || [])

watch(anonymousDonation, (isAnonymous) => {
    if (isAnonymous) {
        donorName.value = ''
    }
})
</script>

<template>
    <main>
        <!-- Loading -->
        <div v-if="loading" class="flex min-h-[60vh] items-center justify-center">
            <div class="text-center">
                <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-[#E80E0E]"></div>
                <p class="mt-4 text-sm text-gray-500">Loading donation information...</p>
            </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="mx-auto max-w-2xl px-5 py-24 text-center">
            <p class="font-semibold text-gray-800">
                Unable to load donation information.
            </p>

            <button type="button" @click="reload" class="mt-5 rounded-xl bg-[#E80E0E] px-6 py-3 font-semibold text-white">
                Try Again
            </button>
        </div>

        <template v-else-if="donate">
            <!-- Hero -->
            <section class="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-100 py-20 md:py-28">
                <div class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-200/30 blur-3xl"></div>
                <div class="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-red-200/20 blur-3xl"></div>

                <div class="relative mx-auto max-w-7xl px-5 text-center">
                    <span class="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-[#E80E0E]">
                        {{ donate.hero.eyebrow }}
                    </span>

                    <h1 class="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                        {{ donate.hero.title }}
                    </h1>

                    <p class="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
                        {{ donate.hero.subtitle }}
                    </p>

                    <div class="mt-8 flex items-center justify-center gap-2 text-sm">
                        <RouterLink to="/" class="text-gray-500 transition hover:text-[#E80E0E]">
                            Home
                        </RouterLink>

                        <span class="text-gray-400">/</span>

                        <span class="font-semibold text-[#E80E0E]">
                            Donate
                        </span>
                    </div>
                </div>
            </section>

            <!-- Donation Area -->
            <section class="bg-gray-50 py-16 md:py-20">
                <div class="mx-auto max-w-7xl px-5">
                    <div class="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
                        <!-- Left: Amount Selection -->
                        <div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                            <div class="mb-7 flex items-center gap-3">
                                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                                    <HeartHandshake :size="24" />
                                </div>

                                <div>
                                    <h2 class="text-xl font-bold text-gray-900">
                                        Make a Donation
                                    </h2>

                                    <p class="mt-1 text-sm text-gray-500">
                                        Choose an amount that feels right for you.
                                    </p>
                                </div>
                            </div>

                            <AmountPicker :amounts="donate.amounts" v-model="selectedAmount" />

                            <div class="mt-7 border-t border-gray-100 pt-6">
                                <label class="mb-2 block text-sm font-semibold text-gray-700">
                                    Donor Name
                                    <span class="font-normal text-gray-400">(Optional)</span>
                                </label>

                                <input v-model="donorName" :disabled="anonymousDonation" type="text"
                                    placeholder="Enter your name"
                                    class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E80E0E] disabled:bg-gray-100" />

                                <label class="mt-4 flex cursor-pointer items-center gap-3">
                                    <input v-model="anonymousDonation" type="checkbox"
                                        class="h-4 w-4 rounded border-gray-300 accent-[#E80E0E]" />

                                    <span class="text-sm text-gray-600">
                                        Make my donation anonymous
                                    </span>
                                </label>
                            </div>
                        </div>

                        <!-- Right: UPI QR -->
                        <UpiQrCard :upi="donate.upi" :amount="selectedAmount" />
                    </div>

                    <div class="mx-auto mt-10 max-w-3xl rounded-2xl border border-red-100 bg-white p-5 text-center sm:p-7">
                        <ShieldCheck class="mx-auto text-[#E80E0E]" :size="30" />

                        <h3 class="mt-3 font-bold text-gray-900">
                            Your Support Matters
                        </h3>

                        <p class="mt-2 text-sm leading-6 text-gray-500">
                            Please verify the UPI recipient name and amount in your payment app before completing the
                            transaction.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Donation Confirmation -->
            <section class="bg-white py-16 md:py-20">
                <div class="mx-auto max-w-4xl px-5">
                    <DonationConfirmForm :selected-amount="selectedAmount" />
                </div>
            </section>

            <!-- Bank Transfer -->
            <section class="bg-gray-50 py-16 md:py-20">
                <div class="mx-auto max-w-3xl px-5">
                    <BankDetails :bank="donate.bank" />
                </div>
            </section>

            <!-- Fund Usage -->
            <section class="bg-white py-16 md:py-20">
                <div class="mx-auto max-w-7xl px-5">
                    <FundUsage :items="donate.fundUsage" />
                </div>
            </section>

            <!-- Trust -->
            <section class="bg-gray-50 py-16 md:py-20">
                <div class="mx-auto max-w-7xl px-5">
                    <div class="mx-auto max-w-2xl text-center">
                        <div
                            class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#E80E0E]">
                            <ShieldCheck :size="28" />
                        </div>

                        <h2 class="mt-5 text-3xl font-bold text-gray-900">
                            Your Trust Matters to Us
                        </h2>

                        <p class="mt-3 leading-7 text-gray-500">
                            We value every contribution and are committed to handling donation information responsibly.
                        </p>
                    </div>

                    <div class="mt-10 grid gap-5 sm:grid-cols-3">
                        <div v-for="item in donate.trust.impact" :key="item.label"
                            class="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                            <p class="text-3xl font-bold text-[#E80E0E]">
                                {{ item.value }}
                            </p>

                            <p class="mt-2 text-sm font-medium text-gray-500">
                                {{ item.label }}
                            </p>
                        </div>
                    </div>

                    <div class="mx-auto mt-8 max-w-2xl rounded-xl border border-gray-200 bg-white p-5 text-center">
                        <p class="text-sm text-gray-500">
                            <span class="font-semibold text-gray-800">
                                Organisation Registration:
                            </span>
                            {{ donate.trust.registrationNumber }}
                        </p>

                        <p v-if="donate.trust.taxExemption" class="mt-2 text-sm text-gray-500">
                            {{ donate.trust.taxExemption }}
                        </p>

                        <RouterLink :to="donate.trust.privacyUrl"
                            class="mt-4 inline-block text-sm font-semibold text-[#E80E0E] hover:underline">
                            Read our Privacy Policy
                        </RouterLink>
                    </div>
                </div>
            </section>

            <!-- FAQ -->
            <section class="bg-white py-16 md:py-20">
                <div class="mx-auto max-w-3xl px-5">
                    <div class="text-center">
                        <span class="text-sm font-semibold uppercase tracking-wider text-[#E80E0E]">
                            Need to know more?
                        </span>

                        <h2 class="mt-3 text-3xl font-bold text-gray-900">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div class="mt-10 space-y-3">
                        <article v-for="(faq, index) in faqs" :key="faq.question"
                            class="overflow-hidden rounded-xl border border-gray-200">
                            <button type="button" @click="openFaq = openFaq === index ? -1 : index"
                                class="flex w-full items-center justify-between gap-4 p-5 text-left"
                                :aria-expanded="openFaq === index">
                                <span class="font-semibold text-gray-900">
                                    {{ faq.question }}
                                </span>

                                <ChevronDown :size="20" class="shrink-0 text-[#E80E0E] transition-transform"
                                    :class="openFaq === index ? 'rotate-180' : ''" />
                            </button>

                            <div v-if="openFaq === index" class="border-t border-gray-100 px-5 pb-5 pt-4">
                                <p class="text-sm leading-7 text-gray-600">
                                    {{ faq.answer }}
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <CtaBanner :data="donate.cta" />
        </template>
    </main>
</template>