<script setup>
defineProps({ notices: { type: Array, default: () => [] } })
</script>

<template>
    <div v-if="notices.length" class="group flex items-center overflow-hidden bg-[#4A4D7D] text-white">
        <div class="relative flex-1 overflow-hidden">
            <div class="flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
                <div v-for="n in 2" :key="n" class="flex shrink-0 items-center">
                    <span v-for="item in notices" :key="`${n}-${item.id}`" class="flex items-center px-6 py-2 text-sm font-medium">
                        {{ item.text }}
                        <span class="ml-12 text-rose-400">●</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>