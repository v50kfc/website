import Theme from 'vitepress/theme'
import HomePage from '../../components/home-page.vue'
export default {
  ...Theme,
  enhanceApp: ({ app }) => {
    app.component('HomePage', HomePage)
  },
}