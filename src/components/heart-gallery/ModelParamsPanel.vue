<script setup lang="ts">
import type { HeartModel } from './types'

defineProps<{
  activeModel: HeartModel
  params: Record<string, number>
}>()

const emit = defineEmits<{
  updateParam: [key: string, value: number]
}>()
</script>

<template>
  <section class="hg-section">
    <h3>函数参数</h3>
    <div
      v-for="slider in activeModel.sliders"
      :key="slider.key"
      class="hg-slider-row"
    >
      <div class="hg-slider-top">
        <span>{{ slider.label }}</span>
        <strong>{{ Number(params[slider.key] ?? 0).toFixed(2) }}</strong>
      </div>
      <input
        :value="params[slider.key] ?? 0"
        class="hg-slider"
        type="range"
        :min="slider.min"
        :max="slider.max"
        :step="slider.step"
        @input="emit('updateParam', slider.key, Number(($event.target as HTMLInputElement).value))"
      >
    </div>
  </section>
</template>
