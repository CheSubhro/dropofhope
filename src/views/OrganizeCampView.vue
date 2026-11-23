<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
    CalendarDays,
    Droplet,
    Users,
    MapPinned,
    ChevronRight,
    ChevronDown,
    Heart,
    ArrowRight,
    MessageCircle,
} from 'lucide-vue-next'

import { getOrganizePageData } from '@/services/contentService'

import OrganizeHero from '@/components/organize/OrganizeHero.vue'
import WhyOrganize from '@/components/organize/WhyOrganize.vue'
import WhoCanOrganize from '@/components/organize/WhoCanOrganize.vue'
import ProcessTimeline from '@/components/organize/ProcessTimeline.vue'
import WeProvideYouProvide from '@/components/organize/WeProvideYouProvide.vue'
import VenueChecklist from '@/components/organize/VenueChecklist.vue'
import PromotionKit from '@/components/organize/PromotionKit.vue'
import SuccessStories from '@/components/organize/SuccessStories.vue'

const pageData = ref(null)
const loading = ref(true)
const error = ref('')

const impactIcons = {
    CalendarDays,
    Droplet,
    Users,
    MapPinned,
}

onMounted(async () => {
    try {
        pageData.value = await getOrganizePageData()
    } catch {
        error.value = 'Unable to load page content. Please refresh the page.'
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <main>
        <div v-if="loading" class="grid min-h-[60vh] place-items-center">
            <div class="text-center">
                <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-[#E80E0E]"></div>
                <p class="mt-4 text-sm font-semibold text-slate-600">
                    Loading camp information...
                </p>
            </div>
        </div>

        <div v-else-if="error" class="mx-auto max-w-xl px-4 py-24 text-center">
            <p class="font-semibold text-red-600">{{ error }}</p>
            <button type="button" class="mt-4 rounded-xl bg-[#E80E0E] px-5 py-3 text-sm font-bold text-white"
                @click="$router.go(0)">
                Try Again
            </button>
        </div>

        <template v-else-if="pageData">
            <!-- Hero -->
            <OrganizeHero :hero="pageData.hero" />

            <!-- Why Organize -->
            <WhyOrganize :items="pageData.whyOrganize" />

            <!-- Who Can Organize -->
            <WhoCanOrganize :items="pageData.whoCanOrganize" />

            <!-- Process Timeline -->
            <ProcessTimeline :steps="pageData.steps" />

            <!-- Responsibilities -->
            <WeProvideYouProvide :we-provide="pageData.weProvide" :you-provide="pageData.youProvide" />

            <!-- Venue Checklist -->
            <VenueChecklist :items="pageData.venueChecklist" />

            <!-- Promotion Kit -->
            <PromotionKit :items="pageData.promoKit" />

            <!-- Success Stories -->
            <SuccessStories :stories="pageData.stories" />

            <!-- Impact Section -->
            <section class="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
                <div class="mx-auto max-w-7xl">
                    <div class="mx-auto mb-10 max-w-2xl text-center">
                        <span class="text-xs font-bold uppercase tracking-widest text-red-400">
                            Our Community Impact
                        </span>
                        <h2 class="mt-3 text-3xl font-bold">
                            Together, We Make an Impact
                        </h2>
                        <p class="mt-3 text-sm font-medium leading-6 text-slate-300">
                            Every volunteer, organizer and donor contributes to building a stronger donation community.
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-5 lg:grid-cols-4">
                        <div v-for="item in pageData.impact" :key="item.label"
                            class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                            <component :is="impactIcons[item.icon]" v-if="impactIcons[item.icon]"
                                class="mx-auto h-7 w-7 text-red-400" />
                            <h3 class="mt-4 text-2xl font-bold sm:text-3xl">
                                {{ item.number }}
                            </h3>
                            <p class="mt-2 text-xs font-semibold text-slate-300 sm:text-sm">
                                {{ item.label }}
                            </p>
                        </div>
                    </div>
                    <p class="mt-5 text-center text-xs font-medium text-slate-400">
                        Replace demo figures with verified organization statistics before publishing.
                    </p>
                </div>
            </section>

            <!-- FAQ -->
            <section class="bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-4xl">
                    <div class="mb-10 text-center">
                        <span class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                            Have Questions?
                        </span>
                        <h2 class="mt-3 text-3xl font-bold text-slate-900">
                            Frequently Asked Questions
                        </h2>
                        <p class="mt-3 text-sm font-medium text-slate-600">
                            Find answers to common questions about organizing a blood donation camp.
                        </p>
                    </div>

                    <div class="space-y-3">
                        <details v-for="(faq, index) in pageData.faq" :key="index"
                            class="group rounded-xl border border-slate-200 bg-white p-5">
                            <summary class="cursor-pointer list-none">
                                <span class="flex items-center justify-between gap-4">
                                    <span class="text-sm font-bold text-slate-800 sm:text-base">
                                        {{ faq.question }}
                                    </span>
                                    <ChevronDown class="h-5 w-5 shrink-0 text-[#E80E0E] transition group-open:rotate-180" />
                                </span>
                            </summary>

                            <p class="mt-4 border-t border-slate-100 pt-4 text-sm font-medium leading-7 text-slate-600">
                                {{ faq.answer }}
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            <!-- Final CTA -->
            <section
                class="relative overflow-hidden bg-gradient-to-br from-red-700 via-[#E80E0E] to-rose-800 px-4 py-16 text-white sm:px-6 lg:px-8">
                <div class="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-white/10"></div>

                <div class="relative mx-auto max-w-4xl text-center">
                    <Heart class="mx-auto h-10 w-10 fill-white/10" />

                    <h2 class="mt-5 text-3xl font-bold sm:text-4xl">
                        {{ pageData.cta.title }}
                    </h2>

                    <p class="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-red-50 sm:text-base">
                        {{ pageData.cta.subtitle }}
                    </p>

                    <div class="mt-8 flex flex-wrap justify-center gap-3">
                        <RouterLink to="/camp-registration"
                            class="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#E80E0E] shadow-lg transition hover:bg-red-50">
                            Apply Now
                            <ArrowRight class="h-4 w-4" />
                        </RouterLink>

                        <RouterLink to="/contact"
                            class="inline-flex items-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
                            <MessageCircle class="h-4 w-4" />
                            Contact Us
                        </RouterLink>
                    </div>
                </div>
            </section>

            <!-- Sticky Mobile Apply Button -->
            <div
                class="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-5px_20px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
                <RouterLink to="/camp-registration"
                    class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E80E0E] px-5 py-3.5 text-sm font-bold text-white">
                    Organize a Camp - Apply Now
                    <ArrowRight class="h-4 w-4" />
                </RouterLink>
            </div>

            <!-- Mobile sticky button spacing -->
            <div class="h-20 md:hidden"></div>
        </template>
    </main>
</template>