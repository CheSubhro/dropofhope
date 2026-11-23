<script setup>
import { reactive, ref } from 'vue'
import { Search, LoaderCircle } from 'lucide-vue-next'

const emit = defineEmits(['search'])

const method = ref('donorId')
const loading = ref(false)
const error = ref('')

const form = reactive({
    donorId: '',
    mobile: '',
    dob: '',
})

async function submitForm() {
    error.value = ''

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
        error.value = 'Please enter a valid 10-digit mobile number.'
        return
    }

    if (method.value === 'donorId' && !form.donorId.trim()) {
        error.value = 'Please enter your Donor ID.'
        return
    }

    if (method.value === 'mobile' && !form.dob) {
        error.value = 'Please select your date of birth.'
        return
    }

    loading.value = true

    try {
        await emit('search', {
            method: method.value,
            donorId: form.donorId,
            mobile: form.mobile,
            dob: form.dob,
        })
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <form class="space-y-5" @submit.prevent="submitForm">
        <div class="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            <button type="button" class="rounded-lg px-3 py-3 text-sm font-semibold transition"
                :class="method === 'donorId' ? 'bg-white text-[#E80E0E] shadow-sm' : 'text-slate-600'"
                @click="method = 'donorId'; error = ''">
                Donor ID
            </button>

            <button type="button" class="rounded-lg px-3 py-3 text-sm font-semibold transition"
                :class="method === 'mobile' ? 'bg-white text-[#E80E0E] shadow-sm' : 'text-slate-600'"
                @click="method = 'mobile'; error = ''">
                Mobile Number
            </button>
        </div>

        <div v-if="method === 'donorId'">
            <label class="form-label" for="certificate-donor-id">Donor ID</label>
            <input id="certificate-donor-id" v-model="form.donorId" class="form-input" placeholder="Example: DOH-123456"
                autocomplete="off" />
        </div>

        <div>
            <label class="form-label" for="certificate-mobile">Registered Mobile Number</label>
            <input id="certificate-mobile" v-model="form.mobile" class="form-input" type="tel" inputmode="numeric"
                maxlength="10" placeholder="Enter 10-digit mobile number" />
        </div>

        <div v-if="method === 'mobile'">
            <label class="form-label" for="certificate-dob">Date of Birth</label>
            <input id="certificate-dob" v-model="form.dob" class="form-input" type="date"
                :max="new Date().toISOString().slice(0, 10)" />
        </div>

        <p v-if="error" class="text-sm font-medium text-red-600">
            {{ error }}
        </p>

        <button type="submit" :disabled="loading"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E80E0E] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70">
            <LoaderCircle v-if="loading" class="h-5 w-5 animate-spin" />
            <Search v-else class="h-5 w-5" />
            {{ loading ? 'Searching...' : 'Find My Certificates' }}
        </button>

        <p class="text-center text-xs font-medium leading-5 text-slate-500">
            Your information is used only to find matching donation records.
        </p>
    </form>
</template>