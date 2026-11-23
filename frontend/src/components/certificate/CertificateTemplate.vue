<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import QRCode from 'qrcode'

const props = defineProps({
    certificate: {
        type: Object,
        required: true,
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

const qrCode = ref('')

const verificationUrl = computed(() => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}/download-certificate?verify=${encodeURIComponent(props.certificate.certificateId)}`
})

async function generateQrCode() {
    if (!verificationUrl.value) return

    qrCode.value = await QRCode.toDataURL(verificationUrl.value, {
        width: 180,
        margin: 1,
        errorCorrectionLevel: 'M',
    })
}

watch(
    () => props.certificate.certificateId,
    generateQrCode,
    { immediate: true },
)

onMounted(generateQrCode)

function formatDate(value) {
    if (!value) return ''
    return new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}
</script>

<template>
    <div class="certificate-sheet relative mx-auto overflow-hidden bg-white text-slate-800">
        <div class="certificate-border">
            <div class="certificate-inner">
                <div class="certificate-top">
                    <div class="certificate-logo">
                        <span class="drop-symbol">♥</span>
                    </div>

                    <div class="text-center">
                        <p class="text-xs font-bold tracking-[0.3em] text-red-600">
                            {{ orgInfo.name }}
                        </p>
                        <p class="mt-1 text-[10px] font-medium text-slate-500">
                            {{ orgInfo.tagline }}
                        </p>
                    </div>
                </div>

                <div class="certificate-content">
                    <p class="text-xs font-bold uppercase tracking-[0.35em] text-emerald-700">
                        Certificate of Appreciation
                    </p>

                    <div class="certificate-divider"></div>

                    <p class="mt-5 text-sm font-medium text-slate-500">
                        This certificate is proudly presented to
                    </p>

                    <h1 class="certificate-name">
                        {{ certificate.donorName }}
                    </h1>

                    <p class="mt-3 text-sm font-medium text-slate-600">
                        In recognition of the selfless act of donating blood and helping
                        save lives.
                    </p>

                    <div class="certificate-details">
                        <div>
                            <span>Donation Date</span>
                            <strong>{{ formatDate(certificate.donationDate) }}</strong>
                        </div>
                        <div>
                            <span>Blood Group</span>
                            <strong>{{ certificate.bloodGroup }}</strong>
                        </div>
                        <div>
                            <span>Donation Camp</span>
                            <strong>{{ certificate.campName }}</strong>
                        </div>
                        <div>
                            <span>Location</span>
                            <strong>{{ certificate.location }}</strong>
                        </div>
                    </div>
                </div>

                <div class="certificate-footer">
                    <div class="certificate-number">
                        <p>Certificate Number</p>
                        <strong>{{ certificate.certificateId }}</strong>
                        <p class="mt-2">{{ formatDate(certificate.donationDate) }}</p>
                    </div>

                    <div class="certificate-signature">
                        <div class="signature-line"></div>
                        <strong>{{ signatory.name }}</strong>
                        <span>{{ signatory.designation }}</span>
                        <span>{{ orgInfo.name }}</span>
                    </div>

                    <div class="certificate-qr">
                        <img v-if="qrCode" :src="qrCode" alt="Certificate verification QR code" />
                        <span>Scan to verify</span>
                    </div>
                </div>

                <p class="certificate-disclaimer">
                    This is an acknowledgement issued by {{ orgInfo.name }}. It is not a
                    government document or medical record.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.certificate-sheet {
    width: 1122px;
    height: 794px;
    padding: 15px;
    font-family: 'Space Grotesk', sans-serif;
    box-sizing: border-box;
}

.certificate-border {
    width: 100%;
    height: 100%;
    padding: 8px;
    border: 4px double #e80e0e;
    box-sizing: border-box;
}

.certificate-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 30px 48px 20px;
    border: 1px solid #15966a;
    box-sizing: border-box;
    background:
        radial-gradient(circle at center, rgba(232, 14, 14, 0.035), transparent 55%),
        #fff;
}

.certificate-inner::before {
    content: 'DROP OF HOPE';
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-20deg);
    color: rgba(232, 14, 14, 0.035);
    font-size: 76px;
    font-weight: 700;
    white-space: nowrap;
    pointer-events: none;
}

.certificate-top {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.certificate-logo {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 50%;
    background: #e80e0e;
    color: white;
}

.drop-symbol {
    font-size: 25px;
}

.certificate-content {
    position: relative;
    z-index: 1;
    flex: 1;
    padding-top: 34px;
    text-align: center;
}

.certificate-divider {
    width: 130px;
    height: 2px;
    margin: 15px auto 0;
    background: #15966a;
}

.certificate-name {
    margin-top: 12px;
    color: #e80e0e;
    font-size: 42px;
    font-weight: 700;
    line-height: 1.2;
}

.certificate-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 17px 40px;
    width: 75%;
    margin: 32px auto 0;
    text-align: left;
}

.certificate-details div {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.certificate-details span {
    color: #64748b;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.certificate-details strong {
    color: #1e293b;
    font-size: 14px;
}

.certificate-footer {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 100px;
    align-items: end;
    gap: 25px;
    min-height: 100px;
}

.certificate-number p {
    color: #64748b;
    font-size: 10px;
}

.certificate-number strong {
    display: block;
    margin-top: 4px;
    color: #1e293b;
    font-size: 12px;
}

.certificate-signature {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    text-align: center;
}

.signature-line {
    width: 180px;
    margin-bottom: 7px;
    border-top: 1px solid #334155;
}

.certificate-signature strong {
    font-size: 12px;
}

.certificate-signature span {
    color: #64748b;
    font-size: 10px;
}

.certificate-qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
}

.certificate-qr img {
    width: 68px;
    height: 68px;
}

.certificate-qr span {
    color: #64748b;
    font-size: 9px;
}

.certificate-disclaimer {
    margin-top: 12px;
    color: #64748b;
    font-size: 9px;
    text-align: center;
}

@media (max-width: 700px) {
    .certificate-sheet {
        transform: scale(0.42);
        transform-origin: top left;
        margin-bottom: -450px;
    }
}
</style>