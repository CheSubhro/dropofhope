
<script setup>
import { reactive, ref, computed } from 'vue'
import {
  User,
  Droplet,
  Phone,
  MapPin,
  HeartPulse,
  ShieldCheck,
  TriangleAlert,
  CheckCircle2,
  Loader2,
} from 'lucide-vue-next'
import { submitDonorRegistration } from '@/services/contentService'

defineProps({
  bloodGroups: {
    type: Array,
    required: true,
  },
  districts: {
    type: Array,
    required: true,
  },
})

const initial = () => ({
  fullName: '',
  dob: '',
  gender: '',
  bloodGroup: '',
  weight: '',
  lastDonation: '',
  mobile: '',
  whatsapp: '',
  email: '',
  district: '',
  city: '',
  pin: '',
  chronic: false,
  surgeryTattoo: false,
  medication: false,
  willing: false,
  contactUse: false,
  privacy: false,
})

const form = reactive(initial())
const errors = reactive({})
const submitting = ref(false)
const submitError = ref('')
const donorId = ref('')
const done = ref(false)

const today = new Date().toISOString().split('T')[0]

function ageFrom(dob) {
  const d = new Date(`${dob}T00:00:00`)
  const now = new Date()

  let age = now.getFullYear() - d.getFullYear()
  const monthDifference = now.getMonth() - d.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && now.getDate() < d.getDate())
  ) {
    age--
  }

  return age
}

const weightWarning = computed(
  () => form.weight !== '' && Number(form.weight) < 45,
)

const donationWarning = computed(() => {
  if (!form.lastDonation) return false

  const diffDays =
    (new Date(`${today}T00:00:00`) -
      new Date(`${form.lastDonation}T00:00:00`)) /
    86400000

  return diffDays < 90
})

function clearErrors() {
  Object.keys(errors).forEach((key) => delete errors[key])
}

function validate() {
  clearErrors()

  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = 'Full name must contain at least 2 characters.'
  }

  if (!form.dob) {
    errors.dob = 'Date of birth is required.'
  } else {
    const age = ageFrom(form.dob)

    if (Number.isNaN(age) || age < 18 || age > 65) {
      errors.dob = 'Donor age must be between 18 and 65 years.'
    }
  }

  if (!form.gender) {
    errors.gender = 'Please select a gender.'
  }

  if (!form.bloodGroup) {
    errors.bloodGroup = 'Please select your blood group.'
  }

  if (
    form.weight === '' ||
    !Number.isFinite(Number(form.weight)) ||
    Number(form.weight) <= 0 ||
    Number(form.weight) > 250
  ) {
    errors.weight = 'Enter a valid weight.'
  }

  if (!/^[6-9]\d{9}$/.test(form.mobile)) {
    errors.mobile = 'Enter a valid 10-digit mobile number.'
  }

  if (
    form.whatsapp &&
    !/^[6-9]\d{9}$/.test(form.whatsapp)
  ) {
    errors.whatsapp = 'Enter a valid 10-digit WhatsApp number.'
  }

  if (
    form.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.district) {
    errors.district = 'Please select your district.'
  }

  if (!form.city.trim()) {
    errors.city = 'City / village is required.'
  }

  if (!/^\d{6}$/.test(form.pin)) {
    errors.pin = 'Enter a valid 6-digit PIN code.'
  }

  if (!form.willing) {
    errors.willing = 'This confirmation is required.'
  }

  if (!form.contactUse) {
    errors.contactUse = 'This permission is required.'
  }

  if (!form.privacy) {
    errors.privacy = 'Please accept the Privacy Policy.'
  }

  return Object.keys(errors).length === 0
}

function applyServerErrors(serverErrors = []) {
  serverErrors.forEach((item) => {
    const field = item.field

    if (field && Object.prototype.hasOwnProperty.call(form, field)) {
      errors[field] = item.message
    }
  })
}

async function onSubmit() {
  submitError.value = ''

  if (!validate()) {
    requestAnimationFrame(() => {
      document
        .querySelector('[data-error="true"]')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
    })

    return
  }

  submitting.value = true

  try {
    const payload = {
      ...form,
      fullName: form.fullName.trim(),
      weight: Number(form.weight),
      mobile: form.mobile.trim(),
      whatsapp: form.whatsapp.trim(),
      email: form.email.trim().toLowerCase(),
      district: form.district.trim(),
      city: form.city.trim(),
      pin: form.pin.trim(),
      state: 'West Bengal',
    }

    const res = await submitDonorRegistration(payload)

    if (!res?.success || !res?.donorId) {
      throw new Error('Registration could not be completed.')
    }

    donorId.value = res.donorId
    done.value = true

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  } catch (error) {
    if (Array.isArray(error.errors) && error.errors.length > 0) {
      applyServerErrors(error.errors)

      requestAnimationFrame(() => {
        document
          .querySelector('[data-error="true"]')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
      })
    }

    if (error.status === 409) {
      submitError.value =
        error.message || 'This mobile number is already registered.'
    } else if (error.status === 400) {
      submitError.value =
        error.message || 'Please check the form details and try again.'
    } else {
      submitError.value =
        error.message || 'Something went wrong. Please try again.'
    }
  } finally {
    submitting.value = false
  }
}

