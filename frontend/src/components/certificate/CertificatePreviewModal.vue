<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { X } from 'lucide-vue-next'
import CertificateTemplate from './CertificateTemplate.vue'

const props = defineProps({
    certificate: {
        type: Object,
        default: null,
    },
    orgInfo: {
        type: Object,
        required: true,
    },
    signatory: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['close'])

function handleEscape(event) {
    if (event.key === 'Escape') emit('close')
}

watch(
    () => props.certificate,
    (value) => {
        document.body.style.overflow = value ? 'hidden' : ''
    },
    { immediate: true },
)

onMounted(() => window.addEventListener('keydown', handleEscape))

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
})
</script>

<template>
    <Teleport to="body">
        <div v-if="certificate" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 sm:p-6"
            @click.self="emit('close')">
            <div class="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <h3 class="font-bold text-slate-900">Certificate Preview</h3>
                        <p class="text-xs font-medium text-slate-500">
                            {{ certificate.certificateId }}
                        </p>
                    </div>

                    <button type="button" class="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                        aria-label="Close preview" @click="emit('close')">
                        <X class="h-5 w-5" />
                    </button>
                </div>

                <div class="overflow-auto bg-slate-100 p-4">
                    <div class="mx-auto w-fit origin-top-left scale-[0.32] sm:scale-[0.55] lg:scale-[0.75]">
                        <CertificateTemplate :certificate="certificate" :org-info="orgInfo" :signatory="signatory" />
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>