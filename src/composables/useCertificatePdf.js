import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export function useCertificatePdf() {
  async function downloadCertificate(element, certificateId) {
    if (!element) {
      throw new Error('Certificate element was not found.')
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    })

    const imageData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight)
    pdf.save(`${certificateId}.pdf`)
  }

  return { downloadCertificate }
}