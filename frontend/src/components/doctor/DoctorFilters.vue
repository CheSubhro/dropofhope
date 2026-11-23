
<script setup>
import { ref } from 'vue'
import {
    Search,
    SlidersHorizontal,
    ChevronDown,
    RotateCcw,
} from 'lucide-vue-next'

const props = defineProps({
    filters: {
        type: Object,
        required: true,
    },
    specialties: {
        type: Array,
        default: () => [],
    },
    districts: {
        type: Array,
        default: () => [],
    },
    languages: {
        type: Array,
        default: () => [],
    },
    genders: {
        type: Array,
        default: () => [],
    },
    resultCount: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits(['update:filters', 'clear'])

const expanded = ref(true)

const updateFilter = (key, value) => {
    emit('update:filters', {
        ...props.filters,
        [key]: value,
    })
}
</script>

<template>
    <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#E80E0E]">
                    <SlidersHorizontal :size="21" />
                </div>

                <div>
                    <h2 class="text-lg font-bold text-slate-900">
                        Find Your Doctor
                    </h2>
                    <p class="text-sm font-medium text-slate-600">
                        Search and filter available profiles
                    </p>
                </div>
            </div>

            <button type="button"
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 lg:hidden"
                @click="expanded = !expanded">
                Filters
                <ChevronDown :size="18" :class="expanded ? 'rotate-180' : ''" class="transition-transform" />
            </button>
        </div>

        <div class="mt-6" :class="expanded ? 'block' : 'hidden lg:block'">
            <div class="relative">
                <Search :size="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input :value="filters.search" @input="updateFilter('search', $event.target.value)" type="search"
                    placeholder="Search doctor name or hospital..." class="form-input pl-12" />
            </div>

            <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <label class="form-label" for="doctor-specialty">
                        Specialty
                    </label>
                    <select id="doctor-specialty" :value="filters.specialty"
                        @change="updateFilter('specialty', $event.target.value)" class="form-input">
                        <option value="">All Specialties</option>
                        <option v-for="specialty in specialties" :key="specialty" :value="specialty">
                            {{ specialty }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="form-label" for="doctor-district">
                        District
                    </label>
                    <select id="doctor-district" :value="filters.district"
                        @change="updateFilter('district', $event.target.value)" class="form-input">
                        <option value="">All Districts</option>
                        <option v-for="district in districts" :key="district" :value="district">
                            {{ district }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="form-label" for="doctor-language">
                        Language
                    </label>
                    <select id="doctor-language" :value="filters.language"
                        @change="updateFilter('language', $event.target.value)" class="form-input">
                        <option value="">All Languages</option>
                        <option v-for="language in languages" :key="language" :value="language">
                            {{ language }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="form-label" for="doctor-gender">
                        Gender
                    </label>
                    <select id="doctor-gender" :value="filters.gender" @change="updateFilter('gender', $event.target.value)"
                        class="form-input">
                        <option value="">All Genders</option>
                        <option v-for="gender in genders" :key="gender" :value="gender">
                            {{ gender }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <p class="text-sm font-semibold text-slate-700">
                    <span class="text-lg font-bold text-[#E80E0E]">
                        {{ resultCount }}
                    </span>
                    doctors found
                </p>

                <button type="button" @click="emit('clear')"
                    class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-[#E80E0E] transition hover:bg-red-50">
                    <RotateCcw :size="16" />
                    Clear Filters
                </button>
            </div>
        </div>
    </section>
</template>
