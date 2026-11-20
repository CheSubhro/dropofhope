import { ref, onMounted } from 'vue'

export function useAsyncData(fetcher) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      data.value = await fetcher()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  onMounted(load)
  return { data, loading, error, reload: load }
}