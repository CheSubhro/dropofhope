
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export function useActiveSection(sectionIds = []) {
  const activeSection = ref(sectionIds[0] || '')
  let observer = null

  const observeSections = async () => {
    await nextTick()

    if (observer) {
      observer.disconnect()
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          )

        if (visibleEntries.length) {
          activeSection.value = visibleEntries[0].target.id
        }
      },
      {
        root: null,
        rootMargin: '-110px 0px -65% 0px',
        threshold: 0,
      },
    )

    elements.forEach((element) => observer.observe(element))
  }

  const setActiveSection = (id) => {
    activeSection.value = id
  }

  onMounted(observeSections)

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return {
    activeSection,
    setActiveSection,
    observeSections,
  }
}
