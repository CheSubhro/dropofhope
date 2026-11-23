
<script setup>
defineProps({
    data: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <section class="bg-gray-50 py-20">
        <div class="mx-auto max-w-7xl px-5">

            <div class="mb-12 text-center">
                <span class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                    Together We Are Stronger
                </span>

                <h2 class="mt-3 text-3xl font-bold text-gray-900">
                    Our Partners
                </h2>

                <p class="mt-3 text-gray-500">
                    Organizations and institutions supporting our mission.
                </p>
            </div>

            <div class="grid grid-cols-2 gap-5 md:grid-cols-4">

                <div v-for="partner in data" :key="partner.id"
                    class="flex min-h-36 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 transition hover:shadow-md">
                    <img :src="partner.logo" :alt="partner.name" class="h-16 max-w-full object-contain" loading="lazy" />

                    <p class="mt-4 text-center text-sm font-semibold text-gray-600">
                        {{ partner.name }}
                    </p>
                </div>

            </div>

        </div>
    </section>
</template>