function reset() {
  Object.assign(form, initial())
  clearErrors()

  submitError.value = ''
  donorId.value = ''
  done.value = false

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const inputClass = (err) => [
  'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2',
  err
    ? 'border-[#E80E0E] focus:ring-[#E80E0E]/20'
    : 'border-slate-300 focus:border-[#E80E0E] focus:ring-[#E80E0E]/20',
]
</script>

<template>
  <div v-if="done" class="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:p-12">
    <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
      <CheckCircle2 :size="36" />
    </span>

    <h2 class="mt-5 text-2xl font-extrabold text-slate-900">
      Thank you, your registration is complete!
    </h2>

    <p class="mt-2 text-slate-600">
      Welcome to the DropOfHope family. We will contact you when your blood group is needed.
    </p>

    <p class="mt-5 inline-block rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-800">
      Your Donor ID:
      <span class="text-[#E80E0E]">{{ donorId }}</span>
    </p>

    <div class="mt-8">
      <button
        class="rounded-full border-2 border-slate-300 px-6 py-2.5 text-sm font-bold text-slate-800 transition hover:border-[#E80E0E] hover:text-[#E80E0E]"
        @click="reset">
        Register another donor
      </button>
    </div>
  </div>

  <form v-else class="space-y-6" novalidate @submit.prevent="onSubmit">
    <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
        <User :size="20" class="text-[#E80E0E]" />
        Personal Information
      </h3>

      <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div class="min-w-0" :data-error="!!errors.fullName">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            Full Name <span class="text-[#E80E0E]">*</span>
          </label>

          <input v-model="form.fullName" type="text" placeholder="Enter your full name"
            :class="inputClass(errors.fullName)" />

          <p v-if="errors.fullName" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.fullName }}
          </p>
        </div>

        <div class="min-w-0" :data-error="!!errors.dob">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            Date of Birth <span class="text-[#E80E0E]">*</span>
          </label>

          <input v-model="form.dob" type="date" :max="today" :class="inputClass(errors.dob)" />

          <p v-if="errors.dob" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.dob }}
          </p>
        </div>

        <div class="min-w-0" :data-error="!!errors.gender">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            Gender <span class="text-[#E80E0E]">*</span>
          </label>

          <select v-model="form.gender" :class="inputClass(errors.gender)">
            <option value="" disabled>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <p v-if="errors.gender" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.gender }}
          </p>
        </div>
      </div>
    </fieldset>

    <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
        <Droplet :size="20" class="text-[#E80E0E]" />
        Blood Information
      </h3>

      <div class="mt-5 grid gap-5 sm:grid-cols-3">
        <div :data-error="!!errors.bloodGroup">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            Blood Group <span class="text-[#E80E0E]">*</span>
          </label>

          <select v-model="form.bloodGroup" :class="inputClass(errors.bloodGroup)">
            <option value="" disabled>Select blood group</option>
            <option v-for="b in bloodGroups" :key="b" :value="b">
              {{ b }}
            </option>
          </select>

          <p v-if="errors.bloodGroup" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.bloodGroup }}
          </p>
        </div>

        <div :data-error="!!errors.weight">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            Weight (kg) <span class="text-[#E80E0E]">*</span>
          </label>

          <input v-model="form.weight" type="number" min="1" max="250" placeholder="e.g. 60"
            :class="inputClass(errors.weight)" />

          <p v-if="errors.weight" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.weight }}
          </p>

          <p v-else-if="weightWarning"
            class="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2.5 text-xs font-medium text-amber-800">
            <TriangleAlert :size="14" class="mt-0.5 shrink-0" />
            Donors should weigh at least 45 kg. You may not be eligible to donate right now.
          </p>
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            Last Donation Date
            <span class="text-xs font-normal text-slate-500">(optional)</span>
          </label>

          <input v-model="form.lastDonation" type="date" :max="today" :class="inputClass(false)" />

          <p v-if="donationWarning"
            class="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2.5 text-xs font-medium text-amber-800">
            <TriangleAlert :size="14" class="mt-0.5 shrink-0" />
            You donated less than 3 months ago. Please wait before donating again.
          </p>
        </div>
      </div>
    </fieldset>

    <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
        <Phone :size="20" class="text-[#E80E0E]" />
        Contact Details
      </h3>

      <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div class="min-w-0" :data-error="!!errors.mobile">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            Mobile Number <span class="text-[#E80E0E]">*</span>
          </label>

          <input v-model="form.mobile" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit number"
            :class="inputClass(errors.mobile)" />

          <p v-if="errors.mobile" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.mobile }}
          </p>
        </div>

        <div class="min-w-0" :data-error="!!errors.whatsapp">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            WhatsApp Number
            <span class="text-xs font-normal text-slate-500">(optional)</span>
          </label>

          <input v-model="form.whatsapp" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit number"
            :class="inputClass(errors.whatsapp)" />

          <p v-if="errors.whatsapp" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.whatsapp }}
          </p>
        </div>

        <div class="min-w-0" :data-error="!!errors.email">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            Email
            <span class="text-xs font-normal text-slate-500">(optional)</span>
          </label>

          <input v-model="form.email" type="email" placeholder="you@example.com" :class="inputClass(errors.email)" />

          <p v-if="errors.email" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.email }}
          </p>
        </div>
      </div>
    </fieldset>

    <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
        <MapPin :size="20" class="text-[#E80E0E]" />
        Address
      </h3>

      <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div class="min-w-0" :data-error="!!errors.district">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            District <span class="text-[#E80E0E]">*</span>
          </label>

          <select v-model="form.district" :class="inputClass(errors.district)">
            <option value="" disabled>Select district</option>
            <option v-for="d in districts" :key="d" :value="d">
              {{ d }}
            </option>
          </select>

          <p v-if="errors.district" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.district }}
          </p>
        </div>

        <div class="min-w-0" :data-error="!!errors.city">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            City / Village <span class="text-[#E80E0E]">*</span>
          </label>

          <input v-model="form.city" type="text" placeholder="e.g. Durgapur" :class="inputClass(errors.city)" />

          <p v-if="errors.city" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.city }}
          </p>
        </div>

        <div class="min-w-0" :data-error="!!errors.pin">
          <label class="mb-1.5 block text-sm font-semibold text-slate-800">
            PIN Code <span class="text-[#E80E0E]">*</span>
          </label>

          <input v-model="form.pin" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit PIN"
            :class="inputClass(errors.pin)" />

          <p v-if="errors.pin" class="mt-1 text-xs font-medium text-[#E80E0E]">
            {{ errors.pin }}
          </p>
        </div>
      </div>
    </fieldset>

    <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
        <HeartPulse :size="20" class="text-[#E80E0E]" />
        Health Questions
      </h3>

      <p class="mt-1 text-sm text-slate-600">
        Tick the box only if the statement is true for you.
      </p>

      <div class="mt-4 space-y-3">
        <label class="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
          <input v-model="form.chronic" type="checkbox" class="mt-0.5 h-4 w-4 accent-[#E80E0E]" />
          I have a long-term illness (e.g. diabetes, heart disease, epilepsy).
        </label>

        <label class="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
          <input v-model="form.surgeryTattoo" type="checkbox" class="mt-0.5 h-4 w-4 accent-[#E80E0E]" />
          I had surgery or got a tattoo in the last 6 months.
        </label>

        <label class="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
          <input v-model="form.medication" type="checkbox" class="mt-0.5 h-4 w-4 accent-[#E80E0E]" />
          I am currently taking regular medication.
        </label>
      </div>
    </fieldset>

    <fieldset class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
        <ShieldCheck :size="20" class="text-[#E80E0E]" />
        Consent
      </h3>

      <div class="mt-4 space-y-3">
        <div :data-error="!!errors.willing">
          <label class="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
            <input v-model="form.willing" type="checkbox" class="mt-0.5 h-4 w-4 accent-[#E80E0E]" />
            I am willing to donate blood voluntarily.
            <span class="text-[#E80E0E]">*</span>
          </label>

          <p v-if="errors.willing" class="mt-1 pl-7 text-xs font-medium text-[#E80E0E]">
            {{ errors.willing }}
          </p>
        </div>

        <div :data-error="!!errors.contactUse">
          <label class="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
            <input v-model="form.contactUse" type="checkbox" class="mt-0.5 h-4 w-4 accent-[#E80E0E]" />
            My contact details may be used when blood is needed.
            <span class="text-[#E80E0E]">*</span>
          </label>

          <p v-if="errors.contactUse" class="mt-1 pl-7 text-xs font-medium text-[#E80E0E]">
            {{ errors.contactUse }}
          </p>
        </div>

        <div :data-error="!!errors.privacy">
          <label class="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
            <input v-model="form.privacy" type="checkbox" class="mt-0.5 h-4 w-4 accent-[#E80E0E]" />

            <span>
              I accept the
              <RouterLink to="/privacy" class="font-semibold text-[#E80E0E] underline">
                Privacy Policy
              </RouterLink>.
              <span class="text-[#E80E0E]">*</span>
            </span>
          </label>

          <p v-if="errors.privacy" class="mt-1 pl-7 text-xs font-medium text-[#E80E0E]">
            {{ errors.privacy }}
          </p>
        </div>
      </div>
    </fieldset>

    <p v-if="submitError" class="rounded-lg bg-red-50 p-3 text-sm font-medium text-[#E80E0E]" role="alert">
      {{ submitError }}
    </p>

    <button type="submit" :disabled="submitting"
      class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E80E0E] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[#E80E0E]/30 transition hover:-translate-y-0.5 hover:bg-[#c90a0a] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
      <Loader2 v-if="submitting" :size="20" class="animate-spin" />

      {{ submitting ? 'Submitting...' : 'Register as a Donor' }}
    </button>
  </form>
</template>
