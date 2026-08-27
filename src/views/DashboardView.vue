<template>
  <div class="fade-up space-y-6">
    <!-- Hero -->
    <div class="hero-section">
      <div class="relative z-10">
        <p class="tag-badge mb-3">BOOK SUMMARY</p>
        <h1 class="text-3xl md:text-5xl font-display font-black leading-tight mb-3">
          {{ t('Rich Dad Poor Dad', 'Rich Dad Poor Dad') }}
        </h1>
        <p class="max-w-lg text-sm leading-relaxed opacity-90">
          {{ t('មេរៀនហិរញ្ញវត្ថុដ៏មានឥទ្ធិពលពី Robert Kiyosaki — ផ្លាស់ប្តូររបៀបគិតអំពីលុយ។', 'Powerful financial lessons from Robert Kiyosaki — change how you think about money.') }}
        </p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <router-link v-for="card in statCards" :key="card.to" :to="card.to"
        class="card text-left no-underline group hover:scale-[1.02] transition-transform">
        <p class="section-title">{{ t(card.kmLabel, card.enLabel) }}</p>
        <p class="text-2xl md:text-3xl font-display font-black mt-1 gold-gradient-text">{{ card.value }}</p>
        <p class="text-[10px] mt-1" :style="{ color: 'var(--text-label)' }">{{ t(card.kmSub, card.enSub) }}</p>
      </router-link>
    </div>

    <!-- Chart -->
    <div class="card">
      <p class="section-title">{{ t('ការលូតលាស់នៃទ្រព្យ', 'ASSET GROWTH') }}</p>
      <div class="chart-box"><canvas ref="mainChartRef"></canvas></div>
    </div>

    <!-- Two Dads Quick -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card" :style="{ borderColor: 'var(--red)' }">
        <p class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: 'var(--red)' }">
          {{ t('Poor Dad — ឪពុកក្រ', 'Poor Dad') }}
        </p>
        <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-body)' }">
          {{ t('ឪពុករបស់ Robert — មានការអប់រ់ខ្ពស់ តែគ្មានលុយ។ គាត់និយាយថា "រៀនឱ្យខ្ពស់ រួចរកការងារល្អ។"', 'Robert\'s biological father — highly educated but poor. He said "Study hard, get a good job."') }}
        </p>
      </div>
      <div class="card" :style="{ borderColor: 'var(--gold)' }">
        <p class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: 'var(--gold)' }">
          {{ t('Rich Dad — ឪពុកមាន', 'Rich Dad') }}
        </p>
        <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-body)' }">
          {{ t('ឪពុករបស់មិត្តភក្តិ Robert — មិនបញ្ចប់ថ្នាក់វិទ្យាល័យ តែក្លាយជាអ្នកមាន។ គាត់និយាយថា "រៀនទិញទ្រព្យ។"', 'Father of Robert\'s friend — didn\'t finish high school but became wealthy. He said "Learn to buy assets."') }}
        </p>
      </div>
    </div>

    <div class="text-center">
      <router-link to="/assets" class="btn-accent">
        {{ t('ចាប់ផ្តើមរៀន', 'Start Learning') }} &#8594;
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

Chart.register(...registerables)
const { theme, getChartColors } = useTheme()
const { t } = useLanguage()

const mainChartRef = ref(null)
let chartInstance = null

const statCards = [
  { to: '/assets', kmLabel: 'ទ្រព្យ vs បំណុល', enLabel: 'ASSETS VS LIABILITIES', value: 'A>L', kmSub: 'ទ្រព្យត្រូវច្រើនជាងបំណុល', enSub: 'Assets must exceed liabilities' },
  { to: '/cashflow', kmLabel: 'ចរន្តសាច់ប្រាក់', enLabel: 'CASHFLOW', value: 'E→B→I', kmSub: 'ផ្លាស់ប្តូរស្ថានភាព', enSub: 'Change your quadrant' },
  { to: '/calc', kmLabel: 'គណនាទ្រព្យ', enLabel: 'ASSET CALC', value: '$$$', kmSub: 'គណនាចំណូលពីទ្រព្យ', enSub: 'Calculate passive income' },
  { to: '/notes', kmLabel: 'សេចក្តីសង្ខេប', enLabel: 'BOOK NOTES', value: '7+', kmSub: 'មេរៀន ៧ សំខាន់ៗ', enSub: '7 Key Lessons' },
]

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  if (!mainChartRef.value) return
  const cc = getChartColors()
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  let assetBal = 1000
  const assetData = [], liabData = []
  for (let i = 1; i <= 12; i++) {
    assetBal += 200 + (assetBal * 0.03)
    assetData.push(parseFloat(assetBal.toFixed(0)))
    liabData.push(500 + (i * 50))
  }
  chartInstance = new Chart(mainChartRef.value, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        { label: t('ទ្រព្យ', 'Assets'), data: assetData, borderColor: cc.gold, backgroundColor: cc.goldFill, fill: true, tension: 0.4 },
        { label: t('បំណុល', 'Liabilities'), data: liabData, borderColor: cc.red, backgroundColor: 'rgba(248,113,113,0.05)', fill: true, tension: 0.4 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { color: cc.legend, font: { size: 11 } } } },
      scales: {
        y: { beginAtZero: true, ticks: { color: cc.legend }, grid: { color: cc.grid } },
        x: { ticks: { color: cc.legend }, grid: { color: cc.grid } }
      }
    }
  })
}

onMounted(renderChart)
watch(theme, renderChart)
</script>
