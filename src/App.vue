<template>
  <div class="min-h-screen">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="p-5 border-b" :style="{ borderColor: 'var(--border-main)' }">
        <router-link to="/" class="flex items-center gap-3 no-underline">
          <div class="w-10 h-10 flex items-center justify-center font-display font-black text-lg"
            :style="{ background: 'var(--gradient)', color: '#fff' }">R</div>
          <div>
            <p class="text-sm font-display font-black tracking-wide" :style="{ color: 'var(--accent)' }">RICH DAD</p>
            <p class="text-[10px]" :style="{ color: 'var(--text-label)' }">Poor Dad</p>
          </div>
        </router-link>
      </div>

      <nav class="flex-1 py-3 overflow-y-auto">
        <router-link v-for="item in navItems" :key="item.page" :to="item.to"
          class="sidebar-link" :class="{ active: $route.name === item.page }">
          <span class="icon" v-html="item.icon"></span>
          <span>{{ t(item.km, item.en) }}</span>
        </router-link>
      </nav>

      <div class="p-4 border-t flex items-center gap-2" :style="{ borderColor: 'var(--border-main)' }">
        <button @click="toggleLang()" class="px-2.5 py-1 text-[10px] font-bold tracking-wider cursor-pointer"
          :style="{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--accent)' }">
          {{ lang === 'km' ? 'EN' : 'KM' }}
        </button>
        <button @click="toggleTheme()" class="w-8 h-8 flex items-center justify-center cursor-pointer"
          :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-main)', color: 'var(--text-muted)' }">
          {{ theme === 'dark' ? '&#9790;' : '&#9789;' }}
        </button>
      </div>
    </aside>

    <!-- MOBILE HEADER -->
    <header class="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 border-b"
      :style="{ background: 'var(--bg-nav)', backdropFilter: 'blur(20px)', borderColor: 'var(--border-main)' }">
      <router-link to="/" class="flex items-center gap-2 no-underline">
        <div class="w-8 h-8 flex items-center justify-center font-display font-black text-sm"
          :style="{ background: 'var(--gradient)', color: '#fff' }">R</div>
        <p class="text-xs font-display font-bold" :style="{ color: 'var(--accent)' }">RICH DAD</p>
      </router-link>
      <div class="ml-auto flex items-center gap-2">
        <button @click="toggleLang()" class="px-2 py-1 text-[10px] font-bold cursor-pointer"
          :style="{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--accent)' }">
          {{ lang === 'km' ? 'EN' : 'KM' }}
        </button>
        <button @click="toggleTheme()" class="w-7 h-7 flex items-center justify-center cursor-pointer"
          :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-main)', color: 'var(--text-muted)' }">
          {{ theme === 'dark' ? '&#9790;' : '&#9789;' }}
        </button>
      </div>
    </header>

    <!-- MOBILE BOTTOM NAV -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t flex overflow-x-auto no-scrollbar"
      :style="{ background: 'var(--bg-nav)', backdropFilter: 'blur(20px)', borderColor: 'var(--border-main)' }">
      <router-link v-for="item in navItems" :key="item.page" :to="item.to"
        class="flex-shrink-0 flex flex-col items-center py-2 px-3 text-[9px] font-semibold transition"
        :style="{ color: $route.name === item.page ? 'var(--accent)' : 'var(--text-muted)' }">
        <span class="text-base mb-0.5" v-html="item.icon"></span>
        <span>{{ t(item.kmShort, item.enShort) }}</span>
      </router-link>
    </nav>

    <!-- MAIN CONTENT -->
    <div class="lg:ml-[220px] pt-14 lg:pt-0 pb-20 lg:pb-0">
      <main class="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <footer class="border-t py-5 text-center text-[10px] tracking-wider"
        :style="{ borderColor: 'var(--border-main)', color: 'var(--text-label)' }">
        <p>ROBERT KIYOSAKI &middot; BUILT BY LYHUOR</p>
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
  { page: 'dashboard', to: '/', km: 'ទំព័រដើម', en: 'Home', kmShort: 'ដើម', enShort: 'Home', icon: '&#9733;' },
  { page: 'assets', to: '/assets', km: 'ទ្រព្យ vs បំណុល', en: 'Assets vs Liabilities', kmShort: 'ទ្រព្យ', enShort: 'Assets', icon: '&#8593;' },
  { page: 'cashflow', to: '/cashflow', km: 'ចរន្តសាច់ប្រាក់', en: 'Cashflow', kmShort: 'សាច់', enShort: 'Cash', icon: '&#8644;' },
  { page: 'calc', to: '/calc', km: 'គណនាទ្រព្យ', en: 'Asset Calc', kmShort: 'គណនា', enShort: 'Calc', icon: '&#8721;' },
  { page: 'rules', to: '/rules', km: 'ច្បាប់ ១០', en: '10 Rules', kmShort: 'ច្បាប់', enShort: 'Rules', icon: '&#9878;' },
  { page: 'mindset', to: '/mindset', km: 'ផ្លាស់ប្តូរចិត្ត', en: 'Mindset', kmShort: 'ចិត្ត', enShort: 'Mind', icon: '&#9733;' },
  { page: 'notes', to: '/notes', km: 'សៀវភៅ', en: 'Notes', kmShort: 'សៀវភៅ', enShort: 'Notes', icon: '&#9998;' },
  { page: 'track', to: '/track', km: 'តាមដាន', en: 'Track', kmShort: 'តាមដាន', enShort: 'Track', icon: '&#9776;' },
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
a { text-decoration: none; }
</style>
