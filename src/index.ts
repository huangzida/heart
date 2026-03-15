import type { App } from 'vue'
import HeartGallery from './components/HeartGallery.vue'
import './styles.css'

export { HeartGallery }

export default {
  install(app: App) {
    app.component('HeartGallery', HeartGallery)
  },
}
