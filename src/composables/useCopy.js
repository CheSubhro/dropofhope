import { ref } from 'vue'

export function useCopy() {
  const copiedValue = ref('')

  const copyText = async (value, key = value) => {
    try {
      await navigator.clipboard.writeText(String(value))
      copiedValue.value = key

      window.setTimeout(() => {
        if (copiedValue.value === key) {
          copiedValue.value = ''
        }
      }, 2000)

      return true
    } catch (error) {
      console.error('Unable to copy text:', error)
      return false
    }
  }

  return {
    copiedValue,
    copyText,
  }
}