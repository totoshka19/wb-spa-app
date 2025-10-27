<template>
  <div class="surface-ground min-h-screen">
    <header class="px-4 surface-ground border-surface-border">
      <TabMenu
        :model="items"
        @tab-change="onTabChange"
        class="bg-transparent"
        :pt="{
          root: { class: 'bg-transparent border-none' },
          tablist: { class: 'bg-transparent border-none' },
        }"
      />
    </header>
    <main class="p-4 md:p-5">
      <slot></slot>
    </main>
  </div>
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
