
<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import {
    getRequestPageData,
} from '../services/contentService'

import EmergencyNotice from '../components/request/EmergencyNotice.vue'
import RequestForm from '../components/request/RequestForm.vue'
import BloodCompatibility from '../components/request/BloodCompatibility.vue'
import OpenRequests from '../components/request/OpenRequests.vue'

const pageData = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
    try {
        pageData.value = await getRequestPageData()
    } catch (err) {
        error.value = err.message || 'Unable to load request page.'
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <main class="min-h-screen bg-slate-50">

        <!-- Loading -->

        <div v-if="loading" class="flex min-h-[60vh] items-center justify-center">
            <div class="h-12 w-12 animate-spin rounded-full border-4 border-red-100 border-t-red-600"></div>
        </div>

        <!-- Error -->

        <div v-else-if="error" class="mx-auto max-w-7xl px-4 py-20 text-center">
            <p class="font-semibold text-red-700">{{ error }}</p>
        </div>

        <template v-else-if="pageData">

            <!-- Hero Banner -->

            <section class="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-rose-500">
                <div class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
                <div class="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-red-900/20 blur-3xl"></div>

                <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

                    <div class="mb-7 flex items-center gap-2 text-sm font-semibold text-white/90">
                        <RouterLink to="/" class="transition hover:text-white">
                            Home
                        </RouterLink>

                        <span>/</span>

                        <span class="text-white">
                            Request Blood
                        </span>
                    </div>

                    <div class="max-w-3xl">

                        <span
                            class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                            <span class="h-2 w-2 animate-pulse rounded-full bg-white"></span>
                            {{ pageData.hero.eyebrow }}
                        </span>

                        <h1
                            class="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {{ pageData.hero.title }}
                        </h1>

                        <p class="mt-5 max-w-2xl text-base font-medium leading-8 text-white sm:text-lg">
                            {{ pageData.hero.subtitle }}
                        </p>

                        <div class="mt-8 flex flex-col gap-3 sm:flex-row">

                            <a href="#request-form"
                                class="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-red-700 shadow-lg transition hover:bg-red-50">
                                Request Blood Now
                            </a>

                            <a :href="`tel:${pageData.helpline.number}`"
                                class="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20">
                                Call Helpline
                            </a>

                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Content -->

            <div class="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">

                <!-- Emergency Notice -->

                <EmergencyNotice :helpline="pageData.helpline" />

                <!-- Request Form -->

                <RequestForm :data="pageData" />

                <!-- How It Works -->

                <section class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">

                    <div class="mb-8 text-center">
                        <span class="text-sm font-bold uppercase tracking-wider text-red-600">
                            Simple Process
                        </span>

                        <h2 class="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                            How It Works
                        </h2>

                        <p class="mt-2 text-sm font-medium text-slate-700">
                            Four simple steps to connect with potential blood donors.
                        </p>
                    </div>

                    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        <div v-for="step in pageData.steps" :key="step.id"
                            class="relative rounded-xl bg-slate-50 p-6 text-center">
                            <div
                                class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-lg font-extrabold text-white">
                                {{ step.id }}
                            </div>

                            <h3 class="mt-4 font-bold text-slate-900">
                                {{ step.title }}
                            </h3>

                            <p class="mt-2 text-sm font-medium leading-7 text-slate-700">
                                {{ step.text }}
                            </p>
                        </div>

                    </div>
                </section>

                <!-- Compatibility -->

                <BloodCompatibility :compatibility="pageData.compatibility" />

                <!-- Open Requests -->

                <OpenRequests :requests="pageData.openRequests.filter(item => item.status === 'approved')" />

                <!-- FAQ -->

                <section class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">

                    <div class="mb-7">
                        <span class="text-sm font-bold uppercase tracking-wider text-red-600">
                            Need Help?
                        </span>

                        <h2 class="mt-2 text-2xl font-bold text-slate-900">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div class="space-y-3">

                        <details v-for="item in pageData.faq" :key="item.id"
                            class="group rounded-xl border border-slate-200 p-5 open:border-red-200 open:bg-red-50/30">
                            <summary
                                class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">
                                {{ item.q }}

                                <span class="text-xl font-bold text-red-600 transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>

                            <p class="mt-4 border-t border-slate-200 pt-4 text-sm font-medium leading-7 text-slate-700">
                                {{ item.a }}
                            </p>
                        </details>

                    </div>
                </section>

                <!-- Medical Disclaimer -->

                <div class="rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <h3 class="font-bold text-amber-900">
                        Medical Disclaimer
                    </h3>

                    <p class="mt-2 text-sm font-medium leading-7 text-amber-900">
                        Drop Of Hope is a platform that connects potential donors with people seeking blood. We do not
                        collect, store, test or supply blood through this website. All blood grouping, screening,
                        compatibility testing, crossmatching and transfusion decisions must be handled by authorised blood
                        banks and qualified medical professionals.
                    </p>
                </div>

            </div>
        </template>
    </main>
</template>
