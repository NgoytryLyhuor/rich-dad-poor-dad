<template>
  <div class="fade-up space-y-6">
    <div class="mb-2">
      <p class="tag-badge mb-3">BOOK NOTES</p>
      <h2 class="text-2xl md:text-3xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
        {{ t('សេចក្តីសង្ខេបសៀវភៅ', 'Complete Book Notes') }}
      </h2>
      <p class="text-sm mt-2" :style="{ color: 'var(--text-muted)' }">
        {{ t('រាល់គន្លឹះសំខាន់ៗពីសៀវភៅ Rich Dad Poor Dad របស់ Robert Kiyosaki', 'Every key insight from Robert Kiyosaki\'s Rich Dad Poor Dad') }}
      </p>
    </div>

    <!-- TOC -->
    <div class="card">
      <p class="section-title">{{ t('មាតិកា', 'TABLE OF CONTENTS') }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
        <button v-for="(sec, i) in sections" :key="i" @click="scrollTo(i)"
          class="text-left text-sm py-1.5 px-2 sharp transition cursor-pointer hover:opacity-80"
          :style="{ color: 'var(--accent)' }">
          {{ i + 1 }}. {{ t(sec.kmTitle, sec.enTitle) }}
        </button>
      </div>
    </div>

    <!-- SECTIONS -->
    <div v-for="(sec, i) in sections" :key="i" :ref="el => sectionRefs[i] = el">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 sharp flex items-center justify-center text-sm font-bold shrink-0"
          :style="{ background: 'var(--gold-light)', color: 'var(--gold)' }">{{ i + 1 }}</div>
        <h3 class="text-xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
          {{ t(sec.kmTitle, sec.enTitle) }}
        </h3>
      </div>

      <div class="border-l-4 pl-4 mb-4" :style="{ borderColor: 'var(--gold)' }">
        <p class="text-sm leading-relaxed italic" :style="{ color: 'var(--text-body)' }">
          "{{ t(sec.kmQuote, sec.enQuote) }}"
        </p>
      </div>

      <div class="card mb-6">
        <p class="text-sm leading-relaxed mb-4" :style="{ color: 'var(--text-body)' }">
          {{ t(sec.kmBody, sec.enBody) }}
        </p>

        <div v-if="sec.points" class="space-y-3">
          <div v-for="(pt, j) in sec.points" :key="j" class="flex items-start gap-2">
            <span class="mt-0.5 shrink-0" :style="{ color: 'var(--gold)' }">&#10003;</span>
            <p class="text-sm" :style="{ color: 'var(--text-muted)' }">{{ t(pt.km, pt.en) }}</p>
          </div>
        </div>

        <div v-if="sec.example" class="mt-4 p-4 sharp" :style="{ background: 'var(--gold-light)' }">
          <p class="text-[10px] uppercase tracking-widest font-bold mb-1" :style="{ color: 'var(--gold)' }">
            {{ t('ឧទាហរណ៍ពិត', 'REAL EXAMPLE') }}
          </p>
          <p class="text-sm" :style="{ color: 'var(--text-body)' }">{{ t(sec.example.km, sec.example.en) }}</p>
        </div>

        <div v-if="sec.warning" class="mt-4 p-4 sharp border-2 border-dashed" :style="{ borderColor: 'var(--red)' }">
          <p class="text-[10px] uppercase tracking-widest font-bold mb-1" :style="{ color: 'var(--red)' }">
            {{ t('កំហុសដែលគេធ្វើញឹកញាប់', 'COMMON MISTAKE') }}
          </p>
          <p class="text-sm" :style="{ color: 'var(--text-body)' }">{{ t(sec.warning.km, sec.warning.en) }}</p>
        </div>
      </div>
    </div>

    <!-- CHARACTERS -->
    <div>
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 sharp flex items-center justify-center text-sm font-bold shrink-0"
          :style="{ background: 'var(--gold-light)', color: 'var(--gold)' }">&#9733;</div>
        <h3 class="text-xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
          {{ t('តួអង្គសំខាន់ៗ', 'Key Characters') }}
        </h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="(ch, i) in characters" :key="i" class="card" :style="{ borderLeft: '3px solid ' + ch.color }">
          <p class="font-bold text-sm" :style="{ color: ch.color }">{{ t(ch.kmName, ch.enName) }}</p>
          <p class="text-xs mt-1" :style="{ color: 'var(--text-muted)' }">{{ t(ch.kmRole, ch.enRole) }}</p>
        </div>
      </div>
    </div>

    <!-- QUOTES -->
    <div>
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 sharp flex items-center justify-center text-sm font-bold shrink-0"
          :style="{ background: 'var(--gold-light)', color: 'var(--gold)' }">"</div>
        <h3 class="text-xl font-display font-black" :style="{ color: 'var(--text-heading)' }">
          {{ t('ពាក្យសម្តីគន្លឹះ', 'Key Quotes') }}
        </h3>
      </div>
      <div class="space-y-3">
        <div v-for="(q, i) in quotes" :key="i" class="border-l-4 pl-4 py-2" :style="{ borderColor: 'var(--gold)' }">
          <p class="text-sm italic leading-relaxed" :style="{ color: 'var(--text-body)' }">"{{ t(q.km, q.en) }}"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'
const { t } = useLanguage()

const sectionRefs = ref([])
const scrollTo = (i) => { sectionRefs.value[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

const sections = [
  {
    kmTitle: 'អំពីសៀវភៅនេះ', enTitle: 'About This Book',
    kmQuote: 'សៀវភៅនេះនិយាយអំពីមេរៀនហិរញ្ញវត្ថុដែល Robert Kiyosaki បានរៀនសូត្រពីឪពុកពីរនាក់ — ឪពុកមាន និងឪពុកក្រ។',
    enQuote: 'This book teaches the financial lessons Robert learned from two dads — a rich dad and a poor dad.',
    kmBody: 'Robert Kiyosaki មានឪពុកពីរនាក់។ ឪពុករបស់គាត់ (Poor Dad) មានការអប់រ់ខ្ពស់ តែគ្មានលុយ។ ឪពុករបស់មិត្តភក្តិ (Rich Dad) មិនបញ្ចប់ថ្នាក់វិទ្យាល័យ តែក្លាយជាអ្នកមាន។ សៀវភៅនេះប្រៀបធៀបរបៀបគិតរបស់ឪពុកពីរនាក់។',
    enBody: 'Robert had two dads. His biological father (Poor Dad) was highly educated but poor. His friend\'s father (Rich Dad) didn\'t finish high school but became wealthy. The book compares their thinking.',
    points: [
      { km: 'ឪពុកក្រ៖ "រៀនឱ្យខ្ពស់ រួចរកការងារល្អ"', en: 'Poor Dad: "Study hard, get a good job"' },
      { km: 'ឪពុកមាន៖ "រៀនទិញទ្រព្យ រួចបង្កើនចំណូលពីទ្រព្យ"', en: 'Rich Dad: "Learn to buy assets, build passive income"' },
      { km: 'ឪពុកក្រ៖ "លុយមិនសំខាន់ទេ"', en: 'Poor Dad: "Money doesn\'t matter"' },
      { km: 'ឪពុកមាន៖ "លុយគឺជាថាមវន្ត — វាអនុញ្ញាតឱ្យអ្នកជ្រើសរើស"', en: 'Rich Dad: "Money is power — it gives you choices"' },
    ],
  },
  {
    kmTitle: 'មេរៀនទី១ — មនុស្សមានមិនធ្វើការសម្រាប់លុយ', enTitle: 'Lesson 1 — Rich Don\'t Work for Money',
    kmQuote: 'មនុស្សក្រធ្វើការសម្រាប់លុយ។ មនុស្សមានធ្វើឱ្យលុយធ្វើការសម្រាប់ពួកគេ។',
    enQuote: 'Poor people work for money. Rich people make money work for them.',
    kmBody: 'Robert រៀនថា មនុស្សភាគច្រើនធ្វើការសម្រាប់លុយ — ពួកគេខ្លាចបាត់បង់ការងារ និងប្រាក់ខែ។ មនុស្សមានវិញ ធ្វើឱ្យលុយរបស់ពួកគេធ្វើការសម្រាប់ពួកគេ — តាមរយៈទ្រព្យ។',
    enBody: 'Robert learned that most people work for money — they fear losing their job and paycheck. Rich people make their money work for them — through assets.',
    points: [
      { km: 'មនុស្សក្រធ្វើការសម្រាប់លុយ — ពួកគេខ្លាចបាត់បង់ការងារ', en: 'Poor work for money — they fear losing jobs' },
      { km: 'មនុស្សមានធ្វើឱ្យលុយធ្វើការ — តាមរយៈទ្រព្យ', en: 'Rich make money work — through assets' },
      { km: 'ភាពខ្លាច និងច្រណែនីយកម្ម គ្រប់គ្រងមនុស្សភាគច្រើន', en: 'Fear and greed control most people' },
    ],
    warning: {
      km: 'កំហុស៖ ធ្វើការតែដើម្បីលុយ — មិនគិតពីការបង្កើនចំណូលពីទ្រព្យទេ។',
      en: 'Mistake: Working only for money — not thinking about building passive income.'
    },
  },
  {
    kmTitle: 'មេរៀនទី២ — ហេតុអ្វីត្រូវរៀនសេដ្ឋកិច្ច', enTitle: 'Lesson 2 — Why Teach Financial Literacy',
    kmQuote: 'អ្នកមិនត្រូវការចំណូលច្រើនទេ — អ្នកត្រូវការទ្រព្យច្រើន។',
    enQuote: 'You don\'t need high income — you need high assets.',
    kmBody: 'Robert បកស្រាយថា បញ្ហាមិនមែនជាចំណូលទេ — បញ្ហាគឺរបៀបដែលយើងប្រើលុយ។ អ្នកដែលមានចំណូល $200,000/ឆ្នាំ ប៉ុន្តែចំណាយ $200,000 គឺក្រ។ អ្នកដែលមានចំណូល $50,000 ប៉ុន្តែទិញទ្រព្យ $10,000/ឆ្នាំ គឺមាន។',
    enBody: 'Robert explains: the problem isn\'t income — it\'s how we use money. Someone earning $200K/yr who spends $200K is poor. Someone earning $50K who buys $10K/yr in assets is rich.',
    points: [
      { km: 'ចំណូលមិនកំណត់ថាអ្នកមានឬក្រទេ — ទ្រព្យជាអ្នកកំណត់', en: 'Income doesn\'t determine rich or poor — assets do' },
      { km: 'ទ្រព្យ = អ្វីដែលដាក់លុយចូលក្នុងហោប៉ៅ', en: 'Assets = things that put money in your pocket' },
      { km: 'បំណុល = អ្វីដែលដកលុយចេញពីហោប៉ៅ', en: 'Liabilities = things that take money out of your pocket' },
    ],
  },
  {
    kmTitle: 'មេរៀនទី៣ — ថែរក្សាអាជីវកម្មរបស់អ្នក', enTitle: 'Lesson 3 — Mind Your Own Business',
    kmQuote: 'ទិញទ្រព្យ — មិនមែនបំណុល។',
    enQuote: 'Buy assets — not liabilities.',
    kmBody: 'Robert ណែនាំថា អ្នកត្រូវ "ថែរក្សាអាជីវកម្មរបស់អ្នក" — គឺបង្កើនទ្រព្យរបស់អ្នក។ កុំប្រើប្រាក់ខែទិញឡានថ្លៃៗ ឬផ្ទះដែលមិនផលិតចំណូល។ ជំនួសមក ប្រើប្រាក់ទិញភាគហ៊ុន អចលនទ្រព្យ ឬអាជីវកម្ម។',
    enBody: 'Robert advises you must "mind your own business" — grow your assets. Don\'t use salary to buy expensive cars or houses that don\'t generate income. Instead, use money to buy stocks, real estate, or businesses.',
    points: [
      { km: 'ទិញភាគហ៊ុន — ចាប់ផ្តើមតូចៗ', en: 'Buy stocks — start small' },
      { km: 'ទិញអចលនទ្រព្យ — ផ្ទះតូចៗសម្រាប់ជួល', en: 'Buy real estate — small rental properties' },
      { km: 'បង្កើតអាជីវកម្មតូច — side hustle', en: 'Build small businesses — side hustle' },
      { km: 'កុំប្រើប្រាក់ទិញបំណុលក្លែងក្លាយជាទ្រព្យ', en: 'Don\'t use money to buy fake assets' },
    ],
  },
  {
    kmTitle: 'មេរៀនទី៤ — ប្រវត្តិសាស្រ្តពន្ធ និងក្រុមហ៊ុន', enTitle: 'Lesson 4 — Tax History & Corporations',
    kmQuote: 'អ្នកមានប្រើក្រុមហ៊ុនដើម្បីកាត់បន្ថយពន្ធ។ អ្នកក្របង់ពន្ធច្រើនជាង។',
    enQuote: 'The rich use corporations to reduce taxes. The poor pay more.',
    kmBody: 'Robert បកស្រាយពីប្រវត្តិនៃពន្ធ — ពន្ធត្រូវបានបង្កើតដើម្បីកាត់បន្ថយប្រាក់ចំណូល។ អ្នកមានប្រើក្រុមហ៊ុនដើម្បីកាត់បន្ថយពន្ធ។ អ្នកក្របង់ពន្ធច្រើនជាងព្រោះពួកគេមិនដឹងពីរបៀបប្រើប្រព័ន្ធពន្ធ។',
    enBody: 'Robert explains tax history — taxes were created to reduce the rich\'s income. The rich use corporations to reduce taxes. The poor pay more because they don\'t know how to use the tax system.',
    points: [
      { km: 'ក្រុមហ៊ុន = ការពារពីពន្ធ', en: 'Corporations = protection from taxes' },
      { km: 'អ្នកក្របង់ពន្ធមុន — អ្នកមានបង់ពន្ធចុងក្រោយ', en: 'Poor pay taxes first — rich pay last' },
      { km: 'រៀនពីរបៀបប្រើក្រុមហ៊ុនដើម្បីកាត់បន្ថយពន្ធ', en: 'Learn to use corporations to reduce taxes' },
    ],
  },
  {
    kmTitle: 'មេរៀនទី៥ — មនុស្សមានបង្កើតលុយ', enTitle: 'Lesson 5 — Rich Invent Money',
    kmQuote: 'លុយមិនមែនដាក់ក្នុងធនាគារទេ — លុយត្រូវបានបង្កើត។',
    enQuote: 'Money isn\'t kept in banks — money is invented.',
    kmBody: 'Robert បង្រៀនថា មនុស្សមាន "បង្កើតលុយ" — ពួកគេរកឱកាសដែលអ្នកផ្សេងមិនឃើញ។ ពួកគេវិនិយោគលើអាជីវកម្ម អចលនទ្រព្យ និងភាគហ៊ុន។ ពួកគេមិនខ្លាចបរាជ័យទេ — ពួកគេរៀនពីបរាជ័យ។',
    enBody: 'Robert teaches that rich people "invent money" — they see opportunities others miss. They invest in businesses, real estate, and stocks. They don\'t fear failure — they learn from it.',
    points: [
      { km: 'រកឱកាសដែលអ្នកផ្សេងមិនឃើញ', en: 'Find opportunities others miss' },
      { km: 'វិនិយោគលើអាជីវកម្ម អចលនទ្រព្យ ភាគហ៊ុន', en: 'Invest in businesses, real estate, stocks' },
      { km: 'កុំខ្លាចបរាជ័យ — រៀនពីបរាជ័យ', en: 'Don\'t fear failure — learn from it' },
    ],
  },
  {
    kmTitle: 'មេរៀនទី៦ — រៀនដើម្បីរៀន មិនមែនដើម្បីរកលុយ', enTitle: 'Lesson 6 — Work to Learn, Don\'t Work to Earn',
    kmQuote: 'រៀនជំនាញថ្មីៗ — មិនមែនគិតតែពីប្រាក់ខែទេ។',
    enQuote: 'Learn new skills — don\'t just focus on salary.',
    kmBody: 'Robert ណែនាំថា "រៀនដើម្បីរៀន មិនមែនដើម្បីរកលុយ"។ គាត់ណែនាំឱ្យធ្វើការដោយឥតប្រាក់ខែនៅក្នុងអាជីវកម្មដើម្បីរៀនជំនាញ។ ជំនាញគឺជាទ្រព្យដ៏មានតម្លៃបំផុត។',
    enBody: 'Robert advises "work to learn, not to earn." He suggests working for free in a business to learn skills. Skills are the most valuable assets.',
    points: [
      { km: 'រៀនជំនាញលក់ — វាជាជំនាញដែលរកលុយបានច្រើនបំផុត', en: 'Learn sales — the highest-earning skill' },
      { km: 'រៀនជំនាញទំនាក់ទំនង — មនុស្សមានជាអ្នកលក់ល្អ', en: 'Learn communication — rich people are good salespeople' },
      { km: 'រៀនពីអាជីវកម្ម — រៀនពីរបៀបដំណើរការអាជីវកម្ម', en: 'Learn business — learn how to run a business' },
    ],
  },
  {
    kmTitle: 'មេរៀនទី៧ — ជំនាញដែលត្រូវការ', enTitle: 'Lesson 7 — Overcoming Obstacles',
    kmQuote: 'ឧបសគ្គគឺជាផ្នែកមួយនៃផ្លូវទៅរកភាពមាន។',
    enQuote: 'Obstacles are part of the road to wealth.',
    kmBody: 'Robert បកស្រាយឧបសគ្គ ៥យ៉ាង៖ ភាពខ្លាច ការរិះគន់ ភាពអត្មនិយម ភាពស្ទាក់សើច និងការបោះបង់។ គាត់បង្រៀនថា ឧបសគ្គទាំងនេះត្រូវតែដោះស្រាយ — មិនមែនជៀសវាងទេ។',
    enBody: 'Robert explains 5 obstacles: fear, cynicism, laziness, bad habits, and arrogance. He teaches these must be overcome — not avoided.',
    points: [
      { km: 'ភាពខ្លាច — ប្រើភាពខ្លាចជាថាមវន្ត មិនមែនជាឧបសគ្គទេ', en: 'Fear — use fear as fuel, not as obstacle' },
      { km: 'ការរិះគន់ — កុំស្តាប់អ្នកដែលនិយាយថាអ្នកមិនអាច', en: 'Cynicism — don\'t listen to those who say you can\'t' },
      { km: 'ភាពអត្មនិយម — ទទួលខុសត្រូវលើជីវិតហិរញ្ញវត្ថុរបស់អ្នក', en: 'Laziness — take responsibility for your finances' },
      { km: 'ទម្លាប់អាក្រក់ — ផ្លាស់ប្តូរទម្លាប់ហិរញ្ញវត្ថុ', en: 'Bad habits — change your financial habits' },
      { km: 'ភាពអាត្មនិយម — ទទួលស្គាល់កំហុស រួចរៀនសូត្រ', en: 'Arrogance — admit mistakes, then learn' },
    ],
  },
]

const characters = [
  { kmName: 'Robert Kiyosaki', enName: 'Robert Kiyosaki', kmRole: 'អ្នកនិពន្ធ — សិស្សរបស់ឪពុកពីរនាក់ ដែលបានរៀនសូត្រពីឪពុកមាន និងឪពុកក្រ។', enRole: 'The author — student of two dads who learned from both rich and poor.', color: 'var(--gold)' },
  { kmName: 'Rich Dad', enName: 'Rich Dad', kmRole: 'ឪពុករបស់មិត្តភក្តិ Robert — មិនបញ្ចប់ថ្នាក់វិទ្យាល័យ តែក្លាយជាអ្នកមាន។ បង្រៀនពីទ្រព្យ និងចំណូលពីទ្រព្យ។', enRole: 'Father of Robert\'s friend — didn\'t finish high school but became wealthy. Taught about assets and passive income.', color: '#16a34a' },
  { kmName: 'Poor Dad', enName: 'Poor Dad', kmRole: 'ឪពុករបស់ Robert — មានការអប់រ់ខ្ពស់ តែគ្មានលុយ។ និយាយថា "រៀនឱ្យខ្ពស់ រួចរកការងារល្អ។"', enRole: 'Robert\'s biological father — highly educated but poor. Said "Study hard, get a good job."', color: '#dc2626' },
  { kmName: 'Mike', enName: 'Mike', kmRole: 'មិត្តភក្តិរបស់ Robert — សិស្សរបស់ Rich Dad ដូចគ្នា។', enRole: 'Robert\'s friend — fellow student of Rich Dad.', color: '#2563eb' },
]

const quotes = [
  { km: 'ភាពក្រីក្រគឺជាផ្លូវចិត្ត — មិនមែនជាបញ្ហាលុយទេ។', en: 'Poverty is a mindset — not a money problem.' },
  { km: 'អ្នកមិនត្រូវការចំណូលច្រើនទេ — អ្នកត្រូវការទ្រព្យច្រើន។', en: 'You don\'t need high income — you need high assets.' },
  { km: 'ផ្ទះគឺជាបំណុល — វាដកលុយចេញពីហោប៉ៅរបស់អ្នក។', en: 'Your house is a liability — it takes money out of your pocket.' },
  { km: 'មនុស្សមានធ្វើឱ្យលុយធ្វើការសម្រាប់ពួកគេ។ មនុស្សក្រធ្វើការសម្រាប់លុយ។', en: 'Rich make money work for them. Poor work for money.' },
  { km: 'រៀនដើម្បីរៀន មិនមែនដើម្បីរកលុយ។', en: 'Work to learn, not to earn.' },
  { km: 'អ្នកដែលជោគជ័យបំផុតគឺអ្នកដែលបរាជ័យច្រើនបំផុត។', en: 'The most successful people failed the most.' },
  { km: 'ទ្រព្យគឺជាអ្វីដែលអ្នកមិនអាចឃើញ — តែអ្នកអាចមានអារម្មណ៍បាន។', en: 'Wealth is what you don\'t see — it\'s the assets not bought.' },
  { km: 'ការអប់រំហិរញ្ញវត្ថុគឺជាការវិនិយោគដ៏ល្អបំផុត។', en: 'Financial education is the best investment.' },
]
</script>
