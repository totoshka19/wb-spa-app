<template>
  <div class="filters-panel">
    <Calendar
      v-model="filters.dateFrom"
      dateFormat="dd.mm.yy"
      placeholder="Дата с"
      showIcon
      class="filter-item"
    />
    <Calendar
      v-model="filters.dateTo"
      dateFormat="dd.mm.yy"
      placeholder="Дата по"
      showIcon
      class="filter-item"
    />
  </div>
</template>

<script setup>
import Calendar from 'primevue/calendar'

const filters = defineModel({
  type: Object,
  required: true,
})
</script>

<style scoped>
.filters-panel {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.filter-item {
  width: 200px;
}
</style>
