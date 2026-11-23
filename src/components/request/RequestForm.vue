
<script setup>
import { computed, reactive, ref } from 'vue'
import { submitBloodRequest } from '../../services/contentService'

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const loading = ref(false)
const error = ref('')
const submittedRequest = ref(null)

const getToday = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

const form = reactive({
    patientName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    units: 1,
    bloodType: 'Whole Blood',
    urgency: 'immediate',
    requiredDate: '',
    reason: '',

    hospitalName: '',
    district: '',
    city: '',
    wardNumber: '',
    doctorName: '',

    contactName: '',
    relation: '',
    mobile: '',
    whatsapp: '',

    additionalInfo: '',

    informationConfirmed: false,
    donorContactConsent: false,
    privacyConsent: false,
})

const scheduled = computed(() => form.urgency === 'scheduled')

const today = computed(getToday)

const validatePhone = (number) => {
    return /^[6-9]\d{9}$/.test(number)
}

const resetForm = () => {
    Object.assign(form, {
        patientName: '',
        age: '',
        gender: '',
        bloodGroup: '',
        units: 1,
        bloodType: 'Whole Blood',
        urgency: 'immediate',
        requiredDate: '',
        reason: '',
        hospitalName: '',
        district: '',
        city: '',
        wardNumber: '',
        doctorName: '',
        contactName: '',
        relation: '',
        mobile: '',
        whatsapp: '',
        additionalInfo: '',
        informationConfirmed: false,
        donorContactConsent: false,
        privacyConsent: false,
    })
}

