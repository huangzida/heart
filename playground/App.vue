<script setup lang="ts">
import { HeartGallery } from 'heart'
</script>

<template>
  <main class="play-shell">
    <div class="play-orb play-orb-a" />
    <div class="play-orb play-orb-b" />
    <section class="play-header">
      <p class="play-kicker">
        Mathematical Emotions
      </p>
      <h1>心形函数沉浸式实验室</h1>
      <p class="play-desc">
        不是普通组件预览，而是把数学曲线、灯光舞台与参数交互融合成一张会呼吸的视觉海报。
      </p>
    </section>
    <section class="play-canvas">
      <HeartGallery
        :width="980"
        :height="620"
        theme="starlight"
        :animated="true"
        :show-formula="true"
      />
    </section>
  </main>
</template>

<style scoped>
.play-shell {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 34px 26px 38px;
  background:
    radial-gradient(circle at 10% 14%, rgb(255 226 199 / 28%) 0%, transparent 44%),
    radial-gradient(circle at 88% 6%, rgb(137 150 255 / 25%) 0%, transparent 42%),
    linear-gradient(145deg, #090d1f 0%, #11152f 38%, #1a1638 100%);
  color: #eef3ff;
}

.play-orb {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
  filter: blur(64px);
  opacity: 0.58;
}

.play-orb-a {
  width: 320px;
  height: 320px;
  left: -70px;
  bottom: -100px;
  background: #ff9fcf;
}

.play-orb-b {
  width: 420px;
  height: 420px;
  right: -120px;
  top: -170px;
  background: #7bb4ff;
}

.play-header {
  position: relative;
  z-index: 1;
  width: min(1360px, 100%);
  margin: 0 auto 20px;
  padding: 16px 18px 18px;
  border-radius: 20px;
  border: 1px solid rgb(255 255 255 / 16%);
  background: linear-gradient(140deg, rgb(255 255 255 / 16%) 0%, rgb(255 255 255 / 4%) 100%);
  backdrop-filter: blur(14px);
}

.play-kicker {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #b9caff;
  font-weight: 700;
}

.play-header h1 {
  margin: 8px 0 6px;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.08;
  font-weight: 800;
}

.play-desc {
  margin: 0;
  font-size: 15px;
  color: #d7e2ff;
}

.play-canvas {
  position: relative;
  z-index: 1;
  width: min(1360px, 100%);
  margin: 0 auto;
}

@media (max-width: 900px) {
  .play-shell {
    padding: 20px 12px 26px;
  }

  .play-header {
    margin-bottom: 14px;
  }

  .play-desc {
    font-size: 14px;
  }
}
</style>
