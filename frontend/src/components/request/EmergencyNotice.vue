
<script setup>
defineProps({
    helpline: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <div class="rounded-xl border border-red-200 bg-red-50 p-4 sm:p-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2">
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                </div>

                <div>
                    <h3 class="font-bold text-red-800">
                        Medical Emergency?
                    </h3>

                    <p class="mt-1 text-sm font-medium leading-6 text-red-800">
                        In a life-threatening emergency, contact the hospital blood bank or emergency services immediately.
                        Do not wait for an online response.
                    </p>

                    <p class="mt-1 text-xs font-medium text-red-700">
                        Donor availability cannot be guaranteed.
                    </p>
                </div>
            </div>

            <a :href="`tel:${helpline.number}`"
                class="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                Call Helpline
            </a>
        </div>
    </div>
</template>
