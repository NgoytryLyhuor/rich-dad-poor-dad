<template>
  <div class="fade-up space-y-6">
    <div class="mb-2">
      <p class="gold-badge mb-3">CORE CONCEPT</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('ទ្រព្យ vs បំណុល', 'Assets vs Liabilities') }}
      </h2>
    </div>

    <!-- Visual Diagram -->
    <div class="card" style="padding: 2rem">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Assets -->
        <div class="text-center">
          <div class="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl" :style="{ background: 'var(--gold-light)' }">
            &#8593;
          </div>
          <h3 class="text-xl font-display font-black mb-2" :style="{ color: 'var(--gold)' }">
            {{ t('ទ្រព្យ (Assets)', 'Assets') }}
          </h3>
          <p class="text-sm mb-4" :style="{ color: 'var(--text-body)' }">
            {{ t('អ្វីដែលដាក់លុយចូលក្នុងហោប៉ៅរបស់អ្នក', 'Things that put money IN your pocket') }}
          </p>
          <div class="space-y-2">
            <div v-for="a in assetExamples" :key="a" class="card text-sm py-2" :style="{ borderColor: 'var(--gold)' }">
              {{ a }}
            </div>
          </div>
        </div>
        <!-- Liabilities -->
        <div class="text-center">
          <div class="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl" :style="{ background: 'var(--red-light)' }">
            &#8595;
          </div>
          <h3 class="text-xl font-display font-black mb-2" :style="{ color: 'var(--red)' }">
            {{ t('បំណុល (Liabilities)', 'Liabilities') }}
          </h3>
          <p class="text-sm mb-4" :style="{ color: 'var(--text-body)' }">
            {{ t('អ្វីដែលដកលុយចេញពីហោប៉ៅរបស់អ្នក', 'Things that take money OUT of your pocket') }}
          </p>
          <div class="space-y-2">
            <div v-for="l in liabExamples" :key="l" class="card text-sm py-2" :style="{ borderColor: 'var(--red)' }">
              {{ l }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Key insight -->
    <div class="card" :style="{ borderLeft: '4px solid var(--gold)' }">
      <p class="text-sm font-bold mb-1" :style="{ color: 'var(--gold)' }">
        {{ t('💡 គន្លឹះសំខាន់', 'KEY INSIGHT') }}
      </p>
      <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-body)' }">
        {{ t('មនុស្សក្រ ទិញបំណុលយកមកគិតថាជាទ្រព្យ (ផ្ទះ ឡាន)។ មនុស្សមាន ទិញទ្រព្យដែលផលិតចំណូល (ភាគហ៊ុន អចលនទ្រព្យ អាជីវកម្ម)។', 'Poor people buy liabilities thinking they\'re assets (house, car). Rich people buy assets that generate income (stocks, real estate, businesses).') }}
      </p>
    </div>

    <!-- Cashflow comparison -->
    <div class="card">
      <p class="section-title">{{ t('ប្រៀបធៀបចរន្តសាច់ប្រាក់', 'CASHFLOW COMPARISON') }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div class="p-4 rounded-xl" :style="{ background: 'var(--red-light)' }">
          <p class="text-xs font-bold mb-3" :style="{ color: 'var(--red)' }">{{ t('មនុស្សក្រ', 'POOR PEOPLE') }}</p>
          <p class="text-sm" :style="{ color: 'var(--text-body)' }">
            {{ t('ចំណូល → បំណុល → ចំណាយ → បំណុល → ចំណាយ...', 'Income → Debt → Expenses → Debt → Expenses...') }}
          </p>
          <p class="text-xs mt-2 italic" :style="{ color: 'var(--text-muted)' }">
            {{ t('រង្វង់អាក្រក់ដែលមិនដែលឈប់', 'A vicious cycle that never ends') }}
          </p>
        </div>
        <div class="p-4 rounded-xl" :style="{ background: 'var(--gold-light)' }">
          <p class="text-xs font-bold mb-3" :style="{ color: 'var(--gold)' }">{{ t('មនុស្សមាន', 'RICH PEOPLE') }}</p>
          <p class="text-sm" :style="{ color: 'var(--text-body)' }">
            {{ t('ចំណូល → ទ្រព្យ → ចំណូលពីទ្រព្យ → ទ្រព្យបន្ថែម...', 'Income → Assets → Asset Income → More Assets...') }}
          </p>
          <p class="text-xs mt-2 italic" :style="{ color: 'var(--text-muted)' }">
            {{ t('រង្វង់ល្អដែលកើនឡើងរហូត', 'A virtuous cycle that keeps growing') }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <router-link to="/cashflow" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ ចរន្តសាច់ប្រាក់ →', 'Next: Cashflow Quadrant →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const assetExamples = [
  '📈 ' + 'ភាគហ៊ុន / Stocks',
  '🏠 ' + 'អចលនទ្រព្យ / Real Estate',
  '🏢 ' + 'អាជីវកម្ម / Business',
  '📚 ' + 'សៀវភៅ / Royalties',
  '💰 ' + 'មូលនិធិ / Bonds/Funds',
]

const liabExamples = [
  '🚗 ' + 'ឡានកំពុងបង់ប្រាក់ / Car Loan',
  '💳 ' + 'ប័ណ្ណឥណទាន / Credit Card',
  '🏠 ' + 'បំណុលផ្ទះ / Mortgage',
  '📱 ' + 'ទូរស័ព្ទថ្លៃៗ / Expensive Phone',
  '🏷️ ' + 'សម្ភារៈប្រើប្រាស់ / Consumer Goods',
]
</script>
