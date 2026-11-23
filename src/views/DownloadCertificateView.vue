<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
    Award,
    ChevronRight,
    CircleHelp,
    Download,
    Heart,
    ShieldCheck,
    AlertCircle,
} from 'lucide-vue-next'

import CertificateSearchForm from '@/components/certificate/CertificateSearchForm.vue'
import CertificateList from '@/components/certificate/CertificateList.vue'
import CertificatePreviewModal from '@/components/certificate/CertificatePreviewModal.vue'
import CertificateTemplate from '@/components/certificate/CertificateTemplate.vue'
import VerifyCertificate from '@/components/certificate/VerifyCertificate.vue'

import {
    getCertificatePageData,
    findCertificates,
} from '@/services/contentService'

import { useCertificatePdf } from '@/composables/useCertificatePdf'

const route = useRoute()
const { downloadCertificate } = useCertificatePdf()

const pageData = ref(null)
const certificates = ref([])
const hasSearched = ref(false)
const searching = ref(false)
const selectedCertificate = ref(null)
const downloadingId = ref('')
const downloadError = ref('')
const certificateElement = ref(null)

const faqs = computed(() => pageData.value?.faq || [])

onMounted(async () => {
    pageData.value = await getCertificatePageData()

    if (route.query.verify) {
        document.getElementById('certificate-verification')?.scrollIntoView({
            behavior: 'smooth',
        })
    }
})

watch(
    () => route.query.verify,
    (value) => {
        if (value) {
            document.getElementById('certificate-verification')?.scrollIntoView({
                behavior: 'smooth',
            })
        }
    },
)

async function searchCertificates(payload) {
    searching.value = true
    hasSearched.value = false
    certificates.value = []
    downloadError.value = ''

    try {
        certificates.value = await findCertificates(payload)
        hasSearched.value = true
    } catch {
        downloadError.value = 'Something went wrong. Please try again.'
    } finally {
        searching.value = false
    }
}

function previewCertificate(certificate) {
    selectedCertificate.value = certificate
}

