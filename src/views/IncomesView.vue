<template>
  <div>
    <h1>Доходы</h1>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <DataFilters />

    <DataTable
      :columns="tableColumns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @update:pagination="incomesStore.updatePagination($event)"
    />
    <div
      v-if="data && !loading"
      class="mt-8 p-4 surface-card border-round shadow-2"
    >
      <h2 class="mt-0">График по сумме дохода</h2>
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

const useIncomesStore = createDataStore('incomes')
const incomesStore = useIncomesStore()
const { data, loading, error, pagination } = storeToRefs(incomesStore)
const filtersStore = useFiltersStore()
const { dateFrom, dateTo } = storeToRefs(filtersStore)

onMounted(() => {
  incomesStore.loadData()
})

watch(
  [dateFrom, dateTo],
  () => {
    pagination.value.page = 1
    incomesStore.loadData()
  },
  { deep: true },
)

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

  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: Object.keys(dailyIncomes),
    datasets: [
      {
        label: 'Сумма дохода в день',
        backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
        data: Object.values(dailyIncomes),
      },
    ],
  }
})
</script>
