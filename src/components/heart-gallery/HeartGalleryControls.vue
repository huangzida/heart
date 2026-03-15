<script setup lang="ts">
import type { EffectSettings, HeartModel, Preset, ThemeMode } from './types'
import EffectParamsPanel from './EffectParamsPanel.vue'
import ModelParamsPanel from './ModelParamsPanel.vue'

defineProps<{
  modelId: string
  presetId: string
  theme: ThemeMode
  themeOptions: Array<{ id: ThemeMode, label: string }>
  models: HeartModel[]
  presets: Preset[]
  activeModel: HeartModel
  params: Record<string, number>
  effects: EffectSettings
  showGrid: boolean
  showAxes: boolean
  showTrail: boolean
  showParticles: boolean
  autoCruiseEnabled: boolean
}>()

const emit = defineEmits<{
  updateModelId: [value: string]
  updatePresetId: [value: string]
  updateTheme: [value: ThemeMode]
  updateShowGrid: [value: boolean]
  updateShowAxes: [value: boolean]
  updateShowTrail: [value: boolean]
  updateShowParticles: [value: boolean]
  updateAutoCruiseEnabled: [value: boolean]
  randomSurprise: []
  updateParam: [key: string, value: number]
  updateEffect: [key: string, value: number]
}>()
</script>

<template>
  <aside class="hg-panel">
    <div class="hg-panel-header">
      <h2>心形函数艺术馆</h2>
      <button
        type="button"
        class="hg-surprise"
        @click="emit('randomSurprise')"
      >
        惊喜一下
      </button>
    </div>

    <label class="hg-field">
      <span class="hg-label">函数模型</span>
      <select
        :value="modelId"
        class="hg-select"
        @change="emit('updateModelId', ($event.target as HTMLSelectElement).value)"
      >
        <option
          v-for="model in models"
          :key="model.id"
          :value="model.id"
        >
          {{ model.name }}
        </option>
      </select>
    </label>

    <label class="hg-field">
      <span class="hg-label">预设场景</span>
      <select
        :value="presetId"
        class="hg-select"
        @change="emit('updatePresetId', ($event.target as HTMLSelectElement).value)"
      >
        <option
          v-for="preset in presets"
          :key="preset.id"
          :value="preset.id"
        >
          {{ preset.name }}
        </option>
      </select>
    </label>

    <label class="hg-field">
      <span class="hg-label">画布主题</span>
      <select
        :value="theme"
        class="hg-select"
        @change="emit('updateTheme', ($event.target as HTMLSelectElement).value as ThemeMode)"
      >
        <option
          v-for="themeItem in themeOptions"
          :key="themeItem.id"
          :value="themeItem.id"
        >
          {{ themeItem.label }}
        </option>
      </select>
    </label>

    <div class="hg-toggle-grid">
      <label class="hg-toggle">
        <input
          :checked="showGrid"
          type="checkbox"
          @change="emit('updateShowGrid', ($event.target as HTMLInputElement).checked)"
        >
        <span>网格</span>
      </label>
      <label class="hg-toggle">
        <input
          :checked="showAxes"
          type="checkbox"
          @change="emit('updateShowAxes', ($event.target as HTMLInputElement).checked)"
        >
        <span>坐标轴</span>
      </label>
      <label class="hg-toggle">
        <input
          :checked="showTrail"
          type="checkbox"
          @change="emit('updateShowTrail', ($event.target as HTMLInputElement).checked)"
        >
        <span>拖尾</span>
      </label>
      <label class="hg-toggle">
        <input
          :checked="showParticles"
          type="checkbox"
          @change="emit('updateShowParticles', ($event.target as HTMLInputElement).checked)"
        >
        <span>粒子</span>
      </label>
      <label class="hg-toggle">
        <input
          :checked="autoCruiseEnabled"
          type="checkbox"
          @change="emit('updateAutoCruiseEnabled', ($event.target as HTMLInputElement).checked)"
        >
        <span>自动切换</span>
      </label>
    </div>

    <ModelParamsPanel
      :active-model="activeModel"
      :params="params"
      @update-param="(key, value) => emit('updateParam', key, value)"
    />

    <EffectParamsPanel
      :effects="effects"
      @update-effect="(key, value) => emit('updateEffect', key, value)"
    />
  </aside>
</template>
