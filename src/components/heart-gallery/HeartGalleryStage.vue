<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  width: number
  height: number
  gradientFrom: string
  gradientTo: string
  showGrid: boolean
  gridLines: Array<{ x1: number, y1: number, x2: number, y2: number }>
  stageTheme: {
    gridColor: string
    axisColor: string
  }
  showAxes: boolean
  zeroX: number
  zeroY: number
  lineColor: string
  flattenedTrailPaths: Array<{ path: string, opacity: number, width: number }>
  effects: {
    glow: number
    lineWidth: number
  }
  primaryPaths: string[]
  stagePathClass: string
  showParticles: boolean
  particlePoints: Array<{ x: number, y: number, radius: number, opacity: number }>
  formulaVisible: boolean
  formulaName: string
  formulaText: string
}>()

const pointerX = ref(0.5)
const pointerY = ref(0.5)

const stagePointerStyle = computed(() => ({
  '--hg-pointer-x': `${(pointerX.value * 100).toFixed(2)}%`,
  '--hg-pointer-y': `${(pointerY.value * 100).toFixed(2)}%`,
  '--hg-shift-x': `${((pointerX.value - 0.5) * 22).toFixed(2)}px`,
  '--hg-shift-y': `${((pointerY.value - 0.5) * 18).toFixed(2)}px`,
}))

function handlePointerMove(event: PointerEvent): void {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  pointerX.value = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
  pointerY.value = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
}

function handlePointerLeave(): void {
  pointerX.value = 0.5
  pointerY.value = 0.5
}
</script>

<template>
  <section
    class="hg-stage"
    :style="stagePointerStyle"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <div class="hg-stage-caustic" />
    <div class="hg-stage-specular" />
    <div class="hg-stage-vignette" />
    <svg
      class="hg-svg"
      :viewBox="`0 0 ${props.width} ${props.height}`"
      :width="props.width"
      :height="props.height"
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
            :stop-color="props.gradientFrom"
          />
          <stop
            offset="100%"
            :stop-color="props.gradientTo"
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
        :width="props.width"
        :height="props.height"
        fill="transparent"
      />

      <g v-if="props.showGrid">
        <line
          v-for="(line, index) in props.gridLines"
          :key="`grid-${index}`"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          :stroke="props.stageTheme.gridColor"
          stroke-width="1"
        />
      </g>

      <g v-if="props.showAxes">
        <line
          :x1="0"
          :y1="props.zeroY"
          :x2="props.width"
          :y2="props.zeroY"
          :stroke="props.stageTheme.axisColor"
          stroke-width="1.8"
        />
        <line
          :x1="props.zeroX"
          :y1="0"
          :x2="props.zeroX"
          :y2="props.height"
          :stroke="props.stageTheme.axisColor"
          stroke-width="1.8"
        />
      </g>

      <g>
        <path
          v-for="(path, index) in props.flattenedTrailPaths"
          :key="`trail-${index}`"
          :d="path.path"
          fill="none"
          :stroke="props.lineColor"
          :stroke-opacity="path.opacity"
          :stroke-width="path.width"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <g
        :style="{ opacity: 0.4 + props.effects.glow * 0.45 }"
        filter="url(#hg-glow)"
      >
        <path
          v-for="(path, index) in props.primaryPaths"
          :key="`glow-${index}`"
          :d="path"
          fill="none"
          :stroke="props.lineColor"
          :stroke-width="props.effects.lineWidth + props.effects.glow * 3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <g>
        <path
          v-for="(path, index) in props.primaryPaths"
          :key="`main-${index}`"
          :d="path"
          fill="none"
          stroke="url(#hg-gradient)"
          :stroke-width="props.effects.lineWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="props.stagePathClass"
        />
      </g>

      <g v-if="props.showParticles">
        <circle
          v-for="(dot, index) in props.particlePoints"
          :key="`dot-${index}`"
          :cx="dot.x"
          :cy="dot.y"
          :r="dot.radius"
          :fill="props.lineColor"
          :fill-opacity="dot.opacity"
        />
      </g>
    </svg>

    <div
      v-if="props.formulaVisible"
      class="hg-formula"
    >
      <p>{{ props.formulaName }}</p>
      <code>{{ props.formulaText }}</code>
    </div>
  </section>
</template>
