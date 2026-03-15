<script setup lang="ts">
import type { EffectSettings, HeartGalleryProps, ThemeMode } from './heart-gallery/types'
import HeartGalleryControls from './heart-gallery/HeartGalleryControls.vue'
import HeartGalleryStage from './heart-gallery/HeartGalleryStage.vue'
import { useHeartGallery } from './heart-gallery/useHeartGallery'
import './heart-gallery/heart-gallery.css'

const props = withDefaults(defineProps<HeartGalleryProps>(), {
  width: 980,
  height: 620,
  theme: 'classroom',
  animated: true,
  autoCruise: false,
  showFormula: true,
})

const {
  activeTheme,
  activeModel,
  activeModelId,
  activePresetId,
  autoCruiseEnabled,
  effects,
  flattenedTrailPaths,
  formulaVisible,
  gradientFrom,
  gradientTo,
  gridLines,
  height,
  lineColor,
  models,
  params,
  particlePoints,
  presets,
  primaryPaths,
  randomSurprise,
  shellStyle,
  showAxes,
  showGrid,
  showParticles,
  showTrail,
  stagePathClass,
  stageTheme,
  themeOptions,
  width,
  zeroX,
  zeroY,
} = useHeartGallery(props)

function updateParam(key: string, value: number): void {
  params.value[key] = value
}

function updateEffect(key: keyof EffectSettings, value: number): void {
  effects[key] = value
}

function handleUpdateEffect(key: string, value: number): void {
  updateEffect(key as keyof EffectSettings, value)
}

function updateTheme(value: ThemeMode): void {
  activeTheme.value = value
}
</script>

<template>
  <div
    class="hg-shell"
    :style="shellStyle"
  >
    <HeartGalleryControls
      :model-id="activeModelId"
      :preset-id="activePresetId"
      :theme="activeTheme"
      :theme-options="themeOptions"
      :models="models"
      :presets="presets"
      :active-model="activeModel"
      :params="params"
      :effects="effects"
      :show-grid="showGrid"
      :show-axes="showAxes"
      :show-trail="showTrail"
      :show-particles="showParticles"
      :auto-cruise-enabled="autoCruiseEnabled"
      @update-model-id="(value) => { activeModelId = value }"
      @update-preset-id="(value) => { activePresetId = value }"
      @update-theme="updateTheme"
      @update-show-grid="(value) => { showGrid = value }"
      @update-show-axes="(value) => { showAxes = value }"
      @update-show-trail="(value) => { showTrail = value }"
      @update-show-particles="(value) => { showParticles = value }"
      @update-auto-cruise-enabled="(value) => { autoCruiseEnabled = value }"
      @random-surprise="randomSurprise"
      @update-param="updateParam"
      @update-effect="handleUpdateEffect"
    />

    <HeartGalleryStage
      :width="width"
      :height="height"
      :gradient-from="gradientFrom"
      :gradient-to="gradientTo"
      :show-grid="showGrid"
      :grid-lines="gridLines"
      :stage-theme="stageTheme"
      :show-axes="showAxes"
      :zero-x="zeroX"
      :zero-y="zeroY"
      :line-color="lineColor"
      :flattened-trail-paths="flattenedTrailPaths"
      :effects="effects"
      :primary-paths="primaryPaths"
      :stage-path-class="stagePathClass"
      :show-particles="showParticles"
      :particle-points="particlePoints"
      :formula-visible="formulaVisible"
      :formula-name="activeModel.name"
      :formula-text="activeModel.formula"
    />
  </div>
</template>
