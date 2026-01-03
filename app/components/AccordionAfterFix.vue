<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'

  const generalFAQ = [
    {
      value: 'item-1',
      title: 'What is Reka UI?',
      content: 'A Vue component library for building accessible UIs.',
    },
    {
      value: 'item-2',
      title: 'Is it free?',
      content: 'Yes, MIT licensed.',
    },
  ]

  const technicalFAQ = [
    {
      value: 'item-1',  // Same value as above - will collide!
      title: 'Does it support SSR?',
      content: 'Yes, works great with Nuxt.',
    },
    {
      value: 'item-2',  // Same value as above - will collide!
      title: 'TypeScript support?',
      content: 'Fully typed.',
    },
  ]
  </script>

  <template>
    <div class="p-8 space-y-8">
      <!-- First Accordion - General FAQ -->
      <div>
        <h2 class="text-xl font-bold mb-4">General Questions</h2>
        <AccordionRoot
          class="AccordionRoot"
          type="single"
          :collapsible="true"
        >
          <AccordionItem
            v-for="item in generalFAQ"
            :key="item.value"
            class="AccordionItem"
            :value="item.value"
          >
            <AccordionHeader class="AccordionHeader">
              <AccordionTrigger class="AccordionTrigger">
                <span>{{ item.title }}</span>
                <Icon
                  icon="radix-icons:chevron-down"
                  class="AccordionChevron"
                  aria-label="Expand/Collapse"
                />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="AccordionContent">
              <div class="AccordionContentText">
                {{ item.content }}
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <!-- Second Accordion - Technical FAQ (COLLIDING IDs!) -->
      <div>
        <h2 class="text-xl font-bold mb-4">Technical Questions</h2>
        <AccordionRoot
          class="AccordionRoot"
          type="single"
          :collapsible="true"
        >
          <AccordionItem
            v-for="item in technicalFAQ"
            :key="item.value"
            class="AccordionItem"
            :value="item.value"
          >
            <AccordionHeader class="AccordionHeader">
              <AccordionTrigger class="AccordionTrigger">
                <span>{{ item.title }}</span>
                <Icon
                  icon="radix-icons:chevron-down"
                  class="AccordionChevron"
                  aria-label="Expand/Collapse"
                />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="AccordionContent">
              <div class="AccordionContentText">
                {{ item.content }}
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <!-- Divider -->
      <hr class="my-8 border-gray-300" />

      <!-- THE FIX: Add id prop to each AccordionRoot -->
      <h2 class="text-2xl font-bold mb-4 text-green-600">Fixed Version (with id prop)</h2>

      <div>
        <h2 class="text-xl font-bold mb-4">General Questions</h2>
        <AccordionRoot
          id="general"
          class="AccordionRoot"
          type="single"
          :collapsible="true"
        >
          <AccordionItem
            v-for="item in generalFAQ"
            :key="item.value"
            class="AccordionItem"
            :value="item.value"
          >
            <AccordionHeader class="AccordionHeader">
              <AccordionTrigger class="AccordionTrigger">
                <span>{{ item.title }}</span>
                <Icon
                  icon="radix-icons:chevron-down"
                  class="AccordionChevron"
                  aria-label="Expand/Collapse"
                />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="AccordionContent">
              <div class="AccordionContentText">
                {{ item.content }}
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div>
        <h2 class="text-xl font-bold mb-4">Technical Questions</h2>
        <AccordionRoot
          id="technical"
          class="AccordionRoot"
          type="single"
          :collapsible="true"
        >
          <AccordionItem
            v-for="item in technicalFAQ"
            :key="item.value"
            class="AccordionItem"
            :value="item.value"
          >
            <AccordionHeader class="AccordionHeader">
              <AccordionTrigger class="AccordionTrigger">
                <span>{{ item.title }}</span>
                <Icon
                  icon="radix-icons:chevron-down"
                  class="AccordionChevron"
                  aria-label="Expand/Collapse"
                />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="AccordionContent">
              <div class="AccordionContentText">
                {{ item.content }}
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </div>
  </template>