async function handleDownload(certificate) {
    downloadingId.value = certificate.certificateId
    downloadError.value = ''

    try {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const element = certificateElement.value
        if (!element) {
            throw new Error('Certificate preview is not ready.')
        }

        await downloadCertificate(element, certificate.certificateId)
    } catch (error) {
        console.error(error)
        downloadError.value = 'Unable to generate the PDF. Please try again.'
    } finally {
        downloadingId.value = ''
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
    <main>
        <!-- Hero -->
        <section class="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
            <div class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl"></div>

            <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mb-5 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <RouterLink to="/" class="hover:text-white">Home</RouterLink>
                    <ChevronRight class="h-4 w-4" />
                    <span class="text-white">Download Certificate</span>
                </div>

                <div class="max-w-3xl">
                    <span
                        class="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-300">
                        <Award class="h-4 w-4" />
                        Donor Appreciation
                    </span>

                    <h1 class="mt-5 text-3xl font-bold sm:text-5xl">
                        {{ pageData?.hero?.title || 'Download Your Certificate' }}
                    </h1>

                    <p class="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-300 sm:text-lg">
                        {{ pageData?.hero?.subtitle }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Search -->
        <section class="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-xl">
                <div class="mb-7 text-center">
                    <div class="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-[#E80E0E]">
                        <Download class="h-7 w-7" />
                    </div>

                    <h2 class="text-2xl font-bold text-slate-900">
                        Find Your Donation Certificates
                    </h2>
                    <p class="mt-2 text-sm font-medium leading-6 text-slate-600">
                        Enter your registered details to find your donation records.
                    </p>
                </div>

                <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-8">
                    <CertificateSearchForm @search="searchCertificates" />
                </div>

                <div class="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <AlertCircle class="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                    <p class="text-xs font-medium leading-5 text-amber-900">
                        For your privacy, you must provide two matching details. Your Donor ID
                        alone cannot be used to access certificates.
                    </p>
                </div>
            </div>
        </section>

        <!-- Results -->
        <section v-if="hasSearched || searching || downloadError" class="bg-white px-4 py-12 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-4xl">
                <div v-if="searching" class="py-10 text-center">
                    <div class="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-red-100 border-t-[#E80E0E]"></div>
                    <p class="mt-4 text-sm font-semibold text-slate-600">
                        Searching your donation records...
                    </p>
                </div>

                <p v-else-if="downloadError" class="mb-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                    {{ downloadError }}
                </p>

                <CertificateList v-else-if="certificates.length" :certificates="certificates"
                    :downloading-id="downloadingId" @preview="previewCertificate" @download="handleDownload" />

                <div v-else-if="hasSearched" class="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
                    <CircleHelp class="mx-auto h-10 w-10 text-slate-400" />
                    <h3 class="mt-4 text-lg font-bold text-slate-900">
                        No Records Found
                    </h3>
                    <p class="mx-auto mt-2 max-w-lg text-sm font-medium leading-6 text-slate-600">
                        No donation record was found. Please check your Donor ID, mobile number
                        or date of birth, or contact our support team.
                    </p>
                </div>
            </div>
        </section>

        <!-- Certificate source for PDF generation -->
        <div v-if="selectedCertificate || downloadingId" class="certificate-render-area" aria-hidden="true">
            <CertificateTemplate ref="certificateElement"
                :certificate="selectedCertificate || certificates.find((item) => item.certificateId === downloadingId)"
                :org-info="pageData.orgInfo" :signatory="pageData.signatory" />
        </div>

        <!-- Preview -->
        <CertificatePreviewModal :certificate="selectedCertificate" :org-info="pageData?.orgInfo || {}"
            :signatory="pageData?.signatory || {}" @close="selectedCertificate = null" />

        <!-- Verification -->
        <section id="certificate-verification" class="scroll-mt-20 bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-3xl">
                <div class="mb-7 text-center">
                    <span class="text-xs font-bold uppercase tracking-widest text-emerald-700">
                        Certificate Authentication
                    </span>
                    <h2 class="mt-2 text-2xl font-bold text-slate-900">
                        Verify a Certificate
                    </h2>
                    <p class="mt-2 text-sm font-medium text-slate-600">
                        Check whether a certificate number exists in our records.
                    </p>
                </div>

                <VerifyCertificate />
            </div>
        </section>

        <!-- FAQ -->
        <section class="bg-white px-4 py-14 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-4xl">
                <div class="mb-8 text-center">
                    <span class="text-xs font-bold uppercase tracking-widest text-[#E80E0E]">
                        Need Help?
                    </span>
                    <h2 class="mt-2 text-2xl font-bold text-slate-900">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div class="space-y-3">
                    <details v-for="(faq, index) in faqs" :key="index"
                        class="group rounded-xl border border-slate-200 bg-white p-5">
                        <summary class="cursor-pointer list-none font-bold text-slate-800">
                            <span class="flex items-center justify-between gap-4">
                                {{ faq.question }}
                                <ChevronRight class="h-5 w-5 shrink-0 text-[#E80E0E] transition group-open:rotate-90" />
                            </span>
                        </summary>
                        <p class="mt-3 text-sm font-medium leading-6 text-slate-600">
                            {{ faq.answer }}
                        </p>
                    </details>
                </div>

                <p class="mt-7 text-center text-sm font-medium text-slate-600">
                    Still having trouble?
                    <RouterLink to="/contact" class="font-bold text-[#E80E0E] hover:underline">
                        Contact us
                    </RouterLink>
                </p>
            </div>
        </section>

        <!-- CTA -->
        <section class="bg-slate-950 px-4 py-14 text-white sm:px-6 lg:px-8">
            <div class="mx-auto max-w-5xl text-center">
                <Heart class="mx-auto h-9 w-9 text-red-500" />
                <h2 class="mt-4 text-2xl font-bold sm:text-3xl">
                    Ready for Your Next Donation?
                </h2>
                <p class="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-300">
                    Your next donation could make a life-changing difference. Join a camp
                    or register as a donor today.
                </p>

                <div class="mt-7 flex flex-wrap justify-center gap-3">
                    <RouterLink to="/camp-registration"
                        class="rounded-xl bg-[#E80E0E] px-6 py-3 text-sm font-bold text-white hover:bg-red-700">
                        Join a Camp
                    </RouterLink>

                    <RouterLink to="/donate"
                        class="rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                        Become a Donor
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.certificate-render-area {
    position: fixed;
    top: 0;
    left: -12000px;
    z-index: -1;
    width: 1122px;
    height: 794px;
    overflow: hidden;
    pointer-events: none;
}
</style>