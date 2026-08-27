<template>
  <div class="fade-up space-y-6">
    <div class="mb-2">
      <p class="tag-badge mb-3">10 FINANCIAL RULES</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('ច្បាប់ហិរញ្ញវត្ថុ ១០យ៉ាង', '10 Financial Rules') }}
      </h2>
    </div>

    <div class="space-y-3">
      <div v-for="(rule, i) in rules" :key="i" class="card overflow-hidden"
        :style="{ borderLeft: '4px solid ' + rule.color }">
        <button @click="toggle(i)"
          class="w-full flex items-center justify-between text-left cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 sharp flex items-center justify-center text-sm font-bold shrink-0"
              :style="{ background: rule.bg, color: rule.color }">{{ i + 1 }}</div>
            <div>
              <p class="text-sm font-bold" :style="{ color: 'var(--text-heading)' }">{{ t(rule.kmTitle, rule.enTitle) }}</p>
              <p class="text-[10px] mt-0.5" :style="{ color: 'var(--text-label)' }">{{ t(rule.kmSub, rule.enSub) }}</p>
            </div>
          </div>
          <span class="text-lg transition-transform duration-300 shrink-0"
            :style="{ color: 'var(--text-muted)', transform: open[i] ? 'rotate(180deg)' : 'rotate(0deg)' }">&#9662;</span>
        </button>
        <div class="overflow-hidden transition-all duration-300"
          :style="{ maxHeight: open[i] ? '300px' : '0px', paddingBottom: open[i] ? '20px' : '0px' }">
          <p class="text-sm leading-relaxed mt-3 px-12" :style="{ color: 'var(--text-muted)' }">
            {{ t(rule.kmDesc, rule.enDesc) }}
          </p>
          <div class="mt-3 mx-12 px-3 py-2 sharp text-xs font-medium"
            :style="{ background: 'var(--bg-input)', color: rule.color }">
            💡 {{ t(rule.kmTip, rule.enTip) }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <router-link to="/mindset" class="text-sm font-bold transition hover:opacity-70" :style="{ color: 'var(--accent)' }">
        {{ t('បន្ត៖ ផ្លាស់ប្តូរផ្លូវចិត្ត →', 'Next: Mindset Shifts →') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const open = reactive([true, ...Array(9).fill(false)])
const toggle = (i) => { open[i] = !open[i] }

const rules = [
  { color: '#d97706', bg: 'rgba(217,119,6,0.08)',
    kmTitle: 'កុំនិយាយ "ខ្ញុំមិនអាចទេ"', enTitle: 'Never say "I can\'t afford it"',
    kmSub: 'ផ្លាស់ប្តូររបៀបគិត', enSub: 'Change your thinking',
    kmDesc: 'នៅពេលអ្នកនិយាយ "ខ្ញុំមិនអាចទេ" អ្នកឈប់គិត។ ជំនួសមកវិញ សួរខ្លួនឯងថា "តើខ្ញុំអាចធ្វើបានដោយរបៀបណា?" — នេះបង្ខំអ្នកឱ្យគិត។',
    enDesc: 'When you say "I can\'t afford it" you stop thinking. Instead ask "How can I afford it?" — this forces you to think.',
    kmTip: 'ផ្លាស់ប្តូរពី "ខ្ញុំមិនអាចទេ" ទៅ "តើខ្ញុំអាចធ្វើបានដោយរបៀបណា?"', enTip: 'Switch from "I can\'t" to "How can I?"' },
  { color: '#16a34a', bg: 'rgba(22,163,74,0.08)',
    kmTitle: 'រៀនពីអ្នកដែលជោគជ័យ', enTitle: 'Learn from successful people',
    kmSub: 'ស្វែងរកគំរូ', enSub: 'Find role models',
    kmDesc: 'កុំរៀនពីអ្នកដែលបរាជ័យ។ ស្វែងរកអ្នកដែលមានអ្វីដែលអ្នកចង់បាន ហើយរៀនពីពួកគេ។',
    enDesc: 'Don\'t learn from failures. Find people who have what you want and learn from them.',
    kmTip: 'ស្វែងរកអ្នកដែលជោគជ័យហើយសួរពួកគេពីរបៀបដែលពួកគេធ្វើ', enTip: 'Find successful people and ask how they did it' },
  { color: '#2563eb', bg: 'rgba(37,99,235,0.08)',
    kmTitle: 'វិនិយោគលើការអប់រំហិរញ្ញវត្ថុ', enTitle: 'Invest in financial education',
    kmSub: 'ចំណេះដឹង = លុយ', enSub: 'Knowledge = Money',
    kmDesc: 'ការអប់រំហិរញ្ញវត្ថុគឺជាការវិនិយោគដ៏ល្អបំផុត។ រៀនពីភាគហ៊ុន អចលនទ្រព្យ អាជីវកម្ម។',
    enDesc: 'Financial education is the best investment. Learn about stocks, real estate, business.',
    kmTip: 'អានសៀវភៅហិរញ្ញវត្ថុយ៉ាងហោច ១ ក្នុង១ខែ', enTip: 'Read at least 1 finance book per month' },
  { color: '#d97706', bg: 'rgba(217,119,6,0.08)',
    kmTitle: 'ទាញយកប្រយោជន៍ពីច្បាប់ពន្ធ', enTitle: 'Use tax laws to your advantage',
    kmSub: 'ពន្ធមិនមែនសម្រាប់អ្នកមានទេ', enSub: 'Tax isn\'t for the rich',
    kmDesc: 'អ្នកមានប្រើច្បាប់ពន្ធដើម្បីកាត់បន្ថយពន្ធ។ អ្នកក្របង់ពន្ធច្រើនជាង។ រៀនពីរបៀបប្រើប្រព័ន្ធពន្ធដើម្បីផលប្រយោជន៍របស់អ្នក។',
    enDesc: 'The rich use tax laws to reduce taxes. The poor pay more. Learn to use the tax system for your benefit.',
    kmTip: 'សួរអ្នកជំនាញពន្ធពីរបៀបកាត់បន្ថយពន្ធដោយស្របច្បាប់', enTip: 'Ask a tax expert about legal tax reduction' },
  { color: '#dc2626', bg: 'rgba(220,38,38,0.08)',
    kmTitle: 'កុំខ្លាចបរាជ័យ', enTitle: 'Don\'t fear failure',
    kmSub: 'បរាជ័យ = រៀនសូត្រ', enSub: 'Failure = Learning',
    kmDesc: 'បរាជ័យគឺជាផ្នែកមួយនៃការរៀនសូត្រ។ អ្នកដែលជោគជ័យបំផុតគឺអ្នកដែលបរាជ័យច្រើនបំផុត។',
    enDesc: 'Failure is part of learning. The most successful people failed the most.',
    kmTip: 'ចាប់ផ្តើមអាជីវកម្មតូចៗហើយរៀនពីបរាជ័យ', enTip: 'Start small businesses and learn from failures' },
  { color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',
    kmTitle: 'រៀនពីគ្រប់បទពិសោធន៍', enTitle: 'Learn from every experience',
    kmSub: 'បទពិសោធន៍ = លុយ', enSub: 'Experience = Money',
    kmDesc: 'រាល់បទពិសោធន៍មានតម្លៃ។ សូម្បីតែបរាជ័យក៏មានតម្លៃដែរ។ រៀនពីអ្វីៗទាំងអស់។',
    enDesc: 'Every experience has value. Even failure is valuable. Learn from everything.',
    kmTip: 'កត់ត្រាអ្វីដែលអ្នករៀនបានពីរាល់បទពិសោធន៍', enTip: 'Write down what you learn from every experience' },
  { color: '#16a34a', bg: 'rgba(22,163,74,0.08)',
    kmTitle: 'ប្រើទ្រព្យដើម្បីទិញទ្រព្យ', enTitle: 'Use assets to buy assets',
    kmSub: 'កុំប្រើប្រាក់ខែទិញទ្រព្យ', enSub: 'Don\'t use salary to buy assets',
    kmDesc: 'ប្រើចំណូលពីទ្រព្យដើម្បីទិញទ្រព្យបន្ថែម។ កុំប្រើប្រាក់ខែទិញទ្រព្យ។',
    enDesc: 'Use asset income to buy more assets. Don\'t use your salary to buy assets.',
    kmTip: 'សន្សំចំណូលពីទ្រព្យរហូតដល់គ្រប់គ្រាន់សម្រាប់ទិញទ្រព្យបន្ថែម', enTip: 'Save asset income until you can buy more assets' },
  { color: '#2563eb', bg: 'rgba(37,99,235,0.08)',
    kmTitle: 'ត្រូវមានជំនាញលក់', enTitle: 'Be a good salesperson',
    kmSub: 'ជំនាញលក់ = លុយ', enSub: 'Sales skill = Money',
    kmDesc: 'មិនថាអ្នកមានផលិតផលល្អប៉ុន្ណាទេ ប្រសិនបើអ្នកមិនអាចលក់បាន អ្នកនឹងមិនមានលុយ។ រៀនពីរបៀបលក់។',
    enDesc: 'No matter how good your product is, if you can\'t sell it, you won\'t make money. Learn to sell.',
    kmTip: 'អានសៀវភៅអំពីការលក់និងទំនាក់ទំនង', enTip: 'Read books about sales and communication' },
  { color: '#d97706', bg: 'rgba(217,119,6,0.08)',
    kmTitle: 'កុំឈប់រៀន', enTitle: 'Never stop learning',
    kmSub: 'រៀនរហូត', enSub: 'Learn forever',
    kmDesc: 'ពិភពលោកផ្លាស់ប្តូររហូត។ អ្នកត្រូវរៀនរហូតដើម្បីនៅទាន់សម័យ។ សៀវភៅ វគ្គបណ្តុះបណ្តាល សិក្ខាសាលា។',
    enDesc: 'The world keeps changing. You must keep learning. Books, courses, seminars.',
    kmTip: 'ចំណាយពេល ៣០នាទីក្នុង១ថ្ងៃសម្រាប់រៀនអ្វីថ្មី', enTip: 'Spend 30 minutes daily learning something new' },
  { color: '#dc2626', bg: 'rgba(220,38,38,0.08)',
    kmTitle: 'ទទួលខុសត្រូវលើជីវិតហិរញ្ញវត្ថុ', enTitle: 'Take responsibility for your finances',
    kmSub: 'កុំបន្ទោសគេ', enSub: 'Don\'t blame others',
    kmDesc: 'អ្នកទទួលខុសត្រូវលើជីវិតហិរញ្ញវត្ថុរបស់អ្នក។ កុំបន្ទោសរដ្ឋាភិបាល ឬសេដ្ឋកិច្ច។ ផ្លាស់ប្តូរខ្លួនឯង។',
    enDesc: 'You are responsible for your financial life. Don\'t blame the government or economy. Change yourself.',
    kmTip: 'ចាប់ផ្តើមសរសេរផែនការហិរញ្ញវត្ថុរបស់អ្នកថ្ងៃនេះ', enTip: 'Start writing your financial plan today' },
]
</script>
