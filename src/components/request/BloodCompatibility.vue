
<script setup>
defineProps({
    compatibility: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <section class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div class="mb-6">
            <span class="text-sm font-bold uppercase tracking-wider text-red-600">
                Blood Information
            </span>

            <h2 class="mt-2 text-2xl font-bold text-slate-900">
                Blood Group Compatibility
            </h2>

            <p class="mt-2 text-sm font-medium leading-7 text-slate-700">
                General red blood cell compatibility reference.
            </p>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full min-w-[560px] text-left text-sm">
                <thead>
                    <tr class="border-b border-slate-200 bg-slate-50">
                        <th class="px-4 py-4 font-bold text-slate-900">Blood Group</th>
                        <th class="px-4 py-4 font-bold text-slate-900">Can Donate To</th>
                        <th class="px-4 py-4 font-bold text-slate-900">Can Receive From</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in compatibility" :key="item.group" class="border-b border-slate-100 last:border-0">
                        <td class="px-4 py-4">
                            <span class="inline-flex rounded-lg bg-red-50 px-3 py-1.5 font-bold text-red-700">
                                {{ item.group }}
                            </span>
                        </td>

                        <td class="px-4 py-4 font-medium text-slate-800">
                            {{ item.canDonate }}
                        </td>

                        <td class="px-4 py-4 font-medium text-slate-800">
                            {{ item.canReceive }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-5 rounded-lg bg-amber-50 p-4">
            <p class="text-sm font-semibold leading-6 text-amber-900">
                Important: This chart is a general reference for red blood cell transfusions only. Actual compatibility must
                be confirmed by the hospital through blood grouping, crossmatching and medical assessment.
            </p>
        </div>
    </section>
</template>
