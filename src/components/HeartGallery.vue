<script setup lang="ts">
import type { HeartGalleryProps } from './heart-gallery/useHeartGallery'
import { useHeartGallery } from './heart-gallery/useHeartGallery'

const props = withDefaults(defineProps<HeartGalleryProps>(), {
  width: 980,
  height: 620,
  theme: 'classroom',
  animated: true,
  autoCruise: false,
  showFormula: true,
})

const {
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
  width,
  zeroX,
  zeroY,
} = useHeartGallery(props)
</script>

<template>
  <div
    class="hg-shell"
    :style="shellStyle"
  >
    <aside class="hg-panel">
      <div class="hg-panel-header">
        <h2>心形函数艺术馆</h2>
        <button
          type="button"
          class="hg-surprise"
          @click="randomSurprise"
        >
          惊喜一下
        </button>
      </div>

      <label class="hg-field">
        <span class="hg-label">函数模型</span>
        <select
          v-model="activeModelId"
          class="hg-select"
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
          v-model="activePresetId"
          class="hg-select"
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

      <div class="hg-toggle-grid">
        <label class="hg-toggle">
          <input
            v-model="showGrid"
            type="checkbox"
          >
          <span>网格</span>
        </label>
        <label class="hg-toggle">
          <input
            v-model="showAxes"
            type="checkbox"
          >
          <span>坐标轴</span>
        </label>
        <label class="hg-toggle">
          <input
            v-model="showTrail"
            type="checkbox"
          >
          <span>拖尾</span>
        </label>
        <label class="hg-toggle">
          <input
            v-model="showParticles"
            type="checkbox"
          >
          <span>粒子</span>
        </label>
        <label class="hg-toggle">
          <input
            v-model="autoCruiseEnabled"
            type="checkbox"
          >
          <span>自动切换</span>
        </label>
      </div>

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
            v-model.number="params[slider.key]"
            class="hg-slider"
            type="range"
            :min="slider.min"
            :max="slider.max"
            :step="slider.step"
          >
        </div>
      </section>

      <section class="hg-section">
        <h3>特效参数</h3>
        <div class="hg-slider-row">
          <div class="hg-slider-top">
            <span>线宽</span>
            <strong>{{ effects.lineWidth.toFixed(2) }}</strong>
          </div>
          <input
            v-model.number="effects.lineWidth"
            class="hg-slider"
            type="range"
            min="1"
            max="5"
            step="0.05"
          >
        </div>
        <div class="hg-slider-row">
          <div class="hg-slider-top">
            <span>发光强度</span>
            <strong>{{ effects.glow.toFixed(2) }}</strong>
          </div>
          <input
            v-model.number="effects.glow"
            class="hg-slider"
            type="range"
            min="0"
            max="1.2"
            step="0.01"
          >
        </div>
        <div class="hg-slider-row">
          <div class="hg-slider-top">
            <span>拖尾层数</span>
            <strong>{{ Math.floor(effects.trailLayers) }}</strong>
          </div>
          <input
            v-model.number="effects.trailLayers"
            class="hg-slider"
            type="range"
            min="0"
            max="8"
            step="1"
          >
        </div>
        <div class="hg-slider-row">
          <div class="hg-slider-top">
            <span>粒子数量</span>
            <strong>{{ Math.floor(effects.particles) }}</strong>
          </div>
          <input
            v-model.number="effects.particles"
            class="hg-slider"
            type="range"
            min="0"
            max="120"
            step="1"
          >
        </div>
        <div class="hg-slider-row">
          <div class="hg-slider-top">
            <span>速度</span>
            <strong>{{ effects.speed.toFixed(2) }}</strong>
          </div>
          <input
            v-model.number="effects.speed"
            class="hg-slider"
            type="range"
            min="0.2"
            max="2.4"
            step="0.01"
          >
        </div>
        <div class="hg-slider-row">
          <div class="hg-slider-top">
            <span>网格密度</span>
            <strong>{{ Math.floor(effects.gridDensity) }}</strong>
          </div>
          <input
            v-model.number="effects.gridDensity"
            class="hg-slider"
            type="range"
            min="4"
            max="18"
            step="1"
          >
        </div>
      </section>
    </aside>

    <section class="hg-stage">
      <svg
        class="hg-svg"
        :viewBox="`0 0 ${width} ${height}`"
        :width="width"
        :height="height"
      >
        <defs>
          <linearGradient
            id="hg-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              :stop-color="gradientFrom"
            />
            <stop
              offset="100%"
              :stop-color="gradientTo"
            />
          </linearGradient>
          <filter
            id="hg-glow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur
              stdDeviation="3"
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="0"
          y="0"
          :width="width"
          :height="height"
          fill="transparent"
        />

        <g v-if="showGrid">
          <line
            v-for="(line, index) in gridLines"
            :key="`grid-${index}`"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            :stroke="stageTheme.gridColor"
            stroke-width="1"
          />
        </g>

        <g v-if="showAxes">
          <line
            :x1="0"
            :y1="zeroY"
            :x2="width"
            :y2="zeroY"
            :stroke="stageTheme.axisColor"
            stroke-width="1.8"
          />
          <line
            :x1="zeroX"
            :y1="0"
            :x2="zeroX"
            :y2="height"
            :stroke="stageTheme.axisColor"
            stroke-width="1.8"
          />
        </g>

        <g>
          <path
            v-for="(path, index) in flattenedTrailPaths"
            :key="`trail-${index}`"
            :d="path.path"
            fill="none"
            :stroke="lineColor"
            :stroke-opacity="path.opacity"
            :stroke-width="path.width"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>

        <g
          :style="{ opacity: 0.4 + effects.glow * 0.45 }"
          filter="url(#hg-glow)"
        >
          <path
            v-for="(path, index) in primaryPaths"
            :key="`glow-${index}`"
            :d="path"
            fill="none"
            :stroke="lineColor"
            :stroke-width="effects.lineWidth + effects.glow * 3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>

        <g>
          <path
            v-for="(path, index) in primaryPaths"
            :key="`main-${index}`"
            :d="path"
            fill="none"
            stroke="url(#hg-gradient)"
            :stroke-width="effects.lineWidth"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="stagePathClass"
          />
        </g>

        <g v-if="showParticles">
          <circle
            v-for="(dot, index) in particlePoints"
            :key="`dot-${index}`"
            :cx="dot.x"
            :cy="dot.y"
            :r="dot.radius"
            :fill="lineColor"
            :fill-opacity="dot.opacity"
          />
        </g>
      </svg>

      <div
        v-if="formulaVisible"
        class="hg-formula"
      >
        <p>{{ activeModel.name }}</p>
        <code>{{ activeModel.formula }}</code>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hg-shell {
  display: grid;
  grid-template-columns: minmax(270px, 320px) minmax(0, 1fr);
  gap: 16px;
  width: fit-content;
  max-width: 100%;
  color: var(--hg-panel-text);
}

