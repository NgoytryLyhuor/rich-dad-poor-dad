<template>
  <div class="fade-up space-y-6">
    <div class="mb-2">
      <p class="tag-badge mb-3">ASSET TRACKER</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('តាមដានទ្រព្យ និងបំណុល', 'Track Assets & Liabilities') }}
      </h2>
    </div>

    <!-- Add form -->
    <div class="card">
      <p class="section-title">{{ t('បន្ថែមថ្មី', 'ADD NEW') }}</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('ប្រភេទ', 'TYPE') }}</label>
          <select v-model="form.type" class="input-field">
            <option value="asset">📈 {{ t('ទ្រព្យ', 'Asset') }}</option>
            <option value="liability">📉 {{ t('បំណុល', 'Liability') }}</option>
          </select>
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">{{ t('ឈ្មោះ', 'NAME') }}</label>
          <input type="text" v-model="form.name" class="input-field" :placeholder="t('ឈ្មោះទ្រព្យ', 'Asset name')" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">${{ t('តម្លៃ', 'VALUE') }}</label>
          <input type="number" v-model.number="form.value" step="100" class="input-field" placeholder="0" />
        </div>
        <div>
          <label class="block text-[11px] mb-1.5 font-medium" :style="{ color: 'var(--text-label)' }">${{ t('ចំណូល/ខែ', 'INCOME/MO') }}</label>
          <input type="number" v-model.number="form.income" step="10" class="input-field" placeholder="0" />
        </div>
      </div>
      <button @click="addItem" class="btn-accent">{{ t('បន្ថែម', 'ADD') }}</button>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card text-center">
        <p class="section-title">{{ t('ទ្រព្យសរុប', 'TOTAL ASSETS') }}</p>
        <p class="text-2xl font-display font-black mt-1" :style="{ color: 'var(--gold)' }">${{ totalAssets }}</p>
      </div>
      <div class="card text-center">
        <p class="section-title">{{ t('បំណុលសរុប', 'TOTAL LIABILITIES') }}</p>
        <p class="text-2xl font-display font-black mt-1" :style="{ color: 'var(--red)' }">${{ totalLiabilities }}</p>
      </div>
      <div class="card text-center">
        <p class="section-title">{{ t('សុទ្ធទ្រព្យ', 'NET WORTH') }}</p>
        <p class="text-2xl font-display font-black mt-1" :style="{ color: netWorth >= 0 ? 'var(--green)' : 'var(--red)' }">${{ netWorth }}</p>
      </div>
      <div class="card text-center">
        <p class="section-title">{{ t('ចំណូលពីទ្រព្យ', 'ASSET INCOME') }}</p>
        <p class="text-2xl font-display font-black mt-1" :style="{ color: 'var(--green)' }">${{ assetIncome }}/{{ t('ខែ', 'mo') }}</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="card">
      <p class="section-title">{{ t('ប្រៀបធៀប', 'COMPARISON') }}</p>
      <div class="chart-box"><canvas ref="chartRef"></canvas></div>
    </div>

    <!-- List -->
    <div class="card">
      <div class="flex justify-between items-center mb-4">
        <p class="section-title mb-0">{{ t('បញ្ជី', 'LIST') }}</p>
        <button @click="clearAll" class="text-[10px] font-bold uppercase tracking-wider cursor-pointer" :style="{ color: 'var(--red)' }">
          {{ t('លុប', 'CLEAR') }}
        </button>
      </div>
      <div v-if="items.length === 0" class="text-sm text-center py-6" :style="{ color: 'var(--text-label)' }">
        {{ t('មិនទាន់មាន', 'Empty') }}
      </div>
      <div v-for="item in items" :key="item.id"
        class="flex items-center justify-between py-2.5 border-b last:border-0"
        :style="{ borderColor: 'var(--border-main)' }">
        <div class="flex items-center gap-3">
          <span class="text-lg">{{ item.type === 'asset' ? '📈' : '📉' }}</span>
          <div>
            <p class="text-sm font-bold" :style="{ color: 'var(--text-heading)' }">{{ item.name }}</p>
            <p class="text-[10px]" :style="{ color: 'var(--text-label)' }">
              {{ item.type === 'asset' ? t('ទ្រព្យ', 'Asset') : t('បំណុល', 'Liability') }}
              <template v-if="item.income"> &middot; +${{ item.income }}/{{ t('ខែ', 'mo') }}</template>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold" :style="{ color: item.type === 'asset' ? 'var(--gold)' : 'var(--red)' }">
            ${{ item.value.toLocaleString() }}
          </span>
          <button @click="deleteItem(item.id)" class="text-xs cursor-pointer" :style="{ color: 'var(--text-label)' }">&#10005;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

Chart.register(...registerables)
const { theme, getChartColors } = useTheme()
const { t } = useLanguage()

const form = reactive({ type: 'asset', name: '', value: null, income: null })
const items = ref(JSON.parse(localStorage.getItem('rdd_items') || '[]'))

const totalAssets = computed(() => items.value.filter(i => i.type === 'asset').reduce((s, i) => s + i.value, 0).toLocaleString())
const totalLiabilities = computed(() => items.value.filter(i => i.type === 'liability').reduce((s, i) => s + i.value, 0).toLocaleString())
const netWorth = computed(() => items.value.reduce((s, i) => s + (i.type === 'asset' ? i.value : -i.value), 0).toLocaleString())
const assetIncome = computed(() => items.value.filter(i => i.type === 'asset').reduce((s, i) => s + (i.income || 0), 0))

function save() { localStorage.setItem('rdd_items', JSON.stringify(items.value)) }

function addItem() {
  const val = form.value || 0
  const inc = form.income || 0
  if (!form.name || val <= 0) {
    alert(t('សូមបំពេញឈ្មោះ និងតម្លៃ', 'Fill in name and value'))
    return
  }
  items.value.push({ type: form.type, name: form.name, value: val, income: inc, id: Date.now() })
  save()
  form.name = ''
  form.value = null
  form.income = null
}

function deleteItem(id) { items.value = items.value.filter(i => i.id !== id); save() }
function clearAll() { if (confirm(t('តើអ្នកពិតជាចង់លុបទិន្នន័យទាំងអស់ឬ?', 'Clear all?'))) { items.value = []; save() } }

const chartRef = ref(null)
let chartInstance = null

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  if (!chartRef.value) return
  const cc = getChartColors()
  const assets = items.value.filter(i => i.type === 'asset')
  const liabs = items.value.filter(i => i.type === 'liability')
  const aNames = assets.map(i => i.name)
  const aVals = assets.map(i => i.value)
  const lNames = liabs.map(i => i.name)
  const lVals = liabs.map(i => i.value)
  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: [...aNames, ...lNames],
      datasets: [{
        data: [...aVals, ...lVals],
        backgroundColor: [...aNames.map(() => cc.gold), ...lNames.map(() => cc.red)],
        borderColor: [...aNames.map(() => cc.gold), ...lNames.map(() => cc.red)],
        borderWidth: 1, borderRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { color: cc.legend }, grid: { color: cc.grid } },
        x: { ticks: { color: cc.legend }, grid: { display: false } }
      }
    }
  })
}

onMounted(renderChart)
watch([items, theme], renderChart)
</script>
