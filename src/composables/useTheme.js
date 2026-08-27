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
      legend: isDark ? '#b8a8d4' : '#6d5a98',
      grid: isDark ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.12)',
      gold: isDark ? '#a78bfa' : '#7c3aed',
      goldFill: isDark ? 'rgba(167,139,250,0.15)' : 'rgba(124,58,237,0.1)',
      stone: isDark ? '#4c3a6e' : '#a89cc8',
      stoneFill: isDark ? 'rgba(76,58,110,0.1)' : 'rgba(168,156,200,0.06)',
      border: isDark ? '#2a1d3e' : '#e9e5f5',
      green: isDark ? '#34d399' : '#059669',
      red: isDark ? '#f87171' : '#dc2626',
      blue: isDark ? '#60a5fa' : '#2563eb',
      pink: isDark ? '#f0abfc' : '#c026d3',
    }
  }

  return { theme, toggleTheme, getChartColors }
}