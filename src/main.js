import Vue from 'vue'
import Landing from './components/Landing.vue'
import App from './components/App.vue'
import Playlists from './components/Playlists.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

const routes = {
  '/': Landing,
  '/app': App,
  '/playlists': Playlists
}

const app = new Vue({
  el: '#app',

  data: {
    currentRoute: window.location.pathname
  },

  computed: {
    ViewComponent () {
      return routes[this.currentRoute]// || NotFound
    }
  },

  vuetify,
  render (h) { return h(this.ViewComponent) }
}).$mount('#app')

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
