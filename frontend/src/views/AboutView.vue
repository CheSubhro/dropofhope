
<script setup>
import { computed } from 'vue'

import {
    getAboutPageData,
    getHomeData,
} from '@/services/contentService'

import { useAsyncData } from '@/composables/useAsyncData'

// About components
import AboutHero from '@/components/about/AboutHero.vue'
import WhoWeAre from '@/components/about/WhoWeAre.vue'
import MissionVision from '@/components/about/MissionVision.vue'
import WhatWeDo from '@/components/about/WhatWeDo.vue'
import Timeline from '@/components/about/Timeline.vue'
import TeamGrid from '@/components/about/TeamGrid.vue'
import PartnersRow from '@/components/about/PartnersRow.vue'
import CtaBanner from '@/components/about/CtaBanner.vue'

// Existing Home component
import ImpactSection from '@/components/home/ImpactSection.vue'

// Fetch both About and Home data
const { data, loading, error, reload } = useAsyncData(
    async () => {
        const [aboutData, homeData] = await Promise.all([
            getAboutPageData(),
            getHomeData(),
        ])

        return {
            about: aboutData,
            home: homeData,
        }
    }
)

const about = computed(() => data.value?.about)
const home = computed(() => data.value?.home)
</script>

<template>
    <main>

        <!-- Loading -->
        <div v-if="loading" class="flex min-h-[50vh] items-center justify-center">
            <div class="text-center">
                <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-red-100 border-t-[#E80E0E]"></div>
                <p class="mt-4 text-sm text-gray-500">
                    Loading About Us...
                </p>
            </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="py-24 text-center">
            <h2 class="text-2xl font-bold">
                Unable to load About Us
            </h2>

            <button @click="reload" class="mt-6 rounded-xl bg-[#E80E0E] px-6 py-3 text-white">
                Try Again
            </button>
        </div>

        <!-- Page Content -->
        <template v-else-if="about && home">

            <AboutHero :data="about.hero" />

            <WhoWeAre :data="about.story" />

            <MissionVision :data="{
                mission: about.mission,
                vision: about.vision,
                values: about.values
            }" />

            <WhatWeDo :data="about.services" />

            <Timeline :data="about.timeline" />

            <!-- Reusing Home Impact Section -->
            <ImpactSection :impact="home.impact" />

            <TeamGrid :data="about.team" />

            <PartnersRow :data="about.partners" />

            <CtaBanner :data="about.cta" />

        </template>

    </main>
</template>
