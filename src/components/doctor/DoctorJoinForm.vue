
<script setup>
import { reactive, ref } from 'vue'
import {
    UserRound,
    CheckCircle2,
    AlertCircle,
    LoaderCircle,
    Send,
} from 'lucide-vue-next'
import { submitDoctorApplication } from '@/services/contentService'

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const loading = ref(false)
const error = ref('')
const success = ref(false)
const applicationId = ref('')

const form = reactive({
    fullName: '',
    registrationNumber: '',
    qualification: '',
    specialty: '',
    district: '',
    mobile: '',
    email: '',
    hospital: '',
    privacyConsent: false,
})

const validateForm = () => {
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
        return 'Please enter a valid 10-digit mobile number.'
    }

    if (form.registrationNumber.trim().length < 3) {
        return 'Please enter a valid medical registration number.'
    }

    if (!form.privacyConsent) {
        return 'Please accept the Privacy Policy before submitting.'
    }

    return ''
}

const resetForm = () => {
    Object.assign(form, {
        fullName: '',
        registrationNumber: '',
        qualification: '',
        specialty: '',
        district: '',
        mobile: '',
        email: '',
        hospital: '',
        privacyConsent: false,
    })
}

const handleSubmit = async () => {
    error.value = ''

    const validationError = validateForm()

    if (validationError) {
        error.value = validationError
        return
    }

    loading.value = true

    try {
        const response = await submitDoctorApplication({
            ...form,
            state: 'West Bengal',
        })

        if (!response.success) {
            throw new Error('Unable to submit your application.')
        }

        applicationId.value = response.application.id
        success.value = true
    } catch (err) {
        error.value =
            err.message || 'Something went wrong. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <section id="doctor-join" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div v-if="success" class="py-8 text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                <CheckCircle2 :size="36" />
            </div>

            <h3 class="mt-5 text-2xl font-bold text-green-900">
                Application Submitted!
            </h3>

            <p class="mt-3 text-sm font-medium leading-7 text-slate-700">
                Thank you for your interest. Our team will review your details
                and verify your professional registration before publishing
                your profile.
            </p>

            <div class="mx-auto mt-6 max-w-xs rounded-xl bg-green-50 p-5">
                <p class="text-xs font-bold uppercase text-slate-600">
                    Application Number
                </p>
                <p class="mt-2 text-2xl font-bold text-[#E80E0E]">
                    {{ applicationId }}
                </p>
                <p class="mt-2 text-xs font-semibold text-green-800">
                    Status: Pending Verification
                </p>
            </div>

            <button type="button" @click="success = false; applicationId = ''; resetForm()"
                class="mt-7 rounded-xl bg-[#E80E0E] px-6 py-3 text-sm font-bold text-white hover:bg-red-700">
                Submit Another Application
            </button>
        </div>

        <template v-else>
            <div class="mb-7 flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                    <UserRound :size="24" />
                </div>

                <div>
                    <h3 class="text-xl font-bold text-slate-900">
                        Doctor Registration
                    </h3>
                    <p class="text-sm font-medium text-slate-600">
                        Submit your professional details for verification.
                    </p>
                </div>
            </div>

            <div v-if="error"
                class="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                <AlertCircle :size="19" class="mt-0.5 shrink-0" />
                {{ error }}
            </div>

            <form @submit.prevent="handleSubmit">
                <div class="grid gap-5 md:grid-cols-2">
                    <div>
                        <label for="doctor-join-name" class="form-label">
                            Full Name <span class="text-red-600">*</span>
                        </label>
                        <input id="doctor-join-name" v-model.trim="form.fullName" type="text" class="form-input"
                            placeholder="Enter your full name" required minlength="3" />
                    </div>

                    <div>
                        <label for="doctor-join-registration" class="form-label">
                            Medical Registration Number <span class="text-red-600">*</span>
                        </label>
                        <input id="doctor-join-registration" v-model.trim="form.registrationNumber" type="text"
                            class="form-input" placeholder="Enter registration number" required />
                    </div>

                    <div>
                        <label for="doctor-join-qualification" class="form-label">
                            Qualification <span class="text-red-600">*</span>
                        </label>
                        <input id="doctor-join-qualification" v-model.trim="form.qualification" type="text"
                            class="form-input" placeholder="Example: MBBS, MD" required />
                    </div>

                    <div>
                        <label for="doctor-join-specialty" class="form-label">
                            Specialty <span class="text-red-600">*</span>
                        </label>
                        <select id="doctor-join-specialty" v-model="form.specialty" class="form-input" required>
                            <option value="" disabled>Select specialty</option>
                            <option v-for="specialty in data.joinForm.specialties" :key="specialty" :value="specialty">
                                {{ specialty }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="doctor-join-district" class="form-label">
                            District <span class="text-red-600">*</span>
                        </label>
                        <select id="doctor-join-district" v-model="form.district" class="form-input" required>
                            <option value="" disabled>Select district</option>
                            <option v-for="district in data.districts" :key="district" :value="district">
                                {{ district }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="doctor-join-mobile" class="form-label">
                            Mobile Number <span class="text-red-600">*</span>
                        </label>
                        <input id="doctor-join-mobile" v-model.trim="form.mobile" type="tel" inputmode="numeric"
                            maxlength="10" class="form-input" placeholder="10-digit mobile number" required />
                    </div>

                    <div>
                        <label for="doctor-join-email" class="form-label">
                            Email Address
                        </label>
                        <input id="doctor-join-email" v-model.trim="form.email" type="email" class="form-input"
                            placeholder="doctor@example.com" />
                    </div>

                    <div>
                        <label for="doctor-join-hospital" class="form-label">
                            Hospital / Clinic
                        </label>
                        <input id="doctor-join-hospital" v-model.trim="form.hospital" type="text" class="form-input"
                            placeholder="Hospital or clinic name" />
                    </div>
                </div>

                <div class="mt-6 rounded-xl bg-slate-50 p-5">
                    <label class="flex cursor-pointer items-start gap-3">
                        <input v-model="form.privacyConsent" type="checkbox" class="mt-1 h-4 w-4 accent-[#E80E0E]"
                            required />
                        <span class="text-sm font-medium leading-6 text-slate-700">
                            I consent to the collection and verification of my
                            professional details in accordance with the
                            <RouterLink to="/privacy-policy" target="_blank" class="font-bold text-[#E80E0E] underline">
                                Privacy Policy
                            </RouterLink>.
                            I understand that my profile will not be published
                            until verification is completed.
                        </span>
                    </label>
                </div>

                <button type="submit" :disabled="loading"
                    class="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E80E0E] px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                    <LoaderCircle v-if="loading" :size="19" class="animate-spin" />
                    <Send v-else :size="18" />
                    {{ loading ? 'Submitting...' : 'Submit for Verification' }}
                </button>
            </form>
        </template>
    </section>
</template>
