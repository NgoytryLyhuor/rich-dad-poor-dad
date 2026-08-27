<template>
  <div class="fade-up space-y-6">
    <div class="mb-2">
      <p class="tag-badge mb-3">ASSET CALCULATOR</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('គណនាចំណូលពីទ្រព្យ', 'Asset Income Calculator') }}
      </h2>
    </div>

    <!-- Inputs -->
    <div class="card">
      <p class="section-title">{{ t('បញ្ចូលព័ត៌មាន', 'INPUT YOUR INFO') }}</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('ប្រាក់ខែ', 'MONTHLY INCOME') }}</label>
          <input type="number" v-model.number="income" step="100" class="input-field" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('ទ្រព្យ$/ខែ', 'ASSETS $/MO') }}</label>
          <input type="number" v-model.number="assetIncome" step="50" class="input-field" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('បំណុល$/ខែ', 'DEBT $/MO') }}</label>
          <input type="number" v-model.number="debtPayment" step="50" class="input-field" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('ឆ្នាំ', 'YEARS') }}</label>
          <select v-model.number="years" class="input-field">
            <option :value="1">1</option><option :value="3">3</option><option :value="5">5</option><option :value="10">10</option><option :value="20">20</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card text-center">
        <p class="section-title">{{ t('ទ្រព្យសរុប', 'TOTAL ASSETS') }}</p>
        <p class="text-2xl font-display font-black mt-1" :style="{ color: 'var(--gold)' }">${{ totalAssets }}</p>
      </div>
      <div class="card text-center">
        <p class="section-title">{{ t('ចំណូលពីទ្រព្យ', 'ASSET INCOME') }}</p>
        <p class="text-2xl font-display font-black mt-1" :style="{ color: 'var(--green)' }">${{ totalAssetIncome }}</p>
      </div>
      <div class="card text-center">
        <p class="section-title">{{ t('បំណុលសរុប', 'TOTAL DEBT') }}</p>
        <p class="text-2xl font-display font-black mt-1" :style="{ color: 'var(--red)' }">${{ totalDebt }}</p>
      </div>
      <div class="card text-center">
        <p class="section-title">{{ t('សុទ្ធចំណូល', 'NET INCOME') }}</p>
        <p class="text-2xl font-display font-black mt-1" :style="{ color: netIncome >= 0 ? 'var(--green)' : 'var(--red)' }">${{ netIncome }}</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="card">
      <p class="section-title">{{ t('ការលូតលាស់', 'GROWTH PROJECTION') }}</p>
      <div class="chart-box"><canvas ref="chartRef"></canvas></div>
    </div>

    <!-- Status -->
    <div class="card" :style="{ borderLeft: '4px solid ' + (isFree ? 'var(--green)' : 'var(--gold)') }">
      <p class="text-sm font-bold mb-1" :style="{ color: isFree ? 'var(--green)' : 'var(--gold)' }">
        {{ isFree ? t('✅ អ្នកសេរីហើយ!', '✅ You are financially free!') : t('⏳ អ្នកកំពុងស្វែងរកសេរីភាព', '⏳ Working toward financial freedom') }}
      </p>
      <p class="text-sm" :style="{ color: 'var(--text-body)' }">
        {{ isFree
          ? t('ចំណូលពីទ្រព្យរបស់អ្នកលើសពីការចំណាយ — អ្នកសេរីហើយ!', 'Your asset income exceeds expenses — you are free!')
          : t('ចំណូលពីទ្រព្យ: $' + totalAssetIncome + '/ខែ — ត្រូវការ $' + neededAssets + ' ទៀតដើម្បីសេរីភាព', 'Asset income: $' + totalAssetIncome + '/mo — need $' + neededAssets + ' more to be free')
        }}
      </p>
    </div>

    <div class="flex justify-end">
      <router-link to="/rules" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ ច្បាប់ ១០ →', 'Next: 10 Rules →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

Chart.register(...registerables)
const { theme, getChartColors } = useTheme()
const { t, lang } = useLanguage()

const income = ref(500)
const assetIncome = ref(100)
const debtPayment = ref(200)
const years = ref(5)

const safeIncome = computed(() => Math.max(0, income.value || 0))
const safeAsset = computed(() => Math.max(0, assetIncome.value || 0))
const safeDebt = computed(() => Math.max(0, debtPayment.value || 0))

const totalAssets = computed(() => safeAsset.value * 12 * years.value)
const totalAssetIncome = computed(() => safeAsset.value * years.value * 12)
const totalDebt = computed(() => safeDebt.value * 12 * years.value)
const netIncome = computed(() => (safeIncome.value + safeAsset.value - safeDebt.value - safeIncome.value * 0.7).toFixed(0))
const isFree = computed(() => safeAsset.value >= safeIncome.value * 0.7)
const neededAssets = computed(() => Math.max(0, (safeIncome.value * 0.7 - safeAsset.value) * 12 * years.value).toFixed(0))

const chartRef = ref(null)
let chartInstance = null

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  if (!chartRef.value) return
  const cc = getChartColors()
  const labels = [], assetData = [], debtData = []
  let aBal = 0, dBal = 0
  const tm = years.value * 12
  for (let m = 1; m <= tm; m++) {
    aBal += safeAsset.value
    dBal += safeDebt.value
    if (m % (tm <= 24 ? 1 : tm <= 60 ? 3 : 12) === 0 || m === tm) {
      labels.push(lang.value === 'km' ? 'ខែ ' + m : 'M' + m)
      assetData.push(aBal)
      debtData.push(dBal)
    }
  }
  chartInstance = new Chart(chartRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: t('ទ្រព្យ', 'Assets'), data: assetData, borderColor: cc.gold, backgroundColor: cc.goldFill, fill: true, tension: 0.4 },
        { label: t('បំណុល', 'Debt'), data: debtData, borderColor: cc.red, backgroundColor: 'rgba(248,113,113,0.05)', fill: true, tension: 0.4 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { color: cc.legend, font: { size: 11 } } } },
      scales: {
        y: { beginAtZero: true, ticks: { color: cc.legend }, grid: { color: cc.grid } },
        x: { ticks: { color: cc.legend, maxRotation: 45 }, grid: { color: cc.grid } }
      }
    }
  })
}

onMounted(renderChart)
watch([income, assetIncome, debtPayment, years, theme, lang], renderChart)
</script>
