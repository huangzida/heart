# heart

`heart` 是一个基于 Vue 3 + TypeScript + Tailwind CSS 的数学心形可视化组件库。

## 特性

- 提供 `HeartGallery` 组件，专注展示数学心形函数的多种变体
- 支持函数模型切换、参数调节、预设切换和自动巡航
- 支持网格/坐标轴/粒子/拖尾/发光等可视化特效
- 仅提供 ESM 产物（`index.mjs`）和类型声明（`index.d.mts`）
- 内置 playground，以“第三方消费 dist 产物”的方式预览组件
- 内置 Vitest + Vue Test Utils 测试

## 项目结构

```txt
.
├─ src/
│  ├─ components/
│  │  └─ HeartGallery.vue
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
    :auto-cruise="true"
    :show-formula="true"
  />
</template>
```

## 质量检查

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
```

## License

[MIT](./LICENSE) License © [huangzida](https://github.com/huangzida) <398926656@qq.com>
