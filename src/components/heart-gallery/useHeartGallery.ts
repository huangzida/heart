import type { ComputedRef, Ref } from 'vue'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

export type ThemeMode = 'classroom' | 'neon'

interface Point {
  x: number
  y: number
}

interface SliderDef {
  key: string
  label: string
  min: number
  max: number
  step: number
}

interface HeartModel {
  id: string
  name: string
  formula: string
  defaults: Record<string, number>
  sliders: SliderDef[]
  buildCurves: (params: Record<string, number>, time: number) => Point[][]
}

interface EffectSettings {
  lineWidth: number
  glow: number
  trailLayers: number
  trailGap: number
  particles: number
  particleSize: number
  speed: number
  gridDensity: number
}

interface Preset {
  id: string
  name: string
  modelId: string
  params: Record<string, number>
  effects: Partial<EffectSettings>
  theme: ThemeMode
  lineColor: string
  gradientFrom: string
  gradientTo: string
}

interface TrailLayer {
  opacity: number
  width: number
  paths: string[]
}

export interface HeartGalleryProps {
  width?: number
  height?: number
  theme?: ThemeMode
  animated?: boolean
  autoCruise?: boolean
  showFormula?: boolean
}

interface HeartGalleryResolvedProps {
  width: number
  height: number
  theme: ThemeMode
  animated: boolean
  autoCruise: boolean
  showFormula: boolean
}

