<script setup>
import { reactive, ref } from 'vue'
import { Building2, Phone, CalendarDays, MapPin, MessageSquare, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-vue-next'
import { submitCampRegistration } from '@/services/contentService'

defineProps({
    orgTypes: { type: Array, required: true },
    districts: { type: Array, required: true },
    facilities: { type: Array, required: true },
})

const initial = () => ({
    orgName: '', orgType: '', contactName: '',
    mobile: '', whatsapp: '', email: '',
    campName: '', date: '', startTime: '', endTime: '', expectedDonors: '',
    district: '', city: '', pin: '', venue: '',
    facilities: [],
    notes: '',
    declare: false, privacy: false,
})

const form = reactive(initial())
const errors = reactive({})
const submitting = ref(false)
const submitError = ref('')
const applicationId = ref('')
const done = ref(false)

const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

function validate() {
    Object.keys(errors).forEach((k) => delete errors[k])

    if (!form.orgName.trim()) errors.orgName = 'Organization name is required.'
    if (!form.orgType) errors.orgType = 'Please select organization type.'
    if (!form.contactName.trim()) errors.contactName = 'Contact person name is required.'
    if (!/^[6-9]\d{9}$/.test(form.mobile)) errors.mobile = 'Enter a valid 10-digit mobile number.'
    if (form.whatsapp && !/^[6-9]\d{9}$/.test(form.whatsapp)) errors.whatsapp = 'Enter a valid 10-digit WhatsApp number.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.'

    if (!form.date) errors.date = 'Please choose a proposed date.'
    else if (form.date < tomorrow) errors.date = 'Date must be after today.'
    if (form.startTime && form.endTime && form.endTime <= form.startTime) errors.endTime = 'End time must be after start time.'
    if (form.expectedDonors === '' || Number(form.expectedDonors) < 1) errors.expectedDonors = 'Enter expected number of donors.'

    if (!form.district) errors.district = 'Please select district.'
    if (!form.city.trim()) errors.city = 'City / village is required.'
    if (!/^\d{6}$/.test(form.pin)) errors.pin = 'Enter a valid 6-digit PIN code.'
    if (!form.venue.trim()) errors.venue = 'Venue name / address is required.'

    if (!form.declare) errors.declare = 'This declaration is required.'
    if (!form.privacy) errors.privacy = 'Please accept the Privacy Policy.'

    return Object.keys(errors).length === 0
}

async function onSubmit() {
    submitError.value = ''
    if (!validate()) {
        requestAnimationFrame(() => document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
        return
    }
    submitting.value = true
    try {
        const res = await submitCampRegistration({ ...form, state: 'West Bengal' })
        applicationId.value = res.applicationId
        done.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
        submitError.value = 'Something went wrong. Please try again.'
    } finally {
        submitting.value = false
    }
}

function reset() {
    Object.assign(form, initial())
    Object.keys(errors).forEach((k) => delete errors[k])
    done.value = false
}

const inputClass = (err) => [
    'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2',
    err ? 'border-[#E80E0E] focus:ring-[#E80E0E]/20' : 'border-slate-300 focus:border-[#E80E0E] focus:ring-[#E80E0E]/20',
]
</script>

<template>
    <div v-if="done" class="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 :size="36" />
        </span>
        <h2 class="mt-5 text-2xl font-extrabold text-slate-900">Your application has been received!</h2>
        <p class="mt-2 text-slate-600">Thank you for organizing a blood camp. Our team will contact you within 2 to 3
            working days.</p>
        <p class="mt-5 inline-block rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-800">
            Application No: <span class="text-[#E80E0E]">{{ applicationId }}</span>
        </p>
        <div class="mt-8">
            <button
                class="rounded-full border-2 border-slate-300 px-6 py-2.5 text-sm font-bold text-slate-800 transition hover:border-[#E80E0E] hover:text-[#E80E0E]"
                @click="reset">
                Submit another application
            </button>
        </div>
    </div>

    <!-- Form -->
    <form v-else class="space-y-6" novalidate @submit.prevent="onSubmit">
        <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <legend class="sr-only">Organization</legend>
            <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Building2 :size="20" class="text-[#E80E0E]" /> Organization Details
            </h3>

            <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div class="min-w-0" :data-error="!!errors.orgName">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Organization Name <span
                            class="text-[#E80E0E]">*</span></label>
                    <input v-model="form.orgName" type="text" placeholder="Name of club / college..."
                        :class="inputClass(errors.orgName)" />
                    <p v-if="errors.orgName" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.orgName }}</p>
                </div>

                <div class="min-w-0" :data-error="!!errors.orgType">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Organization Type <span
                            class="text-[#E80E0E]">*</span></label>
                    <select v-model="form.orgType" :class="inputClass(errors.orgType)">
                        <option value="" disabled>Select type</option>
                        <option v-for="t in orgTypes" :key="t" :value="t">{{ t }}</option>
                    </select>
                    <p v-if="errors.orgType" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.orgType }}</p>
                </div>

                <div class="min-w-0" :data-error="!!errors.contactName">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Contact Person <span
                            class="text-[#E80E0E]">*</span></label>
                    <input v-model="form.contactName" type="text" placeholder="Full name"
                        :class="inputClass(errors.contactName)" />
                    <p v-if="errors.contactName" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.contactName }}
                    </p>
                </div>
            </div>
        </fieldset>

        <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <legend class="sr-only">Contact</legend>
            <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Phone :size="20" class="text-[#E80E0E]" /> Contact Details
            </h3>

            <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div class="min-w-0" :data-error="!!errors.mobile">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Mobile Number <span
                            class="text-[#E80E0E]">*</span></label>
                    <input v-model="form.mobile" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit number"
                        :class="inputClass(errors.mobile)" />
                    <p v-if="errors.mobile" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.mobile }}</p>
                </div>

                <div class="min-w-0" :data-error="!!errors.whatsapp">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">WhatsApp Number <span
                            class="text-xs font-normal text-slate-500">(optional)</span></label>
                    <input v-model="form.whatsapp" type="tel" inputmode="numeric" maxlength="10"
                        placeholder="10-digit number" :class="inputClass(errors.whatsapp)" />
                    <p v-if="errors.whatsapp" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.whatsapp }}</p>
                </div>

                <div class="min-w-0" :data-error="!!errors.email">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Email <span
                            class="text-xs font-normal text-slate-500">(optional)</span></label>
                    <input v-model="form.email" type="email" placeholder="you@example.com"
                        :class="inputClass(errors.email)" />
                    <p v-if="errors.email" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.email }}</p>
                </div>
            </div>
        </fieldset>

        <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <legend class="sr-only">Camp details</legend>
            <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
                <CalendarDays :size="20" class="text-[#E80E0E]" /> Camp Details
            </h3>

            <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div class="min-w-0 sm:col-span-3">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Camp Name / Occasion <span
                            class="text-xs font-normal text-slate-500">(optional)</span></label>
                    <input v-model="form.campName" type="text" placeholder="e.g. Annual Blood Donation Drive"
                        :class="inputClass(false)" />
                </div>

                <div class="min-w-0" :data-error="!!errors.date">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Proposed Date <span
                            class="text-[#E80E0E]">*</span></label>
                    <input v-model="form.date" type="date" :min="tomorrow" :class="inputClass(errors.date)" />
                    <p v-if="errors.date" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.date }}</p>
                </div>

                <div class="min-w-0">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Start Time <span
                            class="text-xs font-normal text-slate-500">(optional)</span></label>
                    <input v-model="form.startTime" type="time" :class="inputClass(false)" />
                </div>

                <div class="min-w-0" :data-error="!!errors.endTime">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">End Time <span
                            class="text-xs font-normal text-slate-500">(optional)</span></label>
                    <input v-model="form.endTime" type="time" :class="inputClass(errors.endTime)" />
                    <p v-if="errors.endTime" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.endTime }}</p>
                </div>

                <div class="min-w-0" :data-error="!!errors.expectedDonors">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Expected Donors <span
                            class="text-[#E80E0E]">*</span></label>
                    <input v-model="form.expectedDonors" type="number" min="1" placeholder="e.g. 50"
                        :class="inputClass(errors.expectedDonors)" />
                    <p v-if="errors.expectedDonors" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.expectedDonors
                    }}</p>
                </div>
            </div>
        </fieldset>

        <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <legend class="sr-only">Venue</legend>
            <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
                <MapPin :size="20" class="text-[#E80E0E]" /> Venue
            </h3>

            <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div class="min-w-0">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">State</label>
                    <input type="text" value="West Bengal" readonly
                        class="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-700" />
                </div>

                <div class="min-w-0" :data-error="!!errors.district">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">District <span
                            class="text-[#E80E0E]">*</span></label>
                    <select v-model="form.district" :class="inputClass(errors.district)">
                        <option value="" disabled>Select district</option>
                        <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                    </select>
                    <p v-if="errors.district" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.district }}</p>
                </div>

                <div class="min-w-0" :data-error="!!errors.city">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">City / Village <span
                            class="text-[#E80E0E]">*</span></label>
                    <input v-model="form.city" type="text" placeholder="e.g. Durgapur" :class="inputClass(errors.city)" />
                    <p v-if="errors.city" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.city }}</p>
                </div>

                <div class="min-w-0" :data-error="!!errors.pin">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">PIN Code <span
                            class="text-[#E80E0E]">*</span></label>
                    <input v-model="form.pin" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit PIN"
                        :class="inputClass(errors.pin)" />
                    <p v-if="errors.pin" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.pin }}</p>
                </div>

                <div class="min-w-0 sm:col-span-2 lg:col-span-4" :data-error="!!errors.venue">
                    <label class="mb-1.5 block text-sm font-semibold text-slate-800">Venue Name / Full Address <span
                            class="text-[#E80E0E]">*</span></label>
                    <input v-model="form.venue" type="text" placeholder="e.g. Community Hall, Main Road"
                        :class="inputClass(errors.venue)" />
                    <p v-if="errors.venue" class="mt-1 text-xs font-medium text-[#E80E0E]">{{ errors.venue }}</p>
                </div>

                <div class="min-w-0 sm:col-span-2 lg:col-span-4">
                    <span class="mb-2 block text-sm font-semibold text-slate-800">Facilities available at the venue</span>
                    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <label v-for="f in facilities" :key="f"
                            class="flex cursor-pointer items-center gap-2.5 text-sm text-slate-800">
                            <input v-model="form.facilities" type="checkbox" :value="f" class="h-4 w-4 accent-[#E80E0E]" />
                            {{ f }}
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>

        <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <legend class="sr-only">Additional information</legend>
            <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
                <MessageSquare :size="20" class="text-[#E80E0E]" /> Additional Information
            </h3>
            <div class="mt-5">
            <label class="mb-1.5 block text-sm font-semibold text-slate-800">Anything else we should know? <span
                    class="text-xs font-normal text-slate-500">(optional)</span></label>
            <textarea v-model="form.notes" rows="4" maxlength="500"
                placeholder="Special requests, past camp experience, etc." :class="inputClass(false)"></textarea>
            <p class="mt-1 text-right text-xs text-slate-500">{{ form.notes.length }}/500</p>
        </div>
    </fieldset>

    <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <legend class="sr-only">Consent</legend>
        <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
            <ShieldCheck :size="20" class="text-[#E80E0E]" /> Declaration
        </h3>

        <div class="mt-4 space-y-3">
            <div :data-error="!!errors.declare">
                <label class="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
                    <input v-model="form.declare" type="checkbox" class="mt-0.5 h-4 w-4 accent-[#E80E0E]" />
                    I declare that the information provided is correct. <span class="text-[#E80E0E]">*</span>
                </label>
                <p v-if="errors.declare" class="mt-1 pl-7 text-xs font-medium text-[#E80E0E]">{{ errors.declare }}</p>
            </div>

            <div :data-error="!!errors.privacy">
                <label class="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
                    <input v-model="form.privacy" type="checkbox" class="mt-0.5 h-4 w-4 accent-[#E80E0E]" />
                    <span>I accept the <RouterLink to="/privacy" class="font-semibold text-[#E80E0E] underline">Privacy
                            Policy</RouterLink>. <span class="text-[#E80E0E]">*</span></span>
                </label>
                <p v-if="errors.privacy" class="mt-1 pl-7 text-xs font-medium text-[#E80E0E]">{{ errors.privacy }}</p>
            </div>
        </div>
    </fieldset>

    <p v-if="submitError" class="rounded-lg bg-red-50 p-3 text-sm font-medium text-[#E80E0E]">{{ submitError }}</p>

    <button type="submit" :disabled="submitting"
        class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E80E0E] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[#E80E0E]/30 transition hover:-translate-y-0.5 hover:bg-[#c90a0a] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
        <Loader2 v-if="submitting" :size="20" class="animate-spin" />
        {{ submitting ? 'Submitting...' : 'Submit Application' }}
    </button>
</form></template>