.hg-panel {
  border: 1px solid var(--hg-panel-border);
  border-radius: 16px;
  background: var(--hg-panel-bg);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 620px;
  max-height: 620px;
  overflow: auto;
}

.hg-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.hg-panel-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.hg-surprise {
  border: 1px solid var(--hg-control-border);
  background: var(--hg-control-bg);
  color: var(--hg-panel-text);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 10px;
  cursor: pointer;
}

.hg-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hg-label {
  font-size: 12px;
  color: var(--hg-subtle-text);
  font-weight: 600;
}

.hg-select {
  border: 1px solid var(--hg-control-border);
  background: var(--hg-control-bg);
  color: var(--hg-panel-text);
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 13px;
}

.hg-toggle-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 12px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid var(--hg-control-border);
  background: var(--hg-control-bg);
}

.hg-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--hg-panel-text);
}

.hg-section {
  border: 1px solid var(--hg-control-border);
  background: var(--hg-control-bg);
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hg-section h3 {
  margin: 0;
  font-size: 13px;
  color: var(--hg-subtle-text);
  font-weight: 700;
}

.hg-slider-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hg-slider-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.hg-slider-top strong {
  font-weight: 700;
}

.hg-slider {
  width: 100%;
}

.hg-stage {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--hg-panel-border);
  background: var(--hg-stage-bg);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 28%);
}

.hg-svg {
  display: block;
  max-width: 100%;
  height: auto;
}

.hg-formula {
  position: absolute;
  left: 18px;
  top: 18px;
  background: var(--hg-formula-bg);
  border: 1px solid var(--hg-panel-border);
  border-radius: 12px;
  padding: 10px 12px;
  color: var(--hg-formula-text);
  backdrop-filter: blur(3px);
}

.hg-formula p {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 700;
}

.hg-formula code {
  font-size: 12px;
  white-space: nowrap;
}

.is-animated {
  animation: hg-draw 5.6s ease-in-out infinite;
}

@keyframes hg-draw {
  0% {
    stroke-dasharray: 1 1000;
    stroke-dashoffset: 0;
  }
  45% {
    stroke-dasharray: 380 620;
    stroke-dashoffset: -90;
  }
  100% {
    stroke-dasharray: 1 1000;
    stroke-dashoffset: -920;
  }
}

@media (max-width: 1140px) {
  .hg-shell {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .hg-panel {
    min-height: 300px;
    max-height: none;
  }
}
</style>
