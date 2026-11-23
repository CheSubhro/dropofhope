
<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
    Heart,
    Droplet,
    ShieldCheck,
    Users,
    Search,
    ArrowRight,
    AlertTriangle,
    Stethoscope,
    UserPlus,
} from 'lucide-vue-next'

import { getDoctorPageData } from '@/services/contentService'
import DoctorFilters from '@/components/doctor/DoctorFilters.vue'
import DoctorCard from '@/components/doctor/DoctorCard.vue'
import DoctorModal from '@/components/doctor/DoctorModal.vue'
import DoctorJoinForm from '@/components/doctor/DoctorJoinForm.vue'

const pageData = ref(null)
const loading = ref(true)
const error = ref('')

const selectedDoctor = ref(null)
const modalOpen = ref(false)

const visibleCount = ref(9)

const filters = ref({
    search: '',
    specialty: '',
    district: '',
    language: '',
    gender: '',
})

onMounted(async () => {
    try {
        pageData.value = await getDoctorPageData()
    } catch (err) {
        error.value = 'Unable to load doctor information. Please try again.'
    } finally {
        loading.value = false
    }
})

const filteredDoctors = computed(() => {
    if (!pageData.value) return []

    const searchTerm = filters.value.search.trim().toLowerCase()

    return pageData.value.doctors.filter((doctor) => {
        const matchesSearch =
            !searchTerm ||
            doctor.name.toLowerCase().includes(searchTerm) ||
            doctor.hospital.toLowerCase().includes(searchTerm) ||
            doctor.specialty.toLowerCase().includes(searchTerm)

        const matchesSpecialty =
            !filters.value.specialty ||
            doctor.specialty === filters.value.specialty

        const matchesDistrict =
            !filters.value.district ||
            doctor.district === filters.value.district

        const matchesLanguage =
            !filters.value.language ||
            doctor.languages.includes(filters.value.language)

        const matchesGender =
            !filters.value.gender ||
            doctor.gender === filters.value.gender

        return (
            matchesSearch &&
            matchesSpecialty &&
            matchesDistrict &&
            matchesLanguage &&
            matchesGender
        )
    })
})

const visibleDoctors = computed(() => {
    return filteredDoctors.value.slice(0, visibleCount.value)
})

const hematologists = computed(() => {
    if (!pageData.value) return []

    return pageData.value.doctors.filter(
        (doctor) => doctor.specialty === 'Hematologist',
    )
})

const hasMore = computed(() => {
    return visibleCount.value < filteredDoctors.value.length
})

const clearFilters = () => {
    filters.value = {
        search: '',
        specialty: '',
        district: '',
        language: '',
        gender: '',
    }

    visibleCount.value = 9
}

const updateFilters = (value) => {
    filters.value = value
    visibleCount.value = 9
}

const loadMore = () => {
    visibleCount.value += 9
}

const openDoctor = (doctor) => {
    selectedDoctor.value = doctor
    modalOpen.value = true
}

const closeDoctor = () => {
    modalOpen.value = false
    selectedDoctor.value = null
}
</script>

