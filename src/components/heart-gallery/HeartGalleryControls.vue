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
  cruiseIntervalSeconds: number
  cruisePresetOptions: Array<{ label: string, seconds: number }>
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
  updateCruiseIntervalSeconds: [value: number]
  randomSurprise: []
  updateParam: [key: string, value: number]
  updateEffect: [key: string, value: number]
}>()
</script>

<template>
  <aside class="hg-panel">
    <div class="hg-panel-header">
      <div class="hg-panel-title-wrap">
        <p class="hg-panel-kicker">
          HEART LAB
        </p>
        <h2>心形函数艺术馆</h2>
      </div>
      <button
        type="button"
        class="hg-surprise"
        @click="emit('randomSurprise')"
      >
        随机灵感
      </button>
    </div>

    <div class="hg-meta-grid">
      <div class="hg-meta-item">
        <span>模型总数</span>
        <strong>{{ models.length }}</strong>
      </div>
      <div class="hg-meta-item">
        <span>预设总数</span>
        <strong>{{ presets.length }}</strong>
      </div>
      <div class="hg-meta-item">
        <span>当前模型</span>
        <strong>{{ activeModel.name }}</strong>
      </div>
      <div class="hg-meta-item">
        <span>自动切换</span>
        <strong>{{ autoCruiseEnabled ? '开启' : '关闭' }}</strong>
      </div>
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

    <section
      class="hg-cruise-card"
      :class="{ 'is-disabled': !autoCruiseEnabled }"
    >
      <div class="hg-cruise-header">
        <span>自动切换间隔</span>
        <strong>{{ cruiseIntervalSeconds.toFixed(1) }}s</strong>
      </div>
      <div class="hg-cruise-presets">
        <button
          v-for="preset in cruisePresetOptions"
          :key="preset.label"
          type="button"
          class="hg-cruise-pill"
          :class="{ 'is-active': Math.abs(preset.seconds - cruiseIntervalSeconds) < 0.26 }"
          @click="emit('updateCruiseIntervalSeconds', preset.seconds)"
        >
          {{ preset.label }}
        </button>
      </div>
      <input
        :value="cruiseIntervalSeconds"
        class="hg-slider hg-cruise-slider"
        type="range"
        min="2"
        max="30"
        step="0.5"
        @input="emit('updateCruiseIntervalSeconds', Number(($event.target as HTMLInputElement).value))"
      >
    </section>

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
