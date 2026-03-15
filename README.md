# heart

`heart` 是一个基于 Vue 3 + TypeScript + Tailwind CSS 的数学心形可视化组件库，内置沉浸式控制面板与多主题舞台渲染。

## 特性

- 提供 `HeartGallery` 组件，内置 19+ 心形函数模型与 16+ 预设场景
- 支持函数模型切换、参数调节、预设切换和自动切换（开关 + 档位 + 滑杆）
- 支持 8 套画布主题：理性象牙 / 森林黑板 / 手稿暖光 / 深空绸缎 / 暮色珊瑚 / 冰川晨雾 / 金属夜航 / 赛博脉冲
- 支持网格 / 坐标轴 / 粒子 / 拖尾 / 发光等可视化特效
- 仅提供 ESM 产物（`index.mjs`）和类型声明（`index.d.mts`）
- 内置 playground，以“第三方消费 dist 产物”的方式预览组件
- 内置 Vitest + Vue Test Utils 测试

## 项目结构

```txt
.
├─ src/
│  ├─ components/
│  │  ├─ HeartGallery.vue
│  │  └─ heart-gallery/
│  │     ├─ HeartGalleryControls.vue
│  │     ├─ HeartGalleryStage.vue
│  │     ├─ ModelParamsPanel.vue
│  │     ├─ EffectParamsPanel.vue
│  │     ├─ useHeartGallery.ts
│  │     ├─ types.ts
│  │     └─ heart-gallery.css
│  ├─ index.ts
│  ├─ styles.css
│  └─ env.d.ts
├─ playground/
│  ├─ App.vue
│  ├─ main.ts
│  └─ vite.config.ts
├─ test/
│  ├─ heart-gallery.test.ts
│  └─ index.test.ts
└─ .github/workflows/
   └─ pages.yml
```

## 本地开发

```bash
pnpm install
pnpm run preview
```

`preview` 会先执行构建，再启动 playground，确保预览结果与第三方项目消费方式一致。

## 核心模型分层

- 第一层（易实现，高回报）：Lissajous 心脉、玫瑰叠心、双层偏移心
- 第二层（中等实现，视觉惊艳）：分段傅里叶心、超椭圆压心、扭转丝带心
- 第三层（高阶玩法，数学味更强）：分形蕨心、复映射液态心、反应扩散心域

## 构建

```bash
pnpm run build
```

构建产物位于 `dist/`：

- `dist/index.mjs`：ESM 入口
- `dist/index.d.mts`：类型声明入口

## 在第三方项目中使用

```ts
import Heart, { HeartGallery } from 'heart'
```

```ts
import Heart from 'heart'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(Heart).mount('#app')
```

```vue
<script setup lang="ts">
import { HeartGallery } from 'heart'
</script>

<template>
  <HeartGallery
    :width="980"
    :height="620"
    theme="classroom"
    :animated="true"
    :auto-cruise="false"
    :show-formula="true"
  />
</template>
```

组件渲染后，可在左侧面板中：

- 选择函数模型、预设场景、画布主题
- 开启自动切换并设置间隔（3s / 5s / 8s / 12s / 20s 以及 2s~30s 滑杆微调）
- 调整函数参数与特效参数以获得不同风格

## 质量检查

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
```

## License

[MIT](./LICENSE) License © [huangzida](https://github.com/huangzida) <398926656@qq.com>
