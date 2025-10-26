import { ref, reactive, watch } from 'vue'
import { fetchData } from '@/services/api'

export function useDataFetching(endpoint) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const filters = reactive({
    dateFrom: new Date(),
    dateTo: new Date(),
  })

  const pagination = reactive({
    page: 1,
    limit: 15,
    total: 0,
  })

  const loadData = async () => {
    loading.value = true
    error.value = null
    try {
      // Форматируем даты. У нас уже есть значения по умолчанию, так что они не будут null.
      const formattedDateFrom = filters.dateFrom.toISOString().split('T')[0]
      const formattedDateTo = filters.dateTo.toISOString().split('T')[0]

      // УНИВЕРСАЛЬНЫЙ объект параметров для ВСЕХ запросов
      const params = {
        dateFrom: formattedDateFrom,
        dateTo: formattedDateTo,
        page: pagination.page,
        limit: pagination.limit,
      }

      const response = await fetchData(endpoint, params)

      data.value = response.data.data

      // Обрабатываем пагинацию. Если total не пришел, считаем по длине массива
      if (response.data.total) {
        pagination.total = response.data.total
      } else {
        pagination.total = response.data.data?.length || 0
      }
    } catch (e) {
      console.error('API Error:', e.response) // Добавим более детальный лог ошибки
      error.value = 'Не удалось загрузить данные. Проверьте параметры запроса в консоли.'
    } finally {
      loading.value = false
    }
  }

  watch([filters, () => pagination.page], loadData, { deep: true, immediate: true })

  return {
    data,
    loading,
    error,
    filters,
    pagination,
    loadData,
  }
}