interface HeartGalleryState {
  activeModel: ComputedRef<HeartModel>
  activeModelId: Ref<string>
  activePresetId: Ref<string>
  autoCruiseEnabled: Ref<boolean>
  effects: EffectSettings
  flattenedTrailPaths: ComputedRef<Array<{ path: string, opacity: number, width: number }>>
  formulaVisible: ComputedRef<boolean>
  gradientFrom: Ref<string>
  gradientTo: Ref<string>
  gridLines: ComputedRef<Array<{ x1: number, y1: number, x2: number, y2: number }>>
  height: number
  lineColor: Ref<string>
  models: HeartModel[]
  params: Ref<Record<string, number>>
  particlePoints: ComputedRef<Array<{ x: number, y: number, radius: number, opacity: number }>>
  presets: Preset[]
  primaryPaths: ComputedRef<string[]>
  randomSurprise: () => void
  shellStyle: ComputedRef<Record<string, string>>
  showAxes: Ref<boolean>
  showGrid: Ref<boolean>
  showParticles: Ref<boolean>
  showTrail: Ref<boolean>
  stagePathClass: ComputedRef<string>
  stageTheme: ComputedRef<{
    panelBg: string
    panelBorder: string
    panelText: string
    subtleText: string
    stageBg: string
    gridColor: string
    axisColor: string
    formulaBg: string
    formulaText: string
    controlBg: string
    controlBorder: string
  }>
  width: number
  zeroX: ComputedRef<number>
  zeroY: ComputedRef<number>
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function sampleRange(min: number, max: number, count: number, fn: (value: number) => Point | null): Point[] {
  const points: Point[] = []
  const safeCount = Math.max(8, Math.floor(count))
  const step = (max - min) / safeCount
  for (let i = 0; i <= safeCount; i += 1) {
    const value = min + i * step
    const point = fn(value)
    if (point) {
      points.push(point)
    }
  }
  return points
}

function superformulaRadius(theta: number, m: number, n1: number, n2: number, n3: number, a = 1, b = 1): number {
  const t1 = Math.abs(Math.cos((m * theta) / 4) / a) ** n2
  const t2 = Math.abs(Math.sin((m * theta) / 4) / b) ** n3
  const base = (t1 + t2) ** (1 / n1)
  return base === 0 ? 0 : 1 / base
}

const models: HeartModel[] = [
  {
    id: 'classic-pair',
    name: '根式双支心形',
    formula: 'y = a√|x| ± b√((1 - x²)/2)',
    defaults: {
      a: 0.6,
      b: 1,
      sx: 1.5,
      sy: 1.55,
    },
    sliders: [
      { key: 'a', label: '根式抬升 a', min: 0.2, max: 1.2, step: 0.01 },
      { key: 'b', label: '圆润系数 b', min: 0.5, max: 1.6, step: 0.01 },
      { key: 'sx', label: '横向缩放', min: 0.8, max: 2.2, step: 0.01 },
      { key: 'sy', label: '纵向缩放', min: 0.8, max: 2.4, step: 0.01 },
    ],
    buildCurves: (params) => {
      const a = clamp(params.a, 0.2, 1.2)
      const b = clamp(params.b, 0.5, 1.6)
      const sx = clamp(params.sx, 0.8, 2.2)
      const sy = clamp(params.sy, 0.8, 2.4)
      const upper = sampleRange(-1, 1, 600, (x) => {
        const cap = Math.max((1 - x * x) / 2, 0)
        const y = a * Math.sqrt(Math.abs(x)) + b * Math.sqrt(cap)
        return { x: x * sx, y: y * sy }
      })
      const lower = sampleRange(1, -1, 600, (x) => {
        const cap = Math.max((1 - x * x) / 2, 0)
        const y = a * Math.sqrt(Math.abs(x)) - b * Math.sqrt(cap)
        return { x: x * sx, y: y * sy }
      })
      return [upper, lower]
    },
  },
  {
    id: 'cardioid-deluxe',
    name: '心形线参数式',
    formula: 'x = w(2cos t - cos2t), y = d(2sin t - sin2t)',
    defaults: {
      width: 1.1,
      depth: 1.2,
      warp: 0.08,
      freq: 3,
    },
    sliders: [
      { key: 'width', label: '横向权重', min: 0.6, max: 2, step: 0.01 },
      { key: 'depth', label: '纵向权重', min: 0.6, max: 2, step: 0.01 },
      { key: 'warp', label: '波纹畸变', min: 0, max: 0.4, step: 0.01 },
      { key: 'freq', label: '畸变频率', min: 1, max: 10, step: 0.1 },
    ],
    buildCurves: (params, time) => {
      const width = clamp(params.width, 0.6, 2)
      const depth = clamp(params.depth, 0.6, 2)
      const warp = clamp(params.warp, 0, 0.4)
      const freq = clamp(params.freq, 1, 10)
      const curve = sampleRange(0, Math.PI * 2, 1600, (t) => {
        const mod = 1 + warp * Math.sin(freq * t + time * 1.2)
        return {
          x: width * (2 * Math.cos(t) - Math.cos(2 * t)) * mod,
          y: depth * (2 * Math.sin(t) - Math.sin(2 * t)),
        }
      })
      return [curve]
    },
  },
  {
    id: 'valentine-fourier',
    name: '傅里叶经典心形',
    formula: 'x = s·16sin³t, y = s(13cos t - 5cos2t - 2cos3t - cos4t)',
    defaults: {
      scale: 0.13,
      pinch: 1,
      drift: 0.18,
    },
    sliders: [
      { key: 'scale', label: '整体缩放', min: 0.08, max: 0.22, step: 0.001 },
      { key: 'pinch', label: '顶部收缩', min: 0.7, max: 1.4, step: 0.01 },
      { key: 'drift', label: '摆动幅度', min: 0, max: 0.5, step: 0.01 },
    ],
    buildCurves: (params, time) => {
      const scale = clamp(params.scale, 0.08, 0.22)
      const pinch = clamp(params.pinch, 0.7, 1.4)
      const drift = clamp(params.drift, 0, 0.5)
      const curve = sampleRange(0, Math.PI * 2, 1800, (t) => {
        const swing = 1 + drift * Math.sin(2 * t + time)
        return {
          x: scale * 16 * Math.sin(t) ** 3 * swing,
          y: scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - pinch * Math.cos(4 * t)),
        }
      })
      return [curve]
    },
  },
  {
    id: 'algebraic-oscillator',
    name: '振荡代数心线',
    formula: 'y = x^(2/3) + A√(B - x²)sin(Fπx + φ) - C',
    defaults: {
      amp: 0.95,
      span: 8,
      freq: 7.93,
      offset: 1,
      top: 2.8,
    },
    sliders: [
      { key: 'amp', label: '振幅 A', min: 0.3, max: 1.6, step: 0.01 },
      { key: 'span', label: '包络 B', min: 4, max: 12, step: 0.1 },
      { key: 'freq', label: '振荡频率 F', min: 2, max: 18, step: 0.01 },
      { key: 'offset', label: '下移 C', min: 0.2, max: 2.6, step: 0.01 },
      { key: 'top', label: '上缘弧度', min: 1.4, max: 4.8, step: 0.01 },
    ],
    buildCurves: (params, time) => {
      const amp = clamp(params.amp, 0.3, 1.6)
      const span = clamp(params.span, 4, 12)
      const freq = clamp(params.freq, 2, 18)
      const offset = clamp(params.offset, 0.2, 2.6)
      const top = clamp(params.top, 1.4, 4.8)
      const limit = Math.sqrt(span)
      const lower = sampleRange(-limit, limit, 2200, (x) => {
        const y = Math.abs(x) ** (2 / 3) + amp * Math.sqrt(Math.max(span - x * x, 0)) * Math.sin(freq * Math.PI * x + time * 1.7) - offset
        return { x: x * 1.35, y: y * 1.25 }
      })
      const upper = sampleRange(limit, -limit, 1000, (x) => {
        const y = top - 0.55 * Math.abs(x) ** 0.72
        return { x: x * 1.35, y: y * 1.25 }
      })
      return [lower, upper]
    },
  },
  {
    id: 'beating-heart',
    name: '呼吸心跳',
    formula: 'x = k(t)·16sin³u, y = k(t)·(13cos u - 5cos2u - 2cos3u - cos4u)',
    defaults: {
      scale: 0.12,
      beat: 0.2,
      tempo: 2.4,
      tilt: 0.08,
    },
    sliders: [
      { key: 'scale', label: '基础尺度', min: 0.07, max: 0.2, step: 0.001 },
      { key: 'beat', label: '心跳强度', min: 0, max: 0.45, step: 0.01 },
      { key: 'tempo', label: '心跳频率', min: 0.5, max: 6, step: 0.1 },
      { key: 'tilt', label: '轻微倾斜', min: -0.3, max: 0.3, step: 0.01 },
    ],
    buildCurves: (params, time) => {
      const scale = clamp(params.scale, 0.07, 0.2)
      const beat = clamp(params.beat, 0, 0.45)
      const tempo = clamp(params.tempo, 0.5, 6)
      const tilt = clamp(params.tilt, -0.3, 0.3)
      const heartScale = 1 + beat * Math.sin(time * tempo)
      const curve = sampleRange(0, Math.PI * 2, 1900, (u) => {
        const x0 = scale * 16 * Math.sin(u) ** 3 * heartScale
        const y0 = scale * (13 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u)) * heartScale
        return {
          x: x0 + tilt * y0,
          y: y0,
        }
      })
      return [curve]
    },
  },
  {
    id: 'rose-heart',
    name: '玫瑰心形极坐标',
    formula: 'r = p(1 - sin t) + qsin(kt), x = rcos t, y = rsin t',
    defaults: {
      base: 1.1,
      petal: 0.36,
      k: 5,
      width: 1.4,
    },
    sliders: [
      { key: 'base', label: '主半径 p', min: 0.4, max: 1.8, step: 0.01 },
      { key: 'petal', label: '花瓣波动 q', min: 0, max: 0.9, step: 0.01 },
      { key: 'k', label: '花瓣频率 k', min: 1, max: 14, step: 0.1 },
      { key: 'width', label: '横向拉伸', min: 0.7, max: 2.2, step: 0.01 },
    ],
    buildCurves: (params, time) => {
      const base = clamp(params.base, 0.4, 1.8)
      const petal = clamp(params.petal, 0, 0.9)
      const k = clamp(params.k, 1, 14)
      const width = clamp(params.width, 0.7, 2.2)
      const curve = sampleRange(0, Math.PI * 2, 1800, (t) => {
        const r = base * (1 - Math.sin(t)) + petal * Math.sin(k * t + time * 0.9)
        return {
          x: width * r * Math.cos(t),
          y: r * Math.sin(t),
        }
      })
      return [curve]
    },
  },
  {
    id: 'winged-cardioid',
    name: '翼展心形',
    formula: 'x = (2cos t - cos2t)(1 + wsin6t), y = 2sin t - sin2t - c|sin(t/2)|',
    defaults: {
      wing: 0.25,
      cusp: 0.7,
      spread: 1.3,
      curl: 0.14,
    },
    sliders: [
      { key: 'wing', label: '翼展幅度', min: 0, max: 0.6, step: 0.01 },
      { key: 'cusp', label: '底部尖度', min: 0, max: 1.4, step: 0.01 },
      { key: 'spread', label: '横向展开', min: 0.8, max: 2.1, step: 0.01 },
      { key: 'curl', label: '卷曲扰动', min: 0, max: 0.4, step: 0.01 },
    ],
    buildCurves: (params, time) => {
      const wing = clamp(params.wing, 0, 0.6)
      const cusp = clamp(params.cusp, 0, 1.4)
      const spread = clamp(params.spread, 0.8, 2.1)
      const curl = clamp(params.curl, 0, 0.4)
      const curve = sampleRange(0, Math.PI * 2, 1800, (t) => {
        const wingScale = 1 + wing * Math.sin(6 * t + time * 1.1)
        return {
          x: spread * (2 * Math.cos(t) - Math.cos(2 * t)) * wingScale,
          y: (2 * Math.sin(t) - Math.sin(2 * t)) - cusp * Math.abs(Math.sin(t / 2)) + curl * Math.sin(9 * t),
        }
      })
      return [curve]
    },
  },
  {
    id: 'ribbon-heart',
    name: '丝带心形',
    formula: 'x = sin³t + rsin(nt), y = y₀(t) + rcos(nt)',
    defaults: {
      ribbon: 0.18,
      freq: 18,
      depth: 1.15,
      width: 1.4,
    },
    sliders: [
      { key: 'ribbon', label: '丝带幅度', min: 0, max: 0.45, step: 0.01 },
      { key: 'freq', label: '丝带频率', min: 6, max: 36, step: 0.5 },
      { key: 'depth', label: '心形深度', min: 0.8, max: 1.8, step: 0.01 },
      { key: 'width', label: '心形宽度', min: 0.8, max: 2.2, step: 0.01 },
    ],
    buildCurves: (params, time) => {
      const ribbon = clamp(params.ribbon, 0, 0.45)
      const freq = clamp(params.freq, 6, 36)
      const depth = clamp(params.depth, 0.8, 1.8)
      const width = clamp(params.width, 0.8, 2.2)
      const curve = sampleRange(0, Math.PI * 2, 2400, (t) => {
        const xBase = width * Math.sin(t) ** 3
        const yBase = depth * (0.81 * Math.cos(t) - 0.3 * Math.cos(2 * t) - 0.12 * Math.cos(3 * t) - 0.06 * Math.cos(4 * t))
        return {
          x: xBase + ribbon * Math.sin(freq * t + time * 2),
          y: yBase + ribbon * Math.cos(freq * t + time * 2),
        }
      })
      return [curve]
    },
  },
  {
    id: 'superformula-heart',
    name: '超公式心形',
    formula: 'r(θ) = (|cos(mθ/4)|^n₂ + |sin(mθ/4)|^n₃)^(-1/n₁)',
    defaults: {
      m: 1,
      n1: 0.38,
      n2: 1.18,
      n3: 1.26,
      cusp: 0.85,
      scale: 1.45,
    },
    sliders: [
      { key: 'm', label: '对称阶数 m', min: 0.6, max: 3.8, step: 0.01 },
      { key: 'n1', label: 'n1', min: 0.12, max: 1.2, step: 0.01 },
      { key: 'n2', label: 'n2', min: 0.4, max: 3.4, step: 0.01 },
      { key: 'n3', label: 'n3', min: 0.4, max: 3.4, step: 0.01 },
      { key: 'cusp', label: '底部尖化', min: 0, max: 1.5, step: 0.01 },
      { key: 'scale', label: '整体缩放', min: 0.7, max: 2.4, step: 0.01 },
    ],
    buildCurves: (params) => {
      const m = clamp(params.m, 0.6, 3.8)
      const n1 = clamp(params.n1, 0.12, 1.2)
      const n2 = clamp(params.n2, 0.4, 3.4)
      const n3 = clamp(params.n3, 0.4, 3.4)
      const cusp = clamp(params.cusp, 0, 1.5)
      const scale = clamp(params.scale, 0.7, 2.4)
      const curve = sampleRange(-Math.PI, Math.PI, 1700, (theta) => {
        const r = superformulaRadius(theta, m, n1, n2, n3)
        const x = scale * r * Math.cos(theta)
        const y = scale * r * Math.sin(theta) - cusp * Math.abs(x) ** 0.72
        return { x: x * 2.2, y: y * 2.2 }
      })
      return [curve]
    },
  },
  {
    id: 'bloom-heart',
    name: '花开混合心形',
    formula: 'x = sin³t(1 + asink t), y = y₀(t) + bcos(kt + φ)',
    defaults: {
      bloom: 0.35,
      freq: 6,
      phase: 0.2,
      depth: 1.2,
      width: 1.3,
    },
    sliders: [
      { key: 'bloom', label: '花开幅度', min: 0, max: 0.8, step: 0.01 },
      { key: 'freq', label: '波瓣频率', min: 2, max: 16, step: 0.1 },
      { key: 'phase', label: '相位偏移', min: -3.14, max: 3.14, step: 0.01 },
      { key: 'depth', label: '深度', min: 0.8, max: 1.8, step: 0.01 },
      { key: 'width', label: '宽度', min: 0.8, max: 2.2, step: 0.01 },
    ],
    buildCurves: (params, time) => {
      const bloom = clamp(params.bloom, 0, 0.8)
      const freq = clamp(params.freq, 2, 16)
      const phase = clamp(params.phase, -3.14, 3.14)
      const depth = clamp(params.depth, 0.8, 1.8)
      const width = clamp(params.width, 0.8, 2.2)
      const curve = sampleRange(0, Math.PI * 2, 1900, (t) => {
        const wave = 1 + bloom * Math.sin(freq * t + time + phase)
        return {
          x: width * Math.sin(t) ** 3 * wave * 1.8,
          y: depth * (0.82 * Math.cos(t) - 0.28 * Math.cos(2 * t) - 0.09 * Math.cos(3 * t) - 0.05 * Math.cos(4 * t))
            + bloom * 0.5 * Math.cos(freq * t + time + phase),
        }
      })
      return [curve]
    },
  },
]

