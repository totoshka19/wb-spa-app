<template>
  <div class="flex flex-wrap gap-4">
    <DatePicker
      v-model="filtersStore.dateRange"
      selectionMode="range"
      :manualInput="false"
      dateFormat="dd.mm.yy"
      placeholder="Выберите период"
      showIcon
    />
  </div>
</template>

<script setup>
import DatePicker from 'primevue/datepicker'
import { useFiltersStore } from '@/stores/filters'

const filtersStore = useFiltersStore()
</script>
