<template>
  <div class="page-container">
    <h1>Продажи (Sales)</h1>
    <div v-if="error" class="error-message">{{ error }}</div>

    <DataFilters />

    <DataTable
      :columns="tableColumns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @update:pagination="salesStore.updatePagination($event)"
    />
    <div v-if="data && !loading" class="chart-container">
      <h2>График по количеству продаж</h2>
      <DataChart :chartData="chartData" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { createDataStore } from '@/stores/dataStore'
import { useFiltersStore } from '@/stores/filters'
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

watch(
  [dateFrom, dateTo],
  () => {
    pagination.value.page = 1
    salesStore.loadData()
  },
  { deep: true },
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

  return {
    labels: Object.keys(dailySales),
    datasets: [
      {
        label: 'Количество продаж в день',
        backgroundColor: '#FFA726',
        data: Object.values(dailySales),
      },
    ],
  }
})
</script>