const modelMap = new Map(models.map(model => [model.id, model]))

const defaultEffects: EffectSettings = {
  lineWidth: 2.4,
  glow: 0.5,
  trailLayers: 3,
  trailGap: 0.18,
  particles: 36,
  particleSize: 1.8,
  speed: 1,
  gridDensity: 10,
}

const presets: Preset[] = [
  {
    id: 'chalk-classic',
    name: '粉笔经典',
    modelId: 'classic-pair',
    params: { a: 0.6, b: 1.04, sx: 1.6, sy: 1.6 },
    effects: { lineWidth: 2.5, glow: 0.24, trailLayers: 2, particles: 16, speed: 0.8 },
    theme: 'classroom',
    lineColor: '#ff5ea3',
    gradientFrom: '#ff5ea3',
    gradientTo: '#4f7cff',
  },
  {
    id: 'lecture-cardioid',
    name: '课堂参数心',
    modelId: 'cardioid-deluxe',
    params: { width: 1.24, depth: 1.3, warp: 0.05, freq: 4 },
    effects: { lineWidth: 2.8, glow: 0.3, trailLayers: 2, particles: 22, speed: 1 },
    theme: 'classroom',
    lineColor: '#e13c7b',
    gradientFrom: '#f15bb5',
    gradientTo: '#00bbf9',
  },
  {
    id: 'harmonic-valentine',
    name: '谐波浪漫',
    modelId: 'valentine-fourier',
    params: { scale: 0.128, pinch: 1.06, drift: 0.22 },
    effects: { lineWidth: 2.6, glow: 0.44, trailLayers: 3, particles: 40, speed: 1.2 },
    theme: 'classroom',
    lineColor: '#f43f5e',
    gradientFrom: '#fb7185',
    gradientTo: '#6366f1',
  },
  {
    id: 'oscillation-studio',
    name: '振荡影像馆',
    modelId: 'algebraic-oscillator',
    params: { amp: 0.94, span: 8, freq: 7.93, offset: 1, top: 2.75 },
    effects: { lineWidth: 2.2, glow: 0.35, trailLayers: 1, particles: 30, speed: 1.45 },
    theme: 'classroom',
    lineColor: '#facc15',
    gradientFrom: '#facc15',
    gradientTo: '#fb7185',
  },
  {
    id: 'heartbeat-lab',
    name: '心跳实验室',
    modelId: 'beating-heart',
    params: { scale: 0.12, beat: 0.26, tempo: 2.8, tilt: 0.06 },
    effects: { lineWidth: 2.9, glow: 0.5, trailLayers: 4, particles: 58, speed: 1.1 },
    theme: 'classroom',
    lineColor: '#e11d48',
    gradientFrom: '#f43f5e',
    gradientTo: '#7c3aed',
  },
  {
    id: 'rose-garden',
    name: '玫瑰园',
    modelId: 'rose-heart',
    params: { base: 1.06, petal: 0.36, k: 5, width: 1.42 },
    effects: { lineWidth: 2.5, glow: 0.48, trailLayers: 3, particles: 44, speed: 0.95 },
    theme: 'classroom',
    lineColor: '#ec4899',
    gradientFrom: '#f472b6',
    gradientTo: '#0ea5e9',
  },
  {
    id: 'winged-symphony',
    name: '翼展交响',
    modelId: 'winged-cardioid',
    params: { wing: 0.28, cusp: 0.74, spread: 1.38, curl: 0.1 },
    effects: { lineWidth: 2.7, glow: 0.52, trailLayers: 4, particles: 52, speed: 1.25 },
    theme: 'classroom',
    lineColor: '#db2777',
    gradientFrom: '#f43f5e',
    gradientTo: '#22d3ee',
  },
  {
    id: 'neon-ribbon',
    name: '霓虹丝带',
    modelId: 'ribbon-heart',
    params: { ribbon: 0.2, freq: 20, depth: 1.2, width: 1.45 },
    effects: { lineWidth: 2.4, glow: 0.8, trailLayers: 4, particles: 64, speed: 1.6 },
    theme: 'neon',
    lineColor: '#ff5ec4',
    gradientFrom: '#ff5ec4',
    gradientTo: '#00e5ff',
  },
  {
    id: 'morph-superformula',
    name: '超公式变奏',
    modelId: 'superformula-heart',
    params: { m: 1, n1: 0.39, n2: 1.2, n3: 1.25, cusp: 0.82, scale: 1.45 },
    effects: { lineWidth: 2.6, glow: 0.56, trailLayers: 3, particles: 48, speed: 1.1 },
    theme: 'classroom',
    lineColor: '#ef4444',
    gradientFrom: '#f97316',
    gradientTo: '#2563eb',
  },
  {
    id: 'blooming-surprise',
    name: '花开惊喜',
    modelId: 'bloom-heart',
    params: { bloom: 0.35, freq: 6, phase: 0.2, depth: 1.2, width: 1.3 },
    effects: { lineWidth: 2.8, glow: 0.62, trailLayers: 5, particles: 66, speed: 1.4 },
    theme: 'classroom',
    lineColor: '#f43f5e',
    gradientFrom: '#fb7185',
    gradientTo: '#22d3ee',
  },
]

