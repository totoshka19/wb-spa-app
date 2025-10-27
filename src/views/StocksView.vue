<template>
  <div>
    <h1>Склады</h1>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <DataFilters />

    <DataTable
      :columns="tableColumns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @update:pagination="stocksStore.updatePagination($event)"
    />
    <div
      v-if="data && !loading"
      class="mt-8 p-4 surface-card border-round shadow-2"
    >
      <h2 class="mt-0">График по количеству на складе</h2>
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

const useStocksStore = createDataStore('stocks')
const stocksStore = useStocksStore()
const { data, loading, error, pagination } = storeToRefs(stocksStore)

const filtersStore = useFiltersStore()
const { dateFrom, dateTo } = storeToRefs(filtersStore)

onMounted(() => {
  stocksStore.loadData()
})

watch(
  [dateFrom, dateTo],
  () => {
    pagination.value.page = 1
    stocksStore.loadData()
  },
  { deep: true },
)

const tableColumns = ref([
  { field: 'date', header: 'Дата' },
  { field: 'last_change_date', header: 'Дата изменения' },
  { field: 'supplier_article', header: 'Артикул' },
  { field: 'tech_size', header: 'Размер' },
  { field: 'quantity', header: 'Количество' },
  { field: 'total_price', header: 'Цена' },
  { field: 'warehouse_name', header: 'Склад' },
])

const chartData = computed(() => {
  if (!data.value) return { labels: [], datasets: [] }

  const slicedData = data.value.slice(0, 20)
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: slicedData.map((item) => `${item.supplier_article} (${item.tech_size})`),
    datasets: [
      {
        label: 'Количество на складе',
        backgroundColor: documentStyle.getPropertyValue('--p-red-500'),
        data: slicedData.map((item) => item.quantity),
      },
    ],
  }
})
</script>
