<template>
  <div class="page-container">
    <h1>Доходы (Incomes)</h1>
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
      <h2>График по сумме дохода</h2>
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

const { data, loading, error, filters, pagination } = useDataFetching('incomes')

const tableColumns = ref([
  { field: 'income_id', header: 'ID дохода' },
  { field: 'number', header: 'Номер' },
  { field: 'date', header: 'Дата' },
  { field: 'last_change_date', header: 'Дата изменения' },
  { field: 'supplier_article', header: 'Артикул' },
  { field: 'tech_size', header: 'Размер' },
  { field: 'total_price', header: 'Цена' },
  { field: 'status', header: 'Статус' },
])

const chartData = computed(() => {
  if (!data.value) return { labels: [], datasets: [] }

  const dailyIncomes = data.value.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString()
    acc[date] = (acc[date] || 0) + item.total_price
    return acc
  }, {})

  return {
    labels: Object.keys(dailyIncomes),
    datasets: [
      {
        label: 'Сумма дохода в день',
        backgroundColor: '#66BB6A',
        data: Object.values(dailyIncomes),
      },
    ],
  }
})
</script>
