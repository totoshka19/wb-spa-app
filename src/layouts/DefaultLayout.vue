<template>
  <header class="header">
    <nav>
      <RouterLink to="/incomes">Incomes</RouterLink>
      <RouterLink to="/orders">Orders</RouterLink>
      <RouterLink to="/sales">Sales</RouterLink>
      <RouterLink to="/stocks">Stocks</RouterLink>
    </nav>
  </header>
  <main>
    <slot></slot>
  </main>
</template>