const handleSubmit = async () => {
    error.value = ''

    if (!validatePhone(form.mobile)) {
        error.value = 'Please enter a valid 10-digit mobile number.'
        return
    }

    if (form.whatsapp && !validatePhone(form.whatsapp)) {
        error.value = 'Please enter a valid WhatsApp number.'
        return
    }

    if (scheduled.value && !form.requiredDate) {
        error.value = 'Please select the required date.'
        return
    }

    if (
        scheduled.value &&
        form.requiredDate < today.value
    ) {
        error.value = 'The required date cannot be in the past.'
        return
    }

    if (
        Number(form.age) < 0 ||
        Number(form.age) > 120 ||
        !Number.isInteger(Number(form.age))
    ) {
        error.value = 'Please enter a valid patient age.'
        return
    }

    if (
        !form.informationConfirmed ||
        !form.donorContactConsent ||
        !form.privacyConsent
    ) {
        error.value = 'Please accept all required declarations.'
        return
    }

    loading.value = true

    try {
        const payload = {
            ...form,
            age: Number(form.age),
            units: Number(form.units),
            status: 'pending',
        }

        const result = await submitBloodRequest(payload)

        if (!result?.success) {
            throw new Error('Unable to submit your request.')
        }

        submittedRequest.value = result.request

        resetForm()

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    } catch (err) {
        error.value = err.message || 'Something went wrong. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <section id="request-form" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <!-- Success Message -->

        <div v-if="submittedRequest" class="rounded-xl border border-green-200 bg-green-50 p-6 sm:p-8">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5">
                    <path d="m5 12 4 4L19 6" />
                </svg>
            </div>

            <h2 class="mt-5 text-2xl font-bold text-green-900">
                Request Submitted Successfully!
            </h2>

            <p class="mt-2 font-medium text-green-800">
                Your request has been received. Our team will review the details.
            </p>

            <div class="mt-5 rounded-lg border border-green-200 bg-white p-4">
                <p class="text-sm font-semibold text-slate-600">
                    Your Request ID
                </p>

                <p class="mt-1 text-2xl font-extrabold text-green-700">
                    {{ submittedRequest.id }}
                </p>

                <p class="mt-2 text-sm font-medium text-slate-700">
                    Status: Pending Verification
                </p>
            </div>

            <p class="mt-5 text-sm font-medium leading-7 text-green-900">
                Please keep your request ID for future communication. Continue coordinating with the hospital blood bank and
                family members.
            </p>

            <button type="button" @click="submittedRequest = null"
                class="mt-6 rounded-lg bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800">
                Submit Another Request
            </button>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-9">

            <!-- Form Heading -->

            <div>
                <span class="text-sm font-bold uppercase tracking-wider text-red-600">
                    Patient Assistance
                </span>

                <h2 class="mt-2 text-2xl font-bold text-slate-900">
                    Blood Request Form
                </h2>

                <p class="mt-2 text-sm font-medium text-slate-700">
                    Fields marked with * are required.
                </p>
            </div>

            <!-- Patient Information -->

            <div>
                <h3 class="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">
                    01. Patient Information
                </h3>

                <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                    <div>
                        <label class="form-label">Patient Name *</label>
                        <input v-model.trim="form.patientName" required maxlength="100" type="text" class="form-input"
                            placeholder="Enter patient name" />
                    </div>

                    <div>
                        <label class="form-label">Patient Age *</label>
                        <input v-model="form.age" required min="0" max="120" type="number" class="form-input"
                            placeholder="Enter age" />
                    </div>

                    <div>
                        <label class="form-label">Gender *</label>
                        <select v-model="form.gender" required class="form-input">
                            <option value="" disabled>Select gender</option>
                            <option v-for="item in data.genders" :key="item" :value="item">
                                {{ item }}
                            </option>
                        </select>
                    </div>

                </div>
            </div>

            <!-- Blood Requirement -->

            <div>
                <h3 class="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">
                    02. Blood Requirement
                </h3>

                <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                    <div>
                        <label class="form-label">Blood Group *</label>
                        <select v-model="form.bloodGroup" required class="form-input">
                            <option value="" disabled>Select blood group</option>
                            <option v-for="group in data.bloodGroups" :key="group" :value="group">
                                {{ group }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label">Units Required *</label>
                        <input v-model="form.units" required type="number" min="1" max="50" class="form-input" />
                    </div>

                    <div>
                        <label class="form-label">Blood Component *</label>
                        <select v-model="form.bloodType" required class="form-input">
                            <option v-for="item in data.bloodTypes" :key="item" :value="item">
                                {{ item }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label">When Required? *</label>
                        <select v-model="form.urgency" required class="form-input">
                            <option v-for="item in data.urgencyOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>

                    <div v-if="scheduled">
                        <label class="form-label">Required Date *</label>
                        <input v-model="form.requiredDate" :min="today" required type="date" class="form-input" />
                    </div>

                    <div>
                        <label class="form-label">Reason / Medical Condition</label>
                        <input v-model.trim="form.reason" type="text" maxlength="150" class="form-input"
                            placeholder="e.g. Surgery, Accident" />
                    </div>

                </div>
            </div>

            <!-- Hospital Information -->

            <div>
                <h3 class="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">
                    03. Hospital Information
                </h3>

                <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                    <div class="lg:col-span-2">
                        <label class="form-label">Hospital Name *</label>
                        <input v-model.trim="form.hospitalName" required maxlength="150" type="text" class="form-input"
                            placeholder="Enter hospital name" />
                    </div>

                    <div>
                        <label class="form-label">District *</label>
                        <select v-model="form.district" required class="form-input">
                            <option value="" disabled>Select district</option>
                            <option v-for="district in data.districts" :key="district" :value="district">
                                {{ district }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label">City / Town *</label>
                        <input v-model.trim="form.city" required maxlength="100" type="text" class="form-input"
                            placeholder="Enter city or town" />
                    </div>

                    <div>
                        <label class="form-label">Ward / Bed Number</label>
                        <input v-model.trim="form.wardNumber" maxlength="50" type="text" class="form-input"
                            placeholder="Optional" />
                    </div>

                    <div>
                        <label class="form-label">Doctor Name</label>
                        <input v-model.trim="form.doctorName" maxlength="100" type="text" class="form-input"
                            placeholder="Optional" />
                    </div>

                </div>
            </div>

            <!-- Contact Information -->

            <div>
                <h3 class="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">
                    04. Contact Information
                </h3>

                <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                    <div>
                        <label class="form-label">Your Name *</label>
                        <input v-model.trim="form.contactName" required maxlength="100" type="text" class="form-input"
                            placeholder="Enter your name" />
                    </div>

                    <div>
                        <label class="form-label">Relationship with Patient *</label>
                        <select v-model="form.relation" required class="form-input">
                            <option value="" disabled>Select relationship</option>
                            <option v-for="item in data.relations" :key="item" :value="item">
                                {{ item }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="form-label">Mobile Number *</label>
                        <input v-model.trim="form.mobile" required type="tel" maxlength="10" minlength="10"
                            pattern="[6-9][0-9]{9}" class="form-input" placeholder="10-digit mobile number" />
                    </div>

                    <div>
                        <label class="form-label">WhatsApp Number</label>
                        <input v-model.trim="form.whatsapp" type="tel" maxlength="10" minlength="10" pattern="[6-9][0-9]{9}"
                            class="form-input" placeholder="Optional" />
                    </div>

                </div>
            </div>

            <!-- Additional Information -->

            <div>
                <h3 class="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">
                    05. Additional Information
                </h3>

                <label class="form-label">Additional Message</label>

                <textarea v-model.trim="form.additionalInfo" rows="4" maxlength="1000" class="form-input resize-y"
                    placeholder="Share any additional information that may help us understand the request."></textarea>
            </div>

            <!-- Consent -->

            <div>
                <h3 class="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">
                    06. Declaration & Consent
                </h3>

                <div class="space-y-4">

                    <label class="flex items-start gap-3">
                        <input v-model="form.informationConfirmed" required type="checkbox"
                            class="mt-1 h-4 w-4 accent-red-600" />
                        <span class="text-sm font-medium leading-6 text-slate-800">
                            I confirm that the information provided above is accurate and complete. *
                        </span>
                    </label>

                    <label class="flex items-start gap-3">
                        <input v-model="form.donorContactConsent" required type="checkbox"
                            class="mt-1 h-4 w-4 accent-red-600" />
                        <span class="text-sm font-medium leading-6 text-slate-800">
                            I consent to sharing my contact number with eligible donors for this request. *
                        </span>
                    </label>

                    <label class="flex items-start gap-3">
                        <input v-model="form.privacyConsent" required type="checkbox" class="mt-1 h-4 w-4 accent-red-600" />
                        <span class="text-sm font-medium leading-6 text-slate-800">
                            I agree to the
                            <a href="/privacy" target="_blank" class="font-bold text-red-600 underline">
                                Privacy Policy
                            </a>
                            and data processing terms. *
                        </span>
                    </label>

                </div>
            </div>

            <!-- Error Message -->

            <div v-if="error" class="rounded-lg border border-red-200 bg-red-50 p-4">
                <p class="text-sm font-semibold text-red-700">
                    {{ error }}
                </p>
            </div>

            <!-- Submit -->

            <div class="border-t border-slate-200 pt-6">

                <p class="mb-5 text-sm font-medium leading-7 text-slate-700">
                    Drop Of Hope is a donor connection platform. Blood availability, compatibility and transfusion decisions
                    must be confirmed by the hospital and treating medical professionals.
                </p>

                <button type="submit" :disabled="loading"
                    class="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                    <span v-if="loading">Submitting Request...</span>
                    <span v-else>Submit Blood Request</span>
                </button>

            </div>
        </form>
    </section>
</template>

<style scoped>
.form-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #1e293b;
    font-size: 0.875rem;
    font-weight: 700;
}

.form-input {
    display: block;
    width: 100%;
    min-height: 46px;
    border: 1px solid #cbd5e1;
    border-radius: 0.625rem;
    background-color: #ffffff;
    padding: 0.75rem 0.875rem;
    color: #0f172a;
    font-size: 0.875rem;
    font-weight: 500;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgb(220 38 38 / 10%);
}

.form-input::placeholder {
    color: #64748b;
    opacity: 1;
}
</style>
