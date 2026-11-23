
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export function useLightbox(photos) {
  const isOpen = ref(false)
  const currentIndex = ref(0)
  const touchStartX = ref(0)
  const touchEndX = ref(0)

  const currentPhoto = computed(() => photos.value[currentIndex.value] || null)

  function open(index) {
    if (!photos.value.length) return

    currentIndex.value = index
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function close() {
    isOpen.value = false
    document.body.style.overflow = ''
  }

  function next() {
    if (!photos.value.length) return
    currentIndex.value = (currentIndex.value + 1) % photos.value.length
  }

  function previous() {
    if (!photos.value.length) return
    currentIndex.value =
      (currentIndex.value - 1 + photos.value.length) % photos.value.length
  }

  function handleKeydown(event) {
    if (!isOpen.value) return

    if (event.key === 'Escape') close()
    if (event.key === 'ArrowRight') next()
    if (event.key === 'ArrowLeft') previous()
  }

  function handleTouchStart(event) {
    touchStartX.value = event.changedTouches[0].screenX
  }

  function handleTouchEnd(event) {
    touchEndX.value = event.changedTouches[0].screenX

    const difference = touchStartX.value - touchEndX.value

    if (Math.abs(difference) < 50) return

    if (difference > 0) next()
    else previous()
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  })

  return {
    isOpen,
    currentIndex,
    currentPhoto,
    open,
    close,
    next,
    previous,
    handleTouchStart,
    handleTouchEnd,
  }
}