export function useHeartGallery(props: HeartGalleryResolvedProps): HeartGalleryState {
  const activePresetId = ref(presets[0].id)
  const activeModelId = ref(models[0].id)
  const params = ref<Record<string, number>>({ ...models[0].defaults })
  const effects = reactive<EffectSettings>({ ...defaultEffects })

  const showGrid = ref(true)
  const showAxes = ref(true)
  const showParticles = ref(true)
  const showTrail = ref(true)
  const autoCruiseEnabled = ref(props.autoCruise)
  const activeTheme = ref<ThemeMode>(props.theme)
  const lineColor = ref(presets[0].lineColor)
  const gradientFrom = ref(presets[0].gradientFrom)
  const gradientTo = ref(presets[0].gradientTo)

  const animationTime = ref(0)
  let rafId = 0
  let cruiseId: ReturnType<typeof setInterval> | 0 = 0

  function applyModelDefaults(modelId: string): void {
    const model = modelMap.get(modelId) ?? models[0]
    params.value = { ...model.defaults }
  }

  function applyPreset(presetId: string): void {
    const preset = presets.find(item => item.id === presetId) ?? presets[0]
    const model = modelMap.get(preset.modelId) ?? models[0]
    activePresetId.value = preset.id
    activeModelId.value = model.id
    params.value = { ...model.defaults, ...preset.params }
    Object.assign(effects, defaultEffects, preset.effects)
    activeTheme.value = preset.theme
    lineColor.value = preset.lineColor
    gradientFrom.value = preset.gradientFrom
    gradientTo.value = preset.gradientTo
  }

  applyPreset(presets[0].id)

  const activeModel = computed(() => modelMap.get(activeModelId.value) ?? models[0])

  watch(activeModelId, (modelId: string) => {
    applyModelDefaults(modelId)
  })

  watch(activePresetId, (presetId: string) => {
    const preset = presets.find(item => item.id === presetId)
    if (preset) {
      applyPreset(preset.id)
    }
  })

  const frameCurves = (time: number): Point[][] => activeModel.value.buildCurves(params.value, time)
  const currentCurves = computed(() => frameCurves(animationTime.value))
  const allPoints = computed(() => currentCurves.value.flat())

  const bounds = computed(() => {
    const points = allPoints.value
    if (!points.length) {
      return {
        minX: -1,
        maxX: 1,
        minY: -1,
        maxY: 1,
        centerX: 0,
        centerY: 0,
        scale: 1,
        pad: 56,
      }
    }
    let minX = Number.POSITIVE_INFINITY
    let maxX = Number.NEGATIVE_INFINITY
    let minY = Number.POSITIVE_INFINITY
    let maxY = Number.NEGATIVE_INFINITY
    for (const point of points) {
      minX = Math.min(minX, point.x)
      maxX = Math.max(maxX, point.x)
      minY = Math.min(minY, point.y)
      maxY = Math.max(maxY, point.y)
    }
    const pad = 56
    const rangeX = Math.max(0.1, maxX - minX)
    const rangeY = Math.max(0.1, maxY - minY)
    const sx = (props.width - pad * 2) / rangeX
    const sy = (props.height - pad * 2) / rangeY
    const scale = Math.max(0.001, Math.min(sx, sy))
    return {
      minX,
      maxX,
      minY,
      maxY,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2,
      scale,
      pad,
    }
  })

  function project(point: Point): { x: number, y: number } {
    const { centerX, centerY, scale } = bounds.value
    const x = props.width / 2 + (point.x - centerX) * scale
    const y = props.height / 2 - (point.y - centerY) * scale
    return { x, y }
  }

  function toPath(points: Point[]): string {
    if (!points.length) {
      return ''
    }
    const first = project(points[0])
    let d = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`
    for (let i = 1; i < points.length; i += 1) {
      const p = project(points[i])
      d += ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
    }
    return d
  }

  const isNonEmptyPath = (path: string): path is string => path.length > 0
  const primaryPaths = computed<string[]>(() => currentCurves.value.map((curve: Point[]) => toPath(curve)).filter(isNonEmptyPath))

  const trailPaths = computed(() => {
    if (!showTrail.value || effects.trailLayers < 1) {
      return [] as TrailLayer[]
    }
    const layers: TrailLayer[] = []
    const layerCount = Math.max(1, Math.floor(effects.trailLayers))
    for (let i = 1; i <= layerCount; i += 1) {
      const t = animationTime.value - i * effects.trailGap
      const frame = frameCurves(t)
      const opacity = clamp(0.36 - i * 0.06, 0.03, 0.4)
      const width = clamp(effects.lineWidth - i * 0.25, 0.4, effects.lineWidth)
      layers.push({
        opacity,
        width,
        paths: frame.map((curve: Point[]) => toPath(curve)).filter(isNonEmptyPath),
      })
    }
    return layers
  })

  const flattenedTrailPaths = computed(() => trailPaths.value.flatMap((layer: TrailLayer) => layer.paths.map((path: string) => ({
    path,
    opacity: layer.opacity,
    width: layer.width,
  }))))

  const particlePoints = computed(() => {
    if (!showParticles.value || effects.particles <= 0) {
      return []
    }
    const flat = currentCurves.value.flat()
    if (flat.length < 2) {
      return []
    }
    const total = Math.max(0, Math.floor(effects.particles))
    const points: { x: number, y: number, radius: number, opacity: number }[] = []
    for (let i = 0; i < total; i += 1) {
      const index = Math.floor((i / total) * (flat.length - 1))
      const source = flat[index]
      const p = project(source)
      const wave = 0.5 + 0.5 * Math.sin(animationTime.value * 1.5 + i * 0.72)
      points.push({
        x: p.x,
        y: p.y,
        radius: 0.5 + effects.particleSize * (0.35 + wave),
        opacity: clamp(0.2 + wave * 0.6, 0.2, 0.9),
      })
    }
    return points
  })

  const gridLines = computed(() => {
    const lines: { x1: number, y1: number, x2: number, y2: number }[] = []
    const count = Math.max(4, Math.floor(effects.gridDensity))
    const startX = bounds.value.pad
    const endX = props.width - bounds.value.pad
    const startY = bounds.value.pad
    const endY = props.height - bounds.value.pad
    for (let i = 0; i <= count; i += 1) {
      const ratio = i / count
      const x = startX + ratio * (endX - startX)
      const y = startY + ratio * (endY - startY)
      lines.push({ x1: x, y1: startY, x2: x, y2: endY })
      lines.push({ x1: startX, y1: y, x2: endX, y2: y })
    }
    return lines
  })

  const zeroX = computed(() => project({ x: 0, y: 0 }).x)
  const zeroY = computed(() => project({ x: 0, y: 0 }).y)

  const stageTheme = computed(() => {
    if (activeTheme.value === 'neon') {
      return {
        panelBg: '#0b1022',
        panelBorder: '#1f2a4a',
        panelText: '#d7e3ff',
        subtleText: '#9ab1e6',
        stageBg: 'radial-gradient(circle at 20% 15%, #152449 0%, #0b1022 48%, #060a16 100%)',
        gridColor: 'rgba(90, 138, 255, 0.24)',
        axisColor: 'rgba(175, 214, 255, 0.72)',
        formulaBg: 'rgba(9, 13, 28, 0.74)',
        formulaText: '#e5efff',
        controlBg: '#0f1733',
        controlBorder: '#2a3b74',
      }
    }
    return {
      panelBg: '#f9f8f2',
      panelBorder: '#ddd8ca',
      panelText: '#1f2937',
      subtleText: '#667085',
      stageBg: 'linear-gradient(180deg, #fbfaf5 0%, #f4efe1 100%)',
      gridColor: 'rgba(56, 99, 167, 0.22)',
      axisColor: 'rgba(49, 83, 145, 0.66)',
      formulaBg: 'rgba(255, 255, 255, 0.78)',
      formulaText: '#1e293b',
      controlBg: '#ffffff',
      controlBorder: '#d6deea',
    }
  })

  const shellStyle = computed(() => ({
    '--hg-panel-bg': stageTheme.value.panelBg,
    '--hg-panel-border': stageTheme.value.panelBorder,
    '--hg-panel-text': stageTheme.value.panelText,
    '--hg-subtle-text': stageTheme.value.subtleText,
    '--hg-stage-bg': stageTheme.value.stageBg,
    '--hg-grid-color': stageTheme.value.gridColor,
    '--hg-axis-color': stageTheme.value.axisColor,
    '--hg-formula-bg': stageTheme.value.formulaBg,
    '--hg-formula-text': stageTheme.value.formulaText,
    '--hg-control-bg': stageTheme.value.controlBg,
    '--hg-control-border': stageTheme.value.controlBorder,
  }))

  const stagePathClass = computed(() => (props.animated ? 'is-animated' : ''))
  const formulaVisible = computed(() => props.showFormula)

  function randomSurprise(): void {
    const randomPreset = presets[Math.floor(Math.random() * presets.length)]
    applyPreset(randomPreset.id)
  }

  function startAnimation(): void {
    cancelAnimationFrame(rafId)
    const loop = (timestamp: number): void => {
      animationTime.value = (timestamp / 1000) * effects.speed
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
  }

  function stopAnimation(): void {
    cancelAnimationFrame(rafId)
  }

  function startCruise(): void {
    if (!autoCruiseEnabled.value) {
      return
    }
    if (cruiseId) {
      clearInterval(cruiseId)
    }
    cruiseId = setInterval(() => {
      const index = presets.findIndex(item => item.id === activePresetId.value)
      const next = presets[(index + 1) % presets.length]
      applyPreset(next.id)
    }, 7600)
  }

  function stopCruise(): void {
    if (cruiseId) {
      clearInterval(cruiseId)
      cruiseId = 0
    }
  }

  watch(() => props.animated, (enabled: boolean) => {
    if (enabled) {
      startAnimation()
    }
    else {
      stopAnimation()
    }
  }, { immediate: true })

  watch(autoCruiseEnabled, (enabled: boolean) => {
    if (enabled) {
      startCruise()
    }
    else {
      stopCruise()
    }
  }, { immediate: true })

  watch(() => effects.speed, () => {
    if (props.animated) {
      startAnimation()
    }
  })

  onMounted(() => {
    if (props.animated) {
      startAnimation()
    }
    if (autoCruiseEnabled.value) {
      startCruise()
    }
  })

  onUnmounted(() => {
    stopAnimation()
    stopCruise()
  })

  return {
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
    width: props.width,
    height: props.height,
    zeroX,
    zeroY,
  }
}
