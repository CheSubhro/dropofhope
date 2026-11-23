
<script setup>
import {
    MapPin,
    Clock,
    BriefcaseMedical,
    Phone,
    MessageCircle,
    ArrowRight,
    ShieldCheck,
    UserRound,
} from 'lucide-vue-next'

defineProps({
    doctor: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['view'])

const formatPhone = (value) => {
    return String(value || '').replace(/\D/g, '')
}
</script>

<template>
    <article
        class="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg">
        <div class="flex items-start gap-4">
            <div
                class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-red-50 text-2xl font-bold text-[#E80E0E]">
                <img v-if="doctor.image" :src="doctor.image" :alt="doctor.name" class="h-full w-full object-cover" />
                <span v-else>{{ doctor.name?.charAt(0) || 'D' }}</span>
            </div>

            <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                    <h3 class="text-base font-bold text-slate-900">
                        {{ doctor.name }}
                    </h3>

                    <span v-if="doctor.verified"
                        class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
                        <ShieldCheck :size="13" />
                        Verified
                    </span>
                </div>

                <p class="mt-1 text-sm font-semibold text-slate-700">
                    {{ doctor.qualification }}
                </p>

                <span class="mt-2 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E80E0E]">
                    {{ doctor.specialty }}
                </span>
            </div>
        </div>

        <div class="mt-5 space-y-3">
            <div class="flex items-start gap-2 text-sm font-medium text-slate-700">
                <BriefcaseMedical :size="17" class="mt-0.5 shrink-0 text-slate-500" />
                <span>{{ doctor.experience }} experience</span>
            </div>

            <div class="flex items-start gap-2 text-sm font-medium text-slate-700">
                <UserRound :size="17" class="mt-0.5 shrink-0 text-slate-500" />
                <span>{{ doctor.hospital }}</span>
            </div>

            <div class="flex items-start gap-2 text-sm font-medium text-slate-700">
                <MapPin :size="17" class="mt-0.5 shrink-0 text-slate-500" />
                <span>{{ doctor.district }}, West Bengal</span>
            </div>

            <div class="flex items-start gap-2 text-sm font-medium text-slate-700">
                <Clock :size="17" class="mt-0.5 shrink-0 text-slate-500" />
                <span>{{ doctor.schedule }}</span>
            </div>
        </div>

        <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
                <p class="text-xs font-semibold text-slate-500">Consultation Fee</p>
                <p class="mt-1 text-lg font-bold text-slate-900">
                    {{ doctor.fee ? `₹${doctor.fee}` : 'Contact for fee' }}
                </p>
            </div>

            <span class="text-xs font-medium text-slate-500">
                Confirm before visiting
            </span>
        </div>

        <div class="mt-auto grid grid-cols-2 gap-3 pt-5">
            <a v-if="doctor.phone" :href="`tel:${formatPhone(doctor.phone)}`"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E80E0E] px-3 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                <Phone :size="16" />
                Call
            </a>

            <button v-else type="button" disabled
                class="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-red-100 px-3 py-3 text-sm font-bold text-red-400">
                <Phone :size="16" />
                Call
            </button>

            <a v-if="doctor.whatsapp" :href="`https://wa.me/${formatPhone(doctor.whatsapp)}`" target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-green-700">
                <MessageCircle :size="16" />
                WhatsApp
            </a>

            <button v-else type="button" disabled
                class="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-green-100 px-3 py-3 text-sm font-bold text-green-400">
                <MessageCircle :size="16" />
                WhatsApp
            </button>
        </div>

        <button type="button" @click="emit('view', doctor)"
            class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-[#E80E0E] hover:bg-red-50 hover:text-[#E80E0E]">
            View Profile
            <ArrowRight :size="16" />
        </button>
    </article>
</template>
