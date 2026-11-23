
<script setup>
import { computed, ref } from 'vue'
import { Linkedin, Users } from 'lucide-vue-next'

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
})

const groups = ['All', 'Founders', 'Core Committee', 'Volunteers']
const activeGroup = ref('All')

const filteredMembers = computed(() => {
    if (activeGroup.value === 'All') return props.data

    return props.data.filter(
        member => member.group === activeGroup.value
    )
})
</script>

<template>
    <section id="team" class="py-20 md:py-24">
        <div class="mx-auto max-w-7xl px-5">

            <div class="text-center">
                <span class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                    The People Behind DropOfHope
                </span>

                <h2 class="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                    Meet Our Team
                </h2>

                <p class="mx-auto mt-4 max-w-xl text-gray-500">
                    Meet the passionate people working together to make every drop count.
                </p>
            </div>

            <div class="mt-10 flex flex-wrap justify-center gap-3">
                <button v-for="group in groups" :key="group" @click="activeGroup = group"
                    class="rounded-full px-5 py-2.5 text-sm font-semibold transition" :class="activeGroup === group
                        ? 'bg-[#E80E0E] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-[#E80E0E]'">
                    {{ group }}
                </button>
            </div>

            <div class="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                <article v-for="member in filteredMembers" :key="member.id"
                    class="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div class="relative overflow-hidden bg-gray-100">
                        <img :src="member.image" :alt="member.name"
                            class="h-72 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />

                        <span
                            class="absolute bottom-4 left-4 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#E80E0E] shadow">
                            {{ member.group }}
                        </span>
                    </div>

                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900">
                            {{ member.name }}
                        </h3>

                        <p class="mt-1 text-sm font-semibold text-[#E80E0E]">
                            {{ member.role }}
                        </p>

                        <p class="mt-4 text-sm leading-7 text-gray-500">
                            {{ member.bio }}
                        </p>
                    </div>
                </article>

            </div>

            <div v-if="filteredMembers.length === 0" class="py-12 text-center text-gray-500">
                No team members found.
            </div>

        </div>
    </section>
</template>
