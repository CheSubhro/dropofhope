
<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import {
    X,
    MapPin,
    Clock,
    Phone,
    MessageCircle,
    GraduationCap,
    BriefcaseMedical,
    Languages,
    ShieldCheck,
    UserRound,
    IndianRupee,
    ExternalLink,
} from 'lucide-vue-next'

const props = defineProps({
    doctor: {
        type: Object,
        default: null,
    },
    open: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['close'])

const close = () => emit('close')

const handleKeydown = (event) => {
    if (event.key === 'Escape') close()
}

watch(
    () => props.open,
    (value) => {
        document.body.style.overflow = value ? 'hidden' : ''
    },
)

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
})

const formatPhone = (value) => {
    return String(value || '').replace(/\D/g, '')
}
</script>

<template>
    <Teleport to="body">
        <div v-if="open && doctor" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4"
            @click.self="close">
            <div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                <div
                    class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
                    <h2 class="text-lg font-bold text-slate-900">
                        Doctor Profile
                    </h2>

                    <button type="button" @click="close" aria-label="Close doctor profile"
                        class="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-red-50 hover:text-[#E80E0E]">
                        <X :size="21" />
                    </button>
                </div>

                <div class="p-6 sm:p-8">
                    <div class="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div
                            class="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-red-50 text-4xl font-bold text-[#E80E0E]">
                            <img v-if="doctor.image" :src="doctor.image" :alt="doctor.name"
                                class="h-full w-full object-cover" />
                            <span v-else>{{ doctor.name?.charAt(0) }}</span>
                        </div>

                        <div>
                            <div class="flex flex-wrap items-center gap-2">
                                <h3 class="text-2xl font-bold text-slate-900">
                                    {{ doctor.name }}
                                </h3>

                                <span v-if="doctor.verified"
                                    class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
                                    <ShieldCheck :size="14" />
                                    Verified
                                </span>
                            </div>

                            <p class="mt-2 font-semibold text-slate-700">
                                {{ doctor.qualification }}
                            </p>

                            <span
                                class="mt-3 inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-[#E80E0E]">
                                {{ doctor.specialty }}
                            </span>
                        </div>
                    </div>

                    <div class="mt-7 rounded-xl bg-slate-50 p-5">
                        <h4 class="font-bold text-slate-900">
                            About the Doctor
                        </h4>
                        <p class="mt-3 text-sm font-medium leading-7 text-slate-700">
                            {{ doctor.introduction || 'No additional profile information is available.' }}
                        </p>
                    </div>

                    <div class="mt-7 grid gap-5 sm:grid-cols-2">
                        <div class="flex items-start gap-3">
                            <GraduationCap :size="20" class="mt-0.5 shrink-0 text-[#E80E0E]" />
                            <div>
                                <p class="text-xs font-semibold text-slate-500">Qualification</p>
                                <p class="mt-1 text-sm font-bold text-slate-900">
                                    {{ doctor.qualification }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <BriefcaseMedical :size="20" class="mt-0.5 shrink-0 text-[#E80E0E]" />
                            <div>
                                <p class="text-xs font-semibold text-slate-500">Experience</p>
                                <p class="mt-1 text-sm font-bold text-slate-900">
                                    {{ doctor.experience }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <UserRound :size="20" class="mt-0.5 shrink-0 text-[#E80E0E]" />
                            <div>
                                <p class="text-xs font-semibold text-slate-500">Hospital / Clinic</p>
                                <p class="mt-1 text-sm font-bold text-slate-900">
                                    {{ doctor.hospital }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <IndianRupee :size="20" class="mt-0.5 shrink-0 text-[#E80E0E]" />
                            <div>
                                <p class="text-xs font-semibold text-slate-500">Consultation Fee</p>
                                <p class="mt-1 text-sm font-bold text-slate-900">
                                    {{ doctor.fee ? `₹${doctor.fee}` : 'Contact for fee' }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <MapPin :size="20" class="mt-0.5 shrink-0 text-[#E80E0E]" />
                            <div>
                                <p class="text-xs font-semibold text-slate-500">Chamber Address</p>
                                <p class="mt-1 text-sm font-bold text-slate-900">
                                    {{ doctor.address }}, {{ doctor.district }}, West Bengal
                                </p>

                                <a v-if="doctor.mapLink" :href="doctor.mapLink" target="_blank" rel="noopener noreferrer"
                                    class="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#E80E0E] hover:underline">
                                    View on Google Maps
                                    <ExternalLink :size="13" />
                                </a>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <Clock :size="20" class="mt-0.5 shrink-0 text-[#E80E0E]" />
                            <div>
                                <p class="text-xs font-semibold text-slate-500">Chamber Schedule</p>
                                <p class="mt-1 text-sm font-bold text-slate-900">
                                    {{ doctor.schedule }}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3 sm:col-span-2">
                            <Languages :size="20" class="mt-0.5 shrink-0 text-[#E80E0E]" />
                            <div>
                                <p class="text-xs font-semibold text-slate-500">Languages</p>
                                <p class="mt-1 text-sm font-bold text-slate-900">
                                    {{ doctor.languages.join(', ') }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 grid gap-3 sm:grid-cols-2">
                        <a v-if="doctor.phone" :href="`tel:${formatPhone(doctor.phone)}`"
                            class="flex items-center justify-center gap-2 rounded-xl bg-[#E80E0E] px-5 py-3 font-bold text-white hover:bg-red-700">
                            <Phone :size="18" />
                            Call Doctor
                        </a>

                        <button v-else type="button" disabled
                            class="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-red-100 px-5 py-3 font-bold text-red-400">
                            <Phone :size="18" />
                            Call Unavailable
                        </button>

                        <a v-if="doctor.whatsapp" :href="`https://wa.me/${formatPhone(doctor.whatsapp)}`" target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700">
                            <MessageCircle :size="18" />
                            WhatsApp
                        </a>

                        <button v-else type="button" disabled
                            class="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-green-100 px-5 py-3 font-bold text-green-400">
                            <MessageCircle :size="18" />
                            WhatsApp Unavailable
                        </button>
                    </div>

                    <p class="mt-5 text-xs font-medium leading-6 text-slate-600">
                        Please confirm the doctor's availability, consultation fee,
                        and chamber schedule before visiting.
                    </p>
                </div>
            </div>
        </div>
    </Teleport>
</template>
