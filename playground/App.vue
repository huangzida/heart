<script setup lang="ts">
import { HeartGallery } from 'heart'
</script>

<template>
  <main class="play-shell">
    <div class="play-liquid play-liquid-a" />
    <div class="play-liquid play-liquid-b" />
    <div class="play-liquid play-liquid-c" />
    <div class="play-grain" />
    <section class="play-header">
      <p class="play-kicker">
        LIQUID GLASS HEART LAB
      </p>
      <h1>液态玻璃心形函数实验场</h1>
      <p class="play-desc">
        把参数控制台雕刻成通透玻璃，把曲线舞台折射成流动介质，让每一次调参都像在触摸一片未来感材质。
      </p>
      <div class="play-meta">
        <span>Refraction-first</span>
        <span>Organic Motion</span>
        <span>Minimal Future</span>
      </div>
    </section>
    <section class="play-canvas">
      <div class="play-canvas-halo" />
      <HeartGallery
        :width="980"
        :height="620"
        theme="liquid-glass"
        :animated="true"
        :show-formula="true"
      />
    </section>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;900&display=swap');

.play-shell {
  --play-text: #ebf3ff;
  --play-subtle: rgb(219 233 255 / 78%);
  --play-glass: rgb(210 228 255 / 12%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(24px, 4vw, 42px);
  background:
    radial-gradient(1200px 880px at 10% 6%, rgb(166 215 255 / 30%) 0%, transparent 56%),
    radial-gradient(980px 780px at 88% -5%, rgb(186 147 255 / 26%) 0%, transparent 58%),
    radial-gradient(760px 620px at 50% 100%, rgb(138 225 255 / 16%) 0%, transparent 68%),
    linear-gradient(138deg, #050910 0%, #0b1221 32%, #120f24 72%, #15112c 100%);
  color: var(--play-text);
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.play-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(128deg, rgb(255 255 255 / 6%) 0%, transparent 28% 72%, rgb(255 255 255 / 6%) 100%);
  pointer-events: none;
  z-index: 0;
}

.play-liquid {
  position: absolute;
  border-radius: 46% 54% 57% 43% / 41% 50% 50% 59%;
  pointer-events: none;
  z-index: 0;
  filter: blur(4px);
  mix-blend-mode: screen;
  animation: play-drift 20s ease-in-out infinite;
}

.play-liquid::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(155deg, rgb(255 255 255 / 30%) 0%, rgb(255 255 255 / 7%) 48%, rgb(255 255 255 / 14%) 100%);
  border: 1px solid rgb(255 255 255 / 18%);
  backdrop-filter: blur(24px) saturate(128%);
}

.play-liquid-a {
  width: clamp(270px, 34vw, 500px);
  height: clamp(270px, 34vw, 500px);
  left: -120px;
  top: -110px;
  transform: rotate(-20deg);
  background:
    radial-gradient(circle at 30% 25%, rgb(255 255 255 / 36%) 0%, rgb(255 255 255 / 8%) 38%, transparent 72%),
    radial-gradient(circle at 72% 74%, rgb(110 191 255 / 30%) 0%, transparent 58%);
}

.play-liquid-b {
  width: clamp(280px, 30vw, 440px);
  height: clamp(280px, 30vw, 440px);
  right: -150px;
  bottom: -80px;
  transform: rotate(28deg);
  background:
    radial-gradient(circle at 30% 20%, rgb(178 238 255 / 34%) 0%, transparent 60%),
    radial-gradient(circle at 72% 74%, rgb(173 132 255 / 32%) 0%, transparent 64%);
  animation-delay: -8s;
}

.play-liquid-c {
  width: clamp(180px, 24vw, 320px);
  height: clamp(180px, 24vw, 320px);
  right: 14%;
  top: 9%;
  transform: rotate(14deg);
  background:
    radial-gradient(circle at 36% 32%, rgb(255 255 255 / 28%) 0%, transparent 54%),
    radial-gradient(circle at 76% 70%, rgb(95 157 255 / 30%) 0%, transparent 62%);
  animation-duration: 16s;
}

.play-grain {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.18;
  pointer-events: none;
  background-image: radial-gradient(rgb(255 255 255 / 48%) 0.45px, transparent 0.45px);
  background-size: 3px 3px;
}

.play-header {
  position: relative;
  z-index: 1;
  width: min(1360px, 100% - 12px);
  margin: 0 auto clamp(18px, 2.6vw, 32px);
  padding: clamp(18px, 2.5vw, 30px) clamp(18px, 2.8vw, 32px);
  border-radius: 26px;
  border: 1px solid rgb(188 226 255 / 32%);
  background:
    linear-gradient(130deg, rgb(202 232 255 / 20%) 0%, rgb(185 212 255 / 9%) 38%, rgb(179 162 255 / 11%) 100%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 32%),
    0 16px 48px rgb(11 20 44 / 38%);
  backdrop-filter: blur(24px) saturate(138%);
}

.play-kicker {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgb(196 226 255 / 88%);
  font-weight: 600;
  font-family: 'Sora', 'Avenir Next', sans-serif;
}

.play-header h1 {
  margin: 10px 0 8px;
  font-size: clamp(30px, 5.3vw, 64px);
  line-height: 1.02;
  letter-spacing: 0.02em;
  font-weight: 900;
  color: rgb(244 250 255 / 96%);
  text-wrap: balance;
  font-family: 'Sora', 'Noto Sans SC', sans-serif;
  text-shadow: 0 10px 34px rgb(0 0 0 / 36%);
}

.play-desc {
  margin: 0;
  max-width: 70ch;
  font-size: clamp(14px, 1.35vw, 17px);
  line-height: 1.72;
  color: var(--play-subtle);
}

.play-meta {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.play-meta span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid rgb(196 230 255 / 30%);
  background: var(--play-glass);
  color: rgb(233 247 255 / 92%);
  font-size: 11px;
  letter-spacing: 0.11em;
  font-family: 'Sora', sans-serif;
  text-transform: uppercase;
}

.play-canvas {
  position: relative;
  z-index: 1;
  width: min(1360px, 100% - 12px);
  margin: 0 auto;
  border-radius: 30px;
}

.play-canvas-halo {
  position: absolute;
  inset: -28px -26px;
  border-radius: 38px;
  background:
    radial-gradient(circle at 16% 14%, rgb(142 215 255 / 36%) 0%, transparent 52%),
    radial-gradient(circle at 84% 86%, rgb(189 151 255 / 28%) 0%, transparent 56%);
  filter: blur(36px);
  opacity: 0.74;
  z-index: -1;
}

@media (max-width: 900px) {
  .play-shell {
    padding: 20px 12px 26px;
  }

  .play-header {
    border-radius: 22px;
    margin-bottom: 14px;
    padding: 16px 15px 18px;
  }

  .play-header h1 {
    font-size: clamp(26px, 9vw, 44px);
  }

  .play-meta {
    margin-top: 12px;
    gap: 8px;
  }

  .play-meta span {
    letter-spacing: 0.09em;
    font-size: 10px;
  }

  .play-liquid-c {
    right: -22px;
    top: 38%;
  }
}

@keyframes play-drift {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
    border-radius: 46% 54% 57% 43% / 41% 50% 50% 59%;
  }
  50% {
    transform: translate3d(22px, -18px, 0) rotate(9deg) scale(1.04);
    border-radius: 54% 46% 50% 50% / 57% 40% 60% 43%;
  }
}
</style>
