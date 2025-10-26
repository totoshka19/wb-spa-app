import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
  const dateFrom = ref(new Date())
  const dateTo = ref(new Date())

  function setDates(from, to) {
    dateFrom.value = from
    dateTo.value = to
  }

  return {
    dateFrom,
    dateTo,
    setDates,
  }
})
