<template>
  <header class="header">
    <TabMenu :model="items" @tab-change="onTabChange" />
  </header>
  <main>
    <slot></slot>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TabMenu from 'primevue/tabmenu'

const router = useRouter()

const items = ref([
  { key: 'incomes', label: 'Доходы', to: '/incomes' },
  { key: 'orders', label: 'Заказы', to: '/orders' },
  { key: 'sales', label: 'Продажи', to: '/sales' },
  { key: 'stocks', label: 'Склады', to: '/stocks' },
])

const onTabChange = (event) => {
  const path = items.value[event.index].to
  router.push(path)
}
</script>

<style scoped>
.header {
  margin-bottom: 2rem;
}
</style>
