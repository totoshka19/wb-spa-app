import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { fetchData } from '@/services/api'
import { useFiltersStore } from './filters'

export function createDataStore(endpoint) {
  return defineStore(`data-${endpoint}`, () => {
    const data = ref([])
    const loading = ref(true)
    const error = ref(null)
    const pagination = reactive({
      page: 1,
      limit: 15,
      total: 0,
    })

    const filtersStore = useFiltersStore()

    async function loadData() {
      loading.value = true
      error.value = null
      try {
        const formattedDateFrom = filtersStore.dateFrom.toISOString().split('T')[0]
        const formattedDateTo = filtersStore.dateTo.toISOString().split('T')[0]

        const params = {
          dateFrom: formattedDateFrom,
          dateTo: formattedDateTo,
          page: pagination.page,
          limit: pagination.limit,
        }

        const response = await fetchData(endpoint, params)
        data.value = response.data.data

        if (response.data.total) {
          pagination.total = response.data.total
        } else {
          pagination.total = response.data.data?.length || 0
        }
      } catch (e) {
        console.error(`API Error on endpoint ${endpoint}:`, e.response)
        error.value = 'Не удалось загрузить данные. Проверьте параметры запроса в консоли.'
      } finally {
        loading.value = false
      }
    }

    function setPage(newPage) {
      if (pagination.page !== newPage) {
        pagination.page = newPage
        loadData()
      }
    }

    function updatePagination(newPagination) {
      Object.assign(pagination, newPagination)
      loadData()
    }

    return {
      data,
      loading,
      error,
      pagination,
      loadData,
      setPage,
      updatePagination,
    }
  })
}