<template>
    <main>
        <section class="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-28">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-red-950/80"></div>

            <div class="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"></div>
            <div class="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"></div>

            <div class="relative mx-auto max-w-7xl px-5">
                <div class="max-w-3xl">
                    <div
                        class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-200">
                        <Stethoscope :size="16" />
                        Doctor Directory
                    </div>

                    <h1 class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        {{ pageData?.hero.title || 'Find a Doctor' }}
                    </h1>

                    <p class="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-200 sm:text-lg">
                        {{ pageData?.hero.subtitle }}
                    </p>

                    <div class="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-300">
                        <RouterLink to="/" class="transition hover:text-white">
                            Home
                        </RouterLink>

                        <span>/</span>
                        <span class="text-white">Find a Doctor</span>
                    </div>
                </div>
            </div>
        </section>

        <div v-if="loading" class="flex min-h-80 items-center justify-center">
            <div class="text-center">
                <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-[#E80E0E]"></div>
                <p class="mt-4 text-sm font-semibold text-slate-600">
                    Loading doctor directory...
                </p>
            </div>
        </div>

        <div v-else-if="error" class="mx-auto max-w-3xl px-5 py-20 text-center">
            <p class="font-semibold text-red-700">{{ error }}</p>
        </div>

        <template v-else-if="pageData">
            <section class="bg-slate-50 py-12 sm:py-16">
                <div class="mx-auto max-w-7xl px-5">
                    <DoctorFilters :filters="filters" :specialties="pageData.specialties" :districts="pageData.districts"
                        :languages="pageData.languages" :genders="pageData.genders" :result-count="filteredDoctors.length"
                        @update:filters="updateFilters" @clear="clearFilters" />

                    <div class="mt-9">
                        <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
                            <div>
                                <h2 class="text-2xl font-bold text-slate-900 sm:text-3xl">
                                    Available Doctors
                                </h2>
                                <p class="mt-2 text-sm font-medium text-slate-600">
                                    Browse doctor profiles and confirm details before visiting.
                                </p>
                            </div>

                            <span class="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-[#E80E0E]">
                                {{ filteredDoctors.length }} Results
                            </span>
                        </div>

                        <div v-if="visibleDoctors.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <DoctorCard v-for="doctor in visibleDoctors" :key="doctor.id" :doctor="doctor"
                                @view="openDoctor" />
                        </div>

                        <div v-else class="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                            <div
                                class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <Search :size="30" />
                            </div>

                            <h3 class="mt-5 text-xl font-bold text-slate-900">
                                No Doctors Found
                            </h3>

                            <p class="mt-2 text-sm font-medium text-slate-600">
                                Try changing your search or filters to find more doctors.
                            </p>

                            <button type="button" @click="clearFilters"
                                class="mt-6 rounded-xl bg-[#E80E0E] px-6 py-3 text-sm font-bold text-white hover:bg-red-700">
                                Clear Filters
                            </button>
                        </div>

                        <div v-if="hasMore" class="mt-10 text-center">
                            <button type="button" @click="loadMore"
                                class="inline-flex items-center gap-2 rounded-xl border-2 border-[#E80E0E] px-7 py-3 text-sm font-bold text-[#E80E0E] transition hover:bg-[#E80E0E] hover:text-white">
                                Load More Doctors
                                <ArrowRight :size="17" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-white py-16 sm:py-20">
                <div class="mx-auto max-w-7xl px-5">
                    <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <span class="text-sm font-bold uppercase tracking-wider text-[#E80E0E]">
                                Blood Care Specialists
                            </span>

                            <h2 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                                Hematology & Blood Care
                            </h2>

                            <p class="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-700">
                                Explore hematology profiles in the directory. Contact the
                                relevant medical facility to confirm specialist availability.
                            </p>
                        </div>

                        <div
                            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#E80E0E]">
                            <Droplet :size="30" />
                        </div>
                    </div>

                    <div v-if="hematologists.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <DoctorCard v-for="doctor in hematologists" :key="doctor.id" :doctor="doctor" @view="openDoctor" />
                    </div>

                    <div class="mt-8 rounded-2xl bg-red-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
                        <div>
                            <h3 class="text-xl font-bold text-slate-900">
                                Need Blood for a Patient?
                            </h3>
                            <p class="mt-2 text-sm font-medium leading-7 text-slate-700">
                                Visit our blood request page to submit a blood requirement.
                            </p>
                        </div>

                        <RouterLink to="/request-blood"
                            class="mt-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E80E0E] px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700 sm:mt-0">
                            Request Blood
                            <ArrowRight :size="17" />
                        </RouterLink>
                    </div>
                </div>
            </section>

            <section class="bg-slate-50 py-16 sm:py-20">
                <div class="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
                    <div>
                        <span class="text-sm font-bold uppercase tracking-wider text-[#E80E0E]">
                            For Medical Professionals
                        </span>

                        <h2 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Are You a Doctor?
                        </h2>

                        <p class="mt-4 text-base font-medium leading-8 text-slate-700">
                            Join our doctor directory and help people discover your
                            professional profile. Submit your details for verification
                            by our team.
                        </p>

                        <div class="mt-7 space-y-4">
                            <div class="flex items-start gap-3">
                                <ShieldCheck :size="21" class="mt-0.5 shrink-0 text-green-600" />
                                <p class="text-sm font-semibold leading-6 text-slate-700">
                                    Profiles are reviewed before publication.
                                </p>
                            </div>

                            <div class="flex items-start gap-3">
                                <Users :size="21" class="mt-0.5 shrink-0 text-[#E80E0E]" />
                                <p class="text-sm font-semibold leading-6 text-slate-700">
                                    Your contact details are shared only with your consent.
                                </p>
                            </div>

                            <div class="flex items-start gap-3">
                                <UserPlus :size="21" class="mt-0.5 shrink-0 text-[#E80E0E]" />
                                <p class="text-sm font-semibold leading-6 text-slate-700">
                                    Submission does not guarantee automatic listing.
                                </p>
                            </div>
                        </div>
                    </div>

                    <DoctorJoinForm :data="pageData" />
                </div>
            </section>

            <section class="bg-white py-12 sm:py-16">
                <div class="mx-auto max-w-7xl px-5">
                    <div
                        class="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:flex-row sm:items-start sm:gap-5">
                        <div
                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                            <AlertTriangle :size="25" />
                        </div>

                        <div>
                            <h3 class="text-lg font-bold text-slate-900">
                                Important Health Information
                            </h3>

                            <p class="mt-2 text-sm font-medium leading-7 text-slate-700">
                                This directory is provided for informational purposes only.
                                Drop Of Hope does not provide medical advice, recommend or
                                guarantee any doctor, or arrange appointments. Doctor
                                information, consultation fees, and schedules may change.
                                Please verify all details directly with the relevant doctor
                                or medical facility.
                            </p>

                            <p class="mt-3 text-sm font-bold leading-7 text-red-800">
                                For medical emergencies, visit the nearest hospital or call
                                the appropriate emergency service. In India, call 112 for
                                emergency assistance or 108 for ambulance service where
                                available.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-slate-950 py-14 text-white">
                <div
                    class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 text-center sm:flex-row sm:text-left">
                    <div>
                        <div class="flex items-center justify-center gap-2 text-red-300 sm:justify-start">
                            <Heart :size="20" />
                            <span class="text-sm font-bold uppercase tracking-wider">
                                Drop Of Hope
                            </span>
                        </div>

                        <h2 class="mt-3 text-2xl font-bold sm:text-3xl">
                            Together, We Can Save Lives
                        </h2>

                        <p class="mt-2 text-sm font-medium text-slate-300">
                            Register as a donor and become a part of the lifesaving mission.
                        </p>
                    </div>

                    <RouterLink to="/donate"
                        class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#E80E0E] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-red-700">
                        Become a Donor
                        <ArrowRight :size="18" />
                    </RouterLink>
                </div>
            </section>
        </template>

        <DoctorModal :doctor="selectedDoctor" :open="modalOpen" @close="closeDoctor" />
    </main>
</template>
