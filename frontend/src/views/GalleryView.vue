
<script setup>
import { computed, ref, watch } from 'vue'
import { useAsyncData } from '@/composables/useAsyncData'
import { getGalleryData } from '@/services/contentService'
import { useLightbox } from '@/composables/useLightbox'

import GalleryHero from '@/components/gallery/GalleryHero.vue'
import GalleryFilters from '@/components/gallery/GalleryFilters.vue'
import PhotoGrid from '@/components/gallery/PhotoGrid.vue'
import Lightbox from '@/components/gallery/Lightbox.vue'
import CtaBanner from '@/components/about/CtaBanner.vue'

import { LoaderCircle, RefreshCw } from 'lucide-vue-next'

const { data, loading, error, reload } = useAsyncData(getGalleryData)

const activeCategory = ref('all')
const visibleCount = ref(12)

const gallery = computed(() => data.value)

const filteredPhotos = computed(() => {
    if (!gallery.value) return []

    if (activeCategory.value === 'all') {
        return gallery.value.photos
    }

    return gallery.value.photos.filter(
        (photo) => photo.category === activeCategory.value
    )
})

const categoryCounts = computed(() => {
    if (!gallery.value) return {}

    const counts = {
        all: gallery.value.photos.length,
    }

    gallery.value.categories.forEach((category) => {
        if (category.id !== 'all') {
            counts[category.id] = gallery.value.photos.filter(
                (photo) => photo.category === category.id
            ).length
        }
    })

    return counts
})

const visiblePhotos = computed(() => {
    return filteredPhotos.value.slice(0, visibleCount.value)
})

const hasMore = computed(() => {
    return visibleCount.value < filteredPhotos.value.length
})

const lightbox = useLightbox(filteredPhotos)

watch(activeCategory, () => {
    visibleCount.value = 12
    lightbox.close()
})

function selectCategory(category) {
    activeCategory.value = category
}

function loadMore() {
    visibleCount.value += 8
}
</script>

<template>
    <main>
        <GalleryHero v-if="gallery" :data="gallery.hero" />

        <section class="bg-slate-50 py-14 sm:py-16">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <!-- Loading -->
                <div v-if="loading" class="flex min-h-72 items-center justify-center">
                    <div class="text-center">
                        <LoaderCircle class="mx-auto animate-spin text-[#E80E0E]" :size="38" />
                        <p class="mt-3 text-sm text-slate-500">Loading gallery...</p>
                    </div>
                </div>

                <!-- Error -->
                <div v-else-if="error" class="rounded-2xl bg-white p-10 text-center shadow-sm">
                    <h2 class="text-xl font-bold text-slate-900">
                        Unable to load gallery
                    </h2>

                    <p class="mt-2 text-sm text-slate-500">
                        Please try again.
                    </p>

                    <button type="button"
                        class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E80E0E] px-5 py-3 text-sm font-bold text-white"
                        @click="reload">
                        <RefreshCw :size="16" />
                        Try Again
                    </button>
                </div>

                <!-- Gallery Content -->
                <template v-else-if="gallery">

                    <!-- Section Heading -->
                    <div class="mb-8 text-center">
                        <p class="text-sm font-bold uppercase tracking-widest text-[#E80E0E]">
                            Captured Memories
                        </p>

                        <h2 class="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            Our Photo Gallery
                        </h2>

                        <p class="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                            Every picture tells a story of compassion, kindness and community.
                        </p>
                    </div>

                    <!-- Category Filters -->
                    <GalleryFilters :categories="gallery.categories" :active-category="activeCategory"
                        :counts="categoryCounts" @select="selectCategory" />

                    <!-- Result Count -->
                    <div class="mb-6 mt-10 flex items-center justify-between">
                        <h3 class="text-lg font-bold text-slate-900">
                            {{ gallery.categories.find(c => c.id === activeCategory)?.name }}
                        </h3>

                        <p class="text-sm text-slate-500">
                            Showing {{ visiblePhotos.length }} of {{ filteredPhotos.length }} photos
                        </p>
                    </div>

                    <!-- Photo Grid -->
                    <PhotoGrid :photos="visiblePhotos" @open="(index) => lightbox.open(index)" />

                    <!-- Load More -->
                    <div v-if="hasMore" class="mt-10 text-center">
                        <button type="button"
                            class="rounded-xl border-2 border-[#E80E0E] px-8 py-3 text-sm font-bold text-[#E80E0E] transition hover:bg-[#E80E0E] hover:text-white"
                            @click="loadMore">
                            Load More Photos
                        </button>
                    </div>

                    <!-- Lightbox -->
                    <Lightbox :show="lightbox.isOpen.value" :photo="lightbox.currentPhoto.value"
                        :current-index="lightbox.currentIndex.value" :total="filteredPhotos.length" @close="lightbox.close"
                        @next="lightbox.next" @previous="lightbox.previous" @touch-start="lightbox.handleTouchStart"
                        @touch-end="lightbox.handleTouchEnd" />

                    <!-- CTA -->
                    <div class="mt-20">
                        <CtaBanner :data="gallery.cta" />
                    </div>

                </template>
            </div>
        </section>
    </main>
</template>
