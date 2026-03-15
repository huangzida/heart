import type { App } from 'vue'
import HelloButton from './components/HelloButton.vue'
import './styles.css'

export { HelloButton }

export default {
  install(app: App) {
    app.component('HelloButton', HelloButton)
  },
}
