
<script setup>
defineProps({
    requests: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <section class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <span class="text-sm font-bold uppercase tracking-wider text-red-600">
                    Help Someone Today
                </span>

                <h2 class="mt-2 text-2xl font-bold text-slate-900">
                    Open Blood Requests
                </h2>

                <p class="mt-2 text-sm font-medium text-slate-700">
                    Verified requests waiting for potential donors.
                </p>
            </div>

            <span
                class="inline-flex w-fit items-center rounded-full bg-green-50 px-3 py-2 text-sm font-bold text-green-700">
                {{ requests.length }} Open Requests
            </span>
        </div>

        <div v-if="requests.length" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article v-for="item in requests" :key="item.id"
                class="rounded-xl border border-slate-200 p-5 transition hover:border-red-200 hover:shadow-md">
                <div class="flex items-center justify-between">
                    <span class="rounded-lg bg-red-50 px-4 py-2 text-xl font-extrabold text-red-600">
                        {{ item.group }}
                    </span>

                    <span class="rounded-full px-3 py-1 text-xs font-bold" :class="item.urgency === 'Immediately'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-800'">
                        {{ item.urgency }}
                    </span>
                </div>

                <h3 class="mt-4 font-bold text-slate-900">
                    {{ item.hospital }}
                </h3>

                <p class="mt-1 text-sm font-medium text-slate-700">
                    {{ item.city }}, {{ item.district }}
                </p>

                <div class="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
                    <div class="flex justify-between gap-2">
                        <span class="font-medium text-slate-600">Units Required</span>
                        <span class="font-bold text-slate-900">{{ item.units }}</span>
                    </div>

                    <div class="flex justify-between gap-2">
                        <span class="font-medium text-slate-600">Blood Type</span>
                        <span class="font-bold text-slate-900">{{ item.bloodType }}</span>
                    </div>
                </div>

                <div class="mt-4 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>{{ item.id }}</span>
                    <span>{{ item.createdAt }}</span>
                </div>

                <a href="#request-form"
                    class="mt-5 flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                    Contact Our Team
                </a>
            </article>
        </div>

        <div v-else class="rounded-xl bg-slate-50 px-5 py-12 text-center">
            <h3 class="font-bold text-slate-900">
                No Open Requests
            </h3>
            <p class="mt-2 text-sm font-medium text-slate-700">
                There are currently no approved blood requests.
            </p>
        </div>

        <p class="mt-5 text-xs font-medium leading-6 text-slate-600">
            Only verified public information is displayed. Personal patient and contact details remain private.
        </p>
    </section>
</template>
