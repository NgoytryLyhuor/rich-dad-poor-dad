<template>
  <div class="fade-up space-y-6">
    <div class="mb-2">
      <p class="gold-badge mb-3">CASHFLOW QUADRANT</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('ចរន្តសាច់ប្រាក់ ៤ ស្ថានភាព', 'Cashflow Quadrant') }}
      </h2>
      <p class="text-sm mt-2" :style="{ color: 'var(--text-muted)' }">
        {{ t('Robert Kiyosaki បែងចែកមនុស្សជា ៤ ក្រុម', 'Robert Kiyosaki divides people into 4 groups') }}
      </p>
    </div>

    <!-- Quadrant Grid -->
    <div class="grid grid-cols-2 gap-3">
      <div v-for="q in quadrants" :key="q.letter"
        class="card cursor-pointer transition-all hover:scale-[1.02]"
        :class="{ 'ring-2': selected === q.letter }"
        :style="{ borderColor: q.color, '--tw-ring-color': q.color }"
        @click="selected = q.letter">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-display font-black"
            :style="{ background: q.bg, color: q.color }">{{ q.letter }}</div>
          <div>
            <p class="font-bold text-sm" :style="{ color: q.color }">{{ t(q.kmTitle, q.enTitle) }}</p>
            <p class="text-[10px]" :style="{ color: 'var(--text-label)' }">{{ t(q.kmSub, q.enSub) }}</p>
          </div>
        </div>
        <p class="text-xs leading-relaxed" :style="{ color: 'var(--text-body)' }">
          {{ t(q.kmDesc, q.enDesc) }}
        </p>
      </div>
    </div>

    <!-- Selected Detail -->
    <div v-if="selectedQ" class="card" :style="{ borderLeft: '4px solid ' + selectedQ.color }">
      <p class="text-sm font-bold mb-2" :style="{ color: selectedQ.color }">
        {{ t(selectedQ.kmTitle, selectedQ.enTitle) }} — {{ t('លម្អិត', 'Details') }}
      </p>
      <p class="text-sm leading-relaxed mb-3" :style="{ color: 'var(--text-body)' }">
        {{ t(selectedQ.kmDetail, selectedQ.enDetail) }}
      </p>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-bold px-2 py-1 rounded-full" :style="{ background: selectedQ.bg, color: selectedQ.color }">
          {{ t('សម្គាល់', 'NOTE') }}
        </span>
        <p class="text-xs" :style="{ color: 'var(--text-muted)' }">{{ t(selectedQ.kmNote, selectedQ.enNote) }}</p>
      </div>
    </div>

    <!-- Arrow diagram -->
    <div class="card text-center" style="padding: 2rem">
      <p class="section-title">{{ t('ទិសដៅដែលអ្នកគួរទៅ', 'DIRECTION TO GO') }}</p>
      <div class="flex items-center justify-center gap-3 text-lg font-bold mt-4">
        <span class="px-4 py-2 rounded-xl" :style="{ background: 'var(--red-light)', color: 'var(--red)' }">E</span>
        <span class="text-2xl" :style="{ color: 'var(--text-label)' }">&#8594;</span>
        <span class="px-4 py-2 rounded-xl" :style="{ background: 'var(--blue-light)', color: 'var(--blue)' }">B</span>
        <span class="text-2xl" :style="{ color: 'var(--text-label)' }">&#8594;</span>
        <span class="px-4 py-2 rounded-xl" :style="{ background: 'var(--gold-light)', color: 'var(--gold)' }">I</span>
      </div>
      <p class="text-xs mt-3" :style="{ color: 'var(--text-muted)' }">
        {{ t('ផ្លាស់ប្តូរពី E (បុគ្គលិក) → B (ម្ចាស់អាជីវកម្ម) → I (អ្នកវិនិយោគ)', 'Move from Employee → Business Owner → Investor') }}
      </p>
    </div>

    <div class="flex justify-end">
      <router-link to="/calc" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ គណនាទ្រព្យ →', 'Next: Asset Calculator →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const selected = ref('B')

