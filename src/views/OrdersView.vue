<template>
  <div class="page-container">
    <h1>Заказы (Orders)</h1>

    <div v-if="error" class="error-message">{{ error }}</div>

    <DataFilters />

    <DataTable
      :columns="tableColumns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @update:pagination="ordersStore.updatePagination($event)"
    />

    <div v-if="data && !loading" class="chart-container">
      <h2>График по количеству заказов</h2>
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

const useOrdersStore = createDataStore('orders')
const ordersStore = useOrdersStore()
const { data, loading, error, pagination } = storeToRefs(ordersStore)

const filtersStore = useFiltersStore()
const { dateFrom, dateTo } = storeToRefs(filtersStore)

onMounted(() => {
  ordersStore.loadData()
})

watch(
  [dateFrom, dateTo],
  () => {
    pagination.value.page = 1
    ordersStore.loadData()
  },
  { deep: true },
)

const tableColumns = ref([
  { field: 'g_number', header: 'Номер' },
  { field: 'date', header: 'Дата' },
  { field: 'last_change_date', header: 'Дата изменения' },
  { field: 'supplier_article', header: 'Артикул поставщика' },
  { field: 'tech_size', header: 'Размер' },
  { field: 'barcode', header: 'Баркод' },
  { field: 'total_price', header: 'Цена' },
  { field: 'oblast', header: 'Регион' },
])

const chartData = computed(() => {
  if (!data.value) return { labels: [], datasets: [] }

  const dailyCounts = data.value.reduce((acc, order) => {
    const date = new Date(order.date).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  return {
    labels: Object.keys(dailyCounts),
    datasets: [
      {
        label: 'Количество заказов в день',
        backgroundColor: '#42A5F5',
        data: Object.values(dailyCounts),
      },
    ],
  }
})
</script>

<style>
.page-container {
  width: 100%;
}
.error-message {
  color: red;
  margin-bottom: 1rem;
}
.chart-container {
  margin-top: 2rem;
}
</style>
