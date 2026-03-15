<script setup lang="ts">
import { HelloButton } from 'starter-vue3'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6">
    <h1 class="text-3xl font-semibold text-slate-900">
      Vue 3 组件库预览
    </h1>
    <p class="text-slate-600">
      点击次数：{{ count }}
    </p>
    <HelloButton
      label="点我 +1"
      @click="count += 1"
    />
  </main>
</template>
