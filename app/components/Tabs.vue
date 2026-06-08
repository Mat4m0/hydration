<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import './styles.css'

const tabs = [
  {
    value: 'account',
    label: 'Account',
    content: 'Make changes to your account here.',
  },
  {
    value: 'password',
    label: 'Password',
    content: 'Change your password here.',
  },
]
</script>

<template>
  <TabsRoot
    class="TabsRoot"
    default-value="account"
  >
    <TabsList
      class="TabsList"
      aria-label="Account settings"
    >
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        class="TabsTrigger"
        :value="tab.value"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="tab in tabs"
      :key="tab.value"
      class="TabsContent"
      :value="tab.value"
    >
      {{ tab.content }}
    </TabsContent>
  </TabsRoot>
</template>
