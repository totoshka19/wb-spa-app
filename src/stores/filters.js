import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
  const dateRange = ref([new Date(), new Date()])
  const dateFrom = computed(() => {
    return dateRange.value ? dateRange.value[0] : null
  })

  const dateTo = computed(() => {
    return dateRange.value && dateRange.value[1] ? dateRange.value[1] : dateFrom.value
  })

  return {
    dateRange,
    dateFrom,
    dateTo,
  }
})
