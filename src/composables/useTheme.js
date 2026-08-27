import { ref, watchEffect } from 'vue'

const theme = ref(localStorage.getItem('rdd_theme') || 'dark')

export function useTheme() {
  const apply = () => {
    if (theme.value === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  watchEffect(apply)
  apply()

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('rdd_theme', theme.value)
  }

  const getChartColors = () => {
    const isDark = theme.value === 'dark'
    return {
      legend: isDark ? '#a1967a' : '#78663c',
      grid: isDark ? 'rgba(180,140,60,0.15)' : 'rgba(180,140,60,0.15)',
      gold: isDark ? '#f59e0b' : '#d97706',
      goldFill: isDark ? 'rgba(245,158,11,0.12)' : 'rgba(217,119,6,0.08)',
      stone: isDark ? '#44403c' : '#a8a29e',
      stoneFill: isDark ? 'rgba(68,64,60,0.1)' : 'rgba(168,162,158,0.06)',
      border: isDark ? '#292524' : '#e7e5e4',
      green: isDark ? '#22c55e' : '#16a34a',
      red: isDark ? '#f87171' : '#dc2626',
      blue: isDark ? '#60a5fa' : '#2563eb',
    }
  }

  return { theme, toggleTheme, getChartColors }
}
