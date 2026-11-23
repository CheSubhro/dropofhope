
<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
    Heart,
    ChevronRight,
    ChevronDown,
    Users,
    ShieldCheck,
    Clock,
    ArrowRight,
} from 'lucide-vue-next'

import { getMemberPageData } from '@/services/contentService'
import MemberBenefits from '@/components/member/MemberBenefits.vue'
import MembershipTypes from '@/components/member/MembershipTypes.vue'
import MemberForm from '@/components/member/MemberForm.vue'

const pageData = ref(null)
const loading = ref(true)
const error = ref('')
const selectedType = ref('')

onMounted(async () => {
    try {
        pageData.value = await getMemberPageData()
    } catch (err) {
        error.value = 'Unable to load membership information. Please try again.'
    } finally {
        loading.value = false
    }
})

const selectMembership = (type) => {
    selectedType.value = type

    document.getElementById('member-application')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    })
}
</script>

<template>
    <main>
        <section class="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-28">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-red-950/80"></div>

            <div class="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"></div>
            <div class="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"></div>

            <div class="relative mx-auto max-w-7xl px-5">
                <div class="max-w-3xl">
                    <div
                        class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-200">
                        <Heart :size="15" />
                        Become a Part of Our Mission
                    </div>

                    <h1 class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        {{ pageData?.hero.title || 'Join as a Member' }}
                    </h1>

                    <p class="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-200 sm:text-lg">
                        {{ pageData?.hero.subtitle }}
                    </p>

                    <div class="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-300">
                        <RouterLink to="/" class="transition hover:text-white">
                            Home
                        </RouterLink>

                        <ChevronRight :size="16" />

                        <span class="text-white">Join as a Member</span>
                    </div>
                </div>
            </div>
        </section>

        <div v-if="loading" class="flex min-h-80 items-center justify-center">
            <div class="text-center">
                <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-[#E80E0E]"></div>
                <p class="mt-4 text-sm font-semibold text-slate-600">
                    Loading membership information...
                </p>
            </div>
        </div>

        <div v-else-if="error" class="mx-auto max-w-3xl px-5 py-20 text-center">
            <p class="font-semibold text-red-700">{{ error }}</p>
        </div>

        <template v-else-if="pageData">
            <MemberBenefits :benefits="pageData.benefits" />

            <MembershipTypes :types="pageData.membershipTypes" :selected-type="selectedType" @select="selectMembership" />

            <section class="bg-white py-10">
                <div class="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-3">
                    <div class="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div
                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                            <ShieldCheck :size="25" />
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900">Free Membership</h3>
                            <p class="mt-1 text-sm font-medium text-slate-600">
                                No membership fee currently
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div
                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                            <Users :size="25" />
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900">18+ Applicants</h3>
                            <p class="mt-1 text-sm font-medium text-slate-600">
                                Open to adults aged 18 and above
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div
                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <Clock :size="25" />
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900">Flexible Time</h3>
                            <p class="mt-1 text-sm font-medium text-slate-600">
                                Choose your weekly availability
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <MemberForm :data="pageData" :selected-type="selectedType" @type-change="selectedType = $event" />

            <section class="bg-slate-50 py-16 sm:py-20">
                <div class="mx-auto max-w-4xl px-5">
                    <div class="mx-auto mb-10 max-w-2xl text-center">
                        <span class="text-sm font-bold uppercase tracking-wider text-[#E80E0E]">
                            Frequently Asked Questions
                        </span>

                        <h2 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Membership FAQs
                        </h2>

                        <p class="mt-4 text-base font-medium leading-7 text-slate-700">
                            Find answers to common questions about becoming a member.
                        </p>
                    </div>

                    <div class="space-y-4">
                        <details v-for="(faq, index) in pageData.faqs" :key="index"
                            class="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <summary
                                class="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-slate-900">
                                <span>{{ faq.question }}</span>

                                <ChevronDown :size="20"
                                    class="shrink-0 text-[#E80E0E] transition-transform group-open:rotate-180" />
                            </summary>

                            <p class="mt-4 border-t border-slate-100 pt-4 text-sm font-medium leading-7 text-slate-700">
                                {{ faq.answer }}
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            <section class="bg-white py-16 sm:py-20">
                <div class="mx-auto max-w-5xl px-5">
                    <div
                        class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 to-[#E80E0E] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
                        <div class="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10"></div>
                        <div class="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-black/10"></div>

                        <div class="relative">
                            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                                <Heart :size="28" />
                            </div>

                            <h2 class="mt-5 text-3xl font-bold sm:text-4xl">
                                Want to Donate Blood?
                            </h2>

                            <p class="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-red-50 sm:text-base">
                                You can also make a direct difference by registering as a
                                blood donor and helping someone in need.
                            </p>

                            <RouterLink to="/donate"
                                class="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#E80E0E] shadow-sm transition hover:bg-red-50">
                                Become a Donor
                                <ArrowRight :size="18" />
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </main>
</template>
