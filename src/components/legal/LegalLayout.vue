
<script setup>
import { computed } from 'vue'
import { ChevronRight, ShieldCheck } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import TableOfContents from './TableOfContents.vue'
import { useActiveSection } from '@/composables/useActiveSection'

const props = defineProps({
    pageData: {
        type: Object,
        required: true,
    },
})

const sectionIds = computed(() =>
    props.pageData.sections.map((section) => section.id),
)

const { activeSection, setActiveSection } = useActiveSection(
    sectionIds.value,
)

const scrollToSection = (id) => {
    const element = document.getElementById(id)

    if (!element) return

    setActiveSection(id)

    const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        110

    window.scrollTo({
        top,
        behavior: 'smooth',
    })
}
</script>

<template>
    <div class="min-h-screen bg-white">
        <!-- Page Banner -->
        <section class="border-b border-slate-100 bg-slate-50">
            <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div class="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500">
                    <RouterLink to="/" class="transition hover:text-[#E80E0E]">
                        Home
                    </RouterLink>

                    <ChevronRight class="h-4 w-4" />

                    <span class="font-semibold text-slate-800">
                        {{ pageData.title }}
                    </span>
                </div>

                <div class="flex items-start gap-4">
                    <div class="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 sm:flex">
                        <ShieldCheck class="h-7 w-7 text-[#E80E0E]" />
                    </div>

                    <div>
                        <p class="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#E80E0E]">
                            Your Privacy Matters
                        </p>

                        <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            {{ pageData.title }}
                        </h1>

                        <p class="mt-3 text-sm font-medium text-slate-500">
                            Last updated: {{ pageData.lastUpdated }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Legal Content -->
        <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
                <!-- Sidebar -->
                <div class="print:hidden">
                    <TableOfContents :sections="pageData.sections" :active-section="activeSection"
                        @navigate="scrollToSection" />
                </div>

                <!-- Main Content -->
                <main class="min-w-0">
                    <div class="mb-10 rounded-2xl border border-red-100 bg-red-50/60 p-5 sm:p-6">
                        <p class="text-base font-medium leading-8 text-slate-700">
                            {{ pageData.intro }}
                        </p>
                    </div>

                    <div class="max-w-3xl space-y-12">
                        <article v-for="(section, index) in pageData.sections" :id="section.id" :key="section.id"
                            class="scroll-mt-28">
                            <div class="mb-4 flex items-start gap-3">
                                <span
                                    class="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-[#E80E0E]">
                                    {{ String(index + 1).padStart(2, '0') }}
                                </span>

                                <h2 class="text-xl font-bold leading-8 text-slate-900 sm:text-2xl">
                                    {{ section.title }}
                                </h2>
                            </div>

                            <div class="space-y-4 pl-10">
                                <p v-for="(paragraph, paragraphIndex) in section.paragraphs"
                                    :key="`before-${paragraphIndex}`"
                                    class="text-base font-medium leading-8 text-slate-700">
                                    {{ paragraph }}
                                </p>

                                <ul v-if="section.bullets?.length" class="space-y-3">
                                    <li v-for="(bullet, bulletIndex) in section.bullets" :key="bulletIndex"
                                        class="flex items-start gap-3 text-base font-medium leading-8 text-slate-700">
                                        <span class="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#E80E0E]"></span>
                                        <span>{{ bullet }}</span>
                                    </li>
                                </ul>

                                <p v-for="(paragraph, paragraphIndex) in section.paragraphsAfter || []"
                                    :key="`after-${paragraphIndex}`" class="text-base font-medium leading-8 text-slate-700">
                                    {{ paragraph }}
                                </p>

                                <div v-if="section.id === 'contact'"
                                    class="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                                    <h3 class="mb-4 text-lg font-bold text-slate-900">
                                        {{ pageData.contact.organization }}
                                    </h3>

                                    <div class="space-y-3 text-sm font-medium text-slate-700">
                                        <p>
                                            <span class="font-bold text-slate-900">Email:</span>
                                            <a :href="`mailto:${pageData.contact.email}`"
                                                class="ml-1 text-[#E80E0E] hover:underline">
                                                {{ pageData.contact.email }}
                                            </a>
                                        </p>

                                        <p>
                                            <span class="font-bold text-slate-900">Phone:</span>
                                            <a :href="`tel:${pageData.contact.phone}`"
                                                class="ml-1 text-[#E80E0E] hover:underline">
                                                {{ pageData.contact.phone }}
                                            </a>
                                        </p>

                                        <p class="leading-7">
                                            <span class="font-bold text-slate-900">Address:</span>
                                            {{ pageData.contact.address }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>

                    <!-- Bottom Actions -->
                    <div class="mt-14 max-w-3xl border-t border-slate-200 pt-8 print:hidden">
                        <div class="rounded-2xl bg-slate-50 p-6 sm:p-8">
                            <h3 class="text-xl font-bold text-slate-900">
                                Questions About Your Privacy?
                            </h3>

                            <p class="mt-2 text-sm font-medium leading-7 text-slate-600">
                                Contact our team if you have questions about this policy or want to make a privacy-related
                                request.
                            </p>

                            <div class="mt-6 flex flex-wrap gap-3">
                                <a :href="`mailto:${pageData.contact.email}?subject=Privacy%20Enquiry`"
                                    class="inline-flex items-center justify-center rounded-xl bg-[#E80E0E] px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                                    Contact Us
                                </a>

                                <button type="button"
                                    class="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                                    @click="window.print()">
                                    Print This Page
                                </button>
                            </div>

                            <div class="mt-6 border-t border-slate-200 pt-5">
                                <p class="text-sm font-medium text-slate-600">
                                    Please also read our
                                    <RouterLink :to="pageData.contact.termsLink"
                                        class="font-bold text-[#E80E0E] hover:underline">
                                        Terms & Conditions
                                    </RouterLink>
                                    for information about using this website.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    </div>
</template>
