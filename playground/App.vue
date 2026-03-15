<script setup lang="ts">
import { HeartGallery } from 'heart'
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-[1360px] flex-col gap-5 px-5 py-6">
    <header class="space-y-2">
      <h1 class="text-3xl font-semibold text-slate-900">
        数学心形函数艺术馆
      </h1>
      <p class="text-slate-600">
        可调参数 + 预设 + 多重动态特效，专门展示数学里心形函数的各种变体。
      </p>
    </header>
    <HeartGallery
      :width="980"
      :height="620"
      theme="classroom"
      :animated="true"
      :show-formula="true"
    />
  </main>
</template>
