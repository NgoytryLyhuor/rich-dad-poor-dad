<template>
  <div class="min-h-screen">
    <!-- TOP NAVBAR -->
    <header class="topbar">
      <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <router-link to="/" class="flex items-center gap-2.5 no-underline shrink-0">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ background: 'var(--gradient-gold)' }">
            <span class="text-sm font-bold text-white font-display">R</span>
          </div>
          <div class="hidden sm:block">
            <p class="text-xs font-bold tracking-wide font-display" :style="{ color: 'var(--accent)' }">RICH DAD</p>
            <p class="text-[9px] -mt-0.5" :style="{ color: 'var(--text-label)' }">{{ t('Poor Dad', 'Poor Dad') }}</p>
          </div>
        </router-link>

        <nav class="hidden lg:flex items-center gap-5 overflow-x-auto no-scrollbar">
          <router-link v-for="item in navItems" :key="item.page" :to="item.to"
            class="topnav-link" :class="{ active: $route.name === item.page }">
            {{ t(item.km, item.en) }}
          </router-link>
        </nav>

        <div class="flex items-center gap-2">
          <button @click="toggleLang()" class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider cursor-pointer"
            :style="{ background: 'var(--gold-light)', color: 'var(--accent)', border: '1px solid var(--border-main)' }">
            {{ lang === 'km' ? 'EN' : 'KM' }}
          </button>
          <button @click="toggleTheme()" class="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
            :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-main)', color: 'var(--text-muted)' }">
            {{ theme === 'dark' ? '&#9790;' : '&#9789;' }}
          </button>
        </div>
      </div>

      <!-- Mobile scrollable nav -->
      <div class="lg:hidden overflow-x-auto no-scrollbar border-t" :style="{ borderColor: 'var(--border-main)' }">
        <div class="max-w-6xl mx-auto px-4 flex items-center gap-4 h-10">
          <router-link v-for="item in navItems" :key="item.page" :to="item.to"
            class="topnav-link text-[11px]" :class="{ active: $route.name === item.page }">
            {{ t(item.km, item.en) }}
          </router-link>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <div class="pt-20 lg:pt-16">
      <main class="max-w-5xl mx-auto px-4 py-6 md:py-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <footer class="border-t py-5 text-center text-[11px]"
        :style="{ borderColor: 'var(--border-main)', color: 'var(--text-label)' }">
        <p>Robert Kiyosaki &middot; Built by Lyhuor</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from './composables/useTheme'
import { useLanguage } from './composables/useLanguage'

const { theme, toggleTheme } = useTheme()
const { lang, t, toggleLang } = useLanguage()

const navItems = [
  { page: 'dashboard', to: '/', km: 'ទំព័រដើម', en: 'Home' },
  { page: 'assets', to: '/assets', km: 'ទ្រព្យ vs បំណុល', en: 'Assets vs Liabilities' },
  { page: 'cashflow', to: '/cashflow', km: 'ចរន្តសាច់ប្រាក់', en: 'Cashflow' },
  { page: 'calc', to: '/calc', km: 'គណនាទ្រព្យ', en: 'Asset Calc' },
  { page: 'rules', to: '/rules', km: 'ច្បាប់ ១០', en: '10 Rules' },
  { page: 'mindset', to: '/mindset', km: 'ផ្លាស់ប្តូរចិត្ត', en: 'Mindset' },
  { page: 'notes', to: '/notes', km: 'សៀវភៅ', en: 'Notes' },
  { page: 'track', to: '/track', km: 'តាមដាន', en: 'Track' },
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
a { text-decoration: none; }
</style>
