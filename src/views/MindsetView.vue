<template>
  <div class="fade-up space-y-6">
    <div class="mb-2">
      <p class="gold-badge mb-3">MINDSET SHIFT</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('ផ្លាស់ប្តូរផ្លូវចិត្ត', 'Mindset Shifts') }}
      </h2>
      <p class="text-sm mt-2" :style="{ color: 'var(--text-muted)' }">
        {{ t('របៀបគិតរបស់មនុស្សក្រ vs មនុស្សមាន', 'How poor people think vs how rich people think') }}
      </p>
    </div>

    <!-- Shifts -->
    <div v-for="(shift, i) in shifts" :key="i" class="card overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div class="p-4 md:border-r" :style="{ borderColor: 'var(--border-main)', background: 'var(--red-light)' }">
          <p class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: 'var(--red)' }">
            {{ t('❌ មនុស្សក្រ', '❌ POOR') }}
          </p>
          <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-body)' }">
            {{ t(shift.kmPoor, shift.enPoor) }}
          </p>
        </div>
        <div class="p-4" :style="{ background: 'var(--gold-light)' }">
          <p class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: 'var(--gold)' }">
            {{ t('✅ មនុស្សមាន', '✅ RICH') }}
          </p>
          <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-body)' }">
            {{ t(shift.kmRich, shift.enRich) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Key Insight -->
    <div class="card" :style="{ borderLeft: '4px solid var(--gold)' }">
      <p class="text-sm font-bold mb-2" :style="{ color: 'var(--gold)' }">
        {{ t('💡 មេរៀនសំខាន់', 'KEY LESSON') }}
      </p>
      <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-body)' }">
        {{ t('ភាពក្រីក្រគឺជាផ្លូវចិត្ត — មិនមែនជាបញ្ហាលុយទេ។ ផ្លាស់ប្តូររបៀបគិត ហើយអ្នកនឹងផ្លាស់ប្តូរជីវិត។', 'Poverty is a mindset — not a money problem. Change your thinking and you change your life.') }}
      </p>
    </div>

    <div class="flex justify-end">
      <router-link to="/notes" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ សេចក្តីសង្ខេបសៀវភៅ →', 'Next: Book Notes →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const shifts = [
  { kmPoor: 'ខ្ញុំមិនអាចទិញវាបានទេ', enPoor: 'I can\'t afford that',
    kmRich: 'តើខ្ញុំអាចធ្វើបានដោយរបៀបណា?', enRich: 'How can I afford that?' },
  { kmPoor: 'រៀនឱ្យខ្ពស់ រួចរកការងារល្អ', enPoor: 'Study hard, get a good job',
    kmRich: 'រៀនទិញទ្រព្យ រួចបង្កើនចំណូលពីទ្រព្យ', enRich: 'Learn to buy assets, build passive income' },
  { kmPoor: 'ផ្ទះគឺជាទ្រព្យដ៏ធំបំផុតរបស់ខ្ញុំ', enPoor: 'My house is my biggest asset',
    kmRich: 'ផ្ទះគឺជាបំណុល — វាដកលុយចេញពីហោប៉ៅរបស់អ្នក', enRich: 'Your house is a liability — it takes money out of your pocket' },
  { kmPoor: 'សន្សំលុយក្នុងធនាគារ', enPoor: 'Save money in the bank',
    kmRich: 'វិនិយោគលុយនៅក្នុងទ្រព្យ', enRich: 'Invest money in assets' },
  { kmPoor: 'លុយមិនសំខាន់ទេ', enPoor: 'Money doesn\'t matter',
    kmRich: 'លុយគឺជាថាមវន្ត — វាអនុញ្ញាតឱ្យអ្នកជ្រើសរើស', enRich: 'Money is power — it gives you choices' },
  { kmPoor: 'ខ្ញុំមិនចាប់អារម្មណ៍លើលុយទេ', enPoor: 'I\'m not interested in money',
    kmRich: 'លុយគឺជាមិត្តភក្តិរបស់ខ្ញុំ — ខ្ញុំស្រឡាញ់វា', enRich: 'Money is my friend — I love it' },
  { kmPoor: 'ខ្ញុំខ្លាចបាត់បង់លុយ', enPoor: 'I\'m afraid of losing money',
    kmRich: 'ខ្ញុំរៀនពីកំហុស ហើយព្យាយាមម្តងទៀត', enRich: 'I learn from mistakes and try again' },
  { kmPoor: 'ទ្រព្យគឺមានតែសម្រាប់អ្នកមាន', enPoor: 'Assets are only for the rich',
    kmRich: 'អ្នកអាចចាប់ផ្តើមទិញទ្រព្យជាមួយលុយតិច', enRich: 'You can start buying assets with small amounts' },
]
</script>
