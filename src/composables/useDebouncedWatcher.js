import { watch } from 'vue'

export function useDebouncedWatcher(source, callback, delay = 500) {
  let timeoutId = null

  watch(
    source,
    () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        callback()
      }, delay)
    },
    { deep: true }
  )
}