const quadrants = [
  {
    letter: 'E', color: '#dc2626', bg: 'rgba(220,38,38,0.08)',
    kmTitle: 'បុគ្គលិក', enTitle: 'EMPLOYEE',
    kmSub: 'ធ្វើការសម្រាប់លុយ', enSub: 'Works for money',
    kmDesc: 'អ្នកធ្វើការឱ្យគេ ទទួលប្រាក់ខែ។ សុវត្ថិភាព តែកំណត់ចំណូល។',
    enDesc: 'You work for someone. Steady paycheck but capped income.',
    kmDetail: 'បុគ្គលិកទទួលបានសុវត្ថិភាពការងារ ប៉ុន្តែចំណូលត្រូវបានកំណត់ដោយប្រាក់ខែ។ អ្នកមិនអាចកំណត់ចំណូលរបស់អ្នកបានទេ។ ពេលអ្នកឈប់ធ្វើការ លុយក៏ឈប់ដែរ។',
    enDetail: 'Employees have job security but capped income. You can\'t control your income. When you stop working, money stops.',
    kmNote: '៩០% នៃមនុស្សនៅក្នុងស្ថានភាពនេះ', enNote: '90% of people are in this quadrant'
  },
  {
    letter: 'S', color: '#2563eb', bg: 'rgba(37,99,235,0.08)',
    kmTitle: 'អ្នកឯករភ្ព', enTitle: 'SELF-EMPLOYED',
    kmSub: 'ធ្វើការសម្រាប់ខ្លួនឯង', enSub: 'Works for themselves',
    kmDesc: 'អ្នកមានអាជីវកម្មខ្លួនឯង តែអ្នកនៅតែជាអ្នកធ្វើការ។',
    enDesc: 'You own your business but you still work in it.',
    kmDetail: 'អ្នកឯករភ្ពមានសេរីភាពច្រើនជាងបុគ្គលិក ប៉ុន្តែពួកគេនៅតែជាអ្នកធ្វើការ។ ប្រសិនបើពួកគេឈប់ធ្វើការ អាជីវកម្មក៏ឈប់ដែរ។ ពួកគេមិនមានប្រព័ន្ធដែលដំណើរការដោយខ្លួនឯងទេ។',
    enDetail: 'Self-employed have more freedom but still work in the business. If they stop, the business stops. No systems running independently.',
    kmNote: '៩% នៃមនុស្សនៅក្នុងស្ថានភាពនេះ', enNote: '9% of people are in this quadrant'
  },
  {
    letter: 'B', color: '#d97706', bg: 'rgba(217,119,6,0.08)',
    kmTitle: 'ម្ចាស់អាជីវកម្ម', enTitle: 'BUSINESS OWNER',
    kmSub: 'ប្រព័ន្ធធ្វើការសម្រាប់អ្នក', enSub: 'System works for them',
    kmDesc: 'អ្នកមានអាជីវកម្មដែលដំណើរការដោយខ្លួនឯង។ អ្នកមិនចាំបាច់នៅទីនោះទេ។',
    enDesc: 'You own a business that runs without you.',
    kmDetail: 'ម្ចាស់អាជីវកម្មបង្កើតប្រព័ន្ធដែលដំណើរការដោយខ្លួនឯង។ ពួកគេមានក្រុមការងារដែលគ្រប់គ្រងអាជីវកម្ម។ នេះគឺជាផ្លូវទៅរកភាពមាន។',
    enDetail: 'Business owners build systems that run independently. They have teams managing the business. This is the path to wealth.',
    kmNote: '០.៥% នៃមនុស្សនៅក្នុងស្ថានភាពនេះ', enNote: '0.5% of people are in this quadrant'
  },
  {
    letter: 'I', color: '#16a34a', bg: 'rgba(22,163,74,0.08)',
    kmTitle: 'អ្នកវិនិយោគ', enTitle: 'INVESTOR',
    kmSub: 'លុយធ្វើការសម្រាប់អ្នក', enSub: 'Money works for them',
    kmDesc: 'លុយរបស់អ្នករកប្រាក់ចំណូលឱ្យអ្នក។ អ្នកមិនចាំបាច់ធ្វើការទេ។',
    enDesc: 'Your money earns income for you. You don\'t have to work.',
    kmDetail: 'អ្នកវិនិយោគប្រើលុយដើម្បីរកប្រាក់បន្ថែម។ ពួកគេវិនិយោគលើភាគហ៊ុន អចលនទ្រព្យ អាជីវកម្ម។ នេះគឺជាគោលដៅចុងក្រោយ។',
    enDetail: 'Investors use money to make more money. They invest in stocks, real estate, businesses. This is the ultimate goal.',
    kmNote: '០.៥% នៃមនុស្សនៅក្នុងស្ថានភាពនេះ', enNote: '0.5% of people are in this quadrant'
  },
]

const selectedQ = computed(() => quadrants.find(q => q.letter === selected.value))
</script>
