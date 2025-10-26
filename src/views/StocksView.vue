<template>
  <div class="page-container">
    <h1>Склады (Stocks)</h1>
    <div v-if="error" class="error-message">{{ error }}</div>
    <Filters v-model="filters" />
    <DataTable
      :columns="tableColumns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @update:pagination="Object.assign(pagination, $event)"
    />
    <div v-if="data && !loading" class="chart-container">
      <h2>График по количеству на складе</h2>
      <DataChart :chartData="chartData" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataFetching } from '@/composables/useDataFetching'
import DataTable from '@/components/DataTable.vue'
import DataChart from '@/components/DataChart.vue'
import Filters from '@/components/Filters.vue'

const { data, loading, error, filters, pagination } = useDataFetching('stocks')

const tableColumns = ref([
  { field: 'date', header: 'Дата' },
  { field: 'last_change_date', header: 'Дата изменения' },
  { field: 'supplier_article', header: 'Артикул' },
  { field: 'tech_size', header: 'Размер' },
  { field: 'quantity', header: 'Количество' },
  { field: 'total_price', header: 'Цена' },
  { field: 'warehouse_name', header: 'Склад' }
])

const chartData = computed(() => {
  if (!data.value) return { labels: [], datasets: [] }

  const slicedData = data.value.slice(0, 20);

  return {
    labels: slicedData.map(item => `${item.supplier_article} (${item.tech_size})`),
    datasets: [
      {
        label: 'Количество на складе',
        backgroundColor: '#EF5350',
        data: slicedData.map(item => item.quantity)
      }
    ]
  }
})
</script>
