import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'system',
      palette: {
        primary: {
          50: '#f2fbfd',
          100: '#e4f0fa',
          200: '#c4e0f3',
          300: '#8fc7ea',
          400: '#54aadc',
          500: '#2e90c9',
          600: '#1e73ab',
          700: '#1a5c8a',
          800: '#1b547b',
          900: '#1a4260',
          950: '#112a40'
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        }
      }
    }
  }
})

app.mount('#app')
