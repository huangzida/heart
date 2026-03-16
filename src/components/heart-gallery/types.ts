export type ThemeMode = 'classroom' | 'neon' | 'chalkboard' | 'starlight' | 'paper-ink' | 'coral-dusk' | 'frost-mist' | 'metal-night' | 'liquid-glass'

export interface Point {
  x: number
  y: number
}

export interface SliderDef {
  key: string
  label: string
  min: number
  max: number
  step: number
}

export interface HeartModel {
  id: string
  name: string
  formula: string
  defaults: Record<string, number>
  sliders: SliderDef[]
  buildCurves: (params: Record<string, number>, time: number) => Point[][]
}

export interface EffectSettings {
  lineWidth: number
  glow: number
  trailLayers: number
  trailGap: number
  particles: number
  particleSize: number
  speed: number
  gridDensity: number
}

export interface Preset {
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

export interface HeartGalleryProps {
  width?: number
  height?: number
  theme?: ThemeMode
  animated?: boolean
  autoCruise?: boolean
  showFormula?: boolean
}
