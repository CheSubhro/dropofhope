
<script setup>
import { computed, reactive, ref, watch } from 'vue'
import {
    UserRound,
    Phone,
    MapPin,
    BriefcaseBusiness,
    Users,
    CheckCircle2,
    AlertCircle,
    LoaderCircle,
} from 'lucide-vue-next'
import { submitMemberApplication } from '@/services/contentService'

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    selectedType: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['type-change'])

const loading = ref(false)
const error = ref('')
const success = ref(false)
const applicationId = ref('')

const today = new Date().toISOString().split('T')[0]

const form = reactive({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    profession: '',

    mobile: '',
    whatsapp: '',
    email: '',

    state: 'West Bengal',
    district: '',
    locality: '',
    pinCode: '',

    membershipType: props.selectedType,
    interests: [],
    weeklyHours: '',
    volunteerExperience: '',
    reason: '',

    informationAccurate: false,
    followRules: false,
    privacyConsent: false,
})

watch(
    () => props.selectedType,
    (value) => {
        if (value) form.membershipType = value
    },
)

const selectedMembership = computed(() => {
    return props.data.membershipTypes.find(
        (item) => item.id === form.membershipType,
    )
})

const calculateAge = (date) => {
    if (!date) return 0

    const birthDate = new Date(`${date}T00:00:00`)
    const currentDate = new Date()

    let age = currentDate.getFullYear() - birthDate.getFullYear()

    const monthDifference = currentDate.getMonth() - birthDate.getMonth()

    if (
        monthDifference < 0 ||
        (monthDifference === 0 &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--
    }

    return age
}

const validateForm = () => {
    if (!form.membershipType) {
        return 'Please select a membership type.'
    }

    if (calculateAge(form.dateOfBirth) < 18) {
        return 'Applicants must be at least 18 years old.'
    }

    if (calculateAge(form.dateOfBirth) > 120) {
        return 'Please enter a valid date of birth.'
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
        return 'Please enter a valid 10-digit mobile number.'
    }

    if (
        form.whatsapp &&
        !/^[6-9]\d{9}$/.test(form.whatsapp)
    ) {
        return 'Please enter a valid 10-digit WhatsApp number.'
    }

    if (!/^\d{6}$/.test(form.pinCode)) {
        return 'Please enter a valid 6-digit PIN code.'
    }

    if (form.interests.length === 0) {
        return 'Please select at least one area of interest.'
    }

    if (
        !form.informationAccurate ||
        !form.followRules ||
        !form.privacyConsent
    ) {
        return 'Please accept all required declarations before submitting.'
    }

    return ''
}

const resetForm = () => {
    Object.assign(form, {
        fullName: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        profession: '',
        mobile: '',
        whatsapp: '',
        email: '',
        state: 'West Bengal',
        district: '',
        locality: '',
        pinCode: '',
        membershipType: props.selectedType || '',
        interests: [],
        weeklyHours: '',
        volunteerExperience: '',
        reason: '',
        informationAccurate: false,
        followRules: false,
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
        const payload = {
            ...form,
            interests: [...form.interests],
            state: 'West Bengal',
        }

        const response = await submitMemberApplication(payload)

        if (!response.success) {
            throw new Error('Unable to submit your application.')
        }

        applicationId.value = response.application.id
        success.value = true

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    } catch (err) {
        error.value =
            err.message || 'Something went wrong. Please try again.'
    } finally {
        loading.value = false
    }
}

const startNewApplication = () => {
    success.value = false
    applicationId.value = ''
    error.value = ''
    resetForm()
}
</script>

<template>
    <section id="member-application" class="py-16 sm:py-20">
        <div class="mx-auto max-w-5xl px-5">
            <div class="mx-auto mb-10 max-w-2xl text-center">
                <span class="text-sm font-bold uppercase tracking-wider text-[#E80E0E]">
                    Membership Application
                </span>

                <h2 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                    Become a Member
                </h2>

                <p class="mt-4 text-base font-medium leading-7 text-slate-700">
                    Complete the application form below. Our team will review your
                    information and contact you regarding the next steps.
                </p>
            </div>

            <div v-if="success" class="rounded-2xl border border-green-200 bg-green-50 p-7 sm:p-10">
                <div class="flex flex-col items-center text-center">
                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <CheckCircle2 :size="36" />
                    </div>

                    <h3 class="mt-5 text-2xl font-bold text-green-900">
                        Application Submitted Successfully!
                    </h3>

                    <p class="mt-3 max-w-xl text-sm font-medium leading-6 text-green-800">
                        Thank you for your interest in joining Drop Of Hope. Your
                        application has been received and is awaiting verification.
                    </p>

                    <div class="mt-6 rounded-xl border border-green-200 bg-white px-8 py-5">
                        <p class="text-xs font-bold uppercase tracking-wider text-slate-600">
                            Your Application Number
                        </p>

                        <p class="mt-2 text-2xl font-bold tracking-wider text-[#E80E0E]">
                            {{ applicationId }}
                        </p>
                    </div>

                    <p class="mt-5 text-sm font-semibold text-green-800">
                        Our team will review your application and contact you within
                        5–7 working days.
                    </p>

                    <button type="button" @click="startNewApplication"
                        class="mt-7 rounded-xl bg-[#E80E0E] px-7 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                        Submit Another Application
                    </button>
                </div>
            </div>

            <form v-else @submit.prevent="handleSubmit"
                class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
                <div v-if="error"
                    class="mb-7 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                    <AlertCircle :size="20" class="mt-0.5 shrink-0" />
                    <p>{{ error }}</p>
                </div>

                <div class="mb-8 flex items-center gap-3 border-b border-slate-100 pb-5">
                    <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <UserRound :size="22" />
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-slate-900">
                            Personal Information
                        </h3>
                        <p class="text-sm font-medium text-slate-600">
                            Tell us a little about yourself.
                        </p>
                    </div>
                </div>

                <div class="grid gap-5 md:grid-cols-3">
                    <div class="md:col-span-2">
                        <label class="form-label" for="member-name">
                            Full Name <span class="text-red-600">*</span>
                        </label>
                        <input id="member-name" v-model.trim="form.fullName" type="text" class="form-input"
                            placeholder="Enter your full name" autocomplete="name" required minlength="3" />
                    </div>

                    <div>
                        <label class="form-label" for="member-dob">
                            Date of Birth <span class="text-red-600">*</span>
                        </label>
                        <input id="member-dob" v-model="form.dateOfBirth" type="date" class="form-input" :max="today"
                            required />
                    </div>

                    <div>
                        <label class="form-label" for="member-gender">
                            Gender <span class="text-red-600">*</span>
                        </label>
                        <select id="member-gender" v-model="form.gender" class="form-input" required>
                            <option value="" disabled>Select gender</option>
                            <option v-for="gender in data.genders" :key="gender" :value="gender">
                                {{ gender }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label" for="member-blood">
                            Blood Group
                        </label>
                        <select id="member-blood" v-model="form.bloodGroup" class="form-input">
                            <option value="">Select blood group</option>
                            <option v-for="group in data.bloodGroups" :key="group" :value="group">
                                {{ group }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label" for="member-profession">
                            Profession <span class="text-red-600">*</span>
                        </label>
                        <select id="member-profession" v-model="form.profession" class="form-input" required>
                            <option value="" disabled>Select profession</option>
                            <option v-for="profession in data.professions" :key="profession" :value="profession">
                                {{ profession }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="my-9 border-t border-slate-100"></div>

                <div class="mb-8 flex items-center gap-3">
                    <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <Phone :size="22" />
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-slate-900">
                            Contact Information
                        </h3>
                        <p class="text-sm font-medium text-slate-600">
                            How can we reach you?
                        </p>
                    </div>
                </div>

                <div class="grid gap-5 md:grid-cols-3">
                    <div>
                        <label class="form-label" for="member-mobile">
                            Mobile Number <span class="text-red-600">*</span>
                        </label>
                        <input id="member-mobile" v-model.trim="form.mobile" type="tel" class="form-input"
                            placeholder="10-digit mobile number" inputmode="numeric" maxlength="10" autocomplete="tel"
                            required />
                    </div>

                    <div>
                        <label class="form-label" for="member-whatsapp">
                            WhatsApp Number
                        </label>
                        <input id="member-whatsapp" v-model.trim="form.whatsapp" type="tel" class="form-input"
                            placeholder="WhatsApp number" inputmode="numeric" maxlength="10" />
                    </div>

                    <div>
                        <label class="form-label" for="member-email">
                            Email Address
                        </label>
                        <input id="member-email" v-model.trim="form.email" type="email" class="form-input"
                            placeholder="you@example.com" autocomplete="email" />
                    </div>
                </div>

                <div class="my-9 border-t border-slate-100"></div>

                <div class="mb-8 flex items-center gap-3">
                    <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <MapPin :size="22" />
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-slate-900">
                            Address Information
                        </h3>
                        <p class="text-sm font-medium text-slate-600">
                            Where are you based?
                        </p>
                    </div>
                </div>

                <div class="grid gap-5 md:grid-cols-3">
                    <div>
                        <label class="form-label" for="member-state">
                            State
                        </label>
                        <input id="member-state" :value="form.state" type="text" class="form-input bg-slate-50" readonly />
                    </div>

                    <div>
                        <label class="form-label" for="member-district">
                            District <span class="text-red-600">*</span>
                        </label>
                        <select id="member-district" v-model="form.district" class="form-input" required>
                            <option value="" disabled>Select district</option>
                            <option v-for="district in data.districts" :key="district" :value="district">
                                {{ district }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label" for="member-pin">
                            PIN Code <span class="text-red-600">*</span>
                        </label>
                        <input id="member-pin" v-model.trim="form.pinCode" type="text" class="form-input"
                            placeholder="6-digit PIN code" inputmode="numeric" maxlength="6" required />
                    </div>

                    <div class="md:col-span-3">
                        <label class="form-label" for="member-locality">
                            City / Village <span class="text-red-600">*</span>
                        </label>
                        <input id="member-locality" v-model.trim="form.locality" type="text" class="form-input"
                            placeholder="Enter your city, town or village" required />
                    </div>
                </div>

                <div class="my-9 border-t border-slate-100"></div>

                <div class="mb-8 flex items-center gap-3">
                    <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <BriefcaseBusiness :size="22" />
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-slate-900">
                            Membership Details
                        </h3>
                        <p class="text-sm font-medium text-slate-600">
                            Tell us how you would like to contribute.
                        </p>
                    </div>
                </div>

                <div class="grid gap-5 md:grid-cols-2">
                    <div class="md:col-span-2">
                        <label class="form-label" for="member-type">
                            Membership Type <span class="text-red-600">*</span>
                        </label>
                        <select id="member-type" v-model="form.membershipType" class="form-input" required
                            @change="emit('type-change', form.membershipType)">
                            <option value="" disabled>Select membership type</option>
                            <option v-for="type in data.membershipTypes" :key="type.id" :value="type.id">
                                {{ type.name }} - {{ type.fee }}
                            </option>
                        </select>

                        <p v-if="selectedMembership" class="mt-2 text-sm font-medium text-slate-600">
                            {{ selectedMembership.description }}
                        </p>
                    </div>

                    <div class="md:col-span-2">
                        <label class="form-label">
                            Areas of Interest <span class="text-red-600">*</span>
                        </label>

                        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <label v-for="interest in data.interests" :key="interest.value"
                                class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50"
                                :class="form.interests.includes(interest.value)
                                        ? 'border-red-300 bg-red-50 text-red-800'
                                        : 'bg-white'
                                    ">
                                <input v-model="form.interests" type="checkbox" :value="interest.value"
                                    class="h-4 w-4 accent-[#E80E0E]" />
                                <span>{{ interest.label }}</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label class="form-label" for="member-hours">
                            Weekly Availability
                        </label>
                        <select id="member-hours" v-model="form.weeklyHours" class="form-input">
                            <option value="">Select weekly hours</option>
                            <option v-for="option in data.hoursOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label" for="member-experience">
                            Previous Volunteer Experience
                        </label>
                        <textarea id="member-experience" v-model.trim="form.volunteerExperience"
                            class="form-input min-h-24 resize-y" placeholder="Describe any previous experience..."
                            rows="3"></textarea>
                    </div>

                    <div class="md:col-span-2">
                        <label class="form-label" for="member-reason">
                            Why Do You Want to Join Us?
                        </label>
                        <textarea id="member-reason" v-model.trim="form.reason" class="form-input min-h-28 resize-y"
                            placeholder="Tell us why you want to become a member..." rows="4"></textarea>
                    </div>
                </div>

                <div class="my-9 border-t border-slate-100"></div>

                <div class="mb-6 flex items-center gap-3">
                    <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                        <Users :size="22" />
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-slate-900">
                            Declaration and Consent
                        </h3>
                        <p class="text-sm font-medium text-slate-600">
                            Please read and confirm the following statements.
                        </p>
                    </div>
                </div>

                <div class="space-y-4 rounded-xl bg-slate-50 p-5">
                    <label class="flex cursor-pointer items-start gap-3">
                        <input v-model="form.informationAccurate" type="checkbox" class="mt-1 h-4 w-4 accent-[#E80E0E]"
                            required />
                        <span class="text-sm font-medium leading-6 text-slate-700">
                            I confirm that the information provided in this application
                            is true and accurate.
                            <span class="text-red-600">*</span>
                        </span>
                    </label>

                    <label class="flex cursor-pointer items-start gap-3">
                        <input v-model="form.followRules" type="checkbox" class="mt-1 h-4 w-4 accent-[#E80E0E]" required />
                        <span class="text-sm font-medium leading-6 text-slate-700">
                            I agree to follow the rules, guidelines, and code of conduct
                            of the organisation.
                            <span class="text-red-600">*</span>
                        </span>
                    </label>

                    <label class="flex cursor-pointer items-start gap-3">
                        <input v-model="form.privacyConsent" type="checkbox" class="mt-1 h-4 w-4 accent-[#E80E0E]"
                            required />
                        <span class="text-sm font-medium leading-6 text-slate-700">
                            I agree to the
                            <RouterLink to="/privacy-policy" target="_blank" class="font-bold text-[#E80E0E] underline">
                                Privacy Policy
                            </RouterLink>
                            and consent to the organisation using my information for
                            membership verification and communication.
                            <span class="text-red-600">*</span>
                        </span>
                    </label>
                </div>

                <div class="mt-8">
                    <button type="submit" :disabled="loading"
                        class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E80E0E] px-7 py-4 text-base font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                        <LoaderCircle v-if="loading" :size="20" class="animate-spin" />
                        {{ loading ? 'Submitting Application...' : 'Submit Membership Application' }}
                    </button>

                    <p class="mt-4 text-xs font-medium leading-5 text-slate-600">
                        Your personal information will be kept private and used only
                        for application review and membership-related communication.
                    </p>
                </div>
            </form>
        </div>
    </section>
</template>
