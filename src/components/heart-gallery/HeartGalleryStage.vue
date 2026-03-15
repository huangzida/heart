<script setup lang="ts">
defineProps<{
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
</script>

<template>
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
      <p>{{ formulaName }}</p>
      <code>{{ formulaText }}</code>
    </div>
  </section>
</template>
