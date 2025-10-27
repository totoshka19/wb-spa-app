<template>
  <div class="flex flex-wrap gap-4 mb-6">
    <Calendar v-model="filtersStore.dateFrom" dateFormat="dd.mm.yy" placeholder="Дата с" showIcon />
    <Calendar v-model="filtersStore.dateTo" dateFormat="dd.mm.yy" placeholder="Дата по" showIcon />
  </div>
</template>

<script setup>
import Calendar from 'primevue/calendar'
import { useFiltersStore } from '@/stores/filters'

const filtersStore = useFiltersStore()
</script>
