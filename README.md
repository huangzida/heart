# starter-vue3

Vue 3 组件库模板，基于 Vite + TypeScript + Tailwind CSS。

## 特性

- 使用 `.vue` 单文件组件开发组件库
- 仅提供 ESM 产物（`index.mjs`），不提供 CommonJS
- 输出类型声明并暴露 `index.d.mts`
- 使用 `vite-plugin-css-injected-by-js` 自动注入样式，无需业务方手动引入 CSS
- 内置 playground，按第三方项目方式消费 `dist` 产物验证
- 内置 Vitest + Vue Test Utils 测试
- 内置 GitHub Pages 预览工作流

## 项目结构

```txt
.
├─ src/
│  ├─ components/
│  │  └─ HelloButton.vue
│  ├─ index.ts
│  ├─ styles.css
│  └─ env.d.ts
├─ playground/
│  ├─ App.vue
│  ├─ main.ts
│  └─ vite.config.ts
├─ test/
│  └─ hello-button.test.ts
└─ .github/workflows/
   └─ pages.yml
```

## 本地开发

```bash
pnpm install
pnpm run preview
```

`preview` 会先执行构建，再启动 playground，确保你看到的是“第三方消费打包产物”的结果。

## 构建产物

```bash
pnpm run build
```

构建后默认输出到 `dist/`：

- `dist/index.mjs`：库 ESM 入口
- `dist/index.d.mts`：对外暴露类型入口

`package.json` 的导出策略是 import-only：

- `exports["."].import` -> `./dist/index.mjs`
- `exports["."].types` -> `./dist/index.d.mts`

## 在第三方项目中使用

```ts
import StarterVue3, { HelloButton } from 'starter-vue3'
```

```ts
import StarterVue3 from 'starter-vue3'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(StarterVue3).mount('#app')
```

## 质量检查

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
```

## GitHub Pages 预览

- 推送到 `main` 分支后，`pages.yml` 会自动构建 playground 并部署到 GitHub Pages
- 本地可先执行 `pnpm run preview:build` 验证 pages 构建结果
- 在线预览地址：https://huangzida.github.io/starter-vue3/

## 发布

推荐使用 npm Trusted Publisher：

1. 首次手动执行 `pnpm publish`，在 npm 创建包
2. 在 npm 包页面配置 GitHub 仓库信任关系
3. 后续使用 `pnpm run release`，由 GitHub Actions 完成发布流程

## License

[MIT](./LICENSE) License © [huangzida](https://github.com/huangzida) <398926656@qq.com>
