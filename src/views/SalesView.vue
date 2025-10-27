<template>
  <div>
    <h1>Продажи</h1>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <div class="grid mt-4">
      <div class="col-12 md:col-4 flex flex-column gap-4">
        <DataFilters />
        <div v-if="data && !loading" class="p-4 surface-card border-round shadow-2">
          <h2 class="mt-0 mb-3">График по количеству продаж</h2>
          <DataChart :chartData="chartData" />
        </div>
      </div>

      <div class="col-12 md:col-8">
        <DataTable
          :columns="tableColumns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          @update:pagination="salesStore.updatePagination($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { createDataStore } from '@/stores/dataStore'
import { useFiltersStore } from '@/stores/filters'
import { useDebouncedWatcher } from '@/composables/useDebouncedWatcher.js'
import DataTable from '@/components/DataTable.vue'
import DataChart from '@/components/DataChart.vue'
import DataFilters from '@/components/DataFilters.vue'

const useSalesStore = createDataStore('sales')
const salesStore = useSalesStore()
const { data, loading, error, pagination } = storeToRefs(salesStore)

const filtersStore = useFiltersStore()
const { dateFrom, dateTo } = storeToRefs(filtersStore)

onMounted(() => {
  salesStore.loadData()
})

useDebouncedWatcher(
  [dateFrom, dateTo],
  () => {
    pagination.value.page = 1
    salesStore.loadData()
  },
  500,
)

const tableColumns = ref([
  { field: 'g_number', header: 'Номер' },
  { field: 'date', header: 'Дата' },
  { field: 'last_change_date', header: 'Дата изменения' },
  { field: 'supplier_article', header: 'Артикул' },
  { field: 'tech_size', header: 'Размер' },
  { field: 'total_price', header: 'Цена' },
  { field: 'discount_percent', header: 'Скидка %' },
  { field: 'sale_id', header: 'ID продажи' },
])

const chartData = computed(() => {
  if (!data.value) return { labels: [], datasets: [] }

  const dailySales = data.value.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: Object.keys(dailySales),
    datasets: [
      {
        label: 'Количество продаж в день',
        backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
        data: Object.values(dailySales),
      },
    ],
  }
})
</script>
