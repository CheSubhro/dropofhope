
<script setup>
import {
    HandHeart,
    Handshake,
    ShieldCheck,
    Check,
} from 'lucide-vue-next'

defineProps({
    types: {
        type: Array,
        default: () => [],
    },
    selectedType: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['select'])

const iconMap = {
    HandHeart,
    Handshake,
    ShieldCheck,
}
</script>

<template>
    <section class="bg-slate-50 py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-5">
            <div class="mx-auto mb-12 max-w-2xl text-center">
                <span class="text-sm font-bold uppercase tracking-wider text-[#E80E0E]">
                    Membership Categories
                </span>

                <h2 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                    Choose Your Membership
                </h2>

                <p class="mt-4 text-base font-medium leading-7 text-slate-700">
                    Choose the membership category that best matches your interests
                    and availability.
                </p>
            </div>

            <div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
                <button v-for="type in types" :key="type.id" type="button" @click="emit('select', type.id)"
                    class="rounded-2xl border-2 p-6 text-left transition duration-300" :class="selectedType === type.id
                            ? 'border-[#E80E0E] bg-red-50 shadow-md'
                            : 'border-slate-200 bg-white hover:border-red-200 hover:shadow-md'
                        ">
                    <div class="flex items-start justify-between">
                        <div class="flex h-14 w-14 items-center justify-center rounded-xl" :class="selectedType === type.id
                                ? 'bg-[#E80E0E] text-white'
                                : 'bg-red-50 text-[#E80E0E]'
                            ">
                            <component :is="iconMap[type.icon]" :size="28" :stroke-width="1.8" />
                        </div>

                        <span v-if="selectedType === type.id"
                            class="flex h-7 w-7 items-center justify-center rounded-full bg-[#E80E0E] text-white">
                            <Check :size="16" />
                        </span>
                    </div>

                    <p class="mt-6 text-sm font-semibold text-[#E80E0E]">
                        {{ type.subtitle }}
                    </p>

                    <h3 class="mt-1 text-2xl font-bold text-slate-900">
                        {{ type.name }}
                    </h3>

                    <p class="mt-3 text-sm font-medium leading-6 text-slate-700">
                        {{ type.description }}
                    </p>

                    <div class="mt-5 border-t border-slate-200 pt-5">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-slate-700">
                                Membership Fee
                            </span>

                            <span class="text-lg font-bold text-green-700">
                                {{ type.fee }}
                            </span>
                        </div>

                        <ul class="mt-5 space-y-3">
                            <li v-for="feature in type.features" :key="feature"
                                class="flex items-start gap-2 text-sm font-medium text-slate-700">
                                <Check :size="17" class="mt-0.5 shrink-0 text-green-600" />
                                <span>{{ feature }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-6 rounded-lg py-3 text-center text-sm font-bold transition" :class="selectedType === type.id
                            ? 'bg-[#E80E0E] text-white'
                            : 'bg-red-50 text-[#E80E0E]'
                        ">
                        {{ selectedType === type.id ? 'Selected' : 'Select Membership' }}
                    </div>
                </button>
            </div>
        </div>
    </section>
</template>
