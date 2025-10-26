<template>
  <div>
    <DataTable
      :value="data"
      :loading="loading"
      lazy
      paginator
      :first="(pagination.page - 1) * pagination.limit"
      :rows="pagination.limit"
      :totalRecords="pagination.total"
      @page="onPage"
      tableStyle="min-width: 50rem"
    >
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="true"
      ></Column>

      <template #empty> Нет данных. </template>
      <template #loading> Загрузка данных... </template>
    </DataTable>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:pagination'])

const onPage = (event) => {
  const newPagination = {
    ...props.pagination,
    page: event.page + 1,
    limit: event.rows
  }
  emit('update:pagination', newPagination)
}
</script>
