<script setup lang="ts">
import type { EffectSettings } from './types'

defineProps<{
  effects: EffectSettings
}>()

const emit = defineEmits<{
  updateEffect: [key: string, value: number]
}>()
</script>

<template>
  <section class="hg-section">
    <h3>特效参数</h3>
    <div class="hg-slider-row">
      <div class="hg-slider-top">
        <span>线宽</span>
        <strong>{{ effects.lineWidth.toFixed(2) }}</strong>
      </div>
      <input
        :value="effects.lineWidth"
        class="hg-slider"
        type="range"
        min="1"
        max="5"
        step="0.05"
        @input="emit('updateEffect', 'lineWidth', Number(($event.target as HTMLInputElement).value))"
      >
    </div>
    <div class="hg-slider-row">
      <div class="hg-slider-top">
        <span>发光强度</span>
        <strong>{{ effects.glow.toFixed(2) }}</strong>
      </div>
      <input
        :value="effects.glow"
        class="hg-slider"
        type="range"
        min="0"
        max="1.2"
        step="0.01"
        @input="emit('updateEffect', 'glow', Number(($event.target as HTMLInputElement).value))"
      >
    </div>
    <div class="hg-slider-row">
      <div class="hg-slider-top">
        <span>拖尾层数</span>
        <strong>{{ Math.floor(effects.trailLayers) }}</strong>
      </div>
      <input
        :value="effects.trailLayers"
        class="hg-slider"
        type="range"
        min="0"
        max="8"
        step="1"
        @input="emit('updateEffect', 'trailLayers', Number(($event.target as HTMLInputElement).value))"
      >
    </div>
    <div class="hg-slider-row">
      <div class="hg-slider-top">
        <span>粒子数量</span>
        <strong>{{ Math.floor(effects.particles) }}</strong>
      </div>
      <input
        :value="effects.particles"
        class="hg-slider"
        type="range"
        min="0"
        max="120"
        step="1"
        @input="emit('updateEffect', 'particles', Number(($event.target as HTMLInputElement).value))"
      >
    </div>
    <div class="hg-slider-row">
      <div class="hg-slider-top">
        <span>速度</span>
        <strong>{{ effects.speed.toFixed(2) }}</strong>
      </div>
      <input
        :value="effects.speed"
        class="hg-slider"
        type="range"
        min="0.2"
        max="2.4"
        step="0.01"
        @input="emit('updateEffect', 'speed', Number(($event.target as HTMLInputElement).value))"
      >
    </div>
    <div class="hg-slider-row">
      <div class="hg-slider-top">
        <span>网格密度</span>
        <strong>{{ Math.floor(effects.gridDensity) }}</strong>
      </div>
      <input
        :value="effects.gridDensity"
        class="hg-slider"
        type="range"
        min="4"
        max="18"
        step="1"
        @input="emit('updateEffect', 'gridDensity', Number(($event.target as HTMLInputElement).value))"
      >
    </div>
  </section>
</template